// week6.js — Gear Guide list builder
// Dynamically creates an unordered list from the gearItems array
// and injects it into the <p id="list"> element on gear.html.
 
// -----------------------------------------------------------------------
// ARRAY: gearItems
// Each string represents one piece of camera/field gear.
// The values in this array become the <li> items in the list.
// -----------------------------------------------------------------------
let gearItems = [
    "Canon EOS 60D — versatile, enthusiast-level DSLR APS-C body",
    "Canon EF-S 18-55mm f/3.5-5.6 IS II — kit zoom lens",
    "Canon EF 70-300mm f/4-5.6 IS II USM — budget telephoto",
    "Canon EF 50mm f/1.8 STM — the 'nifty fifty', great for low light",
    "AmazonBasics 60-Inch Lightweight Tripod — solid budget stand",
    "Altura Photo UV Protection Filter 58mm — lens protection",
    "Sandisk 64GB Ultra SD Card — reliable everyday memory",
    "LP-E17 Third-Party Battery Pack — spare power on the go"
];
 
// Log the full array so we can see all items in the console at startup
console.log("gearItems array loaded:", gearItems);
 
// -----------------------------------------------------------------------
// FUNCTION: buildGearList()
// Loops through the gearItems array, concatenates each item into a
// properly formatted HTML <ul> string, and inserts it into the page.
// -----------------------------------------------------------------------
function buildGearList() {
 
    // Log a message to show the function has been called
    console.log("buildGearList() called — starting list construction");
 
    // listCode will accumulate the complete HTML string for the list.
    // Start with the opening <ul> tag and the CSS class for styling.
    let listCode = "<ul class='gear-list'>";
 
    // FOR LOOP: iterate over every item in the gearItems array
    for (let i = 0; i < gearItems.length; i++) {
 
        // Wrap each array item in <li> tags and concatenate onto listCode
        listCode = listCode + "<li>" + gearItems[i] + "</li>";
 
        // Log each item as it is added so we can trace the loop in the console
        console.log("Added item " + (i + 1) + " of " + gearItems.length + ": " + gearItems[i]);
    }
 
    // Close the unordered list tag
    listCode = listCode + "</ul>";
 
    // Log the finished HTML string before it is inserted into the DOM
    console.log("Finished listCode string:", listCode);
 
    // Insert the completed list HTML into the paragraph with id="list"
    document.getElementById("list").innerHTML = listCode;
 
} // end buildGearList()
 
// -----------------------------------------------------------------------
// EVENT HANDLER: window.onload
// Waits until the entire page has loaded before calling buildGearList().
// This ensures the <p id="list"> element exists in the DOM before
// JavaScript tries to find and modify it.
// -----------------------------------------------------------------------
window.onload = function() {
    buildGearList();  // Call our list-building function once the page is ready
};