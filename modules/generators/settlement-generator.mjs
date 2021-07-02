import { StarforgedActor } from "../documents/actor.mjs";
import { getLink } from "./core-generator.mjs";
import { generateContent } from "./core-generator.mjs";

export async function generateSettlement( sectorFolderID, sectorLocation, settlementType = "Random" ) {
    const folder1 = "[ Settlements - Name Prefixes ]";
    const folder2 = "[ Settlements - Names ]";
    const folder3 = "[ Settlements - Name Suffixes ]";
    const folder9 = "[ Settlements - First Looks ]";
    const folder4 = "[ Settlements - Projects ]";
    const folder5 = "[ Settlements - Troubles ]";
    const folder10 = "[ Settlements - Initial Contacts ]";
    const folder6 = "Settlement Location";
    const folder7 = "Settlement Population - " + sectorLocation;
    const folder8 = "Settlement Authority";
    
    if ( settlementType == "Random" ) {
      settlementType = await generateContent(folder6);
    }
    let settlementImage = "./systems/starforged/resources/settlements/" + settlementType + ".png";
  
    let content = "<p><h3>" + settlementType + " Settlement</h3></p>";
  
    let settlementPrefix = await generateContent(folder1);
    let settlementSuffix = await generateContent(folder3);
    if ( settlementPrefix != "" ) {
      settlementPrefix += " ";
      settlementSuffix = "";
    }
    if ( settlementSuffix != "" ) {
      settlementSuffix = " " + settlementSuffix;
    }
  
    let settlementName = settlementPrefix + await generateContent(folder2) + settlementSuffix;
  
    content += "<p><b>First Look</b>: " + await generateContent(folder9);
    if ( Math.floor(Math.random() * 2) == 0) {
      content += " | " + await generateContent(folder9);
    }
    content += "</p>";
    content += "<p><b>Population</b>: " + await generateContent(folder7) + "</p>";
    content += "<p><b>Authority</b>: " + await generateContent(folder8) + "</p>";
    if ( Math.floor(Math.random() * 2) == 0) {
      content += "<p><b>Projects</b>: " + await generateContent(folder4) + "</p>";
    }
    else {
      content += "<p><b>Projects</b>: " + await generateContent(folder4, folder4) + "</p>";
    }
    content += "<p><b>Troubles</b>: " + await generateContent(folder5) + "</p>";
    content += "<p><b>Initial Contact</b>: " + await generateContent(folder10) + "</p>";
  
    let sector = await game.actors.getName(await game.scenes.current.data.name);
    let lastKnown = await getLink(sector.id, sector.data.data.type.toLowerCase(), sector.name);

    let newSettlement = await StarforgedActor.create ({
      name: settlementName,
      type: "location",
      folder: sectorFolderID,
      img: settlementImage,
      data: {
        type: settlementType,
        details: content,
        lastKnown: lastKnown
      }
    });
  
    let token = {
      name: newSettlement.name,
      x: Math.floor(Math.random() * 3200),
      y: Math.floor(Math.random() * 1600),
      img: newSettlement.img,
      tint: "#66ffff",
      width: 1,
      height: 1,
      scale: 0.8,
      vision: false,
      hidden: false,
      actorId: newSettlement.id,
      actorLink: true,
      actorData: {}
    }
  
    let scene = game.scenes.viewed;
    await scene.createEmbeddedDocuments("Token", [token]);
  
    return newSettlement;
  }