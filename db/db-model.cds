namespace com.myorg.demo;

using { cuid } from '@sap/cds/common';
entity MainEntity: cuid {
    name: String;
    description: String;
}

entity ChildEntity: cuid {
    name: String;
    description: String;
}

