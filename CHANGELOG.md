v0.8.3
 - updated actorLink for token to be TRUE by default.
 - Fixed the CONTINUE button on the Legacy tracks.
 - Reverted data import to the included packs ONLY. Dataforged import is currently unavailable until rewrite of its import.

v0.8.2
 - Removed the duplicated moves when in multiplayer.

v0.8.1
 - Added support for Session moves.
 - Swapped order of Threshold and Recover move categories to align with the Starforged rule book.
 - Added ability to View/Edit in Completed (Challenges) tab so you can view and edit notes without having to first unflag it as completed.

v0.8.0
 - Faction tables will now automatically populate 
 - Faction generator added to character dashboard
 - Faction sheet now generated with appropriate data and buttons for "deep dive"
 - Starship Type has fixed
 - The Starship Type used to have the Class and Typical Role in one string, which the system parsed. The table no longer has the Typical Role, so this code has been commented out.
 - Story Clue Macro added
 - Fixed Progress Track in Challenges. Value was 10, but displaying empty progress track. Legacies now show as full when reaching 10. Clicking Progress will reset the Progress track and then advance Progress to 10.25.

v0.5.2
 - Added functionality to import Assets from Datasworn (official Starforged text). This populates the Compendium with the most up-to-date data. Currently, existing characters will not be updated with the most current moves (requires a new character).
 - Assets and Moves are updated manually by myself prior to uploading the files that contain the updated packs.
 - Current Assets and Moves are up-to-date. If you see any broken links or anomalies, please report them to my Discord/Starforged channel.

v0.5.1
 - BETA RELEASE!
 - Fixed 2 Character tables which did not have the table descriptions.
 - Added functionality to import Moves from Datasworn (official Starforged text). This populates the Compendium with the most up-to-date data. Currently, existing characters will not be updated with the most current moves (requires a new character). The Moves currently need to be updated by myself prior to pushing any changes.
 - Fixed an issue where the Challenges were not displaying the proper hexes based upon difficulty of the Challenge when editing it.
 

v0.2.00
- Fixed the Action + Theme and Descriptor + Focus table rollers on the full character sheet as well as the dashboard.
- STATISTICS header is now a button that will clear statistics.
- Added TOOLS tab to the main character sheet to have access to all generator tools from one character sheet.
- All actors, with the exception of creatures, are now generated to link their data to the token. This means that when you activate the location sheet via the token, the original in the actor list is also updated.
- Planets and Settlements will have their names displayed automatically when generated.
- Fixed the macro template so you can enter in the name of a folder or the name of a specific table.
- Added default macros for several tables that don't have direct links within the system: Confront Chaos, Endure Harm, Endure Stress, Make a Discovery, Take Decisive Action, Withstand Damage.

v0.18
THIS UPDATE REQUIRES ALL OF THE TABLES TO BE REINSTALLED
: Please DELETE ALL on your Starforged folders in the tables section (right click the folder --> Delete All --> Yes ). Then REFRESH (F5).
: If you have already added custom tables, please put those in a safe location.

- Added Roll Macro to Macro Compendium. This macro will roll from one random table in a folder. Just define the folder in the script by replacing [ Actions ] with the folder name.
- Changed font color of Macro textbox to ff6666
- Changed background of module list in order to see the text better (was unable to change font color).
- Completely rewrote and refactored the generator scripts for much better optimization, usage efficiency, all to accommodate...
- Detail and Exploration/Notes tools provided for each location/npc type, tailored towards the location/npc.
- Incorporated Location Themes into Planet, Settlement, Starship, Derelict, Precursor Vault.
- Incorporated Oracle Arrays into Derelicts and Precursor Vault locations.

v0.15
- Added ability to edit the Background Vow.
- Added Asset track to character sheet Assets.
- Relocated Asset track to inside the header button so the current Health value could be seen without entering the Asset details.
- Fixed a bug where positive Momentum was cancelling the roll for the results on positive matches.
