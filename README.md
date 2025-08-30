# 🍷 Wine Tasting Diary

A beautiful, vintage-styled web application for documenting wine tasting experiences using the WSET Level 3 systematic approach to tasting.

## ✨ Features

- **WSET Level 3 Systematic Approach**: Complete tasting notes with appearance, nose, palate, and conclusions
- **Wine Folly Aroma Wheel Integration**: Comprehensive aroma and flavor selection options
- **Vintage Diary Aesthetic**: Beautiful leather-bound journal design
- **Search Functionality**: Find wines by winery, varietal, region, or country
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Local Storage**: Your tasting notes are saved locally in your browser

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wine-tasting-diary.git
   cd wine-tasting-diary
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables**
   
   Create `.env` files in both `client` and `server` directories (see DEPLOYMENT.md for details)

5. **Start the development servers**
   
   **Terminal 1 - Start the backend:**
   ```bash
   cd server
   npm run dev
   ```
   
   **Terminal 2 - Start the frontend:**
   ```bash
   cd client
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📝 Usage

1. **Add a New Wine**: Click the "Add New Wine" button
2. **Fill in Details**: Complete all the WSET Level 3 fields
3. **Select Aromas/Flavors**: Use the checkboxes to select detected aromas and flavors
4. **Save Your Notes**: Click "Save Wine Tasting" to add to your diary
5. **Search Your Diary**: Use the search bar to find specific wines

## 🎨 Design

The application features a sophisticated vintage aesthetic with:
- Rich brown color palette
- Leather-bound journal styling
- Elegant typography
- Professional shadows and depth
- Responsive grid layouts

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript, CSS3
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Custom CSS with vintage design
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Create React App

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🚀 Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Quick Deploy Options:
- **Vercel** (Frontend) + **Railway** (Backend) - Recommended for beginners
- **Heroku** - Full-stack deployment
- **Netlify** (Frontend) + **Render** (Backend) - Alternative option

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **WSET** for the systematic approach to tasting methodology
- **Wine Folly** for inspiration on aroma and flavor categorization
- **React Community** for the amazing framework

---

*Enjoy documenting your wine tasting journey! 🍷*
