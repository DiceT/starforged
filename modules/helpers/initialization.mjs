export async function initializeFolders() {

    let folderList = [];
    folderList.push("- Starforged Core Tables -");
    folderList.push("= Ask the Oracle =");
    folderList.push("= Your Truths =");
    folderList.push("= Create Your Character =");

    let masterFolder = "";
    let masterFolderID = "";
    let parentFolder = "";
    let parentFolderID = "";

    for ( let currentFolder of folderList ) {
        if ( await game.folders.getName(currentFolder) == undefined ) {
            if ( currentFolder.charAt(0) == "-" ) {
                masterFolder = currentFolder;
                await Folder.create({name: masterFolder, type: "RollTable"});
                masterFolderID = await game.folders.getName(masterFolder).id;
                parentFolderID = masterFolderID;
            }
            else if ( currentFolder.charAt(0) == "=" ) {
                parentFolder = currentFolder;
                await Folder.create({name: parentFolder, type: "RollTable", parent: masterFolderID});
                parentFolderID = await game.folders.getName(parentFolder).id;
            }
            else {
                await Folder.create({name: currentFolder, type: "RollTable", parent: parentFolderID});
            }
        }
        else {
            if ( currentFolder.charAt(0) == "-" ) {
                masterFolder = currentFolder;
                masterFolderID = await game.folders.getName(masterFolder).id;
                parentFolderID = masterFolderID;
            }
            else if ( currentFolder.charAt(0) == "=" ) {
                parentFolder = currentFolder;
                parentFolderID = await game.folders.getName(parentFolder).id;
            }
        }
    }
    
    folderList = [];
    folderList.push("- Starforged Oracle Tables -");
    folderList.push("[ Actions ]");
    folderList.push("[ Anomaly Effects ]");
    folderList.push("[ Combat Actions ]");
    folderList.push("[ Descriptors ]");
    folderList.push("[ Foci ]");
    folderList.push("[ Themes ]");
    folderList.push("[ Story Complications ]");
    folderList.push("= Characters =");
    folderList.push("[ Characters - Callsigns ]");
    folderList.push("[ Characters - Dispositions ]");
    folderList.push("[ Characters - Family Names ]");
    folderList.push("[ Characters - First Looks ]");
    folderList.push("[ Characters - Given Names ]");
    folderList.push("[ Characters - Goals ]");
    folderList.push("[ Characters - Revealed Aspects ]");
    folderList.push("[ Characters - Roles ]");
    folderList.push("= Creatures =");
    folderList.push("[ Creatures - Encountered Behaviors ]");
    folderList.push("[ Creatures - First Looks ]");
    folderList.push("[ Creatures - Revealed Aspects ]");
    folderList.push("= Derelicts =");
    folderList.push("[ Derelicts - Conditions ]");
    folderList.push("[ Derelicts - Inner First Looks ]");
    folderList.push("[ Derelicts - Outer First Looks ]");
    folderList.push("[ Derelicts - Zones - Settlements ]");
    folderList.push("[ Derelicts - Zones - Starships ]");
    folderList.push("Derelict - Access");
    folderList.push("Derelict - Community");
    folderList.push("Derelict - Engineering");
    folderList.push("Derelict - Living");
    folderList.push("Derelict - Medical");
    folderList.push("Derelict - Operations");
    folderList.push("Derelict - Production");
    folderList.push("Derelict - Research");
    folderList.push("= Location Themes =");
    folderList.push("[ Location Themes - Types ]");
    folderList.push("Location Theme - Chaotic");
    folderList.push("Location Theme - Fortified");
    folderList.push("Location Theme - Haunted");
    folderList.push("Location Theme - Infested");
    folderList.push("Location Theme - Inhabited");
    folderList.push("Location Theme - Ruined");
    folderList.push("Location Theme - Sacred");
    folderList.push("= Planets =");
    folderList.push("[ Planetary Classes ]");
    folderList.push("[ Planets - Name Prefixes ]");
    folderList.push("[ Planets - Name Suffixes ]");
    folderList.push("[ Planets - Names ]");
    folderList.push("[ Planetside Opportunities - Lifebearing ]");
    folderList.push("[ Planetside Opportunities - Lifeless ]");
    folderList.push("[ Planetside Perils - Lifebearing ]");
    folderList.push("[ Planetside Perils - Lifeless ]");
    folderList.push("Desert World");
    folderList.push("Furnace World");
    folderList.push("Grave World");
    folderList.push("Ice World");
    folderList.push("Jovian World");
    folderList.push("Jungle World");
    folderList.push("Ocean World");
    folderList.push("Rocky World");
    folderList.push("Shattered World");
    folderList.push("Tainted World");
    folderList.push("Vital World");
    folderList.push("= Precursor Vaults =");
    folderList.push("[ Precursor Vaults - Inner First Looks ]");
    folderList.push("[ Precursor Vaults - Interior Features ]");
    folderList.push("[ Precursor Vaults - Interior Opportunities ]");
    folderList.push("[ Precursor Vaults - Interior Perils ]");
    folderList.push("[ Precursor Vaults - Outer First Looks ]");
    folderList.push("[ Precursor Vaults - Sanctum Features ]");
    folderList.push("[ Precursor Vaults - Sanctum Opportunities ]");
    folderList.push("[ Precursor Vaults - Sanctum Perils ]");
    folderList.push("[ Precursor Vaults - Purposes ]");
    folderList.push("= Sectors =");
    folderList.push("[ Sectors - Name Prefixes ]");
    folderList.push("[ Sectors - Name Suffixes ]");
    folderList.push("[ Sector Troubles ]");
    folderList.push("= Settlements =");
    folderList.push("[ Settlements - Name Prefixes ]");
    folderList.push("[ Settlements - Name Suffixes ]");
    folderList.push("[ Settlements - Names ]");
    folderList.push("[ Settlements - First Looks ]");
    folderList.push("[ Settlements - Initial Contacts ]");
    folderList.push("[ Settlements - Projects ]");
    folderList.push("[ Settlements - Troubles ]");
    folderList.push("= Space =");
    folderList.push("[ Space Sightings - Expanse ]");
    folderList.push("[ Space Sightings - Outlands ]");
    folderList.push("[ Space Sightings - Terminus ]");
    folderList.push("[ Spaceborne Opportunities ]");
    folderList.push("[ Spaceborne Perils ]");
    folderList.push("[ Stellar Objects ]");
    folderList.push("= Starships =");
    folderList.push("[ Starships - First Looks ]");
    folderList.push("[ Starships - Fleets ]");
    folderList.push("[ Starships - Initial Contacts ]");
    folderList.push("[ Starships - Missions - Expanse ]");
    folderList.push("[ Starships - Missions - Outlands ]");
    folderList.push("[ Starships - Missions - Terminus ]");
    folderList.push("[ Starships - Names ]");
    folderList.push("[ Starships - Types ]");

    masterFolder = "";
    masterFolderID = "";
    parentFolder = "";
    parentFolderID = "";

    for ( let currentFolder of folderList ) {
        if ( await game.folders.getName(currentFolder) == undefined ) {
            if ( currentFolder.charAt(0) == "-" ) {
                masterFolder = currentFolder;
                await Folder.create({name: masterFolder, type: "RollTable"});
                masterFolderID = await game.folders.getName(masterFolder).id;
                parentFolderID = masterFolderID;
            }
            else if ( currentFolder.charAt(0) == "=" ) {
                parentFolder = currentFolder;
                await Folder.create({name: parentFolder, type: "RollTable", parent: masterFolderID});
                parentFolderID = await game.folders.getName(parentFolder).id;
            }
            else {
                await Folder.create({name: currentFolder, type: "RollTable", parent: parentFolderID});
            }
        }
        else {
            if ( currentFolder.charAt(0) == "-" ) {
                masterFolder = currentFolder;
                masterFolderID = await game.folders.getName(masterFolder).id;
                parentFolderID = masterFolderID;
            }
            else if ( currentFolder.charAt(0) == "=" ) {
                parentFolder = currentFolder;
                parentFolderID = await game.folders.getName(parentFolder).id;
            }
        }
    };
}


export async function initializeRollTables() {
    let tables = [];

    tables.push( {table: "01. Cataclysm", folder: "= Your Truths ="} );
    tables.push( {table: "01.1 Cataclysm", folder: "= Your Truths ="} );
    tables.push( {table: "01.2 Cataclysm", folder: "= Your Truths ="} );
    tables.push( {table: "01.3 Cataclysm", folder: "= Your Truths ="} );
    tables.push( {table: "02. Exodus", folder: "= Your Truths ="} );
    tables.push( {table: "03. Communities", folder: "= Your Truths ="} );
    tables.push( {table: "04. Iron", folder: "= Your Truths ="} );
    tables.push( {table: "05. Laws", folder: "= Your Truths ="} );
    tables.push( {table: "06. Religion", folder: "= Your Truths ="} );
    tables.push( {table: "07. Magic", folder: "= Your Truths ="} );
    tables.push( {table: "07.2 Magic", folder: "= Your Truths ="} );
    tables.push( {table: "08. Communication and Data", folder: "= Your Truths ="} );
    tables.push( {table: "09. Medicine", folder: "= Your Truths ="} );
    tables.push( {table: "10. Artificial Intelligence", folder: "= Your Truths ="} );
    tables.push( {table: "10.1 Artificial Intelligence", folder: "= Your Truths ="} );
    tables.push( {table: "11. War", folder: "= Your Truths ="} );
    tables.push( {table: "12. Lifeforms", folder: "= Your Truths ="} );
    tables.push( {table: "13. Precursors", folder: "= Your Truths ="} );
    tables.push( {table: "14. Horrors", folder: "= Your Truths ="} );
    
    tables.push( {table: "2. Choose Two Paths", folder: "= Create Your Character ="} );
    tables.push( {table: "3. Create Your Backstory", folder: "= Create Your Character ="} );
    tables.push( {table: "5. Board Your Starship", folder: "= Create Your Character ="} );
    tables.push( {table: "5. Envision the Starship", folder: "= Create Your Character ="} );
    tables.push( {table: "Inciting Incident Ideas", folder: "= Create Your Character ="} );

    tables.push( {table: "Ask the Oracle - 50/50", folder: "= Ask the Oracle ="} );
    tables.push( {table: "Ask the Oracle - Almost Certain", folder: "= Ask the Oracle ="} );
    tables.push( {table: "Ask the Oracle - Confront Chaos", folder: "= Ask the Oracle ="} );
    tables.push( {table: "Ask the Oracle - Endure Harm", folder: "= Ask the Oracle ="} );
    tables.push( {table: "Ask the Oracle - Endure Stress", folder: "= Ask the Oracle ="} );
    tables.push( {table: "Ask the Oracle - Likely", folder: "= Ask the Oracle ="} );
    tables.push( {table: "Ask the Oracle - Make a Discovery", folder: "= Ask the Oracle ="} );
    tables.push( {table: "Ask the Oracle - Pay the Price", folder: "= Ask the Oracle ="} );
    tables.push( {table: "Ask the Oracle - Small Chance", folder: "= Ask the Oracle ="} );
    tables.push( {table: "Ask the Oracle - Take Decisive Action", folder: "= Ask the Oracle ="} );
    tables.push( {table: "Ask the Oracle - Unlikely", folder: "= Ask the Oracle ="} );
    tables.push( {table: "Ask the Oracle - Withstand Damage", folder: "= Ask the Oracle ="} );

    tables.push( {table: "Starforged - Action", folder: "[ Actions ]"} );
    tables.push( {table: "Anomaly Effect", folder: "[ Anomaly Effects ]"} );
    tables.push( {table: "Combat Action", folder: "[ Combat Actions ]"} );
    tables.push( {table: "Starforged - Descriptor", folder: "[ Descriptors ]"} );
    tables.push( {table: "Starforged - Focus", folder: "[ Foci ]"} );
    tables.push( {table: "Story Complication", folder: "[ Story Complications ]"} );
    tables.push( {table: "Starforged - Theme", folder: "[ Themes ]"} );

    tables.push( {table: "Character - Callsign", folder: "[ Characters - Callsigns ]"} );
    tables.push( {table: "Character - Disposition", folder: "[ Characters - Dispositions ]"} );
    tables.push( {table: "Character - Family Name", folder: "[ Characters - Family Names ]"} );
    tables.push( {table: "Character - First Look", folder: "[ Characters - First Looks ]"} );
    tables.push( {table: "Character - Given Name", folder: "[ Characters - Given Names ]"} );
    tables.push( {table: "Character - Goal", folder: "[ Characters - Goals ]"} );
    tables.push( {table: "Character - Revealed Aspect", folder: "[ Characters - Revealed Aspects ]"} );
    tables.push( {table: "Character - Role", folder: "[ Characters - Roles ]"} );

    tables.push( {table: "Creature - Encountered Behavior", folder: "[ Creatures - Encountered Behaviors ]"} );
    tables.push( {table: "Creature - First Look", folder: "[ Creatures - First Looks ]"} );
    tables.push( {table: "Creature - Revealed Aspect", folder: "[ Creatures - Revealed Aspects ]"} );
    tables.push( {table: "Creatures - Basic Form - Air", folder: "= Creatures ="} );
    tables.push( {table: "Creatures - Basic Form - Interior", folder: "= Creatures ="} );
    tables.push( {table: "Creatures - Basic Form - Land", folder: "= Creatures ="} );
    tables.push( {table: "Creatures - Basic Form - Liquid", folder: "= Creatures ="} );
    tables.push( {table: "Creatures - Basic Form - Space", folder: "= Creatures ="} );
    tables.push( {table: "Creatures - Environment", folder: "= Creatures ="} );
    tables.push( {table: "Creatures - Scale", folder: "= Creatures ="} );
    tables.push( {table: "Creatures - Ultra-Scale", folder: "= Creatures ="} );

    tables.push( {table: "Derelicts - Condition", folder: "[ Derelicts - Conditions ]"} );
    tables.push( {table: "Derelict - Inner First Look", folder: "[ Derelicts - Inner First Looks ]"} );
    tables.push( {table: "Derelict - Outer First Look", folder: "[ Derelicts - Outer First Looks ]"} );
    tables.push( {table: "Derelict Zone - Settlement", folder: "[ Derelicts - Zones - Settlements ]"} );
    tables.push( {table: "Derelict Zone - Starship", folder: "[ Derelicts - Zones - Starships ]"} );
    tables.push( {table: "Derelict - Location", folder: "= Derelicts ="} );
    tables.push( {table: "Derelict - Type - Planetside", folder: "= Derelicts ="} );
    tables.push( {table: "Derelict - Type - Orbital", folder: "= Derelicts ="} );
    tables.push( {table: "Derelict - Type - Deep Space", folder: "= Derelicts ="} );

    tables.push( {table: "Derelict - Access - Area", folder: "Derelict - Access"} );
    tables.push( {table: "Derelict - Access - Feature", folder: "Derelict - Access"} );
    tables.push( {table: "Derelict - Access - Opportunity", folder: "Derelict - Access"} );
    tables.push( {table: "Derelict - Access - Peril", folder: "Derelict - Access"} );
    tables.push( {table: "Derelict - Community - Area", folder: "Derelict - Community"} );
    tables.push( {table: "Derelict - Community - Feature", folder: "Derelict - Community"} );
    tables.push( {table: "Derelict - Community - Opportunity", folder: "Derelict - Community"} );
    tables.push( {table: "Derelict - Community - Peril", folder: "Derelict - Community"} );
    tables.push( {table: "Derelict - Engineering - Area", folder: "Derelict - Engineering"} );
    tables.push( {table: "Derelict - Engineering - Feature", folder: "Derelict - Engineering"} );
    tables.push( {table: "Derelict - Engineering - Opportunity", folder: "Derelict - Engineering"} );
    tables.push( {table: "Derelict - Engineering - Peril", folder: "Derelict - Engineering"} );
    tables.push( {table: "Derelict - Living - Area", folder: "Derelict - Living"} );
    tables.push( {table: "Derelict - Living - Feature", folder: "Derelict - Living"} );
    tables.push( {table: "Derelict - Living - Opportunity", folder: "Derelict - Living"} );
    tables.push( {table: "Derelict - Living - Peril", folder: "Derelict - Living"} );
    tables.push( {table: "Derelict - Medical - Area", folder: "Derelict - Medical"} );
    tables.push( {table: "Derelict - Medical - Feature", folder: "Derelict - Medical"} );
    tables.push( {table: "Derelict - Medical - Opportunity", folder: "Derelict - Medical"} );
    tables.push( {table: "Derelict - Medical - Peril", folder: "Derelict - Medical"} );
    tables.push( {table: "Derelict - Operations - Area", folder: "Derelict - Operations"} );
    tables.push( {table: "Derelict - Operations - Feature", folder: "Derelict - Operations"} );
    tables.push( {table: "Derelict - Operations - Opportunity", folder: "Derelict - Operations"} );
    tables.push( {table: "Derelict - Operations - Peril", folder: "Derelict - Operations"} );
    tables.push( {table: "Derelict - Production - Area", folder: "Derelict - Production"} );
    tables.push( {table: "Derelict - Production - Feature", folder: "Derelict - Production"} );
    tables.push( {table: "Derelict - Production - Opportunity", folder: "Derelict - Production"} );
    tables.push( {table: "Derelict - Production - Peril", folder: "Derelict - Production"} );
    tables.push( {table: "Derelict - Research - Area", folder: "Derelict - Research"} );
    tables.push( {table: "Derelict - Research - Feature", folder: "Derelict - Research"} );
    tables.push( {table: "Derelict - Research - Opportunity", folder: "Derelict - Research"} );
    tables.push( {table: "Derelict - Research - Peril", folder: "Derelict - Research"} );

    tables.push( {table: "Location Theme - Type", folder: "[ Location Themes - Types ]"} );
    tables.push( {table: "Location Theme - Chaotic - Feature", folder: "Location Theme - Chaotic"} );
    tables.push( {table: "Location Theme - Chaotic - Opportunity", folder: "Location Theme - Chaotic"} );
    tables.push( {table: "Location Theme - Chaotic - Peril", folder: "Location Theme - Chaotic"} );
    tables.push( {table: "Location Theme - Fortified - Feature", folder: "Location Theme - Fortified"} );
    tables.push( {table: "Location Theme - Fortified - Opportunity", folder: "Location Theme - Fortified"} );
    tables.push( {table: "Location Theme - Fortified - Peril", folder: "Location Theme - Fortified"} );
    tables.push( {table: "Location Theme - Haunted - Feature", folder: "Location Theme - Haunted"} );
    tables.push( {table: "Location Theme - Haunted - Opportunity", folder: "Location Theme - Haunted"} );
    tables.push( {table: "Location Theme - Haunted - Peril", folder: "Location Theme - Haunted"} );
    tables.push( {table: "Location Theme - Infested - Feature", folder: "Location Theme - Infested"} );
    tables.push( {table: "Location Theme - Infested - Opportunity", folder: "Location Theme - Infested"} );
    tables.push( {table: "Location Theme - Infested - Peril", folder: "Location Theme - Infested"} );
    tables.push( {table: "Location Theme - Inhabited - Feature", folder: "Location Theme - Inhabited"} );
    tables.push( {table: "Location Theme - Inhabited - Opportunity", folder: "Location Theme - Inhabited"} );
    tables.push( {table: "Location Theme - Inhabited - Peril", folder: "Location Theme - Inhabited"} );
    tables.push( {table: "Location Theme - Ruined - Feature", folder: "Location Theme - Ruined"} );
    tables.push( {table: "Location Theme - Ruined - Opportunity", folder: "Location Theme - Ruined"} );
    tables.push( {table: "Location Theme - Ruined - Peril", folder: "Location Theme - Ruined"} );
    tables.push( {table: "Location Theme - Sacred - Feature", folder: "Location Theme - Sacred"} );
    tables.push( {table: "Location Theme - Sacred - Opportunity", folder: "Location Theme - Sacred"} );
    tables.push( {table: "Location Theme - Sacred - Peril", folder: "Location Theme - Sacred"} );

    tables.push( {table: "Planetary Class", folder: "[ Planetary Classes ]"} );
    tables.push( {table: "Planet - Name Prefix", folder: "[ Planets - Name Prefixes ]"} );
    tables.push( {table: "Planet Name Suffix", folder: "[ Planets - Name Suffixes ]"} );
    tables.push( {table: "Planet - Names 1", folder: "[ Planets - Names ]"} );
    tables.push( {table: "Planet - Names 2", folder: "[ Planets - Names ]"} );
    tables.push( {table: "Planetside Opportunity - Lifebearing", folder: "[ Planetside Opportunities - Lifebearing ]"} );
    tables.push( {table: "Planetside Opportunity - Lifeless", folder: "[ Planetside Opportunities - Lifeless ]"} );
    tables.push( {table: "Planetside Peril - Lifebearing", folder: "[ Planetside Perils - Lifebearing ]"} );
    tables.push( {table: "Planetside Peril - Lifeless", folder: "[ Planetside Perils - Lifeless ]"} );

    tables.push( {table: "Desert World - Atmosphere", folder: "Desert World"} );
    tables.push( {table: "Desert World - Life", folder: "Desert World"} );
    tables.push( {table: "Desert World - Observed From Space", folder: "Desert World"} );
    tables.push( {table: "Desert World - Planetside Feature", folder: "Desert World"} );
    tables.push( {table: "Desert World - Settlements - Expanse", folder: "Desert World"} );
    tables.push( {table: "Desert World - Settlements - Outlands", folder: "Desert World"} );
    tables.push( {table: "Desert World - Settlements - Terminus", folder: "Desert World"} );
    tables.push( {table: "Furnace World - Atmosphere", folder: "Furnace World"} );
    tables.push( {table: "Furnace World - Life", folder: "Furnace World"} );
    tables.push( {table: "Furnace World - Observed From Space", folder: "Furnace World"} );
    tables.push( {table: "Furnace World - Planetside Feature", folder: "Furnace World"} );
    tables.push( {table: "Furnace World - Settlements - Expanse", folder: "Furnace World"} );
    tables.push( {table: "Furnace World - Settlements - Outlands", folder: "Furnace World"} );
    tables.push( {table: "Furnace World - Settlements - Terminus", folder: "Furnace World"} );
    tables.push( {table: "Grave World - Atmosphere", folder: "Grave World"} );
    tables.push( {table: "Grave World - Life", folder: "Grave World"} );
    tables.push( {table: "Grave World - Observed From Space", folder: "Grave World"} );
    tables.push( {table: "Grave World - Planetside Feature", folder: "Grave World"} );
    tables.push( {table: "Grave World - Settlements - Expanse", folder: "Grave World"} );
    tables.push( {table: "Grave World - Settlements - Outlands", folder: "Grave World"} );
    tables.push( {table: "Grave World - Settlements - Terminus", folder: "Grave World"} );
    tables.push( {table: "Ice World - Atmosphere", folder: "Ice World"} );
    tables.push( {table: "Ice World - Life", folder: "Ice World"} );
    tables.push( {table: "Ice World - Observed From Space", folder: "Ice World"} );
    tables.push( {table: "Ice World - Planetside Feature", folder: "Ice World"} );
    tables.push( {table: "Ice World - Settlements - Expanse", folder: "Ice World"} );
    tables.push( {table: "Ice World - Settlements - Outlands", folder: "Ice World"} );
    tables.push( {table: "Ice World - Settlements - Terminus", folder: "Ice World"} );
    tables.push( {table: "Jovian World - Atmosphere", folder: "Jovian World"} );
    tables.push( {table: "Jovian World - Life", folder: "Jovian World"} );
    tables.push( {table: "Jovian World - Observed From Space", folder: "Jovian World"} );
    tables.push( {table: "Jovian World - Planetside Feature", folder: "Jovian World"} );
    tables.push( {table: "Jovian World - Settlements - Expanse", folder: "Jovian World"} );
    tables.push( {table: "Jovian World - Settlements - Outlands", folder: "Jovian World"} );
    tables.push( {table: "Jovian World - Settlements - Terminus", folder: "Jovian World"} );
    tables.push( {table: "Jungle World - Atmosphere", folder: "Jungle World"} );
    tables.push( {table: "Jungle World - Life", folder: "Jungle World"} );
    tables.push( {table: "Jungle World - Observed From Space", folder: "Jungle World"} );
    tables.push( {table: "Jungle World - Planetside Feature", folder: "Jungle World"} );
    tables.push( {table: "Jungle World - Settlements - Expanse", folder: "Jungle World"} );
    tables.push( {table: "Jungle World - Settlements - Outlands", folder: "Jungle World"} );
    tables.push( {table: "Jungle World - Settlements - Terminus", folder: "Jungle World"} );
    tables.push( {table: "Ocean World - Atmosphere", folder: "Ocean World"} );
    tables.push( {table: "Ocean World - Life", folder: "Ocean World"} );
    tables.push( {table: "Ocean World - Observed From Space", folder: "Ocean World"} );
    tables.push( {table: "Ocean World - Planetside Feature", folder: "Ocean World"} );
    tables.push( {table: "Ocean World - Settlements - Expanse", folder: "Ocean World"} );
    tables.push( {table: "Ocean World - Settlements - Outlands", folder: "Ocean World"} );
    tables.push( {table: "Ocean World - Settlements - Terminus", folder: "Ocean World"} );
    tables.push( {table: "Rocky World - Atmosphere", folder: "Rocky World"} );
    tables.push( {table: "Rocky World - Life", folder: "Rocky World"} );
    tables.push( {table: "Rocky World - Observed From Space", folder: "Rocky World"} );
    tables.push( {table: "Rocky World - Planetside Feature", folder: "Rocky World"} );
    tables.push( {table: "Rocky World - Settlements - Expanse", folder: "Rocky World"} );
    tables.push( {table: "Rocky World - Settlements - Outlands", folder: "Rocky World"} );
    tables.push( {table: "Rocky World - Settlements - Terminus", folder: "Rocky World"} );
    tables.push( {table: "Shattered World - Atmosphere", folder: "Shattered World"} );
    tables.push( {table: "Shattered World - Life", folder: "Shattered World"} );
    tables.push( {table: "Shattered World - Observed From Space", folder: "Shattered World"} );
    tables.push( {table: "Shattered World - Planetside Feature", folder: "Shattered World"} );
    tables.push( {table: "Shattered World - Settlements - Expanse", folder: "Shattered World"} );
    tables.push( {table: "Shattered World - Settlements - Outlands", folder: "Shattered World"} );
    tables.push( {table: "Shattered World - Settlements - Terminus", folder: "Shattered World"} );
    tables.push( {table: "Tainted World - Atmosphere", folder: "Tainted World"} );
    tables.push( {table: "Tainted World - Life", folder: "Tainted World"} );
    tables.push( {table: "Tainted World - Observed From Space", folder: "Tainted World"} );
    tables.push( {table: "Tainted World - Planetside Feature", folder: "Tainted World"} );
    tables.push( {table: "Tainted World - Settlements - Expanse", folder: "Tainted World"} );
    tables.push( {table: "Tainted World - Settlements - Outlands", folder: "Tainted World"} );
    tables.push( {table: "Tainted World - Settlements - Terminus", folder: "Tainted World"} );
    tables.push( {table: "Vital World - Atmosphere", folder: "Vital World"} );
    tables.push( {table: "Vital World - Biomes", folder: "Vital World"} );
    tables.push( {table: "Vital World - Diversity", folder: "Vital World"} );
    tables.push( {table: "Vital World - Life", folder: "Vital World"} );
    tables.push( {table: "Vital World - Observed From Space", folder: "Vital World"} );
    tables.push( {table: "Vital World - Planetside Feature", folder: "Vital World"} );
    tables.push( {table: "Vital World - Settlements - Expanse", folder: "Vital World"} );
    tables.push( {table: "Vital World - Settlements - Outlands", folder: "Vital World"} );
    tables.push( {table: "Vital World - Settlements - Terminus", folder: "Vital World"} );

    tables.push( {table: "Precursor Vault - Inner First Look", folder: "[ Precursor Vaults - Inner First Looks ]"} );
    tables.push( {table: "Precursor Vault - Interior Feature", folder: "[ Precursor Vaults - Interior Features ]"} );
    tables.push( {table: "Precursor Vault - Interior Opportunity", folder: "[ Precursor Vaults - Interior Opportunities ]"} );
    tables.push( {table: "Precursor Vault - Interior Peril", folder: "[ Precursor Vaults - Interior Perils ]"} );
    tables.push( {table: "Precursor Vault - Outer First Look", folder: "[ Precursor Vaults - Outer First Looks ]"} );
    tables.push( {table: "Precursor Vault - Purpose", folder: "[ Precursor Vaults - Purposes ]"} );
    tables.push( {table: "Precursor Vault - Sanctum Feature", folder: "[ Precursor Vaults - Sanctum Features ]"} );
    tables.push( {table: "Precursor Vault - Sanctum Opportunity", folder: "[ Precursor Vaults - Sanctum Opportunities ]"} );
    tables.push( {table: "Precursor Vault - Sanctum Peril", folder: "[ Precursor Vaults - Sanctum Perils ]"} );
    tables.push( {table: "Precursor Vault - Form", folder: "= Precursor Vaults ="} );
    tables.push( {table: "Precursor Vault - Location", folder: "= Precursor Vaults ="} );
    tables.push( {table: "Precursor Vault - Material", folder: "= Precursor Vaults ="} );
    tables.push( {table: "Precursor Vault - Scale", folder: "= Precursor Vaults ="} );
    tables.push( {table: "Precursor Vault - Shape", folder: "= Precursor Vaults ="} );

    tables.push( {table: "Sector Trouble", folder: "[ Sector Troubles ]"} );
    tables.push( {table: "Sector Name Prefix", folder: "[ Sectors - Name Prefixes ]"} );
    tables.push( {table: "Sector Name Suffix", folder: "[ Sectors - Name Suffixes ]"} );
    tables.push( {table: "Sector Location", folder: "= Sectors ="} );

    tables.push( {table: "Settlement First Look", folder: "[ Settlements - First Looks ]"} );
    tables.push( {table: "Settlement Initial Contact", folder: "[ Settlements - Initial Contacts ]"} );
    tables.push( {table: "Settlement Name Prefix", folder: "[ Settlements - Name Prefixes ]"} );
    tables.push( {table: "Settlement Name Suffix", folder: "[ Settlements - Name Suffixes ]"} );
    tables.push( {table: "Settlement Name", folder: "[ Settlements - Names ]"} );
    tables.push( {table: "Settlement Projects", folder: "[ Settlements - Projects ]"} );
    tables.push( {table: "Settlement Troubles", folder: "[ Settlements - Troubles ]"} );
    tables.push( {table: "Settlement Authority", folder: "= Settlements ="} );
    tables.push( {table: "Settlement Location", folder: "= Settlements ="} );
    tables.push( {table: "Settlement Population - Expanse", folder: "= Settlements ="} );
    tables.push( {table: "Settlement Population - Outlands", folder: "= Settlements ="} );
    tables.push( {table: "Settlement Population - Terminus", folder: "= Settlements ="} );

    tables.push( {table: "Space Sighting - Expanse", folder: "[ Space Sightings - Expanse ]"} );
    tables.push( {table: "Space Sighting - Outlands", folder: "[ Space Sightings - Outlands ]"} );
    tables.push( {table: "Space Sighting - Terminus", folder: "[ Space Sightings - Terminus ]"} );
    tables.push( {table: "Spaceborne Opportunity", folder: "[ Spaceborne Opportunities ]"} );
    tables.push( {table: "Spaceborne Peril", folder: "[ Spaceborne Perils ]"} );
    tables.push( {table: "Stellar Object", folder: "[ Stellar Objects ]"} );

    tables.push( {table: "Starship - First Look", folder: "[ Starships - First Looks ]"} );
    tables.push( {table: "Starship Fleet", folder: "[ Starships - Fleets ]"} );
    tables.push( {table: "Starship - Initial Contact", folder: "[ Starships - Initial Contacts ]"} );
    tables.push( {table: "Starship Mission - Expanse", folder: "[ Starships - Missions - Expanse ]"} );
    tables.push( {table: "Starship Mission - Outlands", folder: "[ Starships - Missions - Outlands ]"} );
    tables.push( {table: "Starship Mission - Terminus", folder: "[ Starships - Missions - Terminus ]"} );
    tables.push( {table: "Starforged - Starship Names", folder: "[ Starships - Names ]"} );
    tables.push( {table: "Starship Type", folder: "[ Starships - Types ]"} );

    const pack = await game.packs.get("starforged.tables");
    const index = await pack.getIndex();

    for ( let currentTable of tables ){
        if ( game.tables.getName(currentTable.table) == undefined ) {
            const tableID = index.find( i => i.name === currentTable.table )._id;
            const table = await pack.getDocument(tableID);
            const folderID = await game.folders.getName(currentTable.folder).id;
            console.log(folderID);
            let newTable = await RollTable.create(table.data);
            await newTable.update( { folder: folderID } );
        }
    }
}