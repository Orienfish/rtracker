browser.menus.create({
    id: "syllables",
    title: "Look up syllables",
    contexts: ["selection"]
});

browser.menus.onClicked.addListener(contextMenuAction);

function contextMenuAction(info, tab){
    if (info.menuItemId == "syllables") {
      const word = info.selectionText.replace(/\s+/, "");
      let syllableInfo = getSyllables(word);
      if(syllableInfo === undefined){
          console.log('Failed to retrieve syllable content for: ' + word);
      } else{
        console.log(word);
        console.log(syllableInfo['syllables']);
        console.log(syllableInfo['pronunciation']);
      }
      
    } else {
        console.log('whoops');
    }
}