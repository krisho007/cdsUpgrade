# Getting Started

- Clone, move to the folder
- run `npm i -g @sap/cds-dk@v7`. 
- run `npm i` to install the dependencies
- run `cds bind auth -2 transactionPoC-auth` to bind the auth service
- run `cds bind db -2 transactionPoC-db` to bind the db service
- run `cds watch --profile hybrid` to start the service


# Issues and Solutions
We will discuss various issues with v7 upgrade and how to solve them.

## Issue 1:
Demoed in `processDataP1` request handler.   
Within a request handler, if we have DB calls that are not awaited, the transaction will error out with error "❗️Uncaught Error: Transaction is already closed". 

### Analysis
This is because CAP creates an implicit transaction for the request handler. If we don't await the DB calls, the transaction will close before the DB calls are completed, leading to the error.

### Solution 1
This is implemented in `processDataP1S1` request handler.   
`await` the function calls that make the DB calls. 

### Solution 2
This is implemented in `processDataP1S2` request handler.   
Within the non-awaited functions making DB calls, use a new transaction.

### Solution 3
This is implemented in `processDataP1S3` request handler. 
Wrap the entire content within a transaction. 
This DOES NOT WORK. It coninues to get the same error "❗️Uncaught Error: Transaction is already closed".

## Issue 2
Behaviour of transaction in implict mode.
When you call action `implictTransaction`, it creates an implicit transaction. Within the action it creates MainEntity successfully. But then it creates ChildEntity which causes an error. Since this is an implicit transaction, the error causes the MainEntity transaction to roll back.





