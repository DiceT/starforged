export async function rollFromFolder( folder, silent = false ) {
    let tables = await game.folders.getName(folder);
    let table = tables === undefined ? 
        await game.tables.getName(folder) : 
        await tables.content[Math.floor(Math.random() * tables.content.length)];
    let results = {
        prefix: "",
        result: ""
    };
    if ( silent ) {
        let roll = await table.roll();
        results.result = roll.results[0].data.text;
    }
    else {
          let roll = await table.draw();
          results.result += roll.results[0].text;
    }
    results.prefix = table.data.description;
    results = await validateResults( results, folder, silent );
    return results;
}

export async function validateResults( results, folder, silent = false ) {
    switch ( results.result ) {
        case "Action + Theme": {
            let result = await rollFromFolder( "[ Actions ]", silent );
            results.result = "[A+T] " + result.result + " + ";
            result = await rollFromFolder( "[ Themes ]", silent );
            results.result += result.result;
            break;
        }
        case "Descriptor + Focus": {
            let result = await rollFromFolder( "[ Descriptors ]", silent );
            results.result = "[D+F] " + result.result + " + ";
            result = await rollFromFolder( "[ Foci ]", silent );
            results.result += result.result;
            break;
        }
        case "Roll twice":
        case "Roll three times": {
            let counter = results.result === "Roll twice" ? 2 : 3;
            results.result = "";
            for ( let i = 1; i <= counter; i++ ) {
                let result = await rollFromFolder( folder, silent );
                while ( result.result.includes("Roll twice") || result.result.includes("Roll three times") ) {
                    result = await rollFromFolder( folder, silent );
                }
                console.log(counter);
                results.result = i === 1 ? result.result : results.result + " | " + result.result;
            }
            break;
        }
    }
    return results;
}