# AWS Kendra Search

Amazon Kendra is an intelligent search service powered by machine learning.

Kendra indexes enterprise documents, websites and applications so that end users can more easily find the information they need within the vast amount of content spread across the company.

- A **Data Source** is a location, such as an Amazon Simple Storage Service (Amazon S3) bucket, where you store the documents for indexing. 
- **Connectors** are used to synchronize data from multiple content repositories. Connectors can be scheduled to automatically sync your index with your data source .Connectors can be of type S3, Salesforce, ServiceNow, RDS, Sharepoint, and, OneDrive etc

### AWS Console Steps

- Go to Services -> Kendra
- Create an **Index**, fill the Index name, IAM Role and Role Name, select Developer Edition as Provisioning
- Select the index and add **Data Source**. 
- Add **Connector** (eg: S3) to the Data Source.
- Choose Run on demand in Set sync run schedule section.
- Review the configuration details and then choose Create.



### Query the index

We can use the text search console to query the newly created index. In the left navigation pane of the Amazon Kendra console, choose Search console. In the search box, type the query.

## Angular UI for the search functionality

**Initialisation**

Install AWS-SDK that gives type definitions for node.

    npm install aws-sdk
    
    
 Global needs to be defined in the polyfill.ts file
    
    (window as any).global = window;


**Adding Credentials**

Add IAM **accessKeyId** and **secretAccessKey** in environment.ts

    export const environment = {
      accessKeyId: "XXXXXXXXXXXXXXXXXXXXXX",
      secretAccessKey: "YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
      region: "us-xxxx-1",
      kendraIndex:"cbxxx26f-xxxx-yyyy-xxxx-6c9xxxa0e643"
    };

**Generate the Component**

    
    import { Kendra } from 'aws-sdk';

    searchKendra() {

        var kendra = require("aws-sdk/clients/kendra");

        var kendraClient = new Kendra({
            accessKeyId: environment.accessKeyId,
            secretAccessKey: environment.secretAccessKey,
            region: environment.region
        })


        var params = {
            IndexId: environment.kendraIndex,
            QueryText: this.userInput,
            // QueryResultTypeFilter: "DOCUMENT",
            PageNumber: 1
        };

        kendraClient.query(params, function (err, data) {

            if (err) {
                console.log(err, err.stack);
            }
            else {
                console.log("Kendra result is", data.ResultItems);
            }

        });

    }




