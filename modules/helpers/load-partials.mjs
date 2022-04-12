// Preload and register Handlebar templates

export const loadPartials = async function() {

    // Define template paths to load
    const templatePaths = [
  
      // Actor Sheet Tabs
      'systems/starforged/templates/tabs/legacies.hbs',
      'systems/starforged/templates/tabs/assets.hbs',
      'systems/starforged/templates/tabs/challenges.hbs',
      'systems/starforged/templates/tabs/completed.hbs',
      'systems/starforged/templates/tabs/journal.hbs',
      'systems/starforged/templates/tabs/moves.hbs',
      'systems/starforged/templates/tabs/statistics.hbs',
      
      // Actor Sheet Partials
      "systems/starforged/templates/partials/dashboard.hbs",
      "systems/starforged/templates/partials/generators.hbs",
      'systems/starforged/templates/partials/legacy.hbs',
      'systems/starforged/templates/partials/challenge-block.hbs',
      'systems/starforged/templates/partials/completed-block.hbs',
      'systems/starforged/templates/partials/xp.hbs',
      'systems/starforged/templates/partials/impacts.hbs',

      // Chat Partials
      'systems/starforged/templates/partials/roll.hbs'
    ];
  
    // Load the template parts
    return loadTemplates(templatePaths);
  };
;