import { StarforgedActor } from "../documents/actor.mjs";
import { rollFromFolder } from "./core-generator.mjs";

export async function generateNPC() {
    let sector = await game.actors.getName(await game.scenes.current.data.name);

    let result = await rollFromFolder("[ Characters - Given Names ]", true );
    let characterName = result.result;
    result = await rollFromFolder("[ Characters - Family Names ]", true );
    characterName += " " + result.result;    

    result = await rollFromFolder("[ Characters - First Looks ]", true );
    let content = "<p><b>" + result.prefix + "</b>: " + result.result;
    if ( Math.floor(Math.random() * 2 ) == 0 ) {
        result = await rollFromFolder("[ Characters - First Looks ]", true );
        content += " | " + result.result;
    }
    content += "</p>";

    await StarforgedActor.create ({
        name: characterName,
        type: "location",
        folder: sector.data.folder,
        data: {
          type: "NPC",
          details: content
        }
    });
      
    return;
}

