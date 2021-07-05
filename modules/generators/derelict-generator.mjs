import { StarforgedActor } from "../documents/actor.mjs";
import { rollFromFolder } from "./core-generator.mjs";

export async function generateDerelict( location ) {
    let sector = await game.actors.getName(await game.scenes.current.data.name);

    let result;
    if ( location == "Random" ) {
        result = await rollFromFolder("Derelict - Location", true);
        location = result.result;
    }

    let derelictType = await rollFromFolder("Derelict - Type - " + location, true);
    let derelictName = "";

    if ( derelictType.result === "Derelict Starship" ) {
        result = await rollFromFolder("[ Starships - Names ]", true);
        derelictName = result.result;
    }
    else { 
        let settlementPrefix = await rollFromFolder("[ Settlements - Name Prefixes ]", true);
        let settlementSuffix = await rollFromFolder("[ Settlements - Name Suffixes ]", true);
        if ( settlementPrefix.result != "" ) {
          settlementPrefix.result += " ";
          settlementSuffix.result = "";
        }
        if ( settlementSuffix.result != "" ) {
          settlementSuffix.result = " " + settlementSuffix.result;
        }
        result = await rollFromFolder("[ Settlements - Names ]", true)
        derelictName = settlementPrefix.result + result.result + settlementSuffix.result;
    }
    
    let content = "<p><h3>Derelict " + derelictType.result + " - " + location + "</h3></p>";

    result = await rollFromFolder("[ Derelicts - Conditions ]", true)
    content += "<p><b>" + result.prefix + "</b>: " + result.result + "</p>";
    result = await rollFromFolder("[ Derelicts - Outer First Looks ]", true)
    content += "<p><b>" + result.prefix + "</b>: " + result.result + "</p>";
    let notes = "<p><i>It is recommended to create a new scene so you can explore the derelict with the provided tools and the ability to flowchart/map your progress.</i></p>";

    let derelictImage = "./systems/starforged/resources/settlements/Derelict - " + location +".png";

    await StarforgedActor.create ({
        name: derelictName,
        type: "location",
        folder: sector.data.folder,
        img: derelictImage,
        data: {
          type: "Derelict",
          locationType: derelictType.result,
          details: content,
          notes: notes
        }
    });
      
    return;
}
