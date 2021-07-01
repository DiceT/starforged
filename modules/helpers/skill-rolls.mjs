

export async function rollChallenge( attribute, score, bonus, momentum, actorID ) {
  
    // var skillRoll = await new Roll("1d6 + @score + @bonus", {score: score, bonus: bonus});
    // Roll 2d10. These are to be separate, not a combined roll.
  
    var skillRoll = await new Roll("{1d6 + @score + @bonus, 1d10, 1d10, @momentum}", {score: score, bonus: bonus, momentum: momentum});
    let title = "ROLL +<b>" + attribute.toUpperCase() + "</b>";

    await skillRoll.evaluate();

    const roll = skillRoll.terms[0].rolls[0].total;
    const actionRoll = roll - score - bonus;
    let aOnes = 0; let aSixes = 0;
    if ( actionRoll == 1 ) { aOnes++; }
    if ( actionRoll == 6 ) { aSixes++; }

    let [ challengeRoll1, challengeRoll2 ] = skillRoll.terms[0].rolls.filter(r => r.dice.length > 0 && r.dice[0].faces === 10);
    challengeRoll1 = parseInt(challengeRoll1.total);
    challengeRoll2 = parseInt(challengeRoll2.total);
    let cOnes = 0; let cTens = 0;
    if ( challengeRoll1 == 1 ) { cOnes++; }
    if ( challengeRoll2 == 1 ) { cOnes++; }
    if ( challengeRoll1 == 10 ) { cTens++; }
    if ( challengeRoll2 == 10 ) { cTens++; }

    let opportunity = 0; let strongHit = 0; let weakHit = 0; let miss = 0; let peril = 0;
    let totalRoll = actionRoll + parseInt(score) + parseInt(bonus);

    if ( totalRoll > challengeRoll1 && totalRoll > challengeRoll2 ) {
      strongHit = 1;
    }
    else if ( totalRoll > challengeRoll1 || totalRoll > challengeRoll2 ) {
      weakHit = 1;
    }
    if ( totalRoll <= challengeRoll1 && totalRoll <= challengeRoll2 ) {
      miss = 1;
    }
    if ( strongHit == 1 && challengeRoll1 == challengeRoll2 ) {
      strongHit = 0; opportunity = 1;
    }
    if ( miss == 1 && challengeRoll1 == challengeRoll2 ) {
      miss = 0; peril = 1;
    }

    let actor = game.actors.get(actorID);

    if ( actor.data.data.statistics.enabled ) {    
      await actor.update({
        data: {
          statistics: {
            actionRolls: {
              rollsTotal: actor.data.data.statistics.actionRolls.rollsTotal + 1,
              valueTotal: actor.data.data.statistics.actionRolls.valueTotal + actionRoll,
              skillBonusTotal: actor.data.data.statistics.actionRolls.skillBonusTotal + parseInt(score),
              addBonusTotal: actor.data.data.statistics.actionRolls.addBonusTotal + parseInt(bonus),
              ones: actor.data.data.statistics.actionRolls.ones + aOnes,
              sixes: actor.data.data.statistics.actionRolls.sixes + aSixes,
              challengeRolls: {
                rollsTotal: actor.data.data.statistics.actionRolls.challengeRolls.rollsTotal + 2,
                valueTotal: actor.data.data.statistics.actionRolls.challengeRolls.valueTotal + challengeRoll1 + challengeRoll2,
                ones: actor.data.data.statistics.actionRolls.challengeRolls.ones + cOnes,
                tens: actor.data.data.statistics.actionRolls.challengeRolls.tens + cTens
              }
            },
            results: {
              opportunities: {
                actionRoll: actor.data.data.statistics.results.opportunities.actionRoll + opportunity
              },
              strongHits: {
                actionRoll: actor.data.data.statistics.results.strongHits.actionRoll + strongHit
              },
              weakHits: {
                actionRoll: actor.data.data.statistics.results.weakHits.actionRoll + weakHit
              },
              misses: {
                actionRoll: actor.data.data.statistics.results.misses.actionRoll + miss
              },
              perils: {
                actionRoll: actor.data.data.statistics.results.perils.actionRoll + peril
              }
            }
          }
        }
      });
    }

    skillRoll.toMessage({flavor: `<div class="roll-header">${title}</div>`});
  }
  
  export async function rollFulfillChallenge( progress, actorID ) {
    var skillRoll = await new Roll("{@progress, 1d10, 1d10, 0}", {progress: parseInt(progress)});
    let title = "FULFILL CHALLENGE";
    
    let actor = game.actors.get(actorID);
    await skillRoll.evaluate();

    const roll = skillRoll.terms[0].rolls[0].total;
    const actionRoll = roll;

    let [ challengeRoll1, challengeRoll2 ] = skillRoll.terms[0].rolls.filter(r => r.dice.length > 0 && r.dice[0].faces === 10);
    challengeRoll1 = parseInt(challengeRoll1.total);
    challengeRoll2 = parseInt(challengeRoll2.total);
    let cOnes = 0; let cTens = 0;
    if ( challengeRoll1 == 1 ) { cOnes++; }
    if ( challengeRoll2 == 1 ) { cOnes++; }
    if ( challengeRoll1 == 10 ) { cTens++; }
    if ( challengeRoll2 == 10 ) { cTens++; }

    let opportunity = 0; let strongHit = 0; let weakHit = 0; let miss = 0; let peril = 0;
    let totalRoll = actionRoll;
    let result = "";

    if ( totalRoll > challengeRoll1 && totalRoll > challengeRoll2 ) {
      strongHit = 1;
    }
    else if ( totalRoll > challengeRoll1 || totalRoll > challengeRoll2 ) {
      weakHit = 1;
    }
    if ( totalRoll <= challengeRoll1 && totalRoll <= challengeRoll2 ) {
      miss = 1;
    }
    if ( strongHit == 1 && challengeRoll1 == challengeRoll2 ) {
      strongHit = 0; opportunity = 1;
    }
    if ( miss == 1 && challengeRoll1 == challengeRoll2 ) {
      miss = 0; peril = 1;
    }

    if ( actor.data.data.statistics.enabled ) {    
      await actor.update({
        data: {
          statistics: {
            progressRolls: {
              rollsTotal: actor.data.data.statistics.progressRolls.rollsTotal + 1,
              valueTotal: actor.data.data.statistics.progressRolls.valueTotal + actionRoll,
              challengeRolls: {
                rollsTotal: actor.data.data.statistics.progressRolls.challengeRolls.rollsTotal + 2,
                valueTotal: actor.data.data.statistics.progressRolls.challengeRolls.valueTotal + challengeRoll1 + challengeRoll2,
                ones: actor.data.data.statistics.progressRolls.challengeRolls.ones + cOnes,
                tens: actor.data.data.statistics.progressRolls.challengeRolls.tens + cTens
              }
            },
            results: {
              opportunities: {
                progressRoll: actor.data.data.statistics.results.opportunities.progressRoll + opportunity
              },
              strongHits: {
                progressRoll: actor.data.data.statistics.results.strongHits.progressRoll + strongHit
              },
              weakHits: {
                progressRoll: actor.data.data.statistics.results.weakHits.progressRoll + weakHit
              },
              misses: {
                progressRoll: actor.data.data.statistics.results.misses.progressRoll + miss
              },
              perils: {
                progressRoll: actor.data.data.statistics.results.perils.progressRoll + peril
              }
            }
          }
        }
      });
    }
    skillRoll.toMessage({flavor: `<div class="roll-header">${title}</div>`});
  }