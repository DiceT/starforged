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
    folderList.push("[ Planetside Opportunites - Lifebearing ]");
    folderList.push("[ Planetside Opportunites - Lifeless ]");
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
    folderList.push("[ Precursor Vaults - Interior Opportunites ]");
    folderList.push("[ Precursor Vaults - Interior Perils ]");
    folderList.push("[ Precursor Vaults - Outer First Looks ]");
    folderList.push("[ Precursor Vaults - Sanctum Features ]");
    folderList.push("[ Precursor Vaults - Sanctum Opportunites ]");
    folderList.push("[ Precursor Vaults - Sanctum Perils ]");
    folderList.push("[ Precursor Vaults - Vault Purposes ]");
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
    folderList.push("[ Space Sightings - Terminus]");
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
    }
}