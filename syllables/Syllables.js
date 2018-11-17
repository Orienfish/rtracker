const https = require('https');
const key = "f5b9a3a3-0560-4ea5-8a8d-de8e489336c5";
const conversionDict = {
    "AA" : "ɑ",
    "AE" : "æ",
    "AH" : "ʌ",
    "AO" : "ɔ",
    "AW" : "aʊ",
    "AX" : "ə",
    "AXR" : "ɚ",
    "AY" : "aɪ",
    "EH" : "ɛ",
    "ER" : "ɝ",
    "EY" : "eɪ",
    "IH" : "ɪ",
    "IX" : "ɨ",
    "IY" : "i",
    "OW" : "oʊ",
    "OY" : "ɔɪ",
    "UH" : "ʊ",
    "UW" : "u",
    "UX" : "ʉ",
    "B"  : "b",
    "CH" : "tʃ",
    "D"  : "d",
    "DH" : "ð",
    "DX" : "ɾ",
    "EL" : "l̩",
    "EM" : "m̩",
    "EN" : "n̩",
    "F"  : "f",
    "G"  : "ɡ",
    "HH" : "h",
    "H"  : "h",
    "JH" : "dʒ",
    "K"  : "k",
    "L"  : "l",
    "M"  : "m",
    "N"  : "n",
    "NG" : "ŋ",
    "NX" : "ɾ̃",
    "P"  : "p",
    "Q"  : "ʔ",
    "R"  : "ɹ",
    "S"  : "s",
    "SH" : "ʃ",
    "T"  : "t",
    "TH" : "θ",
    "V"  : "v",
    "W"  : "w",
    "WH" : "ʍ",
    "Y"  : "j",
    "Z"  : "z",
    "ZH" : "ʒ"
};
let syllableDict = {};

function ArpabetToIpa(phonetic) {
    return conversionDict[phonetic];
}

// I need to go back and actually test this in order to see if the asynchronous calls are correct
function RequestWordData(word) {
    // check to make sure the selected word isn't already stored
    if(word in syllableDict){
        console.log('Data already retreived for: ' + word);
        return;
    }

    const url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + word + "?key=" + key;
    
    // request for data from Merriam-Webster API
    // request code used from: https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
    https.get(url, (resp) => {
        let data = '';
        
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            let response = JSON.parse(data);
            let syllables = response[0]['hwi']['hw'].split('*');
            //console.log(syllables);
            syllableDict[word] = syllables;
        });
    }).on('error', (err) => {
        console.log('Error: ' + err.message);
    });
}

// Test to make sure that the function is working
RequestWordData("actually");
RequestWordData("literally");