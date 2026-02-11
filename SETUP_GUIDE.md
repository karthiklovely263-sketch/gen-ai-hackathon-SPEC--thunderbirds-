# QUICK START GUIDE - Sign Board & Poster Designer

## ⚡ 5-Minute Setup

### Step 1: Navigate to Project Directory
```bash
cd c:\Users\KARTHIK\OneDrive\Desktop\hackathon2
```

### Step 2: Create Python Virtual Environment
```bash
python -m venv venv
```

### Step 3: Activate Virtual Environment
```bash
venv\Scripts\activate
```

You should see `(venv)` prefix in your terminal.

### Step 4: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 5: Start the Flask Server
```bash
python app.py
```

You should see:
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

### Step 6: Open in Browser
Go to: **http://localhost:5000**

## 🎨 Your First Design (2 Minutes)

1. **Choose a Template** - Click on one of the 3 templates on the left (Modern, Elegant, or Vibrant)
2. **Enter Shop Name** - Type your shop name (e.g., "Pizza Palace")
3. **Select Business Type** - Choose from dropdown (e.g., "Restaurant")
4. **Generate Design** - Click the "Generate Design" button
5. **Customize** - 
   - Drag text around to reposition
   - Click text to edit
   - Use font controls on the left
   - Pick colors with color pickers
6. **Download** - Click "Download PNG" to save your design

## 🛑 To Stop the Server

Press `Ctrl+C` in the terminal where Flask is running.

## ✅ What's Included

```
hackathon2/
├── app.py                      ← Flask backend (routes & APIs)
├── requirements.txt            ← Python dependencies
├── README.md                   ← Full documentation
├── SETUP_GUIDE.md             ← This file
├── templates/
│   └── index.html             ← Main page (HTML structure)
└── static/
    ├── style.css              ← Dark theme styling
    └── editor.js              ← All JavaScript logic
```

## 🎯 Feature Highlights

✅ **3 Professional Templates** - Modern, Elegant, Vibrant designs
✅ **20+ Business Types** - Restaurant, Salon, Grocery, etc.
✅ **Live Editing** - Drag, resize, and customize in real-time
✅ **Modern Fonts** - Poppins, Montserrat, Inter
✅ **Color Control** - Full RGB color picker for all elements
✅ **PNG Export** - Download high-quality signboards
✅ **Dark UI/UX** - Canva-like professional interface
✅ **Responsive Design** - Works on desktop, tablet, mobile
✅ **Free & Open** - No paid APIs, all vanilla JavaScript

## 🔧 Customize It

### Add More Business Types
Edit `app.py` line ~45:
```python
BUSINESS_TYPES = [
    'Restaurant',
    'Salon',
    'Your New Type',  # ← Add here
]
```

### Add More Templates
Edit `app.py` line ~20:
```python
TEMPLATES = {
    'my_template': {
        'name': 'My Template',
        'background_color': '#000000',
        # ... other properties
    }
}
```

### Change Colors
Edit `static/style.css` root variables (~line 13):
```css
--primary-color: #00d4ff;      /* Cyan */
--secondary-color: #7c3aed;    /* Purple */
--accent-color: #ff006e;       /* Pink */
```

## 📱 Responsive Breakpoints

- **Desktop** (1024px+) - Full features
- **Tablet** (768px-1024px) - Compact sidebar
- **Mobile** (<768px) - Stacked layout

## ⌨️ Keyboard Shortcuts

- `Ctrl+S` - Save design to server
- `Escape` - Deselect element
- `Delete` - Clear selected text

## 🐛 Troubleshooting

**Port 5000 in use?**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Can't install Flask?**
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

**Design not showing?**
- Check browser console (F12)
- Verify Flask server is running
- Try refreshing the page

**Export not working?**
- Ensure html2canvas loads (check F12 Network tab)
- Try different browser
- Check browser permissions

## 💡 Tips

1. **Mobile Responsive** - The interface adapts to mobile/tablet automatically
2. **Real-time Preview** - All changes are instant
3. **Save Often** - Use Ctrl+S to save your work
4. **Color Matching** - Use hex color picker for precise colors
5. **Mobile Friendly** - Fully functional on smartphones

## 📊 Architecture Overview

```
┌─────────────────────────────────────────┐
│          Web Browser (Frontend)          │
│  HTML + CSS + Vanilla JavaScript         │
│  - Template selection                    │
│  - Design canvas                         │
│  - Color pickers                         │
│  - Drag & drop                           │
│  - PNG export (html2canvas)              │
└─────────────┬───────────────────────────┘
              │ HTTP Requests
              ↓
┌─────────────────────────────────────────┐
│    Flask Server (Backend) Port 5000      │
│  - Template API                          │
│  - Business types API                    │
│  - Design generation                     │
│  - Design saving (ready for DB)          │
└─────────────────────────────────────────┘
```

## 🎓 Learning Resources

- **Flask**: https://flask.palletsprojects.com/
- **HTML Canvas**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- **CSS Grid**: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
- **Vanilla JavaScript**: https://developer.mozilla.org/en-US/docs/Web/JavaScript

## 🚀 Next Steps

1. ✅ Complete setup (you're here!)
2. ✅ Run the application
3. ✅ Create your first design
4. ✅ Download a PNG
5. 🎯 Customize templates and business types
6. 🎯 Deploy to production (optional)

## 📞 Support

If you encounter any issues:
1. **Check the README.md** - Full documentation
2. **Check browser console** (F12) - Error messages
3. **Check Flask console** - Server logs
4. **Verify all files exist** - templates/ and static/ folders
5. **Try restarting Flask** - Kill and restart Python server

---

**Ready to design? Start Flask and head to http://localhost:5000! 🎨**

Questions? Check README.md for complete documentation.
