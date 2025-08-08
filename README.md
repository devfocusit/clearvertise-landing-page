# CLEARVERTISE Landing Page

This project is a modern landing page for Clearvertise - Smart Advertising Solutions. It showcases the platform's features, interactive carousel components, real interface screenshots, and provides comprehensive information about advertising analytics and campaign management tools.

## Project Structure

```
clearvertise-landing-page/
├── src/
│   ├── index.html          # Main landing page
│   ├── about.html         # About page
│   ├── features.html      # Product features page  
│   ├── contact.html       # Contact information page
│   ├── css/
│   │   ├── main.css       # Main styles and components
│   │   └── responsive.css # Responsive design styles
│   ├── js/
│   │   ├── main.js        # Main JavaScript functionality
│   │   └── components.js  # Reusable JavaScript components
│   ├── screens/           # Interface screenshots
│   │   ├── dashboard1.png # Main dashboard screenshot
│   │   ├── dashboard1.gif # Dashboard animation
│   │   ├── progress1.png  # Progress analytics interface
│   │   ├── mediaPlan1.png # Media planning interface
│   │   └── budget1.png    # Budget planning interface
│   ├── logo/              # Brand logos
│   │   ├── logoSymbol.png # Default logo
│   │   └── logoSymbolWhite.png # White logo for dark backgrounds
│   └── assets/
│       └── fonts/         # Font files
├── build/                 # Built files (generated - for Azure Static Web Apps)
├── build.js               # Cross-platform build script
├── staticwebapp.config.json # Azure Static Web Apps configuration
├── .gitignore             # Git ignore file
├── package.json           # npm configuration
└── README.md             # Project documentation
```

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:
   ```bash
   cd clearvertise-landing-page
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start development server**:
   ```bash
   npm start
   ```
   This will open the landing page at `http://localhost:3000`

## Available Scripts

- **`npm start`** - Start development server on port 3000
- **`npm run dev`** - Start development server with file watching
- **`npm run build`** - Build the project for production (cross-platform Node.js script)
- **`npm run serve`** - Serve the built project on port 8080
- **`npm run clean`** - Clean the build directory
- **`npm run rebuild`** - Clean and rebuild the project

## Deployment

This project is configured for deployment on Azure Static Web Apps with:

- **Cross-platform build script** (`build.js`) that works on Windows, macOS, and Linux
- **Azure Static Web Apps configuration** (`staticwebapp.config.json`) for routing and caching
- **Optimized file structure** with all assets properly organized

### Build Process
The build script copies all source files to the `build/` directory:
- HTML pages (index, about, features, contact)
- CSS stylesheets and responsive styles
- JavaScript functionality and components  
- Interface screenshots and animations
- Logo files and brand assets
- Font files and other assets

## Features

- **Interactive Carousel**: Advanced toolkit carousel with preview cards and smooth transitions
- **Real Interface Screenshots**: Actual ClearVertise dashboard and analytics interfaces
- **Mobile-First Responsive Design**: Fully optimized for smartphones, tablets, and desktop devices
- **Progressive Image Loading**: Lazy loading with intersection observer for optimal performance
- **Touch-Optimized Interface**: Mobile-friendly interactions and touch gestures
- **Dynamic Header**: Logo switching and button contrast based on scroll state  
- **Image Modals**: Clickable interface screenshots with full-screen preview
- **Contact Forms**: Interactive contact modal with form validation
- **Modern UI Components**: Clean design with smooth animations and hover effects
- **SEO Optimized**: Proper meta tags, favicon, and semantic HTML structure
- **Performance Optimized**: Optimized images, efficient loading, and mobile-first approach

## Key Components

### Interactive Toolkits Carousel
- **Control Progress**: Real progress analytics interface with traffic metrics
- **SEO Tools**: Comprehensive SEO audit and optimization features
- **Content Creation**: AI-powered content generation with real-time scoring
- **Local Marketing**: Google Business Profile performance tracking
- **AI Features**: Smart campaign optimization and predictive analytics
- **Social Media**: Multi-platform social media management
- **Advertising**: Cross-platform ad management with ROI optimization

### Interface Screenshots
- Dashboard analytics with comprehensive metrics display
- Media planning interface for campaign management
- Budget planning tools with financial tracking
- Progress analytics with traffic source analysis

## Technologies Used

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Flexbox/Grid layouts, custom properties, animations
- **Vanilla JavaScript**: ES6+ features, DOM manipulation, event handling
- **Inter Font**: Modern typography via Google Fonts
- **Responsive Images**: Optimized loading with lazy loading support

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.