/**
 * @extends {Actor}
 */
export class StarforgedActor extends Actor {
    
    /** @override */
    prepareData() {
        super.prepareData();
    }

    /** @override */
    prepareBaseData() {

    }

    /** @override */
    prepareDerivedData() {
        const actorData = this.data;
        const data = actorData.data;
        const flags = actorData.flags.starforged || {};

        this._prepareCharacterData(actorData);
        this._prepareLocationData(actorData);
    }

    _prepareCharacterData(actorData) {
        if ( actorData.type != 'character' ) return;
        const data = actorData.data;

        if ( data.statistics.actionRolls.rollsTotal > 0 ) {
            data.statistics.actionRolls.averageRoll = (data.statistics.actionRolls.valueTotal / data.statistics.actionRolls.rollsTotal).toFixed(2);
            data.statistics.actionRolls.averageSkillBonus = (data.statistics.actionRolls.skillBonusTotal / data.statistics.actionRolls.rollsTotal).toFixed(2);
            data.statistics.actionRolls.averageAddBonus = (data.statistics.actionRolls.addBonusTotal / data.statistics.actionRolls.rollsTotal).toFixed(2);
            data.statistics.actionRolls.averageTotalRoll = (parseFloat(data.statistics.actionRolls.averageRoll) + parseFloat(data.statistics.actionRolls.averageSkillBonus) + parseFloat(data.statistics.actionRolls.averageAddBonus)).toFixed(2);
            data.statistics.actionRolls.onesPercentage = (parseFloat(data.statistics.actionRolls.ones / data.statistics.actionRolls.rollsTotal * 100).toFixed(2));
            data.statistics.actionRolls.sixesPercentage = (parseFloat(data.statistics.actionRolls.sixes / data.statistics.actionRolls.rollsTotal * 100).toFixed(2));

            data.statistics.results.opportunities.actionRollPercentage = (parseFloat(data.statistics.results.opportunities.actionRoll / data.statistics.actionRolls.rollsTotal * 100).toFixed(2));        
            data.statistics.results.strongHits.actionRollPercentage = (parseFloat(data.statistics.results.strongHits.actionRoll / data.statistics.actionRolls.rollsTotal * 100).toFixed(2));        
            data.statistics.results.weakHits.actionRollPercentage = (parseFloat(data.statistics.results.weakHits.actionRoll / data.statistics.actionRolls.rollsTotal * 100).toFixed(2));        
            data.statistics.results.misses.actionRollPercentage = (parseFloat(data.statistics.results.misses.actionRoll / data.statistics.actionRolls.rollsTotal * 100).toFixed(2));        
            data.statistics.results.perils.actionRollPercentage = (parseFloat(data.statistics.results.perils.actionRoll / data.statistics.actionRolls.rollsTotal * 100).toFixed(2));        
            data.statistics.results.opportunities.progressRollPercentage = (parseFloat(data.statistics.results.opportunities.progressRoll / data.statistics.progressRolls.rollsTotal * 100).toFixed(2));        
            data.statistics.results.strongHits.progressRollPercentage = (parseFloat(data.statistics.results.strongHits.progressRoll / data.statistics.progressRolls.rollsTotal * 100).toFixed(2));        
            data.statistics.results.weakHits.progressRollPercentage = (parseFloat(data.statistics.results.weakHits.progressRoll / data.statistics.progressRolls.rollsTotal * 100).toFixed(2));        
            data.statistics.results.misses.progressRollPercentage = (parseFloat(data.statistics.results.misses.progressRoll / data.statistics.progressRolls.rollsTotal * 100).toFixed(2));        
            data.statistics.results.perils.progressRollPercentage = (parseFloat(data.statistics.results.perils.progressRoll / data.statistics.progressRolls.rollsTotal * 100).toFixed(2));        
        }
            if ( data.statistics.actionRolls.challengeRolls.rollsTotal > 0 ) {
            data.statistics.actionRolls.challengeRolls.averageRoll = (data.statistics.actionRolls.challengeRolls.valueTotal / data.statistics.actionRolls.challengeRolls.rollsTotal).toFixed(2);
            data.statistics.actionRolls.challengeRolls.onesPercentage = (parseFloat(data.statistics.actionRolls.challengeRolls.ones / data.statistics.actionRolls.challengeRolls.rollsTotal * 100).toFixed(2));
            data.statistics.actionRolls.challengeRolls.tensPercentage = (parseFloat(data.statistics.actionRolls.challengeRolls.tens / data.statistics.actionRolls.challengeRolls.rollsTotal * 100).toFixed(2));
        }
        if ( data.statistics.progressRolls.rollsTotal > 0 ) {
            data.statistics.progressRolls.averageRoll = (data.statistics.progressRolls.valueTotal / data.statistics.progressRolls.rollsTotal).toFixed(2);
        }
        if ( data.statistics.progressRolls.challengeRolls.rollsTotal > 0 ) {
            data.statistics.progressRolls.challengeRolls.averageRoll = (data.statistics.progressRolls.challengeRolls.valueTotal / data.statistics.progressRolls.challengeRolls.rollsTotal).toFixed(2);
            data.statistics.progressRolls.challengeRolls.onesPercentage = (parseFloat(data.statistics.progressRolls.challengeRolls.ones / data.statistics.progressRolls.challengeRolls.rollsTotal * 100).toFixed(2));
            data.statistics.progressRolls.challengeRolls.tensPercentage = (parseFloat(data.statistics.progressRolls.challengeRolls.tens / data.statistics.progressRolls.challengeRolls.rollsTotal * 100).toFixed(2));
        }

        const numDebilitiesMarked = Object.values(this.data.data.impacts).filter(
            x => x
          ).length
        this.data.data.momentumMax = 10 - numDebilitiesMarked;
        this.data.data.momentumReset = Math.max(0, 2 - numDebilitiesMarked);
    }

    _prepareLocationData(actorData) {
        if ( actorData.type != 'location' ) return;
    }

    getRollData() {
        const data = super.getRollData();

        this._getCharacterRollData(data);
        this._getLocationRollData(data);

        return data;
    }

    _getCharacterRollData(data) {
        if ( this.data.type != 'character' ) return;


    }

    _getLocationRollData(data) {
        if ( this.data.type != 'location' ) return;

        
    }
}
