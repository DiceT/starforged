import { StarforgedActor } from "../documents/actor.mjs";


export async function generateCreature() {
    let sector = await game.actors.getName(await game.scenes.current.data.name);
    let lastKnown = await getLink(sector.id, sector.data.data.type.toLowerCase(), sector.name);

    let environment = await generateContent("Creatures - Environment");
    let scale = await generateContent("Creatures - Scale");
    if ( scale == "Ultra-scale") { scale = await generateContent("Creatures - Ultra-Scale"); }
    let basicForm = await generateContent("Creatures - Basic Form - " + environment);

    let creatureName = basicForm + " - " + environment;
    let content = "<p><b>Environment</b>: " + environment + "</p>";
    content += "<p><b>Basic Form</b>: " + basicForm + "</p>";
    content += "<p><b>First Look</b>: " + await generateContent("[ Creatures - First Looks ]");
    content += " | " + await generateContent("[ Creatures - First Looks ]") + "</p>";
    content += "<p><b>Behavior</b>: " + await generateContent("[ Creatures - Encountered Behaviors ]") + "</p>";
    content += "<p><b>Revealed Aspect</b>: " + await generateContent("[ Creatures - Revealed Aspects ]");
    if ( Math.floor(Math.random() * 2 ) == 0 ) {
        content += " | " + await generateContent("[ Creatures - Revealed Aspects ]");
    }
    content += "</p>";

    await StarforgedActor.create ({
        name: creatureName,
        type: "location",
        folder: sector.data.folder,
        data: {
          type: "Creature",
          details: content,
          lastKnown: lastKnown
        }
    });

    return;
}
