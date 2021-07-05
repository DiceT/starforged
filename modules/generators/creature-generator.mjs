import { StarforgedActor } from "../documents/actor.mjs";
import { rollFromFolder } from "./core-generator.mjs";

export async function generateCreature() {
    let sector = await game.actors.getName(await game.scenes.current.data.name);

    let result = await rollFromFolder( "Creatures - Environment", true );
    let content = "<p><b>" + result.prefix + "</b>: " + result.result + "</p>";
    let environment = result.result;

    result = await rollFromFolder( "Creatures - Basic Form - " + environment, true );
    content += "<p><b>" + result.prefix + "</b>: " + result.result + "</p>";
    let creatureName = result.result + " - " + environment;

    result = await rollFromFolder( "Creatures - Scale", true );
    if ( result.result === "Ultra-scale" ) {
        result = await rollFromFolder( "Creatures - Ultra-Scale", true );
    }
    content += "<p><b>" + result.prefix + "</b>: " + result.result + "</p>";

    result = await rollFromFolder( "[ Creatures - First Looks ]", true );
    content += "<p><b>" + result.prefix + "</b>: " + result.result;
    result = await rollFromFolder( "[ Creatures - First Looks ]", true );
    content += " | " + result.result + "</p>";

    result = await rollFromFolder( "[ Creatures - Encountered Behaviors ]", true );
    content += "<p><b>" + result.prefix + "</b>: " + result.result + "</p>";

    await StarforgedActor.create ({
        name: creatureName,
        type: "location",
        folder: sector.data.folder,
        data: {
          type: "Creature",
          details: content
        }
    });

    return;
}
