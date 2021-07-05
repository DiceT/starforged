/**
 * @extends {ActorSheet}
 */

import { rollFromFolder } from "../../generators/core-generator.mjs";

    export class StarforgedLocationSheet extends ActorSheet {

        /** @override */
        static get defaultOptions() {
            return mergeObject(super.defaultOptions, {
                template: "systems/starforged/templates/actor/location-sheet.hbs",
                width: 450,
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
        context.isVitalWorld = context.data.locationType === "Vital World" ? true : false;

        context.isLocationTheme = false;
        if ( context.isPlanet || context.isSettlement || context.isStarship || context.isDerelict || context.isPrecursor ) {
            context.isLocationTheme = true;
        }
        context.isOracleArray = false;
        if ( context.isDerelict || context.isPrecursor ) {
            context.isOracleArray = true;
        }


        // Prepare location data and items
        if ( actorData.type == "location" ) {
            this._prepareLocationData(context);
        }
        
        context.currentZone = "";
        context.currentLocationTheme = "";
        
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
        html.find('.oracle-array').click(this._onOracleArray.bind(this));

    }

    async _onGenerateContent(event) {
        let tableName = event.currentTarget.getAttribute('data-table');
        const notes = event.currentTarget.getAttribute('data-notes');
        let content = this.object.data.data.notes != null ? this.object.data.data.notes : "";
        if ( notes === "Details" ) {
            content = this.object.data.data.details != null ? this.object.data.data.details : "";
        }

        switch ( tableName ) {
            case "Derelict": {
                tableName += " - " + this.form[1].value + " - ";
                tableName += event.currentTarget.getAttribute('data-type');
                break;
            }
            case "Location Theme": {
                tableName += this.form[2] === undefined ? " - " + this.form[1].value + " - " :
                    " - " + this.form[2].value + " - ";
                tableName += event.currentTarget.getAttribute('data-type');
                break;
            }
            case "Settlement Population": {
                const sectorActor = game.actors.getName(game.scenes.current.data.name)
                const sectorLocation = sectorActor.data.data.locationType;
                tableName += " - " + sectorLocation;
                break;
            }
            case "Starships - Missions": {
                const sectorActor = game.actors.getName(game.scenes.current.data.name)
                const sectorLocation = sectorActor.data.data.locationType;
                tableName = "[ " + tableName + " - " + sectorLocation + " ]";
                console.log(tableName);
            }

        }

        let result = await rollFromFolder( tableName, false );
        content += "<p><b>" + result.prefix + "</b>: " + result.result + "</p>";

        if ( tableName.includes("Derelicts - Zones") ) {
            await this.object.update({ data: {currentZone: result.result} });
        }
        else if ( tableName === "[ Location Themes - Types ]" ) {
            let pointer = result.result.indexOf("-");
            await this.object.update({ data: {currentLocationTheme: result.result.substring(0, pointer - 1 )} });
        }

        if ( notes === "Details" ) {
            await this.object.update({ data: { details: content } });
        }
        else {
            await this.object.update({ data: { notes: content } });
        }
    }

    async _onOracleArray (event) {
        let array = event.currentTarget.getAttribute('data-array');
        let roll = await new Roll("1d100").roll().result;
        let content = this.object.data.data.notes != null ? this.object.data.data.notes : "";
        let tableName;

        switch ( array ) {
            case "Explore": {
                if ( roll >= 1 && roll <= 20 ) {
                    tableName = "Location Theme - " + this.object.data.data.currentLocationTheme + " - Feature";
                } 
                else if ( roll >= 21 && roll <= 80 ) {
                    tableName = this.object.data.data.type === "Derelict" ?
                        "Derelict - " + this.object.data.data.currentZone + " - Feature" :
                        "[ Precursor Vaults - " + this.object.data.data.currentZone + " Features ]";
                }
                else if ( roll >= 81 && roll <= 100 ) {
                    tableName = "Descriptor + Focus";
                }
                content += "<p><b>Exploring the " + this.object.data.data.currentLocationTheme + " " + this.object.data.data.currentZone + "</b>: ";
                break;
            }
            case "Trouble": {
                if ( roll >= 1 && roll <= 15 ) {
                    tableName = "Ask the Oracle - Pay the Price";
                } 
                else if ( roll >= 16 && roll <= 50 ) {
                    tableName = "Location Theme - " + this.object.data.data.currentLocationTheme + " - Peril";
                }
                else if ( roll >= 51 && roll <= 85 ) {
                    tableName = this.object.data.data.type === "Derelict" ?
                        "Derelict - " + this.object.data.data.currentZone + " - Peril" :
                        "[ Precursor Vaults - " + this.object.data.data.currentZone + " Perils ]";
                }
                else if ( roll >= 86 && roll <= 100 ) {
                    tableName = "[ Story Complications ]";
                }
                content += "<p><b>Trouble in the " + this.object.data.data.currentLocationTheme + " " + this.object.data.data.currentZone + "</b>: ";
                break;
            }
        }
        if ( tableName === "Descriptor + Focus" ) {
            let result = await rollFromFolder( "[ Descriptors ]", false );
            content += "[D+F] " + result.result + " + ";
            result = await rollFromFolder( "[ Foci ]", false );
            content += result.result + "</p>";
        }
        else {
            let result = await rollFromFolder( tableName, false );
            content += result.result + "</p>";
        }
        await this.object.update({ data: { notes: content } });
    }
}