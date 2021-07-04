import { StarforgedActor } from "../documents/actor.mjs";


export async function generatePrecursor( location ) {
    let sector = await game.actors.getName(await game.scenes.current.data.name);
    let lastKnown = await getLink(sector.id, sector.data.data.type.toLowerCase(), sector.name);

    if ( location == "Random" ) {
        location = await generateContent("Precursor Vault - Location");
    }

    let content = "</p><b>Scale</b>: " + await generateContent("Precursor Vault - Scale") + "</p>";
    content += "</p><b>Form</b>: " + await generateContent("Precursor Vault - Form") + "</p>";
    content += "</p><b>Shape</b>: " + await generateContent("Precursor Vault - Shape") + "</p>";
    content += "</p><b>Material</b>: " + await generateContent("Precursor Vault - Material") + "</p>";
    content += "</p><b>Outer First Look</b>: " + await generateContent("[ Precursor Vaults - Outer First Looks ]");
    if ( Math.floor(Math.random() * 2 ) == 0 ) { 
        content += " | " + await generateContent("[ Precursor Vaults - Outer First Looks ]") + "</p>";
    }
    content += "</p>";
    content += "</p><b>Inner First Look</b>: " + await generateContent("[ Precursor Vaults - Inner First Looks ]");
    if ( Math.floor(Math.random() * 2 ) == 0 ) { 
        content += " | " + await generateContent("[ Precursor Vaults - Inner First Looks ]") + "</p>";
    }
    content += "</p>";
    content += "<p><i>It is recommended to create a new scene so you can explore the derelict with the provided tools and the ability to flowchart/map your progress.</i></p>";

    let precursorImage = "./systems/starforged/resources/settlements/Precursor Vault - " + location +".png";
    let derelictName = "Precursor Vault - " + location;

    await StarforgedActor.create ({
        name: derelictName,
        type: "location",
        folder: sector.data.folder,
        img: precursorImage,
        data: {
          type: "Precursor Vault",
          locationType: location,
          details: content,
          lastKnown: lastKnown
        }
    });

    return;
}