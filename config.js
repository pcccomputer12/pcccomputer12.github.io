// ================================================
// config.js — Param Computer Centre
// ⚙️  Edit ONLY this file to connect Google Sheets
// Safe to commit to GitHub (no secret keys needed)
// ================================================

const PCC = {

  // ── Google Sheet ID ──────────────────────────
  // Get from your sheet URL:
  // https://docs.google.com/spreadsheets/d/ [ID HERE] /edit
  SHEET_ID: '157mkKilk9mhfAKmbl9-n3y9KiHujTPR2J8wH-T8RrS8',

  // ── Tab GIDs ─────────────────────────────────
  // Click each tab → look at URL: ...#gid=XXXXXXX
  GIDS: {
    carousel: '569589810',
    reviews:  '1588583017',
    courses:  '88230806',
    services: '1591725340',
  },

  // ── Institute Info ───────────────────────────
  phone1:   '7888782544',
  phone2:   '7508436951',
  whatsapp: 'https://wa.me/917888782544',
  maps:     'https://maps.app.goo.gl/vMcL15YgNVKrXzqn7',

  // ── Hero carousel auto-play speed (ms) ───────
  speed: 5000,

  // ── Returns CSV export URL for any sheet tab ─
  csv(name) {
    return `https://docs.google.com/spreadsheets/d/${this.SHEET_ID}/export?format=csv&gid=${this.GIDS[name]}`;
  }
};
