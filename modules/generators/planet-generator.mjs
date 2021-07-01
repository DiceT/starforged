import { StarforgedActor } from "../documents/actor.mjs";
import { getLink } from "./core-generator.mjs";
import { generateContent } from "./core-generator.mjs";

export async function generatePlanet() {
    let planetType = await generateContent( "[ Planetary Classes ]");
    let planetImage = "./systems/starforged/resources/planets/" + planetType + " 0" + (Math.floor(Math.random() * 4) + 1) +".png";
    let content = "<p><h3>" + planetType + "</h3></p>";

    let sector = await game.actors.getName(await game.scenes.current.data.name);
    let location = sector.data.data.locationType;
    let lastKnown = await getLink(sector.id, sector.data.data.type.toLowerCase(), sector.name);
  
    let planetPrefix = "";
    let planetName = "";
    let planetSuffix = "";
    
    planetPrefix = await generateContent( "[ Planets - Name Prefixes ]" );
    planetName = "";
    planetSuffix = await generateContent( "[ Planets - Name Suffixes ]" );

    if ( planetSuffix != "None" ) {
    planetName = await generateContent( "[ Planets - Names ]" ) + " " + planetSuffix;
    }
    else if ( planetPrefix != "None" ) {
    planetName = planetPrefix + " " + await generateContent( "[ Planets - Names ]" );
    }
    else {
    planetName = await generateContent( "[ Planets - Names ]" );
    }
  
    content += "<p><b>Atmosphere</b>: " + await generateContent( planetType + " - Atmosphere" ) + "</p>";
    content += "<p><b>Settlements</b>: " + await generateContent( planetType + " - Settlements - " + location ) + "</p>";
    if ( Math.floor(Math.random() * 2) == 0) {
      content += "<p><b>Observed from Space</b>: " + await generateContent( planetType + " - Observed From Space" ) + "</p>";
    }
    else {
      content += "<p><b>Observed from Space</b>: " + await generateContent( planetType + " - Observed From Space", planetType + " - Observed From Space" ) + "</p>";
    }
    if ( Math.floor(Math.random() * 2) == 0) {
      content += "<p><b>Planetside Feature</b>: " + await generateContent( planetType + " - Planetside Feature" ) + "</p>";
    }
    else {
      content += "<p><b>Planetside Feature</b>: " + await generateContent( planetType + " - Planetside Feature", planetType + " - Planetside Feature" ) + "</p>";
    }
    content += "<p><b>Life</b>: " + await generateContent( planetType + " - Life" ) + "</p>";
  
    if ( planetType == "Vital World") {
      let diversity = await generateContent( planetType + " - Diversity" );
      content += "<p><b>Diversity</b>: " + diversity + "</p>";
  
      let biomeCount = 2;
      if ( diversity == "Diverse" ) { biomeCount = 3; }
      if ( diversity == "Complex" ) { biomeCount = 4; }
      if ( diversity == "Garden world" ) { biomeCount = 5; }
  
      content += "<p><b>Diversity</b>: ";
      for ( let count = 0; count < biomeCount; count++ ) {
        content += await generateContent( planetType + " - Biomes" );
        if ( count < biomeCount - 1 ) { content += ", "; }
      }
    }

    let newPlanet = await StarforgedActor.create ({
    name: planetName,
    type: "location",
    folder: sector.folder,
    img: planetImage,
    data: {
      type: "planet",
      locationType: planetType,
      details: content,
      lastKnown: lastKnown
    }
  });

  let scale = 0;

  switch ( planetType ){
    case "Desert World": scale = 0.9; break;
    case "Furnace World": scale = 0.9; break;
    case "Grave World": scale = 1.0; break;
    case "Ice World": scale = 0.8; break;
    case "Jovian World": scale = 1.6; break;
    case "Jungle World": scale = 1.0; break;
    case "Ocean World": scale = 1.2; break;
    case "Rocky World": scale = 0.8; break;
    case "Shattered World": scale = 1.1; break;
    case "Tainted World": scale = 1.0; break;
    case "Vital World": scale = 1.0; break;
    default: 1.0;
  }

  scale = (0.8 + Math.floor(Math.random() * 0.5)) * scale;

  let token = {
    name: newPlanet.name,
    x: Math.floor(Math.random() * 3200),
    y: Math.floor(Math.random() * 1600),
    img: newPlanet.img,
    width: 1,
    height: 1,
    scale: scale,
    vision: false,
    hidden: false,
    actorId: newPlanet.id,
    actorLink: true,
    actorData: {}
  }

  let scene = game.scenes.viewed;
  await scene.createEmbeddedDocuments("Token", [token]);

  return newPlanet;
}