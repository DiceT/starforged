import { StarforgedActor } from "../documents/actor.mjs";
import { getLink } from "./core-generator.mjs";
import { generateContent } from "./core-generator.mjs";

export async function generateNPC() {
    let sector = await game.actors.getName(await game.scenes.current.data.name);
    let lastKnown = await getLink(sector.id, sector.data.data.type.toLowerCase(), sector.name);

    let characterName = await generateContent("[ Characters - Given Names ]", "[ Characters - Family Names ]", false);
    let content = "";

    content += "<p><b>Callsign</b>: " + await generateContent("[ Characters - Callsigns ]");
    content += "<p><b>First Look</b>: " + await generateContent("[ Characters - First Looks ]", "[ Characters - First Looks ]");
    if ( Math.floor(Math.random() * 2 ) == 0 ) {
        content += " | " + await generateContent("[ Characters - First Looks ]");
    }
    content += "</p>";
    
    content += "<p><b>Disposition</b>: " + await generateContent("[ Characters - Dispositions ]");
    content += "<p><b>Character Role</b>: " + await generateContent("[ Characters - Roles ]");
    content += "<p><b>Character Goal</b>: " + await generateContent("[ Characters - Goals ]");
    content += "<p><b>Revealed Aspect</b>: " + await generateContent("[ Characters - Revealed Aspects ]");
    if ( Math.floor(Math.random() * 2 ) == 0 ) {
        content += " | " + await generateContent("[ Characters - Revealed Aspects ]");
    }
    if ( Math.floor(Math.random() * 2 ) == 0 ) {
        content += " | " + await generateContent("[ Characters - Revealed Aspects ]");
    }
    content += "</p>";

    await StarforgedActor.create ({
        name: characterName,
        type: "location",
        folder: sector.data.folder,
        data: {
          type: "NPC",
          details: content,
          lastKnown: lastKnown
        }
    });
      
    return;
}

