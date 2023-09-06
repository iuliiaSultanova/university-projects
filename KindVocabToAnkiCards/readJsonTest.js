const fs = require("fs");

let rawdata = fs.readFileSync("jmdict-eng-3.5.0.json");
let dictionary = JSON.parse(rawdata);
let words = dictionary["words"];
//append all the found definitions in this array and then just extract the first one when populating the csv file 
let result = [];

//words can be found either in the kanji or kana section
for (let word of words) {
    for (let elem of word["kana"]) {
        if (elem["text"] == "明白") {
            result.push(word["sense"][0]["gloss"][0]["text"]);
        } else {
            for (let char of word["kanji"]) {
                if (char["text"] == "明白") {
                    //console.log(word["sense"][0]["gloss"][0]["text"]);
                    //retrieving first arra from an array of arrays. array of arrays with array of objects
                    result.push(word["sense"][0]["gloss"][0]["text"]);
                }
            };
        }
    }
}

console.log(result[0]);

