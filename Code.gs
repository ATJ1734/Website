// ============================================================
// Code.gs — A.T. Johnson Photography Booking Inquiry Handler
// ------------------------------------------------------------
// This Google Apps Script acts as a web app endpoint.
// When the booking form on contact.html is submitted, it:
//   1. Appends a new row to the Google Sheet
//   2. Sends an email notification to the site owner
//
// DEPLOYMENT: Publish > Deploy as web app
//   Execute as:  Me (atjohnsonphotos@gmail.com)
//   Who has access: Anyone
// ============================================================


// ------------------------------------------------------------
// CONFIGURATION — update these values before deploying
// ------------------------------------------------------------

// The email address that will receive new-inquiry notifications.
// This must be the same Google account that owns this script.
var NOTIFY_EMAIL = "atjohnsonphotos@gmail.com";

// The ID of the Google Sheet that stores booking inquiries.
// This is already set to the sheet created for your account —
// you do not need to change this value.
var SPREADSHEET_ID = "1HN3Yb2jYKfgzdZZhn1mWgvi6fXXgiT_0mh65AiD2H6k";

// The name of the sheet tab inside the spreadsheet.
// Default is "Sheet1"; change this if you rename the tab.
var SHEET_NAME = "Sheet1";


// ------------------------------------------------------------
// doPost(e)
// Called automatically by Google whenever the contact form
// submits data to this web app's URL.
// ------------------------------------------------------------
function doPost(e) {

  try {
    // ---- 1. Open the spreadsheet by its hardcoded ID ----
    // Using openById() means the script works whether it's run as a
    // standalone project or container-bound to a different spreadsheet.
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // ---- 2. Pull each field out of the POST parameters ----
    var params      = e.parameter;
    var timestamp   = new Date();
    var fullName    = params.fullName       || "";
    var email       = params.emailAddress   || "";
    var phone       = params.phoneNumber    || "";
    var shootDate   = params.shootDate      || "";
    var location    = params.shootLocation  || "";
    var shootType   = params.shootType      || "";
    var referral    = params.referralSource || "";
    var message     = params.userMessage    || "";

    // Checkboxes: each has its own field name; collect whichever were ticked
    var lightingParts = [];
    if (params.lightGolden)  lightingParts.push("Golden Hour");
    if (params.lightBlue)    lightingParts.push("Blue Hour");
    if (params.lightOvercast) lightingParts.push("Overcast");
    if (params.lightStormy)  lightingParts.push("Stormy / Moody");
    var lighting = lightingParts.join(", ") || "None selected";

    // ---- 3. Append a new row to the sheet ----
    // Columns match the headers: Timestamp | Full Name | Email | Phone |
    //   Preferred Date | Location | Type | Lighting | Referral | Message
    sheet.appendRow([
      timestamp,
      fullName,
      email,
      phone,
      shootDate,
      location,
      shootType,
      lighting,
      referral,
      message
    ]);

    // ---- 4. Send an email notification to the site owner ----
    var subject = "📷 New Booking Inquiry — " + fullName;

    var body =
      "You have a new booking inquiry from your website.\n\n" +
      "----------------------------------------------\n" +
      "Name:            " + fullName   + "\n" +
      "Email:           " + email      + "\n" +
      "Phone:           " + phone      + "\n" +
      "Preferred Date:  " + shootDate  + "\n" +
      "Location:        " + location   + "\n" +
      "Type of Shoot:   " + shootType  + "\n" +
      "Lighting:        " + lighting   + "\n" +
      "Referral Source: " + referral   + "\n" +
      "----------------------------------------------\n\n" +
      "Message:\n" + message + "\n\n" +
      "----------------------------------------------\n" +
      "Reply directly to this email to respond to " + fullName + ".\n" +
      "View all inquiries: https://docs.google.com/spreadsheets/d/" + SPREADSHEET_ID;

    MailApp.sendEmail({
      to:       NOTIFY_EMAIL,
      replyTo:  email,           // Hitting Reply goes straight to the client
      subject:  subject,
      body:     body
    });

    // ---- 5. Return a JSON success response ----
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {

    // If anything goes wrong, return an error payload
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


// ------------------------------------------------------------
// doGet(e)
// Google requires a doGet handler to be present when the script
// is deployed as a web app. This returns a simple confirmation
// message so you can verify the URL is live.
// ------------------------------------------------------------
function doGet(e) {
  return ContentService
    .createTextOutput("AT Johnson Photography — booking form endpoint is live.")
    .setMimeType(ContentService.MimeType.TEXT);
}
