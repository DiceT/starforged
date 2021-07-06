import { rollChallenge, rollFulfillChallenge } from "../../helpers/skill-rolls.mjs";
import { rollFromFolder } from "../../generators/core-generator.mjs";

/**
 * @extends {ActorSheet}
 */

export class StarforgedCharacterSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["starforged"],
            template: "systems/starforged/templates/actor/character-sheet.hbs",
            width: 690,
            height: 800,
            resizable: false,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "legacies" }]
        });
    }

    /** @override */
    get template() {
        return "systems/starforged/templates/actor/character-sheet.hbs";
    }
    
    /** ------------------------------------------------------------------ */

    /** @override */
    getData() {
        // Retrieve the data structure from the base sheet
        const context = super.getData();
        
        // Clone of the actor data for safe operations
        const actorData = context.actor.data;

        // Add actor data to context data for easier access, and flags
        context.data = actorData.data;
        context.flags = actorData.flags;

        // Prepare character data and items
        if ( actorData.type == 'character' ) {
            this._prepareCharacterItems(context);
            this._prepareCharacterData(context);
        }

        // Prepare location data and items
        if ( actorData.type == "location" ) {
            this._prepareLocationItems(context);
            this._prepareLocationData(context);
        }

        // Add roll data for TinyMCE editors
        context.RollData = context.actor.getRollData();

        return context;
    }

    /**
     * @param {Object} actorData to prepare
     * 
     * @return {undefined}
     */
    _prepareCharacterItems(context) {
        const legacies = [];
        const backgroundVows = [];
        const vows = [];
        const combats = [];
        const connections = [];
        const expeditions = [];
        const derelicts = [];
        const precursors = [];
        const vowsCompleted = [];
        const combatsCompleted = [];
        const connectionsCompleted = [];
        const expeditionsCompleted = [];
        const derelictsCompleted = [];
        const precursorsCompleted = [];
        const assets = [];
        let movesAdventure = [];
        let movesQuest = [];
        let movesConnection = [];
        let movesExploration = [];
        let movesCombat = [];
        let movesSuffer = [];
        let movesThreshold = [];
        let movesRecover = [];
        let movesLegacy = [];
        let movesFate = [];


        for ( let i of context.items ) {
            if ( i.type === "challenge" && i.data.type === "legacy" ) {
                legacies.push(i);
            }
            else if ( i.type === "challenge" && i.data.type === "backgroundVow" ) {
                backgroundVows.push(i);
            }
            else if ( i.type === "challenge" && i.data.type === "vow" && i.data.completed === false ) {
                vows.push(i);
            }
            else if ( i.type === "challenge" && i.data.type === "combat" && i.data.completed === false ) {
                combats.push(i);
            }
            else if ( i.type === "challenge" && i.data.type === "connection" && i.data.completed === false ) {
                connections.push(i);
            }
            else if ( i.type === "challenge" && i.data.type === "expedition" && i.data.completed === false ) {
                expeditions.push(i);
            }
            else if ( i.type === "challenge" && i.data.type === "derelict" && i.data.completed === false ) {
                derelicts.push(i);
            }
            else if ( i.type === "challenge" && i.data.type === "precursor" && i.data.completed === false ) {
                precursors.push(i);
            }
            else if ( i.type === "challenge" && i.data.type === "vow" && i.data.completed === true ) {
                vowsCompleted.push(i);
            }
            else if ( i.type === "challenge" && i.data.type === "combat" && i.data.completed === true ) {
                combatsCompleted.push(i);
            }
            else if ( i.type === "challenge" && i.data.type === "connection" && i.data.completed === true ) {
                connectionsCompleted.push(i);
            }
            else if ( i.type === "challenge" && i.data.type === "expedition" && i.data.completed === true ) {
                expeditionsCompleted.push(i);
            }
            else if ( i.type === "challenge" && i.data.type === "derelict" && i.data.completed === true ) {
                derelictsCompleted.push(i);
            }
            else if ( i.type === "challenge" && i.data.type === "precursor" && i.data.completed === true ) {
                precursorsCompleted.push(i);
            }
            else if ( i.type === "asset" ) {
                assets.push(i);
            }
            else if ( i.type === "move" && i.data.moveType === "adventure") {
                movesAdventure.push(i);
            }
            else if ( i.type === "move" && i.data.moveType === "quest") {
                movesQuest.push(i);
            }
            else if ( i.type === "move" && i.data.moveType === "connection") {
                movesConnection.push(i);
            }
            else if ( i.type === "move" && i.data.moveType === "exploration") {
                movesExploration.push(i);
            }
            else if ( i.type === "move" && i.data.moveType === "combat") {
                movesCombat.push(i);
            }
            else if ( i.type === "move" && i.data.moveType === "suffer") {
                movesSuffer.push(i);
            }
            else if ( i.type === "move" && i.data.moveType === "threshold") {
                movesThreshold.push(i);
            }
            else if ( i.type === "move" && i.data.moveType === "recover") {
                movesRecover.push(i);
            }
            else if ( i.type === "move" && i.data.moveType === "legacy") {
                movesLegacy.push(i);
            }
            else if ( i.type === "move" && i.data.moveType === "fate") {
                movesFate.push(i);
            }
        }

        context.legacies = legacies;
        context.backgroundVows = backgroundVows;
        context.vows = vows;
        context.combats = combats;
        context.connections = connections;
        context.expeditions = expeditions;
        context.derelicts = derelicts;
        context.precursors = precursors;
        context.vowsCompleted = vowsCompleted;
        context.combatsCompleted = combatsCompleted;
        context.connectionsCompleted = connectionsCompleted;
        context.expeditionsCompleted = expeditionsCompleted;
        context.derelictsCompleted = derelictsCompleted;
        context.precursorsCompleted = precursorsCompleted;
        context.assets = assets;
        context.movesAdventure = movesAdventure;
        context.movesQuest = movesQuest;
        context.movesConnection = movesConnection;
        context.movesExploration = movesExploration;
        context.movesCombat = movesCombat;
        context.movesSuffer = movesSuffer;
        context.movesThreshold = movesThreshold;
        context.movesRecover = movesRecover;
        context.movesLegacy = movesLegacy;
        context.movesFate = movesFate;

        let xp = 0;
        for ( let i of context.legacies ) {
            if ( i.data.progress >= 10 ) {
                i.data.plusTen = true;
                xp += 20 + ( parseInt(i.data.progress) - 10 );
            }
            else {
                xp += parseInt(i.data.progress) * 2;
                i.data.plusTen = false;
            }
        }
        context.xp = xp;

        return context;
    }

    /**
     * @param {Object} actorData to prepare
     * 
     * @return {undefined}
     */
    _prepareCharacterData(context) {

    }

    /**
     * @param {Object} actorData to prepare
     * 
     * @return {undefined}
     */
     _prepareLocationData(context) {

    }

    /**
     * @param {Object} actorData to prepare
     * 
     * @return {undefined}
     */
     _prepareLocationItems(context) {

    }    
    
    /** ------------------------------------------------------------------ */
    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Generators
        html.find('.roll-generator').click(this._onRollGenerator.bind(this));

        // Show/Hide details of moves (items?)
        // html.find('.collapsible').click(this._showItemDetails.bind(this));

        // Stat Recorder Toggle
        html.find('.record-stats').click(this._onRecordStats.bind(this));

        // Oracle Rolls
        html.find('.roll-from-folder').click(this._onRollFromFolder.bind(this));

        // Actions / Rolls / Adjustments - Listeners
        html.find('.skill-roll').click(this._onSkillRoll.bind(this));
        html.find('.momentum-burn').click(this._onMomentumBurn.bind(this));
        html.find('.plus-one').click(this._onPlusOne.bind(this));
        html.find('.minus-one').click(this._onMinusOne.bind(this));
        html.find('.roll-bonus').click(this._onRollBonus.bind(this));

        // Progress Tracks
        html.find('.mark-progress').click(this._onMarkProgressClick.bind(this));
        html.find('.clear-progress').click(this._onClearProgressClick.bind(this));
        html.find('.fulfill-progress').click(this._onFulfillProgressClick.bind(this));
        html.find('.complete-progress').click(this._onCompleteProgressClick.bind(this));

        // Impact Toggles
        html.find('.impact-enabled').click(this._onImpactEnabled.bind(this));
 
            // Owned Item management
        html.find('.item-create').click(this._onItemCreate.bind(this));
        html.find('.item-edit').click(this._onItemEdit.bind(this));
        html.find('.item-delete').click(this._onItemDelete.bind(this));

        html.find('.asset-track-value').click(this._onAssetTrackValue.bind(this));
    }
    /** ------------------------------------------------------------------ */

    async _onAssetTrackValue(event) {
        event.preventDefault();
        let value = event.currentTarget.getAttribute('data-value');
        const li = event.currentTarget.closest(".item");
        const item = this.actor.items.get(li.dataset.itemId);

        await item.update({ data: { "track": { "value": value } } } );
    
        return;
    }

  /* -------------------------------------------- */
  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
   async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    const type = header.dataset.type;
    const name = type.capitalize();
    const itemData = {
      name: name,
      type: type,
      data: { "type": "vow" }
    };
    await this.actor.createEmbeddedDocuments('Item', [itemData], {});
  }

  /* -------------------------------------------- */

  /**
   * Handle editing an existing Owned Item for the Actor
   * @param {Event} event   The originating click event
   * @private
   */
  _onItemEdit(event) {
    event.preventDefault();
    const li = event.currentTarget.closest(".item");
    const item = this.actor.items.get(li.dataset.itemId);
    item.sheet.render(true);
  }

  /* -------------------------------------------- */

  /**
   * Handle deleting an existing Owned Item for the Actor
   * @param {Event} event   The originating click event
   * @private
   */
  _onItemDelete(event) {
    event.preventDefault();
    const li = event.currentTarget.closest(".item");
    let item = this.actor.items.get(li.dataset.itemId);
    item.delete();
  }

  /* -------------------------------------------- */

    
    async _onImpactEnabled(event) {
        let impact = event.currentTarget.getAttribute('data-impact');
        let impactValue = event.currentTarget.getAttribute('data-value');

        if ( impactValue === true || impactValue === "true") { impactValue = false; }
        else if ( impactValue === false || impactValue === "false" ) { impactValue = true; }

        let data = { 
            data: {
                "impacts": {
                    [impact]: impactValue
                }
            }
        };
        
        await this.actor.update(data);
      
        return;
    }

    async _onRecordStats(event) {
        let statisticsEnabled = this.object.data.data.statistics.enabled;
        if ( statisticsEnabled == true ) { 
            statisticsEnabled = false; 
        }
        else { 
            statisticsEnabled = true; 
        }
        await this.actor.update({
            data: {
                "statistics": {
                    "enabled": statisticsEnabled
                }
            }
        });
    }

    /** ------------------------------------------------------------------ */

    async _onRollFromFolder(event) {
        let folder1 = event.currentTarget.getAttribute('data-folder1');
        let folder2 = event.currentTarget.getAttribute('data-folder2');
        rollFromFolder(folder1, false);
        if ( folder2 ) { rollFromFolder(folder2, false); }
    }

    /** ------------------------------------------------------------------ */
    async _onFulfillProgressClick(event) {
        let progress = event.currentTarget.getAttribute('data-value');

        rollFulfillChallenge(progress, this.actor.id);
    }

    async _onSkillRoll(event) {
        let attribute = event.currentTarget.getAttribute('data-value');
        let score = 0;
      
        switch ( attribute ) {
          case "edge": score = await this.object.data.data.abilities.edge; break;
          case "heart": score = await this.object.data.data.abilities.heart; break;
          case "iron": score = await this.object.data.data.abilities.iron; break;
          case "shadow": score = await this.object.data.data.abilities.shadow; break;
          case "wits": score = await this.object.data.data.abilities.wits; break;
      
          case "health": score = await this.object.data.data.health.value; break;
          case "spirit": score = await this.object.data.data.spirit.value; break;
          case "supply": score = await this.object.data.data.supply.value; break;
        }

        
        rollChallenge(attribute, score, this.object.data.data.rollBonus, this.object.data.data.momentum.value, this.actor.id);
        
        this.actor.update({ data: { "rollBonus": 0 }});
    }
    async _onMomentumBurn(event) {

        if ( this.actor.data.data.momentum.value > 0 ) {
            await this.actor.update({
                data: {
                    "momentum": {
                        "value": this.actor.data.data.momentumReset
                    },
                    "statistics": {
                        "burnMomentum": this.actor.data.data.statistics.burnMomentum + 1
                    }
                }
            });
        }
        else {
            await this.actor.update({
                data: {
                    "momentum": {
                        "value": this.actor.data.data.momentumReset
                    },
                    "statistics": {
                        "negativeMomentum": this.actor.data.data.statistics.negativeMomentum + 1
                    }
                }
            });
        }
    }

    async _onPlusOne(event) {
        let attribute = event.currentTarget.getAttribute('data-value');
        let score = parseInt(event.currentTarget.getAttribute('data-score'));
      
        switch ( attribute ) {
            case "momentum":
                if ( score < this.actor.data.data.momentumMax ) {
                    this.actor.update({ 
                        data: { 
                            "momentum": { "value": score + 1 } 
                        } 
                    });
                }
                break;
            case "health":
                if ( score < 5 ) {
                    this.actor.update({ 
                        data: { 
                            "health": { "value": score + 1 } 
                        } 
                    });
                }
                break;
            case "spirit":
                if ( score < 5 ) {
                    this.actor.update({ 
                        data: { 
                            "spirit": { "value": score + 1 } 
                        } 
                    });
                }
                break;
            case "supply":
                if ( score < 5 ) {
                    this.actor.update({ 
                        data: { 
                            "supply": { "value": score + 1 } 
                        } 
                    });
                }
                break;
            case "xpSpent":
                if ( this.actor.data.data.xpSpent < score ) {
                    this.actor.update({ 
                        data: { 
                            "xpSpent": this.actor.data.data.xpSpent + 1
                        } 
                    });
                }
                break;
        }
    }
    async _onMinusOne(event) {
        let attribute = event.currentTarget.getAttribute('data-value');
        let score = parseInt(event.currentTarget.getAttribute('data-score'));
      
        switch ( attribute ) {
            case "momentum":
                if ( score > -6 ) {
                    this.actor.update({ 
                        data: { 
                            "momentum": { "value": score - 1 } 
                        } 
                    });
                }
                break;
            case "health":
                if ( score > 0 ) {
                    this.actor.update({ 
                        data: { 
                            "health": { "value": score - 1 } 
                        } 
                    });
                }
                break;
            case "spirit":
                if ( score > 0 ) {
                    this.actor.update({ 
                        data: { 
                            "spirit": { "value": score - 1 } 
                        } 
                    });
                }
                break;
            case "supply":
                if ( score > 0 ) {
                    this.actor.update({ 
                        data: { 
                            "supply": { "value": score - 1 } 
                        } 
                    });
                }
                break;
            case "xpSpent":
                if ( this.actor.data.data.xpSpent > 0 ) {
                    this.actor.update({ 
                        data: { 
                            "xpSpent": this.actor.data.data.xpSpent - 1
                        } 
                    });
                }
                break;
        }    
    }
    async _onRollBonus(event) {
        let rollBonus = event.currentTarget.getAttribute('data-resource');
        this.actor.update({
          data: {
            "rollBonus": parseInt(rollBonus)
          }
        });
    }
    /** ------------------------------------------------------------------ */

    async _onRollGenerator(event) {
        event.preventDefault();
        let generator = event.currentTarget.getAttribute('data-generator');
        let type = event.currentTarget.getAttribute('data-type');

        switch ( generator ) {
            case "Sector": { generateSector(type); break; }


            case "YourTruths": {
                if ( game.folders.getName("Your Truths") == undefined ) { generateYourTruths(); }
                break;
            }
            
        }

        return;
    }

    async _onClearProgressClick(event) {
        const itemID = event.currentTarget.getAttribute('data-item-id');
        const item = this.actor.items.get(itemID);

        await item.update({ data: { "progress": 0 }});
        return;
    }

    async _onMarkProgressClick(event) {
        event.preventDefault();
        const itemID = event.currentTarget.getAttribute('data-item-id');
        const item = this.actor.items.get(itemID);

        let difficulty = item.data.data.difficulty;
        let currentProgress = item.data.data.progress;
        let increment = 3;

        if (difficulty == "Troublesome") { increment = 3 };
        if (difficulty == "Dangerous") { increment = 2 };
        if (difficulty == "Formidable") { increment = 1 };
        if (difficulty == "Extreme") { increment = .5 };
        if (difficulty == "Epic") { increment = .25 };

        let progress = Number(currentProgress) + Number(increment);
        if ( item.data.data.type == "legacy" ) {
            if (progress > 20) { progress = 20 }
        }
        else {
            if (progress > 10) { progress = 10 }
        }
   
        await item.update({ data: { "progress": progress } })
        return;
    }

    async _onCompleteProgressClick(event) {
        event.preventDefault();
        const itemID = event.currentTarget.getAttribute('data-item-id');
        const item = this.actor.items.get(itemID);

        let completed = item.data.data.completed;
        if ( item.data.data.completed ) {
            completed = false;
        }
        else {
            completed = true;
        }

        await item.update({ data: { "completed": completed } } );

        return;
    }

    /**
     * @override
     */
     setPosition(options = {}) {
        const position = super.setPosition(options);
        const sheetBody = this.element.find(".sheet-body");
        const bodyHeight = position.height - 192;
        sheetBody.css("height", bodyHeight);
        return position;
    }
}
