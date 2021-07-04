import { StarforgedActor } from "../documents/actor.mjs";
import { rollFromFolder } from "./core-generator.mjs";


export async function generateSettlement( settlementType = "Random" ) {
    let sector = await game.actors.getName(await game.scenes.current.data.name);
    let settlementPrefix = await rollFromFolder("[ Settlements - Name Prefixes ]", true);
    let settlementName = await rollFromFolder("[ Settlements - Names ]", true);
    let settlementSuffix = await rollFromFolder("[ Settlements - Name Suffixes ]", true);

    settlementPrefix.result += settlementPrefix.result != "" ? " " : "";
    settlementSuffix.result = settlementSuffix.result != "" ? " " + settlementSuffix.result : settlementSuffix.result;
    settlementName.result = settlementPrefix.result + settlementName.result + settlementSuffix.result;

    let result = await rollFromFolder("Settlement Location", true);
    settlementType = settlementType === "Random" ? result.result : settlementType;
    let settlementImage = "./systems/starforged/resources/settlements/" + settlementType + ".png";

    let content = "<p><h3>" + settlementType + " Settlement</h3></p>";
    result = await rollFromFolder("[ Settlements - First Looks ]", true);
    content += "<p><b>" + result.prefix + "</b>: " + result.result + "</p>";

    let newSettlement = await StarforgedActor.create ({
      name: settlementName.result,
      type: "location",
      folder: sector.folder,
      img: settlementImage,
      data: {
        type: "Settlement",
        locationType: settlementType,
        details: content,
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