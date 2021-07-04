import { StarforgedActor } from "../documents/actor.mjs";
import { rollFromFolder } from "./core-generator.mjs";

export async function generatePlanet() {
    let planetType = await rollFromFolder( "[ Planetary Classes ]", true );
    let planetImage = "./systems/starforged/resources/planets/" + planetType.result + " 0" + (Math.floor(Math.random() * 6) + 1) +".png";
    let content = "<p><h3>" + planetType.result + "</h3></p>";

    let sector = await game.actors.getName(await game.scenes.current.data.name);
    let locationType = sector.data.data.locationType;
  
    let planetPrefix = await rollFromFolder( "[ Planets - Name Prefixes ]", true );
    let planetName = await rollFromFolder( "[ Planets - Names ]", true );
    let planetSuffix = await rollFromFolder( "[ Planets - Name Suffixes ]", true );
    
    if ( planetSuffix.result != "None" ) {
        planetName.result = planetName.result + " " + planetSuffix.result;
    }
    else if ( planetPrefix.result != "None" ) {
        planetName.result = planetPrefix.result + " " + planetName.result;
    }

    let result = await rollFromFolder( planetType.result + " - Atmosphere", true );
    content += "<p><b>" + result.prefix + "</b>: " + result.result + "</p>";
    result = await rollFromFolder( planetType.result + " - Settlements - " + locationType, true );
    content += "<p><b>" + result.prefix + "</b>: " + result.result + "</p>";
    result = await rollFromFolder( planetType.result + " - Observed From Space", true );
    content += "<p><b>" + result.prefix + "</b>: " + result.result;
    if ( Math.floor(Math.random() * 2) == 0) {
        result = await rollFromFolder( planetType.result + " - Observed From Space", true );
        content += " | " + result.result;
    }
    content += "</p>";

    let newPlanet = await StarforgedActor.create ({
        name: planetName.result,
        type: "location",
        folder: sector.folder,
        img: planetImage,
        data: {
          type: "Planet",
          locationType: planetType.result,
          details: content,
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