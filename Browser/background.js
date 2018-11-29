// made using this example:
// https://www.youtube.com/watch?v=AIh47SUwAs0
browser.contextMenus.create({
    id: "syllables",
    title: "Look up syllables",
    contexts: ["selection"]
});

browser.contextMenus.onClicked.addListener(contextMenuAction);

function contextMenuAction(info, tab){
    const word = info.selectionText.replace(/\s+/, "");
    console.log(word);
    AddWordToDict(word);
}