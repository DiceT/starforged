/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
 export class StarforgedMoveSheet extends ItemSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
        classes: ["starforged", "sheet", "item"],
        width: 444,
        height: 600,
        resizable: false
      });
    }
  
    /** @override */
    get template() {
      return "systems/starforged/templates/item/move-sheet.hbs";
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

    }
    
}  