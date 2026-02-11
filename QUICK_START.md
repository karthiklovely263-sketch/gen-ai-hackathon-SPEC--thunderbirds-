# 🚀 SignBoard Pro - Quick Start Guide

## ⚡ Start Using Right Now

### Option 1: Server Already Running
If the Flask server is currently running, visit:
```
http://localhost:5000
```

### Option 2: Start Fresh
```bash
cd c:\Users\KARTHIK\OneDrive\Desktop\hackathon2
python app.py
```
Then open: `http://localhost:5000`

---

## 🎨 What You Can Do

1. **Select a Business Type** - Choose from 13 types (Restaurant, Cafe, Salon, Barber, Grocery, Electronics, Clothing, Pharmacy, Bakery, Gym, Jewelry, Hotel, Spa)

2. **Enter Shop Name** - Type your business name (e.g., "Mario's Restaurant")

3. **Pick a Design Template** - Choose between 3 professional templates:
   - **Bold Street Sign** - High contrast, maximum impact
   - **Premium Glow Board** - Elegant with glow effects
   - **Minimal Professional** - Clean, understated style

4. **Click "Generate Design"** - Get an instant professional signboard

5. **Customize Colors** - Use color pickers to adjust:
   - Main text color
   - Tagline color
   - Accent color
   - Background colors (gradient)

6. **Adjust Font Size** - Use the slider (40-100px)

7. **Export as PNG** - Download high-resolution image (1600×1200px)

---

## 📋 Example: Create a Restaurant Sign

1. Select Business Type: **Restaurant**
2. Enter Shop Name: **"Tasty Bites Cafe"**
3. Pick Template: **Bold Street Sign**
4. Colors auto-apply (warm red/gold/orange)
5. Tagline auto-generates: **"Taste the Difference"**
6. Adjust font size to preference
7. Click **Export PNG** to download

Result: Professional restaurant signboard ready for printing!

---

## 🎯 Business Type Guide

Each business type has pre-configured:
- **Color Scheme** - Industry-appropriate colors
- **Icons** - Business-relevant emoji symbols
- **Tagline** - Professional auto-generated text
- **Fonts** - Commercial-grade typography

| Business Type | Colors | Icon | Tagline |
|---|---|---|---|
| Restaurant | Red/Orange/Gold | 🍽️ | "Taste the Difference" |
| Cafe | Brown/Tan/Gold | ☕ | "Brew Your Day" |
| Salon | Purple/Pink | 💇 | "Beauty Redefined" |
| Barber Shop | Navy/Blue | ✂️ | "Sharp. Clean. Professional" |
| Grocery | Green/Orange | 🛒 | "Fresh Quality Always" |
| Electronics | Blue/Silver | 📱 | "Latest Tech Here" |
| Clothing | Teal/Purple | 👗 | "Fashion Forward" |
| Pharmacy | Green/White | 💊 | "Your Health Matters" |
| Bakery | Brown/Cream | 🍰 | "Freshly Baked Daily" |
| Gym | Orange/Black | 💪 | "Build Your Best Self" |
| Jewelry | Gold/Black | 💎 | "Elegance Redefined" |
| Hotel | Navy/Gold | 🏨 | "Your Home Away" |
| Spa | Purple/Lavender | 🧖 | "Relax. Rejuvenate" |

---

## 🔧 Technical Info

- **Backend**: Flask (Python)
- **Frontend**: HTML5 Canvas + Vanilla JavaScript
- **Files**: `app.py`, `templates/index.html`, `static/editor.js`, `static/style.css`
- **Dependencies**: Flask 2.3.0, Werkzeug 2.3.0
- **Export Format**: PNG (high-quality, 2x scale)
- **Canvas Size**: 800×600px (preview), 1600×1200px (export)

---

## 📊 Features

✅ **13 Business Types** with pre-configured designs  
✅ **3 Professional Templates** with different styles  
✅ **Real-Time Preview** - See changes instantly on Canvas  
✅ **Color Customization** - 5 independent color pickers  
✅ **Font Size Control** - Adjust text from 40-100px  
✅ **High-Quality Export** - 1600×1200px PNG resolution  
✅ **Professional Typography** - Google Fonts (Poppins, Montserrat, Bebas Neue)  
✅ **Commercial Design Elements** - Gradients, borders, decorative lines  
✅ **Responsive UI** - Works on desktop, tablet, mobile  
✅ **No Blank Canvas** - Every design comes pre-filled  

---

## 🖼️ Design Elements

Every generated signboard includes:
- **Gradient Background** - Dynamic color gradient based on business type
- **Colored Border** - Professional frame around design
- **Shop Name** - Large, bold text with shadow effect
- **Business Icon** - Emoji icon relevant to business type
- **Tagline** - Professional business motto
- **Decorative Lines** - Horizontal lines for visual balance
- **Text Shadows** - Depth and readability on backgrounds
- **Proper Spacing** - Professional visual hierarchy

---

## 💡 Tips & Tricks

**Tip 1:** Generate designs for different business types to see how colors/typography adapt  
**Tip 2:** Use the font size slider to fine-tune readability from different distances  
**Tip 3:** Adjust background colors to make white text more visible  
**Tip 4:** Export at high resolution for large physical prints  
**Tip 5:** Different templates work better with different businesses - try all 3  

---

## 🐛 Troubleshooting

**Server not starting?**
```bash
cd c:\Users\KARTHIK\OneDrive\Desktop\hackathon2
python -m venv .venv
.venv\Scripts\activate
pip install Flask==2.3.0 Werkzeug==2.3.0
python app.py
```

**Colors not updating?**
- Refresh the browser (Ctrl+R)
- Clear browser cache (Ctrl+Shift+Delete)

**Export not working?**
- Allow pop-ups in your browser
- Check browser's download folder
- Try a different browser

**Design looks pixelated?**
- The preview is 800×600px (low res for speed)
- Exported PNG is 1600×1200px (high res for printing)
- This is intentional - export will be crystal clear

---

## 📞 Support

For detailed information, see:
- [README.md](README.md) - Full documentation
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Installation guide
- [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - Technical details

---

**Happy Designing! 🎉**

Your SignBoard Pro is ready to create professional commercial signboards instantly!
