// this file is for the modal
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

// checking so see if I can have this outside the function
// this would prevent new objects being initialized every call
var HttpClient = function() {
    this.get = function(aUrl, aCallback){
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function(){
            if(anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }
        anHttpRequest.open( "GET", aUrl, true );
        anHttpRequest.send(null);
    }
}
var client = new HttpClient();

// http request made possible due to:
// https://www.youtube.com/watch?v=lD1iRp4ewZY&ab_channel=jinujawadm
async function RequestWordData(word, callback) {
    const url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + word + "?key=" + key;
    
    syllableDict[word] = {};
    GetPronunciation(word);

    client.get(url, function(response) {
        var response1 = JSON.parse(response);

        //TODO: more acurately parse the response from Merriam-Webster
        //          make sure that you're using an index that has the right tense of the word
        try {
            syllableDict[word]['syllables'] = response1[0]['hwi']['hw'].split('*');
            syllableDict[word]['definition'] =  response1[0]['shortdef'];
        } catch(err){
            console.log('Invalid word sent to Merriam-Webster API');
            console.log(err);
            syllableDict[word]['syllables'] = undefined;
            syllableDict[word]['definition'] = undefined;
        }
        let value = wordToJSON(word);
        
        console.log(value);
        console.log(response1);

        console.log('calling callback in RequestWordData');
        callback(value);
    })
}

function wordToJSON(word){
    let value = {};
    value['syllablePopup'] = {};
    value['syllablePopup']['word'] = word;
    value['syllablePopup']['syllables'] = syllableDict[word]['syllables'];
    value['syllablePopup']['pronunciation'] = syllableDict[word]['pronunciation'];
    value['syllablePopup']['definition'] = syllableDict[word]['definition'];
    return value;
}

function GetPronunciation(word){
    word = word.toLowerCase();
    // if word not in CMU ARPABET Dict, set pronun to undefined and return
    if(!(word in arpabetDict)){
        console.log(word + " not in arpabetDict. Skipping.");
        syllableDict[word]['pronunciation'] = undefined;
        return undefined;
    }
    let pronun = arpabetDict[word];

    let i, j;
    let ipa = '';

    for(i = 0; i < pronun.length; i++){
        for(j = 0; j < pronun[i].length; j++){
            pronun[i][j] = ArpabetToIpa(pronun[i][j]);
            ipa = ipa + pronun[i][j];
        }
    }
    console.log(pronun);
    syllableDict[word]['pronunciation'] = pronun;
    return pronun;
}

function GetWordFromDict(word, callback){
    // check to make sure the selected word isn't already stored
    if(word in syllableDict){
        console.log('Data already retreived for: ' + word);
        let value = wordToJSON(word);
        callback(value);
        return;
    }
    
    console.log('Calling RequestWordData');
    RequestWordData(word, callback);
}