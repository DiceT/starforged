export async function processDataforged() {

    const pack_list = ['starforged.starforged-moves', 'starforged.starforged-assets', 'starforged.starforged-tables']
    const delete_list = ['starforged.starforged-moves', 'starforged.starforged-assets']

    for (const key of pack_list) {
        const pack = await game.packs.get(key);
        await pack.configure({ locked: false });
        if (delete_list.includes(key)){
          const idsToDelete = pack.index.map( x => x._id )
          for ( const id of idsToDelete ) {
              const document = await pack.getDocument(id);
              await document.delete();
          }
        }
    }
    
    // await importTruths();
    // await importOracles();
    // await importMoves();
    // await importAssets();

    for (const key of pack_list) {
      const pack = await game.packs.get(key);
      await pack.configure({ locked: true });
  }
}

function replaceHTML(text){
    let html = text.replace("**", "<strong>");
    html = html.replace("**", "</strong>");
    html = html.replace("**", "<strong>");
    html = html.replace("**", "</strong>");
    html = html.replace(
      /(roll ?)?\+(iron|edge|wits|shadow|heart|health|spirit|supply)/gi,
      '((rollplus $2))'
    ), { gfm: true } ;
    html =  html.replace(
      /\(\(rollplus (.*?)\)\)/g,
      `<a class='entity-link skill-roll' data-value='$1' style='display: inline-block'> <i class="fas fa-dice-d6"></i> Roll +$1</a>`
    );
    html = html.replace(/\u002A/g, "<li>");

    return(html);
}

export async function importOracles() {
  // Map of dataforged IDs to module internal names
  const dataforgedIdMap = {
    "Oracles / Character Creation / Background Assets" : "2. Choose Two Paths",
    "Oracles / Character Creation / Backstory Prompts": "3. Create Your Backstory",
    "Oracles / Character Creation / Starship History": "5. Board Your Starship",
    "Oracles / Character Creation / Starship Quirks": "5. Envision the Starship",
    "Oracles / Misc / Anomaly Effect": "Anomaly Effect",
    "Oracles / Moves / Ask the Oracle / 50/50": "Ask the Oracle - 50/50",
    "Oracles / Moves / Ask the Oracle / Almost Certain": "Ask the Oracle - Almost Certain",
    "Oracles / Moves / Confront Chaos": "Ask the Oracle - Confront Chaos",
    "Oracles / Moves / Endure Harm": "Ask the Oracle - Endure Harm",
    "Oracles / Moves / Endure Stress": "Ask the Oracle - Endure Stress",
    "Oracles / Moves / Ask the Oracle / Likely": "Ask the Oracle - Likely",
    "Oracles / Moves / Make a Discovery": "Ask the Oracle - Make a Discovery",
    "Oracles / Moves / Pay the Price": "Ask the Oracle - Pay the Price",
    "Oracles / Moves / Ask the Oracle / Small Chance": "Ask the Oracle - Small Chance",
    "Oracles / Moves / Take Decisive Action": "Ask the Oracle - Take Decisive Action",
    "Oracles / Moves / Ask the Oracle / Unlikely": "Ask the Oracle - Unlikely",
    "Oracles / Moves / Withstand Damage": "Ask the Oracle - Withstand Damage",
    "Oracles / Characters / Name / Callsign": "Character - Callsign",
    "Oracles / Characters / Disposition": "Character - Disposition",
    "Oracles / Characters / Name / Family Name": "Character - Family Name",
    "Oracles / Characters / First Look": "Character - First Look",
    "Oracles / Characters / Name / Given Name": "Character - Given Name",
    "Oracles / Characters / Goal": "Character - Goal",
    "Oracles / Characters / Revealed Aspect": "Character - Revealed Aspect",
    "Oracles / Characters / Role": "Character - Role",
    "Oracles / Misc / Combat Action": "Combat Action",
    "Oracles / Creatures / Encountered Behavior": "Creature - Encountered Behavior",
    "Oracles / Creatures / First Look": "Creature - First Look",
    "Oracles / Creatures / Revealed Aspect": "Creature - Revealed Aspect",
    "Oracles / Creatures / Basic Form / Air": "Creatures - Basic Form - Air",
    "Oracles / Creatures / Basic Form / Interior": "Creatures - Basic Form - Interior",
    "Oracles / Creatures / Basic Form / Land": "Creatures - Basic Form - Land",
    "Oracles / Creatures / Basic Form / Liquid": "Creatures - Basic Form - Liquid",
    "Oracles / Creatures / Basic Form / Space": "Creatures - Basic Form - Space",
    "Oracles / Creatures / Environment": "Creatures - Environment",
    "Oracles / Creatures / Scale": "Creatures - Scale",
    "Oracles / Creatures / Ultra-scale": "Creatures - Ultra-Scale",
    "Oracles / Derelicts / Access / Area": "Derelict - Access - Area",
    "Oracles / Derelicts / Access / Feature": "Derelict - Access - Feature",
    "Oracles / Derelicts / Access / Opportunity": "Derelict - Access - Opportunity",
    "Oracles / Derelicts / Access / Peril": "Derelict - Access - Peril",
    "Oracles / Derelicts / Community / Area": "Derelict - Community - Area",
    "Oracles / Derelicts / Community / Feature": "Derelict - Community - Feature",
    "Oracles / Derelicts / Community / Opportunity": "Derelict - Community - Opportunity",
    "Oracles / Derelicts / Community / Peril": "Derelict - Community - Peril",
    "Oracles / Derelicts / Engineering / Area": "Derelict - Engineering - Area",
    "Oracles / Derelicts / Engineering / Feature": "Derelict - Engineering - Feature",
    "Oracles / Derelicts / Engineering / Opportunity": "Derelict - Engineering - Opportunity",
    "Oracles / Derelicts / Engineering / Peril": "Derelict - Engineering - Peril",
    "Oracles / Derelicts / Inner First Look": "Derelict - Inner First Look",
    "Oracles / Derelicts / Living / Area": "Derelict - Living - Area",
    "Oracles / Derelicts / Living / Feature": "Derelict - Living - Feature",
    "Oracles / Derelicts / Living / Opportunity": "Derelict - Living - Opportunity",
    "Oracles / Derelicts / Living / Peril": "Derelict - Living - Peril",
    "Oracles / Derelicts / Location": "Derelict - Location",
    "Oracles / Derelicts / Medical / Area": "Derelict - Medical - Area",
    "Oracles / Derelicts / Medical / Feature": "Derelict - Medical - Feature",
    "Oracles / Derelicts / Medical / Opportunity": "Derelict - Medical - Opportunity",
    "Oracles / Derelicts / Medical / Peril": "Derelict - Medical - Peril",
    "Oracles / Derelicts / Operations / Area": "Derelict - Operations - Area",
    "Oracles / Derelicts / Operations / Feature": "Derelict - Operations - Feature",
    "Oracles / Derelicts / Operations / Opportunity": "Derelict - Operations - Opportunity",
    "Oracles / Derelicts / Operations / Peril": "Derelict - Operations - Peril",
    "Oracles / Derelicts / Outer First Look": "Derelict - Outer First Look",
    "Oracles / Derelicts / Production / Area": "Derelict - Production - Area",
    "Oracles / Derelicts / Production / Feature": "Derelict - Production - Feature",
    "Oracles / Derelicts / Production / Opportunity": "Derelict - Production - Opportunity",
    "Oracles / Derelicts / Production / Peril": "Derelict - Production - Peril",
    "Oracles / Derelicts / Research / Area": "Derelict - Research - Area",
    "Oracles / Derelicts / Research / Feature": "Derelict - Research - Feature",
    "Oracles / Derelicts / Research / Opportunity": "Derelict - Research - Opportunity",
    "Oracles / Derelicts / Research / Peril": "Derelict - Research - Peril",
    "Oracles / Derelicts / Type / Deep Space": "Derelict - Type - Deep Space",
    "Oracles / Derelicts / Type / Orbital": "Derelict - Type - Orbital",
    "Oracles / Derelicts / Type / Planetside": "Derelict - Type - Planetside",
    "Oracles / Derelicts / Zone / Settlement": "Derelict Zone - Settlement",
    "Oracles / Derelicts / Zone / Starship": "Derelict Zone - Starship",
    "Oracles / Derelicts / Condition": "Derelicts - Condition",
    "Oracles / Factions / Affiliation": "Factions - Affiliation",
    "Oracles / Factions / Dominion": "Factions - Dominion",
    "Oracles / Factions / Fringe Group": "Factions - Fringe Group",
    "Oracles / Factions / Guild": "Factions - Guild",
    "Oracles / Factions / Identity": "Factions - Identity",
    "Oracles / Factions / Influence": "Factions - Influence",
    "Oracles / Factions / Leadership": "Factions - Leadership",
    "Oracles / Factions / Legacy": "Factions - Legacy",
    "Oracles / Factions / Name Template": "Factions - Name Template",
    "Oracles / Factions / Projects": "Factions - Projects",
    "Oracles / Factions / Quirks": "Factions - Quirks",
    "Oracles / Factions / Relationships": "Factions - Relationships",
    "Oracles / Factions / Rumors": "Factions - Rumors",
    "Oracles / Factions / Type": "Factions - Type",
    "Oracles / Planets / Desert / Atmosphere": "Desert World - Atmosphere",
    "Oracles / Planets / Desert / Life": "Desert World - Life",
    "Oracles / Planets / Desert / Observed From Space": "Desert World - Observed From Space",
    "Oracles / Planets / Desert / Feature": "Desert World - Planetside Feature",
    "Oracles / Planets / Desert / Settlements / Expanse": "Desert World - Settlements - Expanse",
    "Oracles / Planets / Desert / Settlements / Outlands": "Desert World - Settlements - Outlands",
    "Oracles / Planets / Desert / Settlements / Terminus": "Desert World - Settlements - Terminus",
    "Oracles / Planets / Furnace / Atmosphere": "Furnace World - Atmosphere",
    "Oracles / Planets / Furnace / Life": "Furnace World - Life",
    "Oracles / Planets / Furnace / Observed From Space": "Furnace World - Observed From Space",
    "Oracles / Planets / Furnace / Feature": "Furnace World - Planetside Feature",
    "Oracles / Planets / Furnace / Settlements / Expanse": "Furnace World - Settlements - Expanse",
    "Oracles / Planets / Furnace / Settlements / Outlands": "Furnace World - Settlements - Outlands",
    "Oracles / Planets / Furnace / Settlements / Terminus": "Furnace World - Settlements - Terminus",
    "Oracles / Planets / Grave / Atmosphere": "Grave World - Atmosphere",
    "Oracles / Planets / Grave / Life": "Grave World - Life",
    "Oracles / Planets / Grave / Observed From Space": "Grave World - Observed From Space",
    "Oracles / Planets / Grave / Feature": "Grave World - Planetside Feature",
    "Oracles / Planets / Grave / Settlements / Expanse": "Grave World - Settlements - Expanse",
    "Oracles / Planets / Grave / Settlements / Outlands": "Grave World - Settlements - Outlands",
    "Oracles / Planets / Grave / Settlements / Terminus": "Grave World - Settlements - Terminus",
    "Oracles / Planets / Ice / Atmosphere": "Ice World - Atmosphere",
    "Oracles / Planets / Ice / Life": "Ice World - Life",
    "Oracles / Planets / Ice / Observed From Space": "Ice World - Observed From Space",
    "Oracles / Planets / Ice / Feature": "Ice World - Planetside Feature",
    "Oracles / Planets / Ice / Settlements / Expanse": "Ice World - Settlements - Expanse",
    "Oracles / Planets / Ice / Settlements / Outlands": "Ice World - Settlements - Outlands",
    "Oracles / Planets / Ice / Settlements / Terminus": "Ice World - Settlements - Terminus",
    "Oracles / Character Creation / Inciting Incident": "Inciting Incident Ideas",
    "Oracles / Planets / Jovian / Atmosphere": "Jovian World - Atmosphere",
    "Oracles / Planets / Jovian / Life": "Jovian World - Life",
    "Oracles / Planets / Jovian / Observed From Space": "Jovian World - Observed From Space",
    "Oracles / Planets / Jovian / Feature": "Jovian World - Planetside Feature",
    "Oracles / Planets / Jovian / Settlements / Expanse": "Jovian World - Settlements - Expanse",
    "Oracles / Planets / Jovian / Settlements / Outlands": "Jovian World - Settlements - Outlands",
    "Oracles / Planets / Jovian / Settlements / Terminus": "Jovian World - Settlements - Terminus",
    "Oracles / Planets / Jungle / Atmosphere": "Jungle World - Atmosphere",
    "Oracles / Planets / Jungle / Life": "Jungle World - Life",
    "Oracles / Planets / Jungle / Observed From Space": "Jungle World - Observed From Space",
    "Oracles / Planets / Jungle / Feature": "Jungle World - Planetside Feature",
    "Oracles / Planets / Jungle / Settlements / Expanse": "Jungle World - Settlements - Expanse",
    "Oracles / Planets / Jungle / Settlements / Outlands": "Jungle World - Settlements - Outlands",
    "Oracles / Planets / Jungle / Settlements / Terminus": "Jungle World - Settlements - Terminus",
    "Oracles / Location Themes / Chaotic / Feature": "Location Theme - Chaotic - Feature",
    "Oracles / Location Themes / Chaotic / Opportunity": "Location Theme - Chaotic - Opportunity",
    "Oracles / Location Themes / Chaotic / Peril": "Location Theme - Chaotic - Peril",
    "Oracles / Location Themes / Fortified / Feature": "Location Theme - Fortified - Feature",
    "Oracles / Location Themes / Fortified / Opportunity": "Location Theme - Fortified - Opportunity",
    "Oracles / Location Themes / Fortified / Peril": "Location Theme - Fortified - Peril",
    "Oracles / Location Themes / Haunted / Feature": "Location Theme - Haunted - Feature",
    "Oracles / Location Themes / Haunted / Opportunity": "Location Theme - Haunted - Opportunity",
    "Oracles / Location Themes / Haunted / Peril": "Location Theme - Haunted - Peril",
    "Oracles / Location Themes / Infested / Feature": "Location Theme - Infested - Feature",
    "Oracles / Location Themes / Infested / Opportunity": "Location Theme - Infested - Opportunity",
    "Oracles / Location Themes / Infested / Peril": "Location Theme - Infested - Peril",
    "Oracles / Location Themes / Inhabited / Feature": "Location Theme - Inhabited - Feature",
    "Oracles / Location Themes / Inhabited / Opportunity": "Location Theme - Inhabited - Opportunity",
    "Oracles / Location Themes / Inhabited / Peril": "Location Theme - Inhabited - Peril",
    "Oracles / Location Themes / Mechanical / Feature": "Location Theme - Mechanical - Feature",
    "Oracles / Location Themes / Mechanical / Opportunity": "Location Theme - Mechanical - Opportunity",
    "Oracles / Location Themes / Mechanical / Peril": "Location Theme - Mechanical - Peril",
    "Oracles / Location Themes / Ruined / Feature": "Location Theme - Ruined - Feature",
    "Oracles / Location Themes / Ruined / Opportunity": "Location Theme - Ruined - Opportunity",
    "Oracles / Location Themes / Ruined / Peril": "Location Theme - Ruined - Peril",
    "Oracles / Location Themes / Sacred / Feature": "Location Theme - Sacred - Feature",
    "Oracles / Location Themes / Sacred / Opportunity": "Location Theme - Sacred - Opportunity",
    "Oracles / Location Themes / Sacred / Peril": "Location Theme - Sacred - Peril",
    "Oracles / Location Themes / Theme Type": "Location Theme - Type",
    "Oracles / Planets / Ocean / Atmosphere": "Ocean World - Atmosphere",
    "Oracles / Planets / Ocean / Life": "Ocean World - Life",
    "Oracles / Planets / Ocean / Observed From Space": "Ocean World - Observed From Space",
    "Oracles / Planets / Ocean / Feature": "Ocean World - Planetside Feature",
    "Oracles / Planets / Ocean / Settlements / Expanse": "Ocean World - Settlements - Expanse",
    "Oracles / Planets / Ocean / Settlements / Outlands": "Ocean World - Settlements - Outlands",
    "Oracles / Planets / Ocean / Settlements / Terminus": "Ocean World - Settlements - Terminus",
    // Doesn't exit in Dataforged : "Planet - Name Prefix",
    // Doesn't exist in Dataforgd : "Planet - Names 1",
    // Doesn't exist in Dataforged : "Planet - Names 2",
    // Doesn't exist in Dataforged : "Planet Name Suffix",
    "Oracles / Planets / Class": "Planetary Class",
    "Oracles / Planets / Opportunity / Lifebearing": "Planetside Opportunity - Lifebearing",
    "Oracles / Planets / Opportunity / Lifeless": "Planetside Opportunity - Lifeless",
    "Oracles / Planets / Peril / Lifebearing": "Planetside Peril - Lifebearing",
    "Oracles / Planets / Peril / Lifeless": "Planetside Peril - Lifeless",
    "Oracles / Vaults / Form": "Precursor Vault - Form",
    "Oracles / Vaults / Interior / First Look": "Precursor Vault - Inner First Look",
    "Oracles / Vaults / Interior / Feature": "Precursor Vault - Interior Feature",
    "Oracles / Vaults / Interior / Opportunity": "Precursor Vault - Interior Opportunity",
    "Oracles / Vaults / Interior / Peril": "Precursor Vault - Interior Peril",
    "Oracles / Vaults / Location": "Precursor Vault - Location",
    "Oracles / Vaults / Material": "Precursor Vault - Material",
    "Oracles / Vaults / Outer First Look": "Precursor Vault - Outer First Look",
    "Oracles / Vaults / Sanctum / Purpose": "Precursor Vault - Purpose",
    "Oracles / Vaults / Sanctum / Feature": "Precursor Vault - Sanctum Feature",
    "Oracles / Vaults / Sanctum / Opportunity": "Precursor Vault - Sanctum Opportunity",
    "Oracles / Vaults / Sanctum / Peril": "Precursor Vault - Sanctum Peril",
    "Oracles / Vaults / Scale": "Precursor Vault - Scale",
    "Oracles / Vaults / Shape": "Precursor Vault - Shape",
    "Oracles / Planets / Rocky / Atmosphere": "Rocky World - Atmosphere",
    "Oracles / Planets / Rocky / Life": "Rocky World - Life",
    "Oracles / Planets / Rocky / Observed From Space": "Rocky World - Observed From Space",
    "Oracles / Planets / Rocky / Feature": "Rocky World - Planetside Feature",
    "Oracles / Planets / Rocky / Settlements / Expanse": "Rocky World - Settlements - Expanse",
    "Oracles / Planets / Rocky / Settlements / Outlands": "Rocky World - Settlements - Outlands",
    "Oracles / Planets / Rocky / Settlements / Terminus": "Rocky World - Settlements - Terminus",
    // Does't exist in Dataforged: "Sector Location",
    "Oracles / Space / Sector Name / Prefix": "Sector Name Prefix",
    "Oracles / Space / Sector Name / Suffix": "Sector Name Suffix",
    "Oracles / Character Creation / Sector Trouble": "Sector Trouble",
    "Oracles / Settlements / Authority": "Settlement Authority",
    "Oracles / Settlements / First Look": "Settlement First Look",
    "Oracles / Settlements / Initial Contact": "Settlement Initial Contact",
    "Oracles / Settlements / Location": "Settlement Location",
    //Doesn't exist in dataforged : "Settlement Name Prefix",
    //Doesn't exist in dataforged: "Settlement Name Suffix",
    "Oracles / Settlements / Name": "Settlement Name",
    "Oracles / Settlements / Population / Expanse": "Settlement Population - Expanse",
    "Oracles / Settlements / Population / Outlands": "Settlement Population - Outlands",
    "Oracles / Settlements / Population / Terminus": "Settlement Population - Terminus",
    "Oracles / Settlements / Projects": "Settlement Projects",
    "Oracles / Settlements / Trouble": "Settlement Troubles",
    "Oracles / Planets / Shattered / Atmosphere": "Shattered World - Atmosphere",
    "Oracles / Planets / Shattered / Life": "Shattered World - Life",
    "Oracles / Planets / Shattered / Observed From Space": "Shattered World - Observed From Space",
    "Oracles / Planets / Shattered / Feature": "Shattered World - Planetside Feature",
    "Oracles / Planets / Shattered / Settlements / Expanse": "Shattered World - Settlements - Expanse",
    "Oracles / Planets / Shattered / Settlements / Outlands": "Shattered World - Settlements - Outlands",
    "Oracles / Planets / Shattered / Settlements / Terminus": "Shattered World - Settlements - Terminus",
    "Oracles / Space / Sighting / Expanse": "Space Sighting - Expanse",
    "Oracles / Space / Sighting / Outlands": "Space Sighting - Outlands",
    "Oracles / Space / Sighting / Terminus": "Space Sighting - Terminus",
    "Oracles / Space / Opportunity": "Spaceborne Opportunity",
    "Oracles / Space / Peril": "Spaceborne Peril",
    "Oracles / Core / Action": "Starforged - Action",
    "Oracles / Core / Descriptor": "Starforged - Descriptor",
    "Oracles / Core / Focus": "Starforged - Focus",
    "Oracles / Starships / Name": "Starforged - Starship Names",
    "Oracles / Core / Theme": "Starforged - Theme",
    "Oracles / Starships / First Look": "Starship - First Look",
    "Oracles / Starships / Initial Contact": "Starship - Initial Contact",
    "Oracles / Starships / Fleet": "Starship Fleet",
    "Oracles / Starships / Mission / Expanse": "Starship Mission - Expanse",
    "Oracles / Starships / Mission / Outlands": "Starship Mission - Outlands",
    "Oracles / Starships / Mission / Terminus": "Starship Mission - Terminus",
    "Oracles / Starships / Type": "Starship Type",
    "Oracles / Space / Stellar Object": "Stellar Object",
    "Oracles / Misc / Story Complication": "Story Complication",
    "Oracles / Misc / Story Clue": "Story Clue",
    "Oracles / Planets / Tainted / Atmosphere": "Tainted World - Atmosphere",
    "Oracles / Planets / Tainted / Life": "Tainted World - Life",
    "Oracles / Planets / Tainted / Observed From Space": "Tainted World - Observed From Space",
    "Oracles / Planets / Tainted / Feature": "Tainted World - Planetside Feature",
    "Oracles / Planets / Tainted / Settlements / Expanse": "Tainted World - Settlements - Expanse",
    "Oracles / Planets / Tainted / Settlements / Outlands": "Tainted World - Settlements - Outlands",
    "Oracles / Planets / Tainted / Settlements / Terminus": "Tainted World - Settlements - Terminus",
    "Oracles / Planets / Vital / Atmosphere": "Vital World - Atmosphere",
    "Oracles / Planets / Vital / Biomes": "Vital World - Biomes",
    "Oracles / Planets / Vital / Diversity": "Vital World - Diversity",
    "Oracles / Planets / Vital / Life": "Vital World - Life",
    "Oracles / Planets / Vital / Observed From Space": "Vital World - Observed From Space",
    "Oracles / Planets / Vital / Feature": "Vital World - Planetside Feature",
    "Oracles / Planets / Vital / Settlements / Expanse": "Vital World - Settlements - Expanse",
    "Oracles / Planets / Vital / Settlements / Outlands": "Vital World - Settlements - Outlands",
    "Oracles / Planets / Vital / Settlements / Terminus": "Vital World - Settlements - Terminus"
  // Doesn't exist in Dataforged : "d100 Table Template"
    // TODO: Add faction oracles
  };

  let oraclesJson = await fetch('/systems/starforged/dataforged-main/starforged-oracles.json').then(x => x.json());
  let oracleJsonString = await JSON.stringify(oraclesJson);
  // Remove ⏵ from JSON as it breaks case statements in other parts of the code
  oracleJsonString = await oracleJsonString.replaceAll("⏵", "");
  oraclesJson = await JSON.parse(oracleJsonString);
  
  let oracleTables = [];
  const pack = await game.packs.get("starforged.starforged-tables");
  const index = await pack.getIndex();

  const updateOracleTable = async (oracle) => {
    if (oracle["$id"] in dataforgedIdMap) {

      const table_name = dataforgedIdMap[oracle["$id"]];
      const tableResultDataList = [];

      for (let t of oracle.Table){
        tableResultDataList.push({
          type: CONST.TABLE_RESULT_TYPES.TEXT,
          text: t.Result,
          weight: t.Ceiling - t.Floor + 1,
          range: [t.Floor, t.Ceiling]
        });
      }
  
      let rollTableData = {
        name: table_name,
        description: oracle.Name,
        results: tableResultDataList,
        formula: "1d100"
      };

      const findResult = await index.find( i => i.name === table_name );
      if (typeof findResult !== "undefined") {
        const table = await pack.getDocument(findResult._id);
        rollTableData.description = table.data.description;
        await table.delete();
      }
      return await pack.documentClass.create ( rollTableData, {pack: pack.collection});
    }

    return null;
  }

  const isObject = (value) => {
    return !!(value && typeof value === "object");
  };

  const iterateTable = (object = {}) => {
    if (isObject(object)) {
      const entries = Object.entries(object);
  
      for (let i = 0; i < entries.length; i += 1) {
        const [objectKey, objectValue] = entries[i];
  
        if (objectKey === "Table" ) {
          updateOracleTable(object);
        }
  
        if (isObject(objectValue)) {
          const child = iterateTable(objectValue);
  
          if (child !== null) {
            return child;
          }
        }
      }
    }
  
    return null;
  };

  await iterateTable(oraclesJson);
}

// TODO: Refactor duplicate code, especially TableResult code
export async function importTruths() {
  const truthsJson = await fetch('/systems/starforged/dataforged-main/starforged-setting_truths.json').then(x => x.json());

  const truths = [];
  let i = 1;
  for ( const truth of truthsJson["Setting Truths"] ) {
    let truth_num = i.toString().padStart(2, '0');
    let truth_name =  `${truth_num}. ${truth.Name}`;

    let j = 1;
    let prevRange = 1;
    const tableResults = [];
    for ( const table of truth.Table ) {
      
      // Deal with inner tables in Truths
      let innerPrevRange = 1;
      const innerTableResults = [];

      let innerTables = (table.Table) ? table.Table : [];
      for ( const innerTable of innerTables ) {
        let innerTableResultData = {
          type: CONST.TABLE_RESULT_TYPES.TEXT,
          text: innerTable.Description,
          weight: innerTable.Chance - innerPrevRange + 1,
          range: [innerPrevRange, innerTable.Chance]
        };
        innerTableResults.push(innerTableResultData);
        innerPrevRange = innerTable.Chance + 1
      }

      let innerTableDesc = "";
      if (innerTableResults.length != 0){
        let innerTableName = `${truth_num}.${j} ${truth.Name}`;
        innerTableDesc = ` [${innerTableName}]`;
        truths.push({
          name: innerTableName,
          description: `Your Truths - ${truth.Name}`,
          results: innerTableResults,
          formula: "1d100"
        })
      }

      let tableResultData = {
        type: CONST.TABLE_RESULT_TYPES.TEXT,
        // TODO: Deal with innerTableDesc result in arbitrary location a la Setting Truths / Artificial Intelligence / 1-33
        text: `<p><strong>${table.Description}</strong></p> <p>${table.Details}${innerTableDesc}</p> <p><em>Quest Starter: ${table["Quest Starter"]}</em></p>`,
        weight: table.Chance - prevRange + 1,
        range: [prevRange, table.Chance]
      };
      tableResults.push(tableResultData)
      prevRange = table.Chance + 1
      j += 1;
    }

    truths.push({
      name: truth_name,
      description: `Your Truths - ${truth.Name}`,
      results: tableResults,
      formula: "1d100"
    })
    i += 1;
  }

  const rollTable = game.packs.get('starforged.starforged-tables');
  const index = await rollTable.getIndex();
  for ( const truth of truths ) {
    let findResult = await index.find( i => i.name === truth.name );
    if (typeof findResult !== "undefined") {
      const table = await rollTable.getDocument(findResult._id);
      await table.delete();
    }

    await rollTable.documentClass.create (truth, {pack: rollTable.collection});
  }

}

export async function importAssets() {
    const assetssJson = await fetch('/systems/starforged/dataforged-main/starforged-assets.json').then(x => x.json());
  
    const assets = [];
    for ( const asset of assetssJson.Assets ) {
  
      let type = asset["Asset Type"];
      let name = "";
      let condition = asset.Description != undefined ? asset.Description : "";
      let special1 = "";
      let special2 = "";
      let ability1 = await replaceHTML(asset.Abilities[0].Text);
      let ability2 = await replaceHTML(asset.Abilities[1].Text);
      let ability3 = await replaceHTML(asset.Abilities[2].Text);
      let trackEnabled = asset.Track != undefined ? true : false;
      let trackMax = trackEnabled ? asset.Track.Value : 5;
      let batteredEnabled = type.includes("Vehicle") ? true : false;
      let cursedEnabled = type.includes("Vehicle") ? true : false;
      let outOfActionEnabled = type.includes("Companion") ? true : false;

      if ( asset.Fields ) {
        for ( const field of asset.Fields ) {
          switch (field) {
            case "Name": name = "Enter Name Here"; break;
            default:
            if ( special1 !== "" ) { special2 = field; }
            else { special1 = field }
          }
        }
      }

      const moves = await game.packs.get('starforged.starforged-moves');
      for ( const move of moves ) {
          let moveName = move.data.name;
          if ( ability1.includes(moveName)) { 
              if ( !ability1.includes("[" + moveName + "]") ) { ability1 = ability1.replace(moveName,"[" + moveName + "]"); }}
          if ( ability2.includes(moveName)) { 
              if ( !ability2.includes("[" + moveName + "]") ) { ability2 = ability2.replace(moveName,"[" + moveName + "]"); }}
          if ( ability3.includes(moveName)) { 
              if ( !ability3.includes("[" + moveName + "]") ) { ability3 = ability3.replace(moveName,"[" + moveName + "]"); }}
      }
  
      assets.push({
        name: asset.Name,
        type: "asset",
        data: {
          type: type,
          name: name,
          condition: condition,
          special1: special1,
          special2: special2,
          abilities: {
            ability1: {
              enabled: true,
              details: ability1
            },
            ability2: {
              enabled: false,
              details: ability2
            },
            ability3: {
              enabled: false,
              details: ability3
            }
          },
          track: {
            enabled: trackEnabled,
            value: trackMax,
            min: 0,
            max: trackMax
          },
          battered: {
            enabled: batteredEnabled,
            value: false
          },
          cursed: {
            enabled: cursedEnabled,
            value: false
          },
          outOfAction: {
            enabled: outOfActionEnabled,
            value: false
          }
        }
      });
    }

    const assetsCompendium = game.packs.get('starforged.starforged-assets')
    for ( const asset of assets ) {
        await assetsCompendium.documentClass.create (
          asset, {pack: assetsCompendium.collection} );
    }

    for ( const asset of assetsCompendium) {
      let ability1 = await replaceMove(asset.data.data.abilities.ability1.details, "");
      let ability2 = await replaceMove(asset.data.data.abilities.ability2.details, "");
      let ability3 = await replaceMove(asset.data.data.abilities.ability3.details, "");

      await asset.update( {
          data: {
              abilities: {
                ability1: { details: ability1 },
                ability2: { details: ability2 },
                ability3: { details: ability3 }
              }
          }
      })
    }
}

export async function importMoves () {
  const movesJson = await fetch('/systems/starforged/dataforged-main/starforged-moves.json').then(x => x.json());

  const moves = [];
  for ( const category of movesJson ) {

    for ( const move of category.Moves ) {
      let description = "";
      let strongHit = "";
      let weakHit = "";
      let miss = "";
      let currentLine = "description";
  
      var lines = move.Text.split('\n');
  
      for ( let i = 0; i <= lines.length; i++ ) {
          if ( lines[i] != undefined ) {
              if ( lines[i].includes("**strong hit**") ) {
                currentLine = "strong hit";
              }
              else if ( lines[i].includes("**weak hit**") ) {
                currentLine = "weak hit";
              }
              else if ( lines[i].includes("**miss**") ) {
                currentLine = "miss";
              }
                              
              let newLine = "<p>" + replaceHTML(lines[i]).trim() + "</p>";
              let oldLine = currentLine;
              if ( newLine.includes("<p>&nbsp;</p>") || newLine === "<p> </p>" || newLine.includes("|") ) { 
                  oldLine = currentLine; 
                  currentLine = "skip"; 
              }
  
              switch ( currentLine ) {
                case "description":
                      description += newLine;
                      break;
                  case "strong hit":
                      strongHit += newLine;
                      break;
                  case "weak hit":
                      weakHit += newLine;
                      break;
                  case "miss":
                      miss += newLine;
                      break;
              }
  
              currentLine = currentLine === "skip" ? oldLine : currentLine;
          }
      }
      moves.push({
        id: move.$id,
        name: move.Name,
        type: "move",
        moveType: category.Name, // move.Category.substring(0,(move.Category.length - 6)),
        description: description,
        strongHit: strongHit,
        weakHit: weakHit,
        miss: miss
      });
  
    }    
  }

  const movesCompendium = game.packs.get('starforged.starforged-moves')
  for ( const move of moves ) {
      await movesCompendium.documentClass.create ({
          _id: move.id,
          name: move.name,
          type: move.type,
          data: {
            id: move.id,
            moveType: move.moveType.toLowerCase(),
            description: move.description,
            strongHit: move.strongHit,
            weakHit: move.weakHit,
            miss: move.miss
          }          
      }, {pack: movesCompendium.collection, keepId: true} );
  }

  for ( const move of movesCompendium) {
      let newId = await replaceMove(move.data.data.id, move.name);
      let newDescription = await replaceMove(move.data.data.description, move.name);
      let newStrongHit = await replaceMove(move.data.data.strongHit, move.name);
      let newWeakHit = await replaceMove(move.data.data.weakHit, move.name);
      let newMiss = await replaceMove(move.data.data.miss, move.name);

      await move.update( {
          data: {
              id: newId,
              description: newDescription,
              strongHit: newStrongHit,
              weakHit: newWeakHit,
              miss: newMiss
          }
      })
      console.log(move);
  }
}

async function replaceMove(text, moveName){ 
  while ( text.includes(" [") ) {
    let start = text.indexOf(" [");
    let end = text.indexOf("]") + 1;
    let regEx = text.slice(start, end);

    let move = text.slice(start + 2, end - 1);

    const pack = await game.packs.get('starforged.starforged-moves');
    const packMove = pack.getName(move);
    const name = packMove.name;
    const id = packMove.id;

    const link = ` <a class='entity-link' data-pack="starforged.starforged-moves" data-id='` + id + `' style='display: inline-block'><i class="fas fa-suitcase"></i> ` + name + `</a>`;
    // const link = ` @Item[` + id + `]{` + name + `}`;

    text = text.replace(regEx, link);

    let remove = "(#" + move + ")";
    while ( remove.includes(" ") ){ remove = remove.replace(" ", "-"); }
    text = text.replace(remove, "");
  }

  while ( text.includes("<p></p>")) { text = text.replace("<p></p>", "" ); }
  while ( text.includes("<p>&nbsp;</p>")) { text = text.replace("<p>&nbsp;</p>", "" ); }
  while ( text.includes("</p><p><li>")) { text = text.replace("</p><p><li>", "<li>"); }
  while ( text.includes("(<")) { text = text.replace("(<", "<"); }
  while ( text.includes(">)")) { text = text.replace(">)", ">"); }
  text = text.replace("+edge", "+EDGE");
  text = text.replace("+heart", "+HEART");
  text = text.replace("+iron", "+IRON");
  text = text.replace("+shadow", "+SHADOW");
  text = text.replace("+wits", "+WITS");
  text = text.replace("+health", "+HEALTH");
  text = text.replace("+spirit", "+SPIRIT");
  text = text.replace("+supply", "+SUPPLY");

  if ( text.includes("table below") ) {
    if ( moveName === "Ask the Oracle" ) {
        text += "<p><a class='entity-link' data-entity='Macro' data-id='XuVxjTgsEGmQr44q'><i class='fas fa-terminal'></i> Ask the Oracle - Almost Certain</a></p>";
        text += "<p><a class='entity-link' data-entity='Macro' data-id='xg0tZXwTdrzvaMbB'><i class='fas fa-terminal'></i> Ask the Oracle - Likely</a></p>";
        text += "<p><a class='entity-link' data-entity='Macro' data-id='wasKK2NIAla4EV72'><i class='fas fa-terminal'></i> Ask the Oracle - 50/50</a></p>";
        text += "<p><a class='entity-link' data-entity='Macro' data-id='9Q2yn5Qae0ExvNs3'><i class='fas fa-terminal'></i> Ask the Oracle - Unlikely</a></p>";
        text += "<p><a class='entity-link' data-entity='Macro' data-id='cZHvuImdyVTq1Gqa'><i class='fas fa-terminal'></i> Ask the Oracle - Small Chance</a></p>";
    }
    else {
        //TODO: Implement these macros later
        //let macro = await game.macros.getName(moveName);
        //text += "<p>" + "<a class='entity-link' data-entity='Macro' data-id='" + macro.id + "'><i class='fas fa-terminal'></i> Ask the Oracle - " + moveName + "</a></p>";
    }

  }

  return text;
}