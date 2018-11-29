//const { require } = Cu.import("resource://gre/modules/commonjs/toolkit/require.js", {})
//const https = require('https');
//const fs = require('fs');
const key = "f5b9a3a3-0560-4ea5-8a8d-de8e489336c5";
//const arpabetDict = require('./data.json');
//const arpabetDict = JSON.parse(data.json);
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
let syllableDict = {'the': { 'pronunciation': [ [ 'ð', 'ʌ' ] ], 'syllables': [ 'the' ] },
                    'culmination': { 'pronunciation': [ [ 'k', 'ʌ', 'l' ], [ 'm', 'ʌ' ], [ 'n', 'eɪ' ], [ 'ʃ', 'ʌ', 'n' ] ], 'syllables': [ 'cul', 'mi', 'na', 'tion' ] },
                    'of': { 'pronunciation': [ [ 'ʌ', 'v' ] ], 'syllables': [ 'of' ] },
                    'speech': { 'pronunciation': [ [ 's', 'p', 'i', 'tʃ' ] ], 'syllables': [ 'speech' ] },
                    'for': { 'pronunciation': [ [ 'f', 'ɔ', 'ɹ' ] ], 'syllables': [ 'for' ] },
                    'which': { 'pronunciation': [ [ 'w', 'ɪ', 'tʃ' ] ], 'syllables': [ 'which' ] },
                    'i': { 'pronunciation': [ [ 'aɪ' ] ], 'syllables': [ 'i' ] },
                    'labored': { 'pronunciation': [ [ 'l', 'eɪ' ], [ 'b', 'ɝ', 'd' ] ], 'syllables': [ 'la', 'bored' ] },
                    'was': { 'pronunciation': [ [ 'w', 'ɑ', 'z' ] ], 'syllables': [ 'was' ] },
                    'often': { 'pronunciation': [ [ 'ɔ' ], [ 'f', 'ʌ', 'n' ] ], 'syllables': [ 'of', 'ten' ] },
                    'criticism': { 'pronunciation': [ [ 'k', 'ɹ', 'ɪ' ], [ 't', 'ɪ' ], [ 's', 'ɪ' ], [ 'z', 'ʌ', 'm' ] ], 'syllables': [ 'crit', 'i', 'cism' ] },
                    'bored': { 'pronunciation': [ [ 'b', 'ɔ', 'ɹ', 'd' ] ], 'syllables': [ 'bored' ] },
                    'expressions': { 'pronunciation': [ [ 'ɪ', 'k', 's', 'p' ], [ 'ɹ', 'ɛ' ], [ 'ʃ', 'ʌ', 'n', 'z' ] ], 'syllables': [ 'ex', 'pres', 'sion' ] },
                    'and': { 'pronunciation': [ [ 'ʌ', 'n', 'd' ] ], 'syllables': [ 'and' ] },
                    'sometimes': { 'pronunciation': [ [ 's', 'ʌ', 'm' ], [ 't', 'aɪ', 'm', 'z' ] ], 'syllables': [ 'some', 'times' ] },
                    'outright': { 'pronunciation': [ [ 'aʊ', 't' ], [ 'ɹ', 'aɪ', 't' ] ], 'syllables': [ 'out', 'right' ] },
                    'rejection': { 'pronunciation': [ [ 'ɹ', 'ɪ' ], [ 'dʒ', 'ɛ', 'k' ], [ 'ʃ', 'ʌ', 'n' ] ], 'syllables': [ 're', 'jec', 'tion' ] },
                    'thus': { 'pronunciation': [ [ 'ð', 'ʌ', 's' ] ], 'syllables': [ 'thus' ] },
                    'after': { 'pronunciation': [ [ 'æ', 'f' ], [ 't', 'ɝ' ] ], 'syllables': [ 'af', 'ter' ] },
                    'unsuccessful': { 'pronunciation': [ [ 'ʌ', 'n' ], [ 's', 'ʌ', 'k' ], [ 's', 'ɛ', 's' ], [ 'f', 'ʌ', 'l' ] ], 'syllables': [ 'un', 'suc', 'cess', 'ful' ] },
                    'revisions': { 'pronunciation': [ [ 'ɹ', 'i' ], [ 'v', 'ɪ' ], [ 'ʒ', 'ʌ', 'n', 'z' ] ], 'syllables': [ 're', 'vi', 'sion' ] },
                    'heartfelt': { 'pronunciation': [ [ 'h', 'ɑ', 'ɹ', 't' ], [ 'f', 'ɛ', 'l', 't' ] ], 'syllables': [ 'heart', 'felt' ] },
                    'considerations': { 'pronunciation': [  [ 'k', 'ʌ', 'n' ], [ 's', 'ɪ' ], [ 'd', 'ɝ' ], [ 'eɪ' ], [ 'ʃ', 'ʌ', 'n', 'z' ] ], 'syllables': [ 'con', 'sid', 'er', 'a', 'tion' ] },
                    'came': { 'pronunciation': [ [ 'k', 'eɪ', 'm' ] ], 'syllables': [ 'came' ] },
                    'to': { 'pronunciation': [ [ 't', 'u' ] ], 'syllables': [ 'to' ] },
                    'a': { 'pronunciation': [ [ 'ʌ' ] ], 'syllables': [ 'a' ] },
                    'conclusion': { 'pronunciation': [ [ 'k', 'ʌ', 'n', 'k' ], [ 'l', 'u' ], [ 'ʒ', 'ʌ', 'n' ] ], 'syllables': [ 'con', 'clu', 'sion' ] },
                    'no': { 'pronunciation': [ [ 'n', 'oʊ' ] ], 'syllables': [ 'no' ] },
                    'radical': { 'pronunciation': [ [ 'ɹ', 'æ' ], [ 'd', 'ʌ' ], [ 'k', 'ʌ', 'l' ] ], 'syllables': [ 'rad', 'i', 'cal' ] },
                    'idea': { 'pronunciation': [ [ 'aɪ' ], [ 'd', 'i' ], [ 'ʌ' ] ], 'syllables': [ 'idea' ] },
                    'however': { 'pronunciation':[ [ 'h', 'aʊ' ], [ 'ɛ' ], [ 'v', 'ɝ' ] ], 'syllables': [ 'how', 'ev', 'er' ] },
                    'expertly': { 'pronunciation':[ [ 'ɛ', 'k', 's' ], [ 'p', 'ɝ', 't' ], [ 'l', 'i' ] ], 'syllables': [ 'ex', 'pert', 'ly' ] },
                    'or': { 'pronunciation':[ [ 'ɔ', 'ɹ' ] ], 'syllables': [ 'or' ] },
                    'clumsily': { 'pronunciation':[ [ 'k', 'l', 'ʌ', 'm' ], [ 's', 'ʌ' ], [ 'l', 'i' ] ], 'syllables': [ 'clum', 'sy' ] },
                    'delivered': { 'pronunciation':[ [ 'd', 'ɪ' ], [ 'l', 'ɪ' ], [ 'v', 'ɝ', 'd' ] ], 'syllables': [ 'de', 'liv', 'er' ] },
                    'written': { 'pronunciation':[ [ 'ɹ', 'ɪ' ], [ 't', 'ʌ', 'n' ] ], 'syllables': [ 'write' ] },
                    'will': { 'pronunciation':[ [ 'w', 'ɪ', 'l' ] ], 'syllables': [ 'will' ] },
                    'be': { 'pronunciation':[ [ 'b', 'i' ] ], 'syllables': [ 'be' ] },
                    'unanimously': { 'pronunciation':[ [ 'j', 'u' ], [ 'n', 'æ' ], [ 'n', 'ʌ' ], [ 'm', 'ʌ', 's' ], [ 'l', 'i' ] ], 'syllables': [ 'unan', 'i', 'mous' ] },
                    'accepted': { 'pronunciation': [ [ 'æ', 'k' ], [ 's', 'ɛ', 'p' ], [ 't', 'ɪ', 'd' ] ], 'syllables': [ 'ac', 'cept', 'ed' ] },
                    'instead': { 'pronunciation':[ [ 'ɪ', 'n', 's' ], [ 't', 'ɛ', 'd' ] ], 'syllables': [ 'in', 'stead' ] },
                    'ideas': { 'pronunciation':[ [ 'aɪ' ], [ 'd', 'i' ], [ 'ʌ', 'z' ] ], 'syllables': [ 'idea' ] },
                    'encounter': { 'pronunciation':[ [ 'ɪ', 'n' ], [ 'k', 'aʊ', 'n' ], [ 't', 'ɝ' ] ], 'syllables': [ 'en', 'coun', 'ter' ] },
                    'without': { 'pronunciation':[ [ 'w', 'ɪ' ], [ 'θ', 'aʊ', 't' ] ], 'syllables': [ 'with', 'out' ] },
                    'constructive': { 'pronunciation':[ [ 'k', 'ʌ', 'n', 's', 't' ], [ 'ɹ', 'ʌ', 'k' ], [ 't', 'ɪ', 'v' ] ], 'syllables': [ 'con', 'struc', 'tive' ] },
                    'comment': { 'pronunciation':[ [ 'k', 'ɑ' ], [ 'm', 'ɛ', 'n', 't' ] ], 'syllables': [ 'com', 'ment' ] },
                    'but': { 'pronunciation':[ [ 'b', 'ʌ', 't' ] ], 'syllables': [ 'but' ] },
                    'this': { 'pronunciation':[ [ 'ð', 'ɪ', 's' ] ], 'syllables': [ 'this' ] },
                    'fact': { 'pronunciation':[ [ 'f', 'æ', 'k', 't' ] ], 'syllables': [ 'fact' ] },
                    'does': { 'pronunciation':[ [ 'd', 'ʌ', 'z' ] ], 'syllables': [ 'does' ] },
                    'not': { 'pronunciation':[ [ 'n', 'ɑ', 't' ] ], 'syllables': [ 'not' ] },
                    'negate': { 'pronunciation':[ [ 'n', 'ɪ' ], [ 'ɡ', 'eɪ', 't' ] ], 'syllables': [ 'ne', 'gate' ] },
                    'our': { 'pronunciation':[ [ 'aʊ' ], [ 'ɝ' ] ], 'syllables': [ 'our' ] },
                    'responsibility': { 'pronunciation':[ [ 'ɹ', 'i', 's' ], [ 'p', 'ɑ', 'n' ], [ 's', 'ʌ' ], [ 'b', 'ɪ' ], [ 'l', 'ʌ' ], [ 't', 'i' ] ], 'syllables': [ 're', 'spon', 'si', 'bil', 'i', 'ty' ] },
                    'write': { 'pronunciation':[ [ 'ɹ', 'aɪ', 't' ] ], 'syllables': [ 'write' ] },
                    'them': { 'pronunciation':[ [ 'ð', 'ɛ', 'm' ] ], 'syllables': [ 'them' ] },
                    'take': { 'pronunciation':[ [ 't', 'eɪ', 'k' ] ], 'syllables': [ 'take' ] },
                    'stand': { 'pronunciation':[ [ 's', 't', 'æ', 'n', 'd' ] ], 'syllables': [ 'stand' ] } };
/*let arpabetDict = {};

fs.readFile('data.json', (err, data) => {
    if (err) throw err;
    arpabetDict = JSON.parse(data);
});*/


function ArpabetToIpa(phonetic) {
    return conversionDict[phonetic];
}

function RequestWordData(word) {
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
            console.log(syllables);
            syllableDict[word]['syllables'] = syllables;
            //console.log('Syllables set for: ' + word);
            console.log(syllableDict);
            
            //potentially add return value
            /*let value = {};
            value['word'] = word;
            value['syllables'] = syllables;
            value['pronunciation'] = "";*/
            
            //return value;
            //TODO: add event representing it is finished?
        });
    }).on('error', (err) => {
        console.log('Error: ' + err.message);
    });
}

function GetPronunciation(word){
    word = word.toLowerCase();
    // get the pronunciation of the word before 
    if(!(word in arpabetDict)){
        console.log(word + " not in arpabetDict. Skipping.");
        return;
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
    //console.log('Pronunciation set for: ' + word);
    //console.log('ipa = ' + ipa);

    //TODO: add event to signify it is finished?

    //may or may not return stuff. was there for testing.
    //return ipa;
}

function AddWordToDict(word){
    // check to make sure the selected word isn't already stored
    if(word in syllableDict){
        //console.log('Data already retreived for: ' + word);
        return;
    }
    
    syllableDict[word] = {};
    
    RequestWordData(word);
    GetPronunciation(word);
}

// Test to make sure that the function is working
function test(word){
    console.log(word+':');
    AddWordToDict(word);
}

//for prototyping to mitigate importing of outside libraries and local files
function workAround(){
    let list = ['the', 'culmination', 'of', 'the', 'progressionist', 'speech', 'for', 'which', 'I', 'labored', 'was', 'often', 'criticism', 'bored', 'expressions', 'and', 'sometimes', 'outright', 'rejection', 'thus', 'after', 'unsuccessful', 'revisions', 'and', 'heartfelt', 'considerations', 'came', 'to', 'a', 'conclusion', 'no', 'radical', 'idea', 'however', 'expertly', 'or', 'clumsily', 'delivered', 'written', 'will', 'be', 'unanimously', 'accepted', 'instead', 'radical', 'ideas', 'will', 'often', 'encounter', 'criticism', 'without', 'constructive', 'comment', 'but', 'this', 'fact', 'does', 'not', 'negate', 'our', 'responsibility', 'to', 'write', 'them', 'take', 'a', 'stand'];
    list.forEach(function(word) {
        test(word);
    });
}

function getSyllables(word){
    if(word in syllableDict){
        return syllableDict[word];
    }
    console.log("Could not retrieve syllables for: " + word);
    return undefined;
}

//setTimeout(workAround, 1000);
//setTimeout(test, 1000, 'stand');
//setTimeout(test, 1000, 'literally');
//console.log(arpabetDict['really']);
//console.log(syllableDict['responsibility']);