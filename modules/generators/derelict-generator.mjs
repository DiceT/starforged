import { StarforgedActor } from "../documents/actor.mjs";
import { getLink } from "./core-generator.mjs";
import { generateContent } from "./core-generator.mjs";


export async function generateDerelict( location ) {
    let sector = await game.actors.getName(await game.scenes.current.data.name);
    let lastKnown = await getLink(sector.id, sector.data.data.type.toLowerCase(), sector.name);

    if ( location == "Random" ) {
        location = await generateContent("Derelicts - Location");
    }

    let derelictType = await generateContent("Derelicts - Type - " + location)
    let derelictName = "";
    let tint;

    if ( derelictType == "Derelict Starship" ) {
        derelictName = await generateContent("[ Starships - Names ]");
        tint = "#ff66ff";
    }
    else {
        let settlementPrefix = await generateContent("[ Settlements - Name Prefixes ]");
        let settlementSuffix = await generateContent("[ Settlements - Name Suffixes ]");
        if ( settlementPrefix != "" ) {
          settlementPrefix += " ";
          settlementSuffix = "";
        }
        if ( settlementSuffix != "" ) {
          settlementSuffix = " " + settlementSuffix;
        }
        derelictName = settlementPrefix + await generateContent("[ Settlements - Names ]") + settlementSuffix;
        tint = "#ffff66";
    }
    
    let content = "<p><h3>" + derelictType + " - " + location + "</h3></p>";
    content += "<p><b>Condition</b>: " + await generateContent("[ Derelicts - Conditions ]") + "</p>";
    content += "<p><b>Outer First Look</b>: " + await generateContent("[ Derelicts - Outer First Looks ]") + "</p>";
    if ( Math.floor(Math.random() * 2 ) == 0 ) {
        content += "<p><b>Inner First Look</b>: " + await generateContent("[ Derelicts - Inner First Looks ]") + "</p>";
    }
    else {
        content += "<p><b>Inner First Look</b>: " + await generateContent("[ Derelicts - Inner First Looks ]", "[ Derelicts - Inner First Looks ]") + "</p>";
    }
    content += "<p><i>It is recommended to create a new scene so you can explore the derelict with the provided tools and the ability to flowchart/map your progress.</i></p>";

    let derelictImage = "./systems/starforged/resources/settlements/Derelict - " + location +".png";

    await StarforgedActor.create ({
        name: derelictName,
        type: "location",
        folder: sector.data.folder,
        img: derelictImage,
        tint: tint,
        data: {
          type: "Derelict",
          locationType: derelictType,
          details: content,
          lastKnown: lastKnown
        }
    });
      
    return;
}