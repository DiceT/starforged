export async function processDataforged() {

    for (const key of ['starforged.starforged-moves', 'starforged.starforged-assets']) {
        const pack = await game.packs.get(key);
        const idsToDelete = pack.index.map( x => x._id )
        for ( const id of idsToDelete ) {
            const document = await pack.getDocument(id);
            document.delete();
        }
    }
    
    await importMoves();
    await importAssets();

}


function replaceHTML(text){
    let html = text.replace("**", "<strong>");
    html = html.replace("**", "</strong>");
    html = html.replace("**", "<strong>");
    html = html.replace("**", "</strong>");
    html = html.replace(
      /(roll ?)?\+(iron|edge|wits|shadow|heart|health|spirit|supply)/gi,
      '((rollplus $2))'
    ), { gfm: true } ;
    html =  html.replace(
      /\(\(rollplus (.*?)\)\)/g,
      `<a class='entity-link skill-roll' data-value='$1' style='display: inline-block'> <i class="fas fa-dice-d6"></i> Roll +$1</a>`
    );
    html = html.replace(/\u002A/g, "<li>");

    return(html);
}

export async function importAssets() {
    const assetssJson = await fetch('/systems/starforged/dataforged-main/assets.json').then(x => x.json());
  
    const assets = [];
    for ( const asset of assetssJson.Assets ) {
  
      let type = asset.Category;
      let name = "";
      let condition = asset.Description != undefined ? asset.Description : "";
      let special1 = "";
      let special2 = "";
      let ability1 = await replaceHTML(asset.Abilities[0].Text);
      let ability2 = await replaceHTML(asset.Abilities[1].Text);
      let ability3 = await replaceHTML(asset.Abilities[2].Text);
      let trackEnabled = asset.Track != undefined ? true : false;
      let trackMax = trackEnabled ? asset.Track.Value : 5;
      let batteredEnabled = type.includes("Vehicle") ? true : false;
      let cursedEnabled = type.includes("Vehicle") ? true : false;
      let outOfActionEnabled = type.includes("Companion") ? true : false;

      if ( asset.Fields ) {
        for ( const field of asset.Fields ) {
          switch (field) {
            case "Name": name = "Enter Name Here"; break;
            default:
            if ( special1 !== "" ) { special2 = field; }
            else { special1 = field }
          }
        }
      }

      const moves = await game.packs.get('starforged.starforged-moves');
      for ( const move of moves ) {
          let moveName = move.data.name;
          if ( ability1.includes(moveName)) { 
              if ( !ability1.includes("[" + moveName + "]") ) { ability1 = ability1.replace(moveName,"[" + moveName + "]"); }}
          if ( ability2.includes(moveName)) { 
              if ( !ability2.includes("[" + moveName + "]") ) { ability2 = ability2.replace(moveName,"[" + moveName + "]"); }}
          if ( ability3.includes(moveName)) { 
              if ( !ability3.includes("[" + moveName + "]") ) { ability3 = ability3.replace(moveName,"[" + moveName + "]"); }}
      }
  
      assets.push({
        name: asset.Name,
        type: "asset",
        data: {
          type: type,
          name: name,
          condition: condition,
          special1: special1,
          special2: special2,
          abilities: {
            ability1: {
              enabled: true,
              details: ability1
            },
            ability2: {
              enabled: false,
              details: ability2
            },
            ability3: {
              enabled: false,
              details: ability3
            }
          },
          track: {
            enabled: trackEnabled,
            value: trackMax,
            min: 0,
            max: trackMax
          },
          battered: {
            enabled: batteredEnabled,
            value: false
          },
          cursed: {
            enabled: cursedEnabled,
            value: false
          },
          outOfAction: {
            enabled: outOfActionEnabled,
            value: false
          }
        }
      });
    }

    const assetsCompendium = game.packs.get('starforged.starforged-assets')
    for ( const asset of assets ) {
        await assetsCompendium.documentClass.create (
          asset, {pack: assetsCompendium.collection} );
    }

    for ( const asset of assetsCompendium) {
      let ability1 = await replaceMove(asset.data.data.abilities.ability1.details, "");
      let ability2 = await replaceMove(asset.data.data.abilities.ability2.details, "");
      let ability3 = await replaceMove(asset.data.data.abilities.ability3.details, "");

      await asset.update( {
          data: {
              abilities: {
                ability1: { details: ability1 },
                ability2: { details: ability2 },
                ability3: { details: ability3 }
              }
          }
      })
    }
}

export async function importMoves () {
  const movesJson = await fetch('/systems/starforged/dataforged-main/moves.json').then(x => x.json());

  const moves = [];
  for ( const move of movesJson.Moves ) {

    let description = "";
    let strongHit = "";
    let weakHit = "";
    let miss = "";
    let currentLine = "description";

    var lines = move.Text.split('\n');

    for ( let i = 0; i <= lines.length; i++ ) {
        if ( lines[i] != undefined ) {
            if ( lines[i].includes("**strong hit**") ) {
              currentLine = "strong hit";
            }
            else if ( lines[i].includes("**weak hit**") ) {
              currentLine = "weak hit";
            }
            else if ( lines[i].includes("**miss**") ) {
              currentLine = "miss";
            }
                            
            let newLine = "<p>" + replaceHTML(lines[i]).trim() + "</p>";
            let oldLine = currentLine;
            if ( newLine.includes("<p>&nbsp;</p>") || newLine === "<p> </p>" || newLine.includes("|") ) { 
                oldLine = currentLine; 
                currentLine = "skip"; 
            }

            switch ( currentLine ) {
              case "description":
                    description += newLine;
                    break;
                case "strong hit":
                    strongHit += newLine;
                    break;
                case "weak hit":
                    weakHit += newLine;
                    break;
                case "miss":
                    miss += newLine;
                    break;
            }

            currentLine = currentLine === "skip" ? oldLine : currentLine;
        }
    }

    moves.push({
      name: move.Name,
      type: "move",
      moveType: move.Category.substring(0,(move.Category.length - 6)),
      description: description,
      strongHit: strongHit,
      weakHit: weakHit,
      miss: miss
    });

  }

  const movesCompendium = game.packs.get('starforged.starforged-moves')
  for ( const move of moves ) {
      await movesCompendium.documentClass.create ({
          name: move.name,
          type: move.type,
          data: {
            moveType: move.moveType.toLowerCase(),
            description: move.description,
            strongHit: move.strongHit,
            weakHit: move.weakHit,
            miss: move.miss
          }          
      }, {pack: movesCompendium.collection} );
  }

  for ( const move of movesCompendium) {
      let newDescription = await replaceMove(move.data.data.description, move.name);
      let newStrongHit = await replaceMove(move.data.data.strongHit, move.name);
      let newWeakHit = await replaceMove(move.data.data.weakHit, move.name);
      let newMiss = await replaceMove(move.data.data.miss, move.name);

      await move.update( {
          data: {
              description: newDescription,
              strongHit: newStrongHit,
              weakHit: newWeakHit,
              miss: newMiss
          }
      })
  }
}

async function replaceMove(text, moveName){ 
  while ( text.includes("[") ) {
    let start = text.indexOf("[");
    let end = text.indexOf("]") + 1;
    let regEx = text.slice(start, end);

    let move = text.slice(start + 1, end - 1);

    const pack = await game.packs.get('starforged.starforged-moves');
    const packMove = pack.getName(move);
    const name = packMove.name;
    const id = packMove.id;

    const link = `<a class='entity-link' data-pack="starforged.starforged-moves" data-id='` + id + `' style='display: inline-block'><i class="fas fa-suitcase"></i> ` + name + `</a>`

    text = text.replace(regEx, link);

    let remove = "(#" + move + ")";
    while ( remove.includes(" ") ){ remove = remove.replace(" ", "-"); }
    text = text.replace(remove, "");
   
  }

  while ( text.includes("<p></p>")) { text = text.replace("<p></p>", "" ); }
  while ( text.includes("<p>&nbsp;</p>")) { text = text.replace("<p>&nbsp;</p>", "" ); }
  while ( text.includes("</p><p><li>")) { text = text.replace("</p><p><li>", "<li>"); }
  while ( text.includes("(<")) { text = text.replace("(<", "<"); }
  while ( text.includes(">)")) { text = text.replace(">)", ">"); }
  text = text.replace("+edge", "+EDGE");
  text = text.replace("+heart", "+HEART");
  text = text.replace("+iron", "+IRON");
  text = text.replace("+shadow", "+SHADOW");
  text = text.replace("+wits", "+WITS");
  text = text.replace("+health", "+HEALTH");
  text = text.replace("+spirit", "+SPIRIT");
  text = text.replace("+supply", "+SUPPLY");

  if ( text.includes("table below") ) {
    if ( moveName === "Ask the Oracle" ) {
        text += "<p><a class='entity-link' data-entity='Macro' data-id='XuVxjTgsEGmQr44q'><i class='fas fa-terminal'></i> Ask the Oracle - Almost Certain</a></p>";
        text += "<p><a class='entity-link' data-entity='Macro' data-id='xg0tZXwTdrzvaMbB'><i class='fas fa-terminal'></i> Ask the Oracle - Likely</a></p>";
        text += "<p><a class='entity-link' data-entity='Macro' data-id='wasKK2NIAla4EV72'><i class='fas fa-terminal'></i> Ask the Oracle - 50/50</a></p>";
        text += "<p><a class='entity-link' data-entity='Macro' data-id='9Q2yn5Qae0ExvNs3'><i class='fas fa-terminal'></i> Ask the Oracle - Unlikely</a></p>";
        text += "<p><a class='entity-link' data-entity='Macro' data-id='cZHvuImdyVTq1Gqa'><i class='fas fa-terminal'></i> Ask the Oracle - Small Chance</a></p>";
    }
    else if ( moveName === "Repair" ) { }
    else {
        let macro = await game.macros.getName(moveName);
        text += "<p>" + "<a class='entity-link' data-entity='Macro' data-id='" + macro.id + "'><i class='fas fa-terminal'></i> Ask the Oracle - " + moveName + "</a></p>";
    }

  }

  return text;
}
