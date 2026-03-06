// ================================================
// PARAM COMPUTER CENTRE — Google Apps Script
// Paste this into Extensions > Apps Script
// Then: Run > setupSheets (run ONCE only)
// No Web App deployment needed.
// ================================================

function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const H = '#0d2137', G = '#f5a623'; // header colors

  function tab(name) {
    return ss.getSheetByName(name) || ss.insertSheet(name);
  }
  function head(sheet, cols) {
    sheet.clearContents();
    const r = sheet.getRange(1, 1, 1, cols.length);
    r.setValues([cols]);
    r.setFontWeight('bold').setBackground(H).setFontColor(G);
    sheet.setFrozenRows(1);
  }

  // ── Sheet 1: carousel ──
  const s1 = tab('carousel');
  head(s1, ['title','subtitle','description','badge','btn_text','btn_link']);
  s1.getRange(2,1,4,6).setValues([
    ['Upskill Your Career','with the Right Skills','Param Computer Centre — quality computer courses & digital services in Giaspura, Ludhiana.','🏆 6 Years of Excellence','View Courses','courses.html'],
    ['DCA & ADCA Courses','Diploma Programs','Complete diploma programs. Get certified and job-ready in 3–12 months.','📚 Certified Programs','Enroll Now','contact.html'],
    ['Tally ERP 9 + GST','Accounting Course','Most in-demand skill for finance jobs. Full Tally with GST, payroll & inventory.','📊 High Demand','Know More','courses.html'],
    ['Aadhar • PAN • Banking','Digital Services','We also provide Aadhar, PAN, banking CSP, PF and govt form services.','🏦 One-Stop Centre','Our Services','services.html'],
  ]);
  s1.autoResizeColumns(1, 6);

  // ── Sheet 2: reviews ──
  const s2 = tab('reviews');
  head(s2, ['name','course','review','rating','initials']);
  s2.getRange(2,1,5,5).setValues([
    ['Rajveer Singh',  'Tally ERP 9 + GST', 'Tally course yahan se kiya aur ek mahine mein job lag gayi. Bahut accha padhate hain!', '5', 'R'],
    ['Pooja Rani',     'ADCA',              'ADCA course kiya — sab kuch practical sikhate hain. Certificate bhi milta hai!',         '5', 'P'],
    ['Manpreet Kaur',  'Digital Services',  'Aadhar aur PAN card ki problem jaldi solve ho gayi. Bahut helpful staff hai.',           '5', 'M'],
    ['Sukhwinder Gill','Advance Excel',     'Excel mein pivot table aur formulas bahut acchi tarah sikhaya. Highly recommend!',       '5', 'S'],
    ['Harpreet Kaur',  'DCA',               'Pehle computers se dar lagta tha. Ab confidently use karti hoon. Great teachers!',       '5', 'H'],
  ]);
  s2.autoResizeColumns(1, 5);

  // ── Sheet 3: courses ──
  const s3 = tab('courses');
  head(s3, ['name','short_name','icon','duration','color_from','color_to','tagline','topics']);
  s3.getRange(2,1,5,8).setValues([
    ['Diploma in Computer Applications',         'DCA',   '💻', '3–6 Months',   '#ff8f00','#ffca28', 'Your first step into computing',    'Windows OS|MS Word|MS Excel|MS PowerPoint|Internet & Email|Typing Practice|Basic Photoshop|Printing & Scanning'],
    ['Advanced Diploma in Computer Applications','ADCA',  '🎓', '6–12 Months',  '#1565c0','#42a5f5', 'Complete career-ready diploma',     'All DCA Topics|Advance Excel|Tally ERP 9 Basics|CorelDRAW / DTP|Photoshop & Design|HTML Basics|C Programming|Project & Practical'],
    ['Basic Computer Course',                    'Basic', '🖥️', '1–2 Months',   '#2e7d32','#66bb6a', 'For complete beginners',            'Computer Basics|Windows OS|MS Word|Internet Browsing|WhatsApp & Social Media|Online Payments|Email Usage|File Management'],
    ['Advance Excel',                            'Excel', '📈', '1.5–2 Months', '#ad1457','#f06292', 'Master data & spreadsheets',        'VLOOKUP & HLOOKUP|IF & Nested IF|Pivot Tables & Charts|Conditional Formatting|Data Validation|MIS Reports|Macros & Automation|Dashboard Design'],
    ['Tally ERP 9 + GST',                        'Tally', '📊', '2–3 Months',   '#004d40','#26a69a', 'Accounting & taxation complete',    'Company Setup|Ledger & Groups|Purchase & Sales Entry|GST Configuration|GST Returns Filing|Inventory Management|Payroll & Salary|Balance Sheet & P&L'],
  ]);
  // Color rows to match course theme
  const courseColors = ['#fff8e1','#e3f2fd','#e8f5e9','#fce4ec','#e0f2f1'];
  courseColors.forEach((c, i) => s3.getRange(i+2, 1, 1, 8).setBackground(c));
  s3.autoResizeColumns(1, 7);
  s3.setColumnWidth(8, 400);

  // ── Sheet 4: services ──
  const s4 = tab('services');
  head(s4, ['name','icon','color_from','color_to','description','items']);
  s4.getRange(2,1,6,6).setValues([
    ['Banking Services (CSP)', '🏦','#1565c0','#42a5f5', 'Customer Service Point — open accounts, deposit/withdraw cash, and access banking nearby.',    'Account Opening|Cash Deposit & Withdrawal|Balance Enquiry|Mini Statement|Money Transfer'],
    ['Aadhar Card Services',   '🪪','#ff6f00','#ffca28', 'All Aadhar-related tasks — updates, corrections, downloads — handled quickly.',                'Name/Address Update|Mobile Number Link|Aadhar Download & Print|Biometric Update|Aadhar Correction'],
    ['PAN Card Services',      '📄','#4a148c','#ab47bc', 'Apply for new PAN or update existing. We fill and submit your application accurately.',         'New PAN Application|PAN Correction & Update|PAN Card Reprint|e-PAN Download|PAN-Aadhar Linking'],
    ['PF (Provident Fund)',    '💼','#1b5e20','#66bb6a', 'Navigate EPFO easily. We help employees apply, transfer, and claim PF.',                       'PF Account Registration|PF Withdrawal Apply|PF Transfer (Job Change)|UAN Activation|PF Balance Check'],
    ['Government Forms',       '📋','#b71c1c','#ef5350', 'We fill and submit government forms correctly — saving time and avoiding costly mistakes.',      'Ration Card Apply|Voter ID Apply/Correction|Income/Caste Certificate|PM Yojna Registration|Scholarship Forms'],
    ['Printing & Scanning',    '🖨️','#004d40','#26a69a', 'Professional print & scan for all documents. B&W and colour printing at affordable rates.',    'B&W Printing|Colour Printing|Document Scanning|Photo Printing|Lamination'],
  ]);
  s4.autoResizeColumns(1, 6);

  SpreadsheetApp.getUi().alert(
    '✅ All 4 sheets created with sample data!\n\n' +
    'NOW DO THIS:\n\n' +
    '1. Click Share (top right) → Anyone with link → Viewer → Done\n\n' +
    '2. Copy the Sheet ID from the browser URL bar\n\n' +
    '3. Click each sheet tab below, note the #gid= number in URL\n\n' +
    '4. Paste Sheet ID and GIDs into config.js\n\n' +
    '5. Upload website to GoDaddy → Done!'
  );
}
