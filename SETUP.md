# Booking Form → Google Sheets Setup Guide
**A.T. Johnson Photography**

Follow these steps once to connect the booking form to Google Sheets and email notifications. The whole process takes about 5 minutes — the Sheet is already created for you.

---

## Step 1 — Open Your Google Sheet

Your booking inquiries sheet has already been created in your Google Drive account. Open it here:

**[AT Johnson Photography — Booking Inquiries](https://docs.google.com/spreadsheets/d/1HN3Yb2jYKfgzdZZhn1mWgvi6fXXgiT_0mh65AiD2H6k/edit)**

Sign in as **atjohnsonphotos@gmail.com** if prompted. You'll see Row 1 already has these column headers:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Full Name | Email Address | Phone Number | Preferred Date | Shoot Location | Type of Shoot | Lighting Conditions | How Did You Hear | Message |

Each form submission will add a new row below these headers automatically.

---

## Step 2 — Open the Apps Script Editor

1. In the open Google Sheet, click the menu: **Extensions → Apps Script**.
2. A new browser tab opens with the script editor. You'll see a default file called `Code.gs` with an empty `myFunction`.
3. **Select all** the existing code and **delete it**.

---

## Step 3 — Paste the Script

1. Open the file `Code.gs` that came with this project.
2. **Copy all of its contents**.
3. **Paste** it into the Apps Script editor (replacing the code you just deleted).
4. Click the **Save** icon (floppy disk) or press **Ctrl+S** / **Cmd+S**.

The script already has your spreadsheet ID and email address (`atjohnsonphotos@gmail.com`) hardcoded — no editing needed.

---

## Step 4 — Deploy as a Web App

1. Click **Deploy → New deployment** (top-right button).
2. Click the **gear icon** next to "Select type" and choose **Web app**.
3. Fill in the settings exactly as shown:
   - **Description:** `Booking Form Handler`
   - **Execute as:** `Me (atjohnsonphotos@gmail.com)`
   - **Who has access:** `Anyone`
4. Click **Deploy**.
5. Google will ask you to **authorize** the script:
   - Click **Authorize access**
   - Choose `atjohnsonphotos@gmail.com`
   - Click **Allow** on the permissions screen
   - *(The script needs permission to write to your Sheet and send email on your behalf)*
6. After authorizing you'll see a **Web app URL** that looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
7. **Copy that URL** — you need it for the next step.

---

## Step 5 — Paste the URL into formSubmit.js

1. Open `formSubmit.js` in a text editor (Notepad, VS Code, etc.).
2. Find this line near the top:
   ```javascript
   var SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";
   ```
3. Replace `PASTE_YOUR_APPS_SCRIPT_URL_HERE` with the URL you just copied, keeping the quotes:
   ```javascript
   var SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```
4. Save the file and upload it to your website alongside `contact.html`.

---

## Step 6 — Test It

1. Open `contact.html` in your browser.
2. Fill out the form and click **Send Inquiry**.
3. The form disappears and the thank-you message appears.
4. Verify two things:
   - **[Open your Sheet](https://docs.google.com/spreadsheets/d/1HN3Yb2jYKfgzdZZhn1mWgvi6fXXgiT_0mh65AiD2H6k/edit)** — a new row should appear with all the submitted data.
   - **Check Gmail** at atjohnsonphotos@gmail.com — a notification email with the full inquiry details should arrive within seconds. Check Spam if it doesn't show up.

---

## What the Email Notification Looks Like

```
Subject: 📷 New Booking Inquiry — Jane Smith

You have a new booking inquiry from your website.

----------------------------------------------
Name:            Jane Smith
Email:           jane@example.com
Phone:           (435) 555-0100
Preferred Date:  2026-07-15
Location:        Zion National Park, UT
Type of Shoot:   landscape
Lighting:        Golden Hour, Stormy / Moody
Referral Source: instagram
----------------------------------------------

Message:
I'd love to book a sunrise shoot at Angels Landing...

----------------------------------------------
Reply directly to this email to respond to Jane Smith.
View all inquiries: https://docs.google.com/spreadsheets/d/1HN3Yb2j...
```

Hitting **Reply** on the notification email goes directly to the client's address.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Form shows the error message | Check that the URL in `formSubmit.js` is correct and ends in `/exec`. Make sure "Who has access" is set to **Anyone**. |
| Sheet gets data but no email arrives | Check Gmail's Spam folder. Mark it Not Spam so future ones go to your inbox. |
| "Authorization required" error | Re-open the Apps Script editor → Deploy → Manage deployments → re-authorize. |
| You edited Code.gs but changes aren't working | You must create a **New deployment** each time you change the script. Copy the new URL and update `formSubmit.js` again. |

---

## Re-deploying After Changes

If you ever update `Code.gs`:

1. Save your changes in the Apps Script editor.
2. Click **Deploy → New deployment** (same settings as before).
3. Copy the new URL and update `formSubmit.js`.

> ⚠️ Each new deployment gets a different URL. Always use the latest one.
