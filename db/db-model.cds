namespace com.myorg.demo;

using { cuid } from '@sap/cds/common';
entity MainEntity: cuid {
    name: String;
    description: String;
    children: Composition of ChildEntity;
}

entity ChildEntity: cuid {
    name: String;
    description: String;
    parent: Association to MainEntity;
}

