import { rollFromFolder } from "./core-generator.mjs";

export async function generateYourTruths() {
    let result;
    let content;
    let subcontent;
    
    let folder = await Folder.create({
        name: "Your Truths", 
        type: "JournalEntry", 
        parent: null
    });

    result = await rollFromFolder( "01. Cataclysm", true );
    content = result.result;
    if ( content.includes("[01.1 Cataclysm]") ) {
        result = await rollFromFolder( "01.1 Cataclysm", true );
        subcontent = result.result;
        content = content.replace("[01.1 Cataclysm]", subcontent);
    }
    else if ( content.includes("[01.2 Cataclysm]") ) {
        result = await rollFromFolder( "01.2 Cataclysm", true );
        subcontent = result.result;
        content = content.replace("[01.2 Cataclysm]", subcontent);
    }
    else if ( content.includes("[01.3 Cataclysm]") ) {
        result = await rollFromFolder( "01.3 Cataclysm", true );
        subcontent = result.result;
        content = content.replace("[01.3 Cataclysm]", subcontent);
    }
    await JournalEntry.create({
        "name": "01. Cataclysm", "folder": folder.id, "content": content 
    });
    
    result = await rollFromFolder( "02. Exodus", true );
    content = result.result;
    await JournalEntry.create({
        "name": "02. Exodus", "folder": folder.id, "content": content 
    });

    result = await rollFromFolder( "03. Communities", true );
    content = result.result;
    await JournalEntry.create({
        "name": "03. Communities", "folder": folder.id, "content": content 
    });

    result = await rollFromFolder( "04. Iron", true );
    content = result.result;
    await JournalEntry.create({
        "name": "04. Iron", "folder": folder.id, "content": content 
    });

    result = await rollFromFolder( "05. Laws", true );
    content = result.result;
    await JournalEntry.create({
        "name": "05. Laws", "folder": folder.id, "content": content 
    });

    result = await rollFromFolder( "06. Religion", true );
    content = result.result;
    await JournalEntry.create({
        "name": "06. Religion", "folder": folder.id, "content": content 
    });

    result = await rollFromFolder( "07. Magic", true );
    content = result.result;
    if ( content.includes("[07.2 Magic]") ) {
        result = await rollFromFolder( "07.2 Magic", true );
        subcontent = result.result;
        content = content.replace("[07.2 Magic]", subcontent);
    }
    await JournalEntry.create({
        "name": "07. Magic", "folder": folder.id, "content": content 
    });

    result = await rollFromFolder( "08. Communication and Data", true );
    content = result.result;
    await JournalEntry.create({
        "name": "08. Communication and Data", "folder": folder.id, "content": content 
    });

    result = await rollFromFolder( "09. Medicine", true );
    content = result.result;
    await JournalEntry.create({
        "name": "09. Medicine", "folder": folder.id, "content": content 
    });

    result = await rollFromFolder( "10. Artificial Intelligence", true );
    content = result.result;
    if ( content.includes("[10.1 Artificial Intelligence]") ) {
        result = await rollFromFolder( "10.1 Artificial Intelligence", true );
        subcontent = result.result;
        content = content.replace("[10.1 Artificial Intelligence]", subcontent);
    }
    await JournalEntry.create({
        "name": "10. Artificial Intelligence", "folder": folder.id, "content": content 
    });

    result = await rollFromFolder( "11. War", true );
    content = result.result;
    await JournalEntry.create({
        "name": "11. War", "folder": folder.id, "content": content 
    });

    result = await rollFromFolder( "12. Lifeforms", true );
    content = result.result;
    await JournalEntry.create({
        "name": "12. Lifeforms", "folder": folder.id, "content": content 
    });

    result = await rollFromFolder( "13. Precursors", true );
    content = result.result;
    await JournalEntry.create({
        "name": "13. Precursors", "folder": folder.id, "content": content 
    });

    result = await rollFromFolder( "14. Horrors", true );
    content = result.result;
    await JournalEntry.create({
        "name": "14. Horrors", "folder": folder.id, "content": content 
    });
}