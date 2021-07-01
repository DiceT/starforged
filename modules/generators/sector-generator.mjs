import { StarforgedActor } from "../documents/actor.mjs";
import { generateContent } from "./core-generator.mjs";

export async function generateSector( sectorLocation = "Random" ) {
    let content = "";
    let sectorName = "Please Rename";

    console.log(sectorLocation);

    sectorName = await generateContent(
        "[ Sectors - Name Prefixes ]", 
        "[ Sectors - Name Suffixes ]", 
        false
    );
    if ( sectorLocation === "Random" ) {
        sectorLocation = await generateContent("Sector Location");
    }

    console.log(sectorLocation);

    content += "<p><b>Stellar Object</b>: " + await generateContent( "[ Stellar Objects ]" ) + "</p>";
    content += "<p><b>Sector Trouble</b>: " + await generateContent( "[ Sector Troubles ]" ) + "</p>";
    content += "<p><b>Spaceborne Peril</b>: " + await generateContent( "[ Spaceborne Perils ]" ) + "</p>";
    content += "<p><b>Spaceborne Opportunity</b>: " + await generateContent( "[ Spaceborne Opportunities ]" ) + "</p>";
    
    // A new folder must still be generated
    let sectorFolder = await Folder.create({
        name: sectorName, 
        type: "Actor", 
        parent: null
    });

    // A new sector must still be generated
    await StarforgedActor.create({ 
        name: sectorName,
        type: "location",
        img: "./systems/starforged/resources/stars/Star 01.png",
        folder: sectorFolder.id,
        data: {
            type: "Sector",
            details: content,
            locationType: sectorLocation,
            lastKnown: sectorLocation
        }
    });

    let background = "Background-Stars-0" + Math.floor(Math.random() * 10 ) + ".png";
    
    // A new scene must still be generated
    if ( game.scenes.getName(sectorName) == undefined ) {
        await Scene.create( {
            name: sectorName,
            backgroundColor: "#000000",
            img: "./systems/starforged/resources/backgrounds/" + background,
            width: 3200, height: 1600, padding: 0, 
            grid: 130, gridType: 2,
            gridColor: "#ffffff", gridAlpha: 0.25,
            gridDistance: 0.5, gridUnits: "LY",
            active: true,
            initial: {
                x: 1646, y: 817, scale: 0.54
            }
        })
    }
}