const db = await cds.connect.to("db");
import cds from '@sap/cds';
const { MainEntity, ChildEntity } = db.entities;

export default async function() {
    
    this.on('processDataWrong', async (req) => {
        //Insert entry to the MainEntity
        const parent = await insertMainEntity(req);

        //Insert entry to the ChildEntity
        await insertChildEntity(parent, req);

        //Insert another entry to the ChildEntity
        insertAnotherChildEntity(parent, req);

        return `Out of processDataWrong`;
    });

    this.on('processDataRight', async (req) => {
        //Insert entry to the MainEntity
        const parent = await insertMainEntity(req);

        //Insert entry to the ChildEntity without await
        await insertChildEntity(parent, req);

        //Insert another entry to the ChildEntity
        await insertAnotherChildEntity(parent, req);

        return `Out of processDataRight`;
    });
}

//A function to insert entry to the MainEntity
async function insertMainEntity(req) {
    const response = await INSERT.into(MainEntity).entries({
        name: 'Main Entity',
        description: 'This is a main entity'
    });
    return response;
}

//A function to insert entry to the ChildEntity
async function insertChildEntity(req, parent) {
    const response = await INSERT.into(ChildEntity).entries({
        name: "Child Entity 1",
        description: "First child entity",
        parent: parent
    });
    return response;
}

//A function to insert another entry to the ChildEntity
async function insertAnotherChildEntity(req, parent) {
    const response = await INSERT.into(ChildEntity).entries({
        name: "Child Entity 2",
        description: "Second child entity",
        parent: parent
    });
    return response;
}

// A function to get all entries from the MainEntity
async function getAllMainEntities(req) {
    // Connect to the external service
    const externalResponse = fetch('https://services.odata.org/TripPinRESTierService/People(\'russellwhyte\')');

    const response = await SELECT.from(MainEntity);
    return response;
}