export function initializeHandlebars() {

  // Rolling Helpers
  // Determin if the roll is an Action Roll
  Handlebars.registerHelper('ifIsActionRoll', function(options) {
    let result = options.inverse(this);

    if ( this.roll.dice.length == 3 &&
      this.roll.dice.filter(x => x.faces === 6).length === 1 &&
      this.roll.dice.filter(x => x.faces === 10).length === 2 )      
    {
      result = options.fn(this);
    }
    else if ( this.roll.dice.filter(x => x.faces === 10).length === 2 ) {
      const [ c1, c2 ] = this.roll.terms[0].rolls.filter(r => r.dice.length > 0 && r.dice[0].faces === 10);
      if ( this.roll.total > c1.total + c2.total ) {
        result = options.fn(this);
      }
    }
    
    return result;
  })

  // Generate the HTML for the Action Dice result  
  Handlebars.registerHelper('actionDice', function() {
    const r = this.roll.terms[0].rolls.find( r => r.dice.length === 0 || r.dice[0].faces === 6 );
    const m = this.roll.terms[0].rolls[3].total;

    let actionDice = `<strong><span`;
    if ( r.terms.length > 1 ) {
      for ( let counter = 0; counter < r.terms.length; counter++ ) {
        if ( r.terms[counter].number != undefined ) { 
          if ( r.terms[counter].faces == 6 ) {
            actionDice += `  class="roll die d6`;
            if (r.terms[counter].total == 6 ) {
                if ( m < 0 && Math.abs(m) == r.terms[counter].total ) {}
                else { actionDice += ` max`; }
            }
            else if ( r.terms[counter].total == 1 || ( m < 0 && Math.abs(m) == r.terms[counter].total )) {
              actionDice += ` min`;
            }
            if ( m < 0 && Math.abs(m) == r.terms[counter].total ) {
              actionDice += `">0</span>`;
            }
            else {
              actionDice += `">${r.terms[counter].total}</span>`;
            }
          }
          else {
            actionDice += " " + r.terms[counter].number;
          }
        }
        else {
          actionDice += " " + r.terms[counter].operator;
        }
      }
    }
    else {
      actionDice += ` style="font-size: x-large">${r.terms[0].total}</span>`;
    }
    actionDice += `</strong>`;

    return actionDice;
  })

  Handlebars.registerHelper('burnMomentum', function(options) {
    let r = this.roll.terms[0].rolls.find( r => r.dice.length === 0 || r.dice[0].faces === 6 );
    const [ c1, c2 ] = this.roll.terms[0].rolls.filter(r => r.dice.length > 0 && r.dice[0].faces === 10);
    const m = (this.roll.terms[0].rolls[3]);
    
    r = (r.terms[0]);

    let result = "";

    if ( m.total > c1.total && m.total > c2.total ) { // MOMENTUM STRONG HIT
      if ( r.total < c1.total || r.total < c2.total ) { // ROLL MISS OR WEAK HIT
        if ( c1.total == c2.total ) {
          result = "<p class='action-result opportunity' style='font-size:medium; margin-bottom:0'>Burn Momentum for OPPORTUNITY!</p>"
        }
        else {
          result = "<p class='action-result strong-hit' style='font-size:medium; margin-bottom:0'>Burn Momentum for a STRONG HIT</p>";
        }
      }
    }
    else if ( m.total > c1.total || m.total > c2.total ) { // MOMENTUM WEAK HIT
      if ( r.total < c1.total && r.total < c2.total ) { // ROLL MISS
        result = "<p class='action-result weak-hit' style='font-size:medium; margin-bottom:0'>Burn Momentum for a WEAK HIT</p>";
      }
    }


    if ( m.total < 0 && Math.abs(m.total) == r.total ) {
      result = "<p class='action-result peril' style='font-size:medium; margin-bottom:0'>NEGATIVE MOMENTUM!</p>";
    }
    return result;
  })
  
  // Generate the HTML for the Challenge Dice result
  Handlebars.registerHelper('challengeDice', function() {
    const [ c1, c2 ] = this.roll.terms[0].rolls.filter(r => r.dice.length > 0 && r.dice[0].faces === 10);
    let c1span = `<strong><span class="roll die d10`;
    let c2span = `<strong><span class="roll die d10`;
    
    if (c1.total == 10 ) {
      c1span += " min";
    }
    else if (c1.total == 1 ) {
      c1span += " max";
    }

    if (c2.total == 10 ) {
      c2span += " min";
    }
    else if (c2.total == 1 ) {
      c2span += " max";
    }

    c1span += `">${c1.total}</span></strong>`;
    c2span += `">${c2.total}</span></strong>`;
    return `${c1span} ${c2span}`
  })
  
  // Determine the result of the Action Roll
  Handlebars.registerHelper('actionResult', function() {
    let r = this.roll.terms[0].rolls[0].total;
    const c1 = this.roll.terms[0].rolls[1].total;
    const c2 = this.roll.terms[0].rolls[2].total;
    const m = this.roll.terms[0].rolls[3].total;
    let actionResult = "";
    let result = "";

    if ( m < 0 ) {
      if ( Math.abs(m) == this.roll.terms[0].rolls[0].terms[0].total ) {
        r = 0;
      }
    }

    if ( r > c1 && r > c2 ) {
      actionResult = `<p class="action-result strong-hit">STRONG HIT</p>`;
      result = "STRONG HIT"
    }
    else if ( (r > c1 && r <= c2) || (r <= c1 && r > c2) ) {
      actionResult = `<p class="action-result weak-hit">WEAK HIT</p>`;
      result = "WEAK HIT";
    }
    else {
      actionResult = `<p class="action-result miss">MISS</p>`;
      result = "MISS";
    }

    if ( result == "MISS" && c1 == c2 ) {
      actionResult = `<p class="action-result peril">PERIL!</p>`;
    }
    else if ( result == "STRONG HIT" && c1 == c2 ) {
      actionResult = `<p class="action-result opportunity">OPPORTUNITY!</p>`;
    }
    return actionResult;
  })

  // Set up the Roll type
  Handlebars.registerHelper('actionRollType', function() {
    return "ROLL +";
  })

  // Track Helpers
  // Generate the HTML to display the progress track
  Handlebars.registerHelper("progressTrack", function(n, content) {
    let result = "";
    let decimal = 0;
    let progress = n;

    if ( progress >= 10 ) {
      n = n - 10;
    }

    for (let i = 1; i <= 10; ++i) {
        result += "<img src='systems/starforged/resources/tracks/";
        if (i <= n) {
            result += "progress-4.png'";
        }
        else {
            decimal = n % 1;
            switch (decimal) {
                case 0.25: 
                    result += "progress-1.png'";
                    break;
                case 0.50: 
                    result += "progress-2.png'";
                    break;
                case 0.75: 
                    result += "progress-3.png'";
                    break;
                case 0.00: 
                    result += "progress-0.png'";
                    break;
            }
            n = n - decimal;   
        }

        result += " title='Progression: " + progress + "'>";
    }
    return result;
  });

  // Generate the HTML to display the Difficulty Track (Hexes)
  Handlebars.registerHelper("difficultyTrack", function(n, content) {
    let result = "";
    let difficulty = n;

    switch ( difficulty ) {
      case "Troublesome": difficulty = 1; break;
      case "Dangerous": difficulty = 2; break;
      case "Formidable": difficulty = 3; break;
      case "Extreme": difficulty = 4; break;
      case "Epic": difficulty = 5; break;
    }

    for (let i = 1; i <= 5; ++i) {
      result += "<span class='hex-difficulty' data-value='" + i + "'>";
      result += "<img src='systems/starforged/resources/tracks/hex-";
      if ( i <= difficulty ) {
        result += "full.png'></span>";
      }
      else {
        result += "empty.png'></span>";
      }
    }
    return result;
  });

  Handlebars.registerHelper("assetTrack", function(n, content) {
    let result = "";
    let max = n.max;
    let value = n.value;

    for (let i = 0; i <= max; ++i) {
      result += "<span class='asset-track-value' data-value='" + i + "'>";
      result += "<img src='systems/starforged/resources/tracks/hex-";
      if ( i <= value ) {
        result += "full-" + i + ".png'></span>";
      }
      else {
        result += "empty-" + i + ".png'></span>";
      }
    }
    return result;
  });

// Generic HTML Helpers

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function() {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });
  
  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });
  
  Handlebars.registerHelper('enrichHTML', (html) => {
    return TextEditor.enrichHTML(html);
  });
  
  Handlebars.registerHelper('rangeEach', function (context, options) {
    const results = []
    const { from, to, current } = context.hash
  
    // Enable both directions of iteration
    const increment = from > to ? -1 : 1
    const shouldContinue = from > to ? (x, y) => x >= y : (x, y) => x <= y
  
    for (let value = from; shouldContinue(value, to); value += increment) {
      const valueStr = value > 0 ? `+${value}` : value.toString()
      const isCurrent = value === current
      const lteCurrent = value <= current
      results.push(
        context.fn({
          ...this,
          valueStr,
          value,
          isCurrent,
          lteCurrent
        })
      )
    }
    return results.join('\n')
  })
}
