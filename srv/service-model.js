const db = await cds.connect.to("db");
import cds from '@sap/cds';
const { MainEntity, ChildEntity } = db.entities;

export default async function() {
    
    this.on('processDataWrong', async (req) => {
        //Insert entry to the MainEntity
        await insertMainEntity(req);

        //Insert entry to the ChildEntity without await
        insertChildEntity(req);

        //Get all entries from the MainEntity without await
        const mainEntities = getAllMainEntities(req);

        return `Number of main entities: ${mainEntities.length}`;
    });

    this.on('processDataRight', async (req) => {
        //Insert entry to the MainEntity
        await insertMainEntity(req);

        //Insert entry to the ChildEntity
        await insertChildEntity(req);

        //Get all entries from the MainEntity
        const mainEntities = await getAllMainEntities(req);

        return `Number of main entities: ${mainEntities.length}`;
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
async function insertChildEntity(req) {
    const response = await INSERT.into(ChildEntity).entries(req.data);
    return response;
}

// A function to get all entries from the MainEntity
async function getAllMainEntities(req) {
    // Connect to the external service
    const externalResponse = fetch('https://services.odata.org/TripPinRESTierService/People(\'russellwhyte\')');

    const response = await SELECT.from(MainEntity);
    return response;
}