import { StarforgedActor } from "../documents/actor.mjs";
import { rollFromFolder } from "./core-generator.mjs";

export async function generatePrecursor( location ) {
    let sector = await game.actors.getName(await game.scenes.current.data.name);
    let result;

    if ( location === "Random" ) {
        result = await rollFromFolder("Precursor Vault - Location", true);
        location = result.result;
    }

    result = await rollFromFolder("Precursor Vault - Scale", true);
    let content = "</p><b>" + result.prefix + "</b>: " + result.result + "</p>";
    result = await rollFromFolder("Precursor Vault - Form", true);
    content += "</p><b>" + result.prefix + "</b>: " + result.result + "</p>";
    result = await rollFromFolder("Precursor Vault - Shape", true);
    content += "</p><b>" + result.prefix + "</b>: " + result.result + "</p>";
    result = await rollFromFolder("Precursor Vault - Material", true);
    content += "</p><b>" + result.prefix + "</b>: " + result.result + "</p>";
    result = await rollFromFolder("[ Precursor Vaults - Outer First Looks ]", true);
    content += "</p><b>" + result.prefix + "</b>: " + result.result;
    if ( Math.floor(Math.random() * 2 ) == 0 ) { 
        result = await rollFromFolder("[ Precursor Vaults - Outer First Looks ]", true);
        content += " | " + result.result;
    }
    content += "</p>";

    let notes = "<p><i>It is recommended to create a new scene so you can explore the derelict with the provided tools and the ability to flowchart/map your progress.</i></p>";

    let precursorImage = "./systems/starforged/resources/settlements/Precursor Vault - " + location +".png";
    let derelictName = "Precursor Vault - " + location;

    await StarforgedActor.create ({
        name: derelictName,
        type: "location",
        folder: sector.data.folder,
        img: precursorImage,
        token: {
            actorLink: true
        },
        data: {
          type: "Precursor Vault",
          locationType: location,
          details: content,
          notes: notes
        }
    });

    return;
}