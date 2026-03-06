# Param Computer Centre – Setup & Hosting Guide

## Files in This Package (9 total)
| File | Purpose |
|---|---|
| index.html | Home page |
| about.html | About page |
| courses.html | Courses page (dynamic) |
| services.html | Services page (dynamic) |
| contact.html | Contact page |
| style.css | All styling |
| app.js | All JavaScript logic |
| config.js | ✏️ YOU ONLY EDIT THIS FILE |
| apps-script.js | Paste into Google Apps Script, run once |

---

## STEP 1 — Create Google Sheet
1. Go to sheets.google.com
2. Create new spreadsheet
3. Name it: Param Computer Centre DB

---

## STEP 2 — Set Up Sheet Tabs (Run Once)
1. In your sheet: Extensions → Apps Script
2. Delete existing code
3. Paste everything from apps-script.js
4. Save → Run → setupSheets
5. Allow permissions
6. ✅ All 4 tabs created with sample data!

---

## STEP 3 — Make Sheet Public
1. Click Share (top right)
2. General access → Anyone with the link → Viewer
3. Done

---

## STEP 4 — Get Sheet ID and GIDs
Sheet ID is in your URL:
https://docs.google.com/spreadsheets/d/  [COPY THIS PART]  /edit

GID for each tab: click the tab at bottom, look at URL:
...edit#gid=0         ← that number after gid= is your GID

---

## STEP 5 — Update config.js
Open config.js and fill in your IDs:

  SHEET_ID: 'paste-your-sheet-id-here',
  GIDS: {
    carousel: '0',
    reviews:  '512376235',   ← your actual gid numbers
    courses:  '1863884091',
    services: '2048384901',
  },

Save the file. Done!

---

## HOSTING ON GODADDY

1. Log in to godaddy.com → My Products
2. Find your Hosting → click Manage
3. Click cPanel → File Manager
4. Open the public_html folder
5. Delete any existing index.html file
6. Click Upload → upload your param_final.zip
7. Right-click the zip → Extract
8. Move ALL files from the extracted folder INTO public_html directly
   (so public_html contains index.html directly, not inside a subfolder)
9. Visit your domain → site is live! ✅

---

## UPDATING CONTENT (Daily Use)
Just edit rows in your Google Sheet.
Changes appear on website within 5 minutes automatically.

Sheet tabs:
- carousel → Hero slides on home page
- reviews  → Student testimonials
- courses  → Course cards (colors change with color_from / color_to)
- services → Service cards

Topics/items are separated by pipe: Windows OS|MS Word|MS Excel

---

## ADDING YOUR PHOTOS
In about.html, find this comment:
  <!-- Replace with: <img src="your-photo.jpg"... -->
Upload your photo to public_html on GoDaddy.
Then replace the img-ph div with:
  <img src="your-photo.jpg" style="border-radius:16px;width:100%">
