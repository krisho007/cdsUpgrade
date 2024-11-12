# Getting Started

- Clone, move to the folder
- run `npm i -g @sap/cds-dk@v6`. This is required as CDS v6 will not work with @sap/cds-dk v8.
- run `npm i` to install the dependencies
- run `cds bind auth -2 transactionPoC-auth` to bind the auth service
- run `cds bind db -2 transactionPoC-db` to bind the db service
- run `cds watch --profile hybrid` to start the service