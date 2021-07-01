/**
 * @extends {ActorSheet}
 */

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
        
        // Clone of the actor data for safe operations
        const actorData = context.actor.data;

        // Add actor data to context data for easier access, and flags
        context.data = actorData.data;
        context.flags = actorData.flags;

        // Prepare character data and items
        if ( actorData.type == 'character' ) {
            // this._prepareCharacterItems(context);
            // this._prepareCharacterData(context);
        }

        // Prepare location data and items
        if ( actorData.type == "location" ) {
            // this._prepareLocationItems(context);
            // this._prepareLocationData(context);
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
        // Initialize containers
        const legacies = [];
        const assets = [];
        const openChallenges = [];
        const completedChallenges = [];

        // Iterate through items and assign them to containers
        for ( let item of context.items ){
            item.img = item.img || DEFAULT_TOKEN;
            if ( item.type === 'legacy' ) {
                legacies.push(item);
            }
            else if ( item.type === 'asset' ) {
                assets.push(item);
            }
            else if ( item.type === 'challenge' && item.data.completed === false ) {
                openChallenges.push(item);
            }
            else if ( item.type === 'challenge' && item.data.completed === true ) {
                completedChallenges.push(item);
            }
        }

        // Assign and return
        context.legacies = legacies;
        context.assets = assets;
        context.openChallenges = openChallenges;
        context.completedChallenges = completedChallenges;
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
         // Initialize containers
        const planets = [];
        const deepSpacesettlements = [];
        const orbitalSettlements = [];
        const planetsideSettlements = [];
        const npcs = [];

        for ( let actor of context.actors ) {
            actor.img = actor.img || DEFAULT_TOKEN;
            if ( actor.type === 'location' && actor.data.type === 'Planet' ) {
                planets.push(actor);
            }
            else if ( actor.type === 'location' && actor.data.type === 'Deep Space' ) {
                deepSpacesettlements.push(actor);
            }
            else if ( actor.type === 'location' && actor.data.type === 'Orbital' ) {
                orbitalSettlements.push(actor);
            }
            else if ( actor.type === 'location' && actor.data.type === 'Planetside' ) {
                planetsideSettlements.push(actor);
            }
            else if ( actor.type === 'location' && actor.data.type === 'NPC' ) {
                npcs.push(actor);
            }
        }

        // Assign and return
        context.planets = planets;
        context.deepSpacesettlements = deepSpacesettlements;
        context.orbitalSettlements = orbitalSettlements;
        context.planetsideSettlements = planetsideSettlements;
        context.npcs = npcs;
    }

    /**
     * @param {Object} actorData to prepare
     * 
     * @return {undefined}
     */
     _prepareLocationItems(context) {

    }    
    
    /** ------------------------------------------------------------------ */


}