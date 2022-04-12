import { StarforgedActor } from "../documents/actor.mjs";
import { rollFromFolder } from "./core-generator.mjs";

export async function generateFaction() {
    let sector = await game.actors.getName(await game.scenes.current.data.name);

    let result = await rollFromFolder("Factions - Name Template", true );
    let factionName = result.result;
    result = await rollFromFolder("[ Factions - Affiliations ]");
    console.log(result.result);
    factionName = factionName.replace("[Affiliation]", result.result);
    result = await rollFromFolder("[ Factions - Identities ]");
    factionName = factionName.replace("[Identity]", result.result);
    result = await rollFromFolder("[ Factions - Legacies ]");
    factionName = factionName.replace("[Legacy]", result.result);

    result = await rollFromFolder("Factions - Type", true );
    let content = "<p><b>" + result.result + "</b>: ";

    switch ( result.result ) {
        case "Dominion":
            result = await rollFromFolder("Factions - Dominion", true );
            content += result.result;
            if ( Math.floor(Math.random() * 2 ) == 0 ) {
                result = await rollFromFolder("Factions - Dominion", true );
                content += " | " + result.result;
            }
            break;
        case "Guild":
            result = await rollFromFolder("Factions - Guild", true );
            content += result.result;
            break;
        case "Fringe Group":
            result = await rollFromFolder("Factions - Fringe Group", true );
            content += result.result;
            break;
    }

    content += "</p>";

    await StarforgedActor.create ({
        name: factionName,
        type: "location",
        folder: sector.data.folder,
        token: {
            actorLink: true
        },
        data: {
          type: "Faction",
          details: content
        }
    });
      
    return;
}

