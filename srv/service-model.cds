using { com.myorg.demo as db } from '../db/db-model';


@path: '/demo'
service DemoService {
    entity MainEntity as projection on db.MainEntity;
    entity ChildEntity as projection on db.ChildEntity;
    action implictTransaction() returns String;
    action processDataP1() returns String; //Problem 1
    action processDataP1S1() returns String; //Problem 1 Solution 1
    action processDataP1S2() returns String; //Problem 1 Solution 2
    action processDataP1S3() returns String; //Problem 1 Solution 3 - DOES NOT WORK
}


