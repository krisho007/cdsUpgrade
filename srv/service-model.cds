using { com.myorg.demo as db } from '../db/db-model';


@path: '/demo'
service DemoService {
    entity MainEntity as projection on db.MainEntity;
    entity ChildEntity as projection on db.ChildEntity;
    action processDataRight() returns String;
    action processDataWrong() returns String;    
}


