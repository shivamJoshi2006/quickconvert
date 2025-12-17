# FileConvertr - Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Start Development Server
```bash
cd file-converter
npm run dev
```
Visit: http://localhost:3000

### 2. Test the Converters

**JSON to CSV:**
- Go to `/json-to-csv`
- Paste this JSON:
```json
[
  {"name": "John", "age": 30},
  {"name": "Jane", "age": 25}
]
```
- Click "Convert to CSV"
- See: `name,age\nJohn,30\nJane,25`

**CSV to JSON:**
- Go to `/csv-to-json`
- Paste this CSV:
```csv
name,age
Alice,28
Bob,32
```
- Click "Convert to JSON"
- See: JSON array with objects

### 3. Try Sample Files
- Download from `/public/sample-employees.json`
- Or `/public/sample-team.csv`

## 🚀 Deploy in 2 Minutes

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```
Follow prompts - done!

### Netlify
```bash
npm run build
netlify deploy --prod --dir=out
```

### GitHub Pages
```bash
npm run build
# Push 'out' folder
```

## 🎨 Customize

### Change Brand Name
1. Update `src/app/layout.tsx` - change "FileConvertr" 
2. Update `public/manifest.json` - app name
3. Update CSS colors if needed

### Change Domain
1. Update meta tags in `src/app/layout.tsx`
2. Update manifest.json
3. Deploy to your domain

### Add Your AdSense
1. Replace placeholder in `src/components/Monetization.tsx`
2. Add `data-ad-client` and `data-ad-slot`

## 📊 Key Files Overview

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Landing page |
| `src/app/json-to-csv/page.tsx` | JSON→CSV converter |
| `src/app/csv-to-json/page.tsx` | CSV→JSON converter |
| `src/components/JSONToCSVConverter.tsx` | JSON converter component |
| `src/components/CSVToJSONConverter.tsx` | CSV converter component |
| `src/lib/csv-parser.ts` | CSV parsing logic |
| `src/lib/json-converter.ts` | JSON conversion logic |

## ✨ Features at a Glance

- ✅ JSON ↔ CSV conversion
- ✅ Drag-and-drop upload
- ✅ Copy to clipboard
- ✅ Download files
- ✅ Dark/light mode
- ✅ Works offline (PWA)
- ✅ 100% private
- ✅ Mobile responsive
- ✅ Fast performance

## 🔧 Common Tasks

### Add New Feature
1. Create component in `src/components/`
2. Import in relevant page
3. Test locally
4. Deploy

### Change Colors
Edit `tailwind.config.ts` or use Tailwind color utilities directly

### Add Page
1. Create `src/app/[route]/page.tsx`
2. Route is automatically `/[route]`
3. Add to navigation

### Fix Issue
1. Check browser console for errors
2. Check terminal for build errors
3. Restart dev server if needed

## 📱 Test on Mobile

### Local Testing
```bash
# Get your computer IP (e.g., 192.168.1.100)
# Visit: http://192.168.1.100:3000 on mobile
```

### Remote Testing
```bash
npm run build
# Upload 'out' folder to any hosting
```

## 🚨 Troubleshooting

**Issue: Page not found**
- Make sure dev server is running
- Check URL is exactly `/json-to-csv` or `/csv-to-json`

**Issue: Conversion not working**
- Check console for errors
- Verify JSON/CSV format
- Check file size (max 20MB)

**Issue: Styles look wrong**
- Hard refresh (Ctrl+Shift+R)
- Clear browser cache
- Restart dev server

## 📈 Next Steps

1. **Deploy** - Get it live on Vercel/Netlify
2. **Share** - Tell friends, post on Product Hunt
3. **Monetize** - Add AdSense or premium features
4. **Improve** - Based on user feedback
5. **Scale** - Add more formats, features

## 🎯 Production Checklist

Before deploying:
- [ ] Test JSON conversion
- [ ] Test CSV conversion  
- [ ] Test dark/light modes
- [ ] Test on mobile
- [ ] Check Lighthouse scores
- [ ] Verify all links work
- [ ] Test file uploads
- [ ] Test PWA install prompt

## 💡 Tips & Tricks

**Keyboard Shortcuts:**
- Tab: Navigate between fields
- Ctrl/Cmd+C: Copy output
- Drag files: Upload

**Large Files:**
- Default limit: 20MB
- Change in `FileUpload.tsx` if needed
- Pro tier can have higher limits

**Batch Processing:**
- Currently one file at a time
- Pro feature: batch multiple files
- Add in future iteration

## 📞 Need Help?

1. **Check documentation:**
   - `README-FILECONVERTR.md`
   - `DEPLOYMENT-MONETIZATION.md`
   - `PROJECT-GUIDE.md`

2. **Review sample files:**
   - `/public/sample-employees.json`
   - `/public/sample-team.csv`

3. **Check code comments:**
   - Well-documented functions
   - Component descriptions

## 🎉 You're All Set!

Your production-ready file converter is ready to use! 

**Happy converting! 🚀**

---

Questions or issues? Review the full documentation files!
