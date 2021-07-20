import { Component } from '@angular/core';
import { Kendra } from 'aws-sdk';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AWSKendraSearch';

  waiting: boolean = false
  userInput:string = "";
  kendraChatResponse:string = ""

  searchKendra() {

    this.waiting = true
    var that = this

    var kendra = require("aws-sdk/clients/kendra");


    var kendraClient = new Kendra({

      accessKeyId: environment.accessKeyId,
      secretAccessKey: environment.secretAccessKey,
      region: environment.region
    })

    console.log("Starting....");

    var params = {

      IndexId: environment.kendraIndex,
      QueryText: this.userInput,
      // QueryResultTypeFilter: "DOCUMENT",
      PageNumber: 1
    };

    console.log("kendraparam", params)


    kendraClient.query(params, function (err, data) {

      if (err) {
        console.log(err, err.stack);
      }// an error occurred
      else {

        console.log("Kendra result is", data.ResultItems);

        that.kendraChatResponse = ""

        if (data.ResultItems.length > 0) {

          data.ResultItems.forEach(item => {

            console.log("text", item.DocumentExcerpt.Text)

            that.kendraChatResponse += item.DocumentExcerpt.Text;

            that.kendraChatResponse += "<br><br>"

            that.kendraChatResponse += `<a href=${item.DocumentURI}>${item.DocumentTitle.Text}</a>`

          })

        } else {
          that.kendraChatResponse = "No Data Found"

        }

        that.waiting = false
      }

    });



  }
}
