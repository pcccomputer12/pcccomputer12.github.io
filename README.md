# 🖥️ Param Computer Centre — Official Website

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Google Sheets](https://img.shields.io/badge/Google%20Sheets-34A853?style=flat&logo=google-sheets&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat&logo=github&logoColor=white)

> Official website for **Param Computer Centre**, Pritam Colony, 33 Feet Road, Giaspura, Ludhiana, Punjab.  
> Computer education & digital services since 2018.

---

## 🌐 Live Website

👉 **[https://YOUR-USERNAME.github.io/param-computer-centre](https://YOUR-USERNAME.github.io/param-computer-centre)**

> Replace `YOUR-USERNAME` with your GitHub username after deploying.

---

## 📸 Pages

| Page | Description |
|---|---|
| `index.html` | Home — hero carousel, courses, services, reviews, map |
| `about.html` | About — 6-year story, timeline, values |
| `courses.html` | Courses — DCA, ADCA, Basic, Excel, Tally (Google Sheets) |
| `services.html` | Services — Banking, Aadhar, PAN, PF, Govt Forms (Google Sheets) |
| `contact.html` | Contact form + Google Map |

---

## ⚡ Tech Stack

- **Frontend** — Pure HTML5, CSS3, Vanilla JavaScript (no frameworks)
- **Database** — Google Sheets (free, edit from anywhere)
- **Hosting** — GitHub Pages (free) or GoDaddy
- **Fonts** — Google Fonts (Baloo 2 + Hind)
- **Maps** — Google Maps Embed

---

## 🗂️ Folder Structure

```
param-computer-centre/
│
├── index.html          # Home page
├── about.html          # About page
├── courses.html        # Courses page (dynamic)
├── services.html       # Services page (dynamic)
├── contact.html        # Contact page
│
├── style.css           # All styles
├── app.js              # All JavaScript + Google Sheets fetch
├── config.js           # ⚙️  YOUR SETTINGS — edit this file
│
├── apps-script.js      # Google Apps Script (run once to setup sheets)
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

---

## 🚀 Deploy to GitHub Pages (Free Hosting)

### Step 1 — Fork or Upload this repo
```bash
git clone https://github.com/YOUR-USERNAME/param-computer-centre.git
cd param-computer-centre
```

### Step 2 — Connect Google Sheets (see below)

### Step 3 — Push to GitHub
```bash
git add .
git commit -m "Initial website launch"
git push origin main
```

### Step 4 — Enable GitHub Pages
1. Go to your repo on GitHub
2. **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` → folder: `/ (root)`
5. Click **Save**
6. Wait 2 minutes → your site is live! ✅

---

## 🗄️ Google Sheets Setup (Database)

All dynamic content (courses, services, reviews, hero slides) is stored in Google Sheets.

### 1. Create the Sheet
- Go to [sheets.google.com](https://sheets.google.com)
- Create a new spreadsheet named **"Param Computer Centre DB"**

### 2. Run Setup Script (one time)
- In your sheet: **Extensions → Apps Script**
- Delete existing code, paste everything from `apps-script.js`
- Click **Run → setupSheets**
- Allow permissions → all 4 tabs created automatically ✅

### 3. Make Sheet Public
- Click **Share** → General access → **Anyone with the link → Viewer**

### 4. Get Your Sheet ID + Tab GIDs
From your sheet URL:
```
https://docs.google.com/spreadsheets/d/ [SHEET_ID] /edit#gid=[GID]
```

### 5. Update `config.js`
```javascript
const PCC = {
  SHEET_ID: 'your-sheet-id-here',
  GIDS: {
    carousel: '0',
    reviews:  'xxxxxxxxx',
    courses:  'xxxxxxxxx',
    services: 'xxxxxxxxx',
  },
  // ...
};
```

---

## ✏️ Updating Content (No coding needed!)

Just edit your Google Sheet rows. Changes appear on the website within **5 minutes** automatically.

| Sheet Tab | Controls |
|---|---|
| `carousel` | Hero slider slides on home page |
| `reviews` | Student testimonials |
| `courses` | Course cards with colors & syllabus |
| `services` | Service cards with colors & items |

**Topics / Items** are pipe-separated: `Windows OS\|MS Word\|MS Excel`

**Course colors** use hex codes: `color_from = #1565c0`, `color_to = #42a5f5`

---

## 📞 Contact

**Param Computer Centre**  
📍 Pritam Colony, 33 Feet Road, Giaspura, Ludhiana, Punjab  
📞 [7888782544](tel:7888782544) | [7508436951](tel:7508436951)  
💬 [WhatsApp](https://wa.me/917888782544)  
🗺️ [Google Maps](https://maps.app.goo.gl/vMcL15YgNVKrXzqn7)

---

## 📄 License

This website was built for **Param Computer Centre**.  
All rights reserved © 2025 Param Computer Centre.
