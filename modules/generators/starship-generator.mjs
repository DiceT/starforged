import { StarforgedActor } from "../documents/actor.mjs";
import { rollFromFolder } from "./core-generator.mjs";

export async function generateStarship() {
    let sector = await game.actors.getName(await game.scenes.current.data.name);
    let location = sector.data.data.locationType;
    let starshipImage = "./systems/starforged/resources/starships/starship-02.png";

    let starshipName = await rollFromFolder( "[ Starships - Names ]", true );
    let starshipType1 = await rollFromFolder( "[ Starships - Types ]", true );
    let starshipType2 = await rollFromFolder( "[ Starships - Types ]", true );
    starshipType1 = await extractStarshipRole( starshipType1 );
    starshipType2 = await extractStarshipRole( starshipType2 );

    let content = "";
    if ( starshipType1.result === "Fleet" ) {
        starshipType1 =  await rollFromFolder( "[ Starships - Fleets ]", true );
        content += "<p><h3><b>Fleet</b>: " + starshipType1.result + "</h3></p>";
        starshipName.result = starshipType1.result;
    }
    else if ( starshipType1.result === "Ships in conflict (roll twice)") {
        while ( starshipType1.result === "Fleet" || starshipType1.result === "Ships in conflict (roll twice)" ) {
            starshipType1 = await rollFromFolder( "[ Starships - Types ]", true );
            starshipType1 = await extractStarshipRole(starshipType1);
        }
        while ( starshipType2.result === "Fleet" || starshipType2.result === "Ships in conflict (roll twice)" ) {
            starshipType2 = await rollFromFolder( "[ Starships - Types ]", true );
            starshipType2 = await extractStarshipRole(starshipType2);
        }
        content += "<p><h3><b>Conflict</b>: " + starshipType1.result + " | " + starshipType2.result + "</h3></p>";
    }
    else {
        content += "<p><h3><b>Class</b>: " + starshipType1.result + "</h3></p>";
        content += "<p><b>Typical Role</b>: " + starshipType1.prefix + "</p>";
    }

    let result = await rollFromFolder( "[ Starships - First Looks ]", true );
    content += "<p><b>" + result.prefix + "</b>: " + result.result;
    if (Math.floor(Math.random() * 2) == 0 ) {
        result = await rollFromFolder( "[ Starships - First Looks ]", true );
        content += " | " + result.result;
    }
    content += "</p>";

    await StarforgedActor.create ({
      name: starshipName.result,
      type: "location",
      folder: sector.data.folder,
      img: starshipImage,
      token: {
        actorLink: true
    },
  data: {
        type: "Starship",
        details: content,
      }
    });

    return;
}

export async function extractStarshipRole( starshipType ) {
    if ( starshipType.result.includes("|")) {
        let pointer = starshipType.result.indexOf("|");
        starshipType.prefix = starshipType.result.substring(pointer + 1, starshipType.result.length);
        starshipType.result = starshipType.result.substring(0, pointer );
    }
    return starshipType;
}