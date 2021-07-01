/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
 export class StarforgedChallengeSheet extends ItemSheet {

    /** @override */
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes: ["starforged", "sheet", "item"],
        width: 444,
        height: 400,
        resizable: false,
        tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
      });
    }
  
    /** @override */
    get template() {
      return "systems/starforged/templates/item/challenge-sheet.hbs";
    }
  
    /* -------------------------------------------- */
  
    /** @override */
    getData() {
      // Retrieve base data structure.
      const context = super.getData();
  
      // Grab the item's data.
      const itemData = context.item.data;
  
      // Re-define the template data references.
      context.data = itemData.data;
      context.flags = itemData.flags;
      context.config = CONFIG.STARFORGED;
      
      

      return context;
    }
  
    /* -------------------------------------------- */
  
    /** @override */
    setPosition(options = {}) {
      const position = super.setPosition(options);
      const sheetBody = this.element.find(".sheet-body");
      const bodyHeight = position.height - 192;
      sheetBody.css("height", bodyHeight);
      return position;
    }
  
    /* -------------------------------------------- */
  
    /** @override */
    activateListeners(html) {
      super.activateListeners(html);
  
      html.find('.mark-progress').click(this._onMarkProgressClick.bind(this));
      html.find('.clear-progress').click(this._onClearProgressClick.bind(this));
      html.find('.hex-difficulty').click(this._onDifficultyClick.bind(this));
    }
      
    async _onClearProgressClick(event) {
      event.preventDefault();
  
      await this.item.update({ data: { "progress": 0 } })
  
      return;
  }
  
    async _onMarkProgressClick(event) {
        event.preventDefault();
  
        let difficulty = await this.item.data.data.difficulty;
        let currentProgress = await this.item.data.data.progress;
        let increment = 3;
  
        if (difficulty == "Troublesome") { increment = 3 };
        if (difficulty == "Dangerous") { increment = 2 };
        if (difficulty == "Formidable") { increment = 1 };
        if (difficulty == "Extreme") { increment = .5 };
        if (difficulty == "Epic") { increment = .25 };
  
        let progress = Number(currentProgress) + Number(increment);
        if (progress > 10) { progress = 10 }
  
        await this.item.update({ data: { "progress": progress } })
  
        return;
    }
  
    async _onDifficultyClick(event) {
      event.preventDefault();
  
      let difficultyValue = event.currentTarget.getAttribute('data-value');
      let difficulty = "Troublesome";
  
      switch( difficultyValue ) {
        case "1": difficulty = "Troublesome"; break;
        case "2": difficulty = "Dangerous"; break;
        case "3": difficulty = "Formidable"; break;
        case "4": difficulty = "Extreme"; break;
        case "5": difficulty = "Epic"; break;
      }
  
      await this.item.update({ data: { "difficulty": difficulty } } );
  
      return;
  }
  
      // Everything below here is only needed if the sheet is editable
  
      // Roll handlers, click handlers, etc. would go here.
    
  }
  