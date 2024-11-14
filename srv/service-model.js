export default async function() {
    
    this.on('processDataP1', async (req) => {
        
        //Insert entry to the MainEntity
        const parent = await insertMainEntity(req);

        //Insert entry to the ChildEntity
        await insertChildEntity(parent, req);

        //Insert another entry to the ChildEntity.
        //This fails with error "❗️Uncaught Error: Transaction is already closed".
        //However the above two DB calls are successful and not rolled back.
        insertAnotherChildEntity(parent, req);

        return `Out of processDataP1`;
    });

    this.on('processDataP1S1', async (req) => {
        //Insert entry to the MainEntity
        const parent = await insertMainEntity(req);

        //Insert entry to the ChildEntity without await
        await insertChildEntity(req);

        //Insert another entry to the ChildEntity with await. This is successful.
        await insertAnotherChildEntity(req);

        return `Out of processDataP1S1`;
    });

    this.on('processDataP1S2', async (req) => {
        //Insert entry to the MainEntity
        const parent = await insertMainEntity(req);

        //Insert entry to the ChildEntity without await
        await insertChildEntity(req);

        //Insert another entry to the ChildEntity
        insertAnotherChildEntityNewTx(req);   

        return `Out of processDataP1S2`;
    });

    //This solution does not work. It continues to throw "❗️Uncaught Error: Transaction is already closed".
    this.on('processDataP1S3', async (req) => {
        //Wrap the entire content within a transaction.
        const tx = cds.tx();
        const output = await tx.run(async () => {
            //Insert entry to the MainEntity
            const parent = await insertMainEntity(req);

            //Insert entry to the ChildEntity
            await insertChildEntity(parent, req);

            //Insert another entry to the ChildEntity without await. 
            insertAnotherChildEntity(parent, req);
        });

        return `Out of processDataP1S3`;
    });

    this.on('implictTransaction', async (req) => {
        //Insert entry to the MainEntity
        const parent = await insertMainEntity(req);

        //Insert error causing entry. This will cause the above Main Entry transaction to roll back.
        await insertChildEntityWithError(req);

        return `Out of implictTransaction`;
    });
}

//A function to insert entry to the MainEntity
async function insertMainEntity(req) {
    const db = await cds.connect.to("db");
    const { MainEntity, ChildEntity } = db.entities;
    const response = await INSERT.into(MainEntity).entries({
        name: 'Main Entity',
        description: 'This is a main entity'
    });
    return response;
}

//A function to insert entry to the ChildEntity
async function insertChildEntity(req) {
    const db = await cds.connect.to("db");
    const { ChildEntity } = db.entities;    
    const response = await INSERT.into(ChildEntity).entries({
        name: "Child Entity 1",
        description: "First child entity"
    });
    return response;
}

//A function to insert another entry to the ChildEntity
async function insertAnotherChildEntity(req) {
    const db = await cds.connect.to("db");
    const newTx = cds.tx(db);
    const { ChildEntity } = db.entities;    
    const response = await INSERT.into(ChildEntity).entries({
        name: "Child Entity 2",
        description: "Second child entity"
    });
    return response;
}

async function insertChildEntityWithError(req) {
    const db = await cds.connect.to("db");
    const { ChildEntity } = db.entities;    
    const response = await INSERT.into(ChildEntity).entries({
        name: 3, //This will cause an error
        description: "Third child entity"
    });
    return response;
}

async function insertAnotherChildEntityNewTx(req) {
    const db = await cds.connect.to("db");
    const tx = cds.tx(db);

    try {
        const { ChildEntity } = db.entities;    
        const response = await tx.run(
            INSERT.into(ChildEntity).entries({
                name: "Child Entity 2",
                description: "Second child entity"
            })
        );
        
        await tx.commit();
        return response;
    } catch (error) {
        await tx.rollback();
        throw error;
    }
}    

// A function to get all entries from the MainEntity
async function getAllMainEntities(req) {
    const db = await cds.connect.to("db");
    const { MainEntity } = db.entities;
    // Connect to the external service
    const externalResponse = fetch('https://services.odata.org/TripPinRESTierService/People(\'russellwhyte\')');

    const response = await SELECT.from(MainEntity);
    return response;
}