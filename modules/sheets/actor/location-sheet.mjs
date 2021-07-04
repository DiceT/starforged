/**
 * @extends {ActorSheet}
 */

import { rollFromFolder } from "../../generators/core-generator.mjs";

    export class StarforgedLocationSheet extends ActorSheet {

        /** @override */
        static get defaultOptions() {
            return mergeObject(super.defaultOptions, {
                template: "systems/starforged/templates/actor/location-sheet.hbs",
                width: 400,
                height: 600,
                resizable: false,
                tabs: []
            });
    }

    /** ------------------------------------------------------------------ */

    /** @override */
    getData() {
        // Retrieve the data structure from the base sheet
        const context = super.getData();
        const actorData = context.actor.data;
        context.data = actorData.data;
        context.flags = actorData.flags;
        context.RollData = context.actor.getRollData();
        context.config = CONFIG.STARFORGED;

        context.isSector = context.data.type === "Sector" ? true : false;
        context.isPlanet = context.data.type === "Planet" ? true : false;
        context.isSettlement = context.data.type === "Settlement" ? true : false;
        context.isStarship = context.data.type === "Starship" ? true : false;
        context.isNPC = context.data.type === "NPC" ? true : false;
        context.isCreature = context.data.type === "Creature" ? true : false;
        context.isDerelict = context.data.type === "Derelict" ? true : false;
        context.isPrecursor = context.data.type === "Precursor Vault" ? true : false;

        context.isLocationTheme = false;
        if ( context.isPlanet || context.isSettlement || context.isStarship || context.isDerelict || context.isPrecursor ) {
            context.isLocationTheme = true;
        }

        // Prepare location data and items
        if ( actorData.type == "location" ) {
            this._prepareLocationData(context);
        }
        
        context.currenZone = "";
        
        return context;
    }

    /**
     * @param {Object} actorData to prepare
     * 
     * @return {undefined}
     */
     _prepareLocationData(context) {
    }
    /** ------------------------------------------------------------------ */

    /** ------------------------------------------------------------------ */
    /** @override */
    activateListeners(html) {
        super.activateListeners(html);
        
        html.find('.generate-content').click(this._onGenerateContent.bind(this));


    }

    async _onGenerateContent(event) {
        let content = this.object.data.data.notes != null ? this.object.data.data.notes : "";
        const table = event.currentTarget.getAttribute('data-table');
        let tableName = table;

        if ( tableName === "Derelict" ) {
            tableName += " - " + this.form[1].value + " - ";
            tableName += event.currentTarget.getAttribute('data-type');
        }
        if ( tableName === "Location Theme" ) {
            if ( this.form[2] == undefined ) {
                tableName += " - " + this.form[1].value + " - ";
            } else {
                tableName += " - " + this.form[2].value + " - ";
            }
            tableName += event.currentTarget.getAttribute('data-type');
        }
        if ( tableName === "Derelicts - Zones" ) {
            tableName += " - " + event.currentTarget.getAttribute('data-type');
            tableName = "[ " + tableName + "s ]";
        }

        let result = await rollFromFolder( tableName, false );
        content += "<p><b>" + result.prefix + "</b>: " + result.result + "</p>";

        await this.object.update({ data: { notes: content } });
    }
}