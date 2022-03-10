//CSV file obtained from https://github.com/Orange-Cyberdefense/russia-ukraine_IOCs/blob/main/OCD-Datalake-russia-ukraine_IOCs-ALL.csv
//HOW TO RUN THE SCRIPT
  //Install nodejs from https://nodejs.org/en/
  //Navigate to where the script is saved
  //Type npm install to install the neceessary node modules
  //Type node main.js to run the script
import fetch from 'node-fetch';
const url = "https://raw.githubusercontent.com/Orange-Cyberdefense/russia-ukraine_IOCs/main/OCD-Datalake-russia-ukraine_IOCs-ALL.csv";
//const jsonHTML = document.getElementById("json");
//Get data from source
async function getData() {

  //Get CSV Data
  //Access data from url
  const response = await fetch(url); //Wait until all data is received

  //Process raw data content to plaintext
  const rawData = await response.text(); //Wait until all csv data has been converted


  //Convert the CSV to JSON to make it more JavaScript friendly
  let arrayOne = rawData.split("\r\n");
  let header = arrayOne[0].split(",");
  let noOfRow = arrayOne.length;
  let noOfCol = header.length;
  let jsonData = [];
  let i = 0;
  let j = 0;

 //Iterate through the plaintext to create name:value pairs
  for (i = 1; i < noOfRow - 1; i++){
    let obj = {};
    let myNewLine = arrayOne[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
    for (j = 0; j < noOfCol; j++){
      obj[header[j]] = myNewLine[j];
    };

    //generate JSON Data
    jsonData.push(obj);
  };

  //const jsonString = JSON.stringify(jsonData, null, 4);

  for (var key in jsonData){
      //console.log(JSON.stringify(Object.values(jsonData)[2585].atom_type));
      let rule = ("alert dns any any -> any any (msg: \"Suspected Russian-Ukraine Conflict Related IOC Domain\"\; dns_query; content:\"%s\"\; nocase\; content:!\"af.mil\"\; content:!\"comcast.net\"\; content:!\"attlocal.net\"\; content:!\".gov\"\; content:!\"comcast.net\"\; content:!\".home\"\; content:!\".lan\"\; content:!\"usaf.mil\"\; content:!\"cloudfront.net\"\; content:!\"online-metrix.net\"\; content:!\"akamai.net\"\; content:!\"footprintdns.com\"\; content:!\"office.com\"\; content:!\".rac2v1a\"\; content:!\"radar.net\"\; content:!\".area52\"\; content:!\"afnoapps\"\; content:!\".mil\"\; content:!\".area52.afnoapps.usaf.mil\"\;)");

      if (jsonData[key].atom_type == "domain"){
        //console.log(jsonData[key].atom_value);
        //document.getElementById("json").innerHTML += jsonData[key].atom_value + "\n";
        console.log(rule.replace("%s", jsonData[key].atom_value));
        //document.getElementById("json").innerHTML += rule.replace("%s", jsonData[key].atom_value) + "\n";
      };

      //console.log("alert dns any any -> any any (msg: \"Suspected Russian-Ukraine Conflict Related IOC Domain\"\; dns_query; content:\"%s\"\; nocase\; content:!\"af.mil\"\; content:!\"comcast.net\"\; content:!\"attlocal.net\"\; content:!\".gov\"\; content:!\"comcast.net\"\; content:!\".home\"\; content:!\".lan\"\; content:!\"usaf.mil\"\; content:!\"cloudfront.net\"\; content:!\"online-metrix.net\"\; content:!\"akamai.net\"\; content:!\"footprintdns.com\"\; content:!\"office.com\"\; content:!\".rac2v1a\"\; content:!\"radar.net\"\; content:!\".area52\"\; content:!\"afnoapps\"\; content:!\".mil\"\; content:!\".area52.afnoapps.usaf.mil\"\;");

    };
}

getData();
