import { StarforgedActor } from "../documents/actor.mjs";

export async function generateStarship() {
    let starshipName = await generateContent( "[ Starships - Names ]" );

    let sector = await game.actors.getName(await game.scenes.current.data.name);
    let location = sector.data.data.locationType;
    let lastKnown = await getLink(sector.id, sector.data.data.type.toLowerCase(), sector.name);

    let starshipImage = "./systems/starforged/resources/starships/starship-02.png";

    let starshipType1 = await generateContent( "[ Starships - Types ]" );
    let starshipType2 = "";
    let content = "";

    if ( starshipType1 == "Fleet" ) {
        starshipType1 =  await generateContent( "[ Starships - Fleets ]" );
        content += "<p><h3><b>Fleet</b>: " + starshipType1 + "</h3></p>";
    }
    else if ( starshipType1 == "Ships in conflict (roll twice)") {
        while ( starshipType1 == "Fleet" || starshipType1 == "Ships in conflict (roll twice)" ) {
            starshipType1 = await generateContent( "[ Starships - Types ]" );
        }
        starshipType2 = "Fleet";

        while ( starshipType2 == "Fleet" || starshipType2 == "Ships in conflict (roll twice)" ) {
            starshipType2 = await generateContent( "[ Starships - Types ]" );
        }

        content += "<p><h3><b>Conflict</b>: " + starshipType1 + " | " + starshipType2 + "</h3></p>";
    }
    else {
        content += "<p><h3><b>Class</b>: " + starshipType1 + "</h3></p>";
    }

    if ( starshipType1 == "Starship Mission" || starshipType1 == "Multipurpose" ) {
        content += "<p><h3><b>Mission</b>: " + await generateContent( "[ Starships - Missions - " + location + " ]" ) + "</h3></p>";
    }

    content += "<p><b>Initial Contact</b>: " + await generateContent( "[ Starships - Initial Contacts ]" ) + "</p>";

    if ( Math.floor(Math.random() * 2) == 0) {
        content += "<p><b>First Look</b>: " + await generateContent( "[ Starships - First Looks ]" ) + "</p>";
    }
      else {;
        content += "<p><b>First Look</b>: " + await generateContent( "[ Starships - First Looks ]", "[ Starships - First Looks ]" ) + "</p>";
    }    

    await StarforgedActor.create ({
      name: starshipName,
      type: "location",
      folder: sector.data.folder,
      img: starshipImage,
      data: {
        type: "Starship",
        details: content,
        lastKnown: lastKnown
      }
    });

    return;
}