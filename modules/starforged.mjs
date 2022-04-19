import { STARFORGED } from "./helpers/config.mjs";

// Documents extend a base object for data access and abstraction
import { StarforgedActor } from "./documents/actor.mjs";
import { StarforgedItem } from "./documents/item.mjs";

// Sheets extend base sheets, which are the actual data representation of an object and their visual component (i.e. character sheet)
import { StarforgedCharacterSheet } from "./sheets/actor/character-sheet.mjs";
import { StarforgedDashboardSheet } from "./sheets/actor/dashboard-sheet.mjs";
import { StarforgedDashboardPlusSheet } from "./sheets/actor/dashboard-plus-sheet.mjs";
import { StarforgedLocationSheet } from "./sheets/actor/location-sheet.mjs";
import { StarforgedChallengeSheet } from "./sheets/item/challenge-sheet.mjs";
import { StarforgedAssetSheet } from "./sheets/item/asset-sheet.mjs";
import { StarforgedMoveSheet } from "./sheets/item/move-sheet.mjs";

// import { StarforgedJournalSheet } from "./sheets/journal-sheet.mjs";

// Helpers are all scripts, functions and other various objects that are used "behind the scenes"
import { loadPartials } from "./helpers/load-partials.mjs";
import { initializeHandlebars } from "./helpers/handlebars.mjs";
import { initializeFolders, initializeRollTables } from "./helpers/initialization.mjs"
import { processDataforged } from "./dataforged.mjs";



/*  -----------------------------------------------
*    INIT HOOK
*   ---------------------------------------------*/
Hooks.once('init', function() {

    // This is making our Documents more easiliy acccible through the game.starforged object
    game.starforged = {
        StarforgedActor,
        StarforgedItem,
        processDataforged
      };

    // CONFIG definitions
    CONFIG.Actor.documentClass = StarforgedActor;
    CONFIG.Item.documentClass = StarforgedItem;
    CONFIG.STARFORGED = STARFORGED;
    CONFIG.Dice.template = 'systems/starforged/templates/partials/roll.hbs';

    // Unregister Sheets
    Actors.unregisterSheet("core", ActorSheet);
    Items.unregisterSheet("core", ItemSheet);


    // Register Starforged Sheets
    Actors.registerSheet("starforged", StarforgedCharacterSheet, { types: ["character"], makeDefault: true });
    Actors.registerSheet("starforged", StarforgedDashboardSheet, { types: ["character"], makeDefault: true });
    Actors.registerSheet("starforged", StarforgedDashboardPlusSheet, { types: ["character"], makeDefault: true });
    Actors.registerSheet("starforged", StarforgedLocationSheet, { types: ["location"], makeDefault: true });
    Items.registerSheet("starforged", StarforgedChallengeSheet, { types: ["challenge"], makeDefault: true } );
    Items.registerSheet("starforged", StarforgedAssetSheet, { types: ["asset"], makeDefault: true } );
    Items.registerSheet("starforged", StarforgedMoveSheet, { types: ["move"], makeDefault: true } );

    loadPartials();
    initializeHandlebars();
    return;
});

Hooks.on("init", () => {
  //CONFIG.TinyMCE.toolbar = "code styleselect bullist table hr save"; //styleselect bullist image table hr 
  CONFIG.TinyMCE.content_css = "systems/starforged/css/settings/mci.css";
});

/*  -----------------------------------------------
*    READY HOOK
*   ---------------------------------------------*/
Hooks.once("ready", async() => {
    // This is reserved for things that need to happen right after Foundry fully loads (after init).
    await initializeFolders();
    await processDataforged();

    await initializeRollTables();
    return;
});


// Things to do when a character is created
Hooks.on('createActor', async (actor, options, id) => {
  // Prepare updates object.
  let updates = {};

  // Add starting Legacies and Background Vow
  if (actor.data.type == 'character') {
    let legacies = game.items.filter( i => i.type == "challenge" && ( i.data.data.type == "legacy" || i.data.data.typ == "backgroundVow" ) );
    let pack = game.packs.get("starforged.legacies");
    let compendium = pack ? await pack.getDocuments() : [];
    const actorLegacies = actor.data.items.filter( i => i.data.data.type == "legacy" || i.data.data.typ == "backgroundVow" );

    let legacies_compendium = compendium.filter( l => {
      const notPresent = actorLegacies.filter( i => i.name == l.name );
      return notPresent.length < 1;
    });

    let legacies_list = legacies.map( l => {
      return l.data.name;
    });

    for ( let legacy of legacies_compendium ) {
      if (!legacies_list.includes( legacy.data.name) ) {
        legacies.push(legacy);
        legacies_list.push(legacy.data.name);
      }
    }

    let moves = game.items.filter( i => i.type == "move" );
    pack = game.packs.get("starforged.starforged-moves");
    compendium = pack ? await pack.getDocuments() : [];
    const actorMoves = actor.data.items.filter( i => i.data.data.type == "move" );

    let moves_compendium = compendium.filter( l => {
      const notPresent = actorMoves.filter( i => i.name == l.name );
      return notPresent.length < 1;
    });

    let moves_list = moves.map( l => {
      return l.data.name;
    });

    for ( let move of moves_compendium ) {
      if (!moves_list.includes( move.data.name) ) {
        moves.push(move);
        moves_list.push(move.data.name);
      }
    }

    // Link token
    updates['token.actorLink'] = true;

    const legaciesToAdd = legacies.map( l => duplicate(l) );
    await actor.createEmbeddedDocuments('Item', legaciesToAdd, {});    

    const movesToAdd = moves.map( l => duplicate(l) );
    await actor.createEmbeddedDocuments('Item', movesToAdd, {});

  }
});


/*  -----------------------------------------------
*    SETUP HOOK
*   ---------------------------------------------*/
Hooks.once('setup', () => {
    Roll.prototype.render = async function (chatOptions = {}) {

      chatOptions = mergeObject(
        {
          user: game.user.id,
          flavor: null,
          template: CONFIG.Dice.template,
          blind: false
        },
        chatOptions
      )
      const isPrivate = chatOptions.isPrivate
      // Execute the roll, if needed
      if (!this._evaluated) await this.evaluate()
      // Define chat data
      const chatData = {
        formula: isPrivate ? '???' : this.formula,
        roll: this, // this is new
        flavor: isPrivate ? null : chatOptions.flavor,
        user: chatOptions.user,
        tooltip: isPrivate ? '' : await this.getTooltip(),
        total: isPrivate ? '?' : Math.round(this.total * 100) / 100
      }

      // Render the roll display template
      return renderTemplate(chatOptions.template, chatData)
    }
  });