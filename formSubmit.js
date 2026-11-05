// formSubmit.js — Booking Inquiry Form Handler
// ---------------------------------------------
// Intercepts the webForm submit event, packages the form data,
// and POSTs it to the Google Apps Script web app endpoint.
// On success: hides the form and shows the thank-you panel.
// On error:   re-enables the submit button and shows an error message.


// ---------------------------------------------------------------
// IMPORTANT: Replace the placeholder below with your actual
// Google Apps Script web app URL after deploying Code.gs.
// It will look like:
//   https://script.google.com/macros/s/AKfy.../exec
// ---------------------------------------------------------------
var SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";


// Wait until the page is fully loaded before attaching the listener
window.addEventListener("load", function () {

  // Grab references to the key elements we will need
  var form       = document.getElementById("webForm");
  var successBox = document.getElementById("form-success");
  var errorBox   = document.getElementById("form-error");
  var submitBtn  = document.getElementById("submitBtn");

  // Attach a submit event listener to the form
  form.addEventListener("submit", function (event) {

    // Prevent the browser's default form submission (which would
    // navigate away from the page or append data to the URL)
    event.preventDefault();

    // Give the user visual feedback that the form is being sent
    submitBtn.textContent = "Sending…";
    submitBtn.disabled = true;

    // Hide any previously shown error message
    errorBox.style.display = "none";

    // Build the data payload from the form fields.
    // URLSearchParams encodes as application/x-www-form-urlencoded,
    // which is what Google Apps Script's e.parameter expects.
    var rawData  = new FormData(form);
    var postData = new URLSearchParams();

    rawData.forEach(function (value, key) {
      postData.append(key, value);
    });

    // POST the data to the Apps Script endpoint.
    // mode: "no-cors" is required because Google Apps Script does not
    // return CORS headers; the response will be opaque but the request
    // is still received and processed by the script.
    fetch(SCRIPT_URL, {
      method: "POST",
      body:   postData,
      mode:   "no-cors"
    })
    .then(function () {
      // Request sent successfully — hide the form and show thank-you panel
      form.style.display      = "none";
      successBox.style.display = "block";
    })
    .catch(function (error) {
      // Network error — re-enable the button and show the error message
      console.error("Form submission error:", error);
      submitBtn.textContent = "Send Inquiry";
      submitBtn.disabled    = false;
      errorBox.style.display = "block";
    });

  }); // end submit listener

}); // end window load
