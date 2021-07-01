import { StarforgedActor } from "../documents/actor.mjs";

export async function rollFromFolder( folder1, folder2 = null) {
    let tables = await game.folders.getName(folder1);
    let table;
  
    if ( tables == undefined ) {
      table = await game.tables.getName(folder1);
    }
    // If it is the name of the folder, choose a table at random to roll from
    else {
      table = await tables.content[Math.floor(Math.random() * tables.content.length)];
    }
    await table.draw();
  
    if ( folder2 != null ) {
      tables = null;
      table = null;
      tables = await game.folders.getName(folder2);
  
      if ( tables == undefined ) {
        table = await game.tables.getName(folder1);
      }
      // If it is the name of the folder, choose a table at random to roll from
      else {
        table = await tables.content[Math.floor(Math.random() * tables.content.length)];
      }
      await table.draw(); 
    }
}

export async function getLink( sourceID, sourceType, sourceName ) {
  let link;


  if ( sourceType == "planet" || sourceType == "settlement" || sourceType == "starship" || sourceType == "sector") {
    link = "@Actor[" + sourceID + "]{" + sourceName + "}";
  }
  if ( sourceType == "connection" ) {
    link = "@Item[" + sourceID + "]{" + sourceName + "}";
  }
  return link;
}

// get 1, 2, or 3 results from all tables within 1 or 2 folders
export async function generateContent( folder1, folder2 = null, separator = true) {
  let tables = await game.folders.getName(folder1);
  let table;


  // If it is not the name of a folder, then it is the name of a table
  if ( tables == undefined ) {
    table = await game.tables.getName(folder1);
  }
  // If it is the name of the folder, choose a table at random to roll from
  else {
    table = await tables.content[Math.floor(Math.random() * tables.content.length)];
  }

  let roll = await table.roll();
  let result1 = await roll.results[0].data.text;
  
  let result2 = "";
  let result3 = ""; //some tables instruct to roll three times
  let separator1 = "";
  let separator2 = "";

  if ( folder2 != null ) {
    // If it is not the name of a folder, then it is the name of a table
    tables = null;
    tables = await game.folders.getName(folder2);
    if ( tables == undefined ) {
      table = null;
      table = await game.tables.getName(folder2);
    }
    // If it is the name of the folder, choose a table at random to roll from
    else {
      table = await tables.content[Math.floor(Math.random() * tables.content.length)];
    }
    roll = await table.roll();
    result2 = await roll.results[0].data.text;
    separator1 = " | ";
  }

  let counter = 0;
  if ( result1.toLowerCase() == "roll twice" || result2.toLowerCase() == "roll twice" ) {
    result1 = "roll twice";
    result2 = "roll twice";
    counter = 2;
  }
  if ( result1.toLowerCase() == "roll three times" || result2.toLowerCase() == "roll three times" ) {
    result1 = "roll twice";
    result2 = "roll twice";
    result3 = "roll twice";
    counter = 3;
  }
  if ( counter > 0 ) {
    do { result1 = await generateContent(folder1); }
    while ( result1.toLowerCase() == "roll twice");

    do { result2 = await generateContent(folder1); }
    while ( result2.toLowerCase() == "roll twice");

    if ( counter == 3 ) {
      do { result3 = await generateContent(folder1); }
      while ( result3.toLowerCase() == "roll twice");
    }
    if ( result1 == result2 && result1 == result3 ) {
      result2 = "(overly abundant)";
      result3 = "";
      separator1 = " ";
      separator2 = "";
    }
    else if ( result1 == result2 ) {
      result2 = "(abundant)";
      separator1 = " ";
      separator2 = " | ";
    }
    else if ( result1 == result3 ) {
      result3 = result2;
      result2 = "(abundant)";
      separator1 = " ";
      separator2 = " | ";
    }
    else if ( result2 == result3 ) {
      result3 = result1;
      result1 = result2;
      result2 = "(abundant)";
      separator1 = " ";
      separator2 = " | ";
    }
  }

  if ( result1.toLowerCase() == "action + theme") {
    result1 = "[A+T] " + await generateContent( "[ Actions ]", "[ Themes ]", false);
  }
  if ( result2.toLowerCase() == "action + theme") {
    result2 = "[A+T] " + await generateContent( "[ Actions ]", "[ Themes ]", false);
  }
  if ( result3.toLowerCase() == "action + theme") {
    result3 = "[A+T] " + await generateContent( "[ Actions ]", "[ Themes ]", false);
  }

  if ( result1.toLowerCase() == "descriptor + focus" ) {
    result1 = "[D+F] " + await generateContent( "[ Descriptors ]", "[ Foci ]", false);
  }
  if ( result2.toLowerCase() == "descriptor + focus" ) {
    result2 = "[D+F] " + await generateContent( "[ Descriptors ]", "[ Foci ]", false);
  }
  if ( result3.toLowerCase() == "descriptor + focus" ) {
    result3 = "[D+F] " + await generateContent( "[ Descriptors ]", "[ Foci ]", false);
  }

  if ( separator == false ) {
    separator1 = " ";
    separator2 = "";
  }

  let content = result1 + separator1 + result2 + separator2 + result3;
  
  return content;
}