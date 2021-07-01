/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
 export class StarforgedAssetSheet extends ItemSheet {

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
      return "systems/starforged/templates/item/asset-sheet.hbs";
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

      html.find('.asset-track-plus').click(this._onAssetTrackPlus.bind(this));
      html.find('.asset-track-minus').click(this._onAssetTrackMinus.bind(this));
      html.find('.asset-track-enable').click(this._onAssetTrackEnable.bind(this));
      html.find('.asset-battered-enable').click(this._onAssetBatteredEnable.bind(this));
      html.find('.asset-cursed-enable').click(this._onAssetCursedEnable.bind(this));
      html.find('.asset-outofaction-enable').click(this._onAssetOutOfActionEnable.bind(this));
    }

    async _onAssetTrackPlus (event) {
        console.log(this.item.data.data)
        await this.item.update({
            data: {
                track: {
                    max: this.item.data.data.track.max + 1
                }
            }
        });
        return;
    }

    async _onAssetTrackMinus (event) {
        if ( this.item.data.data.track.max > 0 ) {
            await this.item.update({
                data: {
                    track: {
                        max: this.item.data.data.track.max - 1
                    }
                }
            }); 
        }
        return;
    }

    async _onAssetTrackEnable (event) {
        let assetTrack = this.item.data.data.track.enabled;
        if ( assetTrack == true ) { assetTrack = false; }
        else { assetTrack = true; }

        await this.item.update({
            data: {
                track: {
                    enabled: assetTrack
                }
            }
        });
        return;
    }

    async _onAssetBatteredEnable (event) {
        let value = this.item.data.data.battered.enabled;
        if ( value == true ) { value = false; }
        else { value = true; }

        await this.item.update({
            data: {
                battered: {
                    enabled: value
                }
            }
        });
        return;
    }

    async _onAssetCursedEnable (event) {
        let value = this.item.data.data.cursed.enabled;
        if ( value == true ) { value = false; }
        else { value = true; }

        await this.item.update({
            data: {
                cursed: {
                    enabled: value
                }
            }
        });
        return;
    }

    async _onAssetOutOfActionEnable (event) {
        let value = this.item.data.data.outOfAction.enabled;
        if ( value == true ) { value = false; }
        else { value = true; }

        await this.item.update({
            data: {
                outOfAction: {
                    enabled: value
                }
            }
        });
        return;
    }
    // Everything below here is only needed if the sheet is editable
  
    // Roll handlers, click handlers, etc. would go here.
    
  }
  