export async function processDataforged() {

    let compendium;
    for (const key of ['starforged.starforged-moves']) {
        const pack = await game.packs.get(key);
        compendium = pack;
        const idsToDelete = pack.index.map( x => x._id )
        for ( const id of idsToDelete ) {
            const document = await pack.getDocument(id);
            document.delete();
        }
    }

    console.log(compendium);

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
          console.log(moveName);
          let macro = await game.macros.getName(moveName);
          text += "<p>" + "<a class='entity-link' data-entity='Macro' data-id='" + macro.id + "'><i class='fas fa-terminal'></i> Ask the Oracle - " + moveName + "</a></p>";
      }

    }

    return text;
}

function replaceHTML(text){
    let html = text.replace(" * ", "<li>");
    html = html.replace("**", "<strong>");
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

    return(html);
}

export async function importFromDataforged () {
    // Empty out the packs
    for (const key of ['starforged.starforged-moves', 'starforged.starforged-assets']) {
        const pack = await game.packs.get(key);
        const idsToDelete = pack.index.map( x => x._id )
        for ( const id of idsToDelete ) {
            const document = await pack.getDocument(id);
            document.delete();
        }
    }
  
    // Moves
    const movesCompendium = game.packs.get('starforged.starforged-moves')
    const movesJson = await fetch('/systems/starforged/dataforged-main/moves.json').then(x => x.json())

    for (const move of movesJson.Moves) {
      await movesCompendium.documentClass.create ({
        name: move.Name,
        type: 'move',
        ...move
      }, {pack: movesCompendium.collection} );
    }

    // Assets
    const assetsCompendium = game.packs.get('starforged.starforged-assets')
    const assetsJson = await fetch('/systems/starforged/dataforged-main/assets.json').then(x => x.json())

    for (const asset of assetsJson.Assets) {
      await assetsCompendium.documentClass.create ({
        name: asset.Name,
        type: 'asset',
        ...asset
      }, {pack: assetsCompendium.collection} );
    }
}