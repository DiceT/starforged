import { rollChallenge } from "../../helpers/skill-rolls.mjs";
import { rollFromFolder } from "../../generators/core-generator.mjs";
import { generateSector } from "../../generators/sector-generator.mjs";
import { generateYourTruths } from "../../generators/your-truths.mjs";
import { generateSettlement } from "../../generators/settlement-generator.mjs";
import { generatePlanet } from "../../generators/planet-generator.mjs";
import { generateStarship } from "../../generators/starship-generator.mjs";
import { generateDerelict } from "../../generators/derelict-generator.mjs";
import { generateNPC } from "../../generators/npc-generator.mjs";
import { generateCreature } from "../../generators/creature-generator.mjs";
import { generatePrecursor } from "../../generators/precursor-generator.mjs";

/**
 * @extends {ActorSheet}
 */

export class StarforgedDashboardPlusSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: "systems/starforged/templates/actor/dashboard-plus-sheet.hbs",
            width: 674,
            height: 278,
            resizable: false,
            tabs: []
        });
    }

      /** @override */
    get template() {
        return "systems/starforged/templates/actor/dashboard-plus-sheet.hbs";
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
    }
    /** ------------------------------------------------------------------ */

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
        rollFromFolder(folder1, folder2);
    }

    /** ------------------------------------------------------------------ */

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
                if ( score < 10 ) {
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
            case "Sector": { await generateSector(type); break; }
            case "Settlement": { await generateSettlement(type); break; }
            case "Planet": { await generatePlanet(); break; }
            case "Starship": { await generateStarship(); break; }
            case "Derelict": { await generateDerelict(type); break; }
            case "NPC": { await generateNPC(); break; }
            case "Creature": { await generateCreature(); break; }
            case "Precursor": { await generatePrecursor(type); break; }
            case "YourTruths": {
                if ( await game.folders.getName("Your Truths") == undefined ) { generateYourTruths(); }
                break;
            }
        }
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