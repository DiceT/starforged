import { StarforgedActor } from "../documents/actor.mjs";
import { rollFromFolder } from "./core-generator.mjs";

export async function generateSector( sectorLocation = "Random" ) {
    let results = await rollFromFolder( "[ Sectors - Name Prefixes ]", true );
    let sectorName = results.result;
    results = await rollFromFolder( "[ Sectors - Name Suffixes ]", true );
    sectorName += " " + results.result;
    results = await rollFromFolder("Sector Location", true);
    sectorLocation = sectorLocation === "Random" ? results.result : sectorLocation;

    let content = "<h3><p><b>" + sectorLocation + " Sector</b></p></h3>";

    results = await rollFromFolder("[ Stellar Objects ]", true);
    content += "<p><b>" + results.prefix + "</b>: " + results.result;

    let sectorFolder = await Folder.create({
        name: sectorName, 
        type: "Actor", 
        parent: null
    });

    await StarforgedActor.create({ 
        name: sectorName,
        type: "location",
        img: "./systems/starforged/resources/stars/Star 01.png",
        folder: sectorFolder.id,
        token: {
            actorLink: true
        },
        data: {
            type: "Sector",
            details: content,
            locationType: sectorLocation
        }
    });

    let background = "Background-Stars-0" + Math.floor(Math.random() * 10 ) + ".png";
    
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