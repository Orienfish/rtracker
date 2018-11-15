# HOW TO RUN
web-ext run
- This will create a popup which you can then enter in the url - https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/What_next_ 

# RTracker
The purpose of this browser extension is to be able to provide the browser extension that will influence 
the webpage content and communicate with the eye tracker.

## Technologies
> Javascript DOM API (may use Jquery)
- Provides the ability to modify the page content.
- ie : highlighting and blurring - adding in html content and adjusting the CSS conten
> Node js (not used yet)
- Provides with npm package utility that will be used to structure project libraries in JS
- Will also be used to interact with the Tobii reader and extend behavior to webpages.

## Files
> blur.js
- The purpose of blur is to provide the blurring functionality on specific content of webpages through dynamic CSS changes.
> highlight.js
- Provides the functionality for highlighting certain parts of elements on the currently viewed webpage.
> reformat.js
- Provides the initial rendering of webpages - remove extraneous elements, format text to size/width, etc.
> manifest.json
- JSON file that browsers will use, like an entry point for the project.

## Demonstration on CHROME! (Also works on Firefox)
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension
The developer mozilla path is the current location at which the extension will have influence on.

## Source of Blurring on blur.js
https://css-tricks.com/fun-with-blurred-text/
this does not work if the browser does not allow for the text-shadow property

## Useful Resources:
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts

