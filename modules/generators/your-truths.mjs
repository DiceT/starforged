

export async function generateYourTruths() {
    let content = "";
    let subcontent = "";
    
    let folder = await Folder.create({
        name: "Your Truths", 
        type: "JournalEntry", 
        parent: null
    });
    content = await generateContent( "01. Cataclysm" );
    if ( content.includes("[01.1 Cataclysm]") ) {
        subcontent = await generateContent( "01.1 Cataclysm" );
        content = content.replace("[01.1 Cataclysm]", subcontent);
    }
    else if ( content.includes("[01.2 Cataclysm]") ) {
        subcontent = await generateContent( "01.2 Cataclysm" );
        content = content.replace("[01.2 Cataclysm]", subcontent);
    }
    else if ( content.includes("[01.3 Cataclysm]") ) {
        subcontent = await generateContent( "01.3 Cataclysm" );
        content = content.replace("[01.3 Cataclysm]", subcontent);        
    }
    await JournalEntry.create({
        "name": "01. Cataclysm", "folder": folder.id, "content": content 
    });
    
    content = await generateContent( "02. Exodus" );
    await JournalEntry.create({
        "name": "02. Exodus", "folder": folder.id, "content": content 
    });

    content = await generateContent( "03. Communities" );
    await JournalEntry.create({
        "name": "03. Communities", "folder": folder.id, "content": content 
    });
        
    content = await generateContent( "04. Iron" );
    await JournalEntry.create({
        "name": "04. Iron", "folder": folder.id, "content": content 
    });

    content = await generateContent( "05. Laws" );
    await JournalEntry.create({
        "name": "05. Laws", "folder": folder.id, "content": content 
    });

    content = await generateContent( "06. Religion" );
    await JournalEntry.create({
        "name": "06. Religion", "folder": folder.id, "content": content 
    });

    content = await generateContent( "07. Magic" );
    if ( content.includes("[07.2 Magic]") ) {
        subcontent = await generateContent( "07.2 Magic" );
        content = content.replace("[07.2 Magic]", subcontent);
    }
    await JournalEntry.create({
        "name": "07. Magic", "folder": folder.id, "content": content 
    });

    content = await generateContent( "08. Communication and Data" );
    await JournalEntry.create({
        "name": "08. Communication and Data", "folder": folder.id, "content": content 
    });

    content = await generateContent( "09. Medicine" );
    await JournalEntry.create({
        "name": "09. Medicine", "folder": folder.id, "content": content 
    });

    content = await generateContent( "10. Artificial Intelligence" );
    if ( content.includes("[10.1 Artificial Intelligence]") ) {
        subcontent = await generateContent( "10.1 Artificial Intelligence" );
        content = content.replace("[10.1 Artificial Intelligence]", subcontent);
    }
    await JournalEntry.create({
        "name": "10. Artificial Intelligence", "folder": folder.id, "content": content 
    });

    content = await generateContent( "11. War" );
    await JournalEntry.create({
        "name": "11. War", "folder": folder.id, "content": content 
    });

    content = await generateContent( "12. Lifeforms" );
    await JournalEntry.create({
        "name": "12. Lifeforms", "folder": folder.id, "content": content 
    });

    content = await generateContent( "13. Precursors" );
    await JournalEntry.create({
        "name": "13. Precursors", "folder": folder.id, "content": content 
    });

    content = await generateContent( "14. Horrors" );
    await JournalEntry.create({
        "name": "14. Horrors", "folder": folder.id, "content": content 
    });
}