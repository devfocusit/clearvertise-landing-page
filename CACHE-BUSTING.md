# Cache Busting for ClearVertise Landing Page

## Problem
After deployment, browsers and CDNs cache CSS/JS files, causing updated styles not to appear even when the code is updated.

## Solution
This project implements automatic cache busting using version parameters in asset URLs.

## How it Works

### 1. Version Parameters
All CSS and JS files include version parameters:
```html
<link rel="stylesheet" href="css/main.css?v=1.0.20250810.1641">
<script src="js/main.js?v=1.0.20250810.1641"></script>
```

### 2. Cache Control Headers
The `staticwebapp.config.json` is configured with appropriate cache settings:
- HTML files: 5 minutes cache with revalidation
- CSS/JS files: 1 hour cache with revalidation (not immutable)
- Images: Longer cache (can be cached longer as they change less frequently)

### 3. Automated Version Bumping

#### Option 1: PowerShell Script
```bash
powershell -ExecutionPolicy Bypass -File bump-version.ps1
```

#### Option 2: NPM Script
```bash
npm run bump-version
```

#### Option 3: Deploy Preparation Script
```bash
npm run deploy-prep
```

#### Option 4: Batch File (Double-click)
```
bump-version.bat
```

## Deployment Workflow

1. Make your changes to HTML/CSS/JS
2. Run version bump: `npm run bump-version`
3. Commit and push changes
4. Deploy to Azure Static Web Apps

## Manual Version Bumping
You can also specify a custom version:
```bash
powershell -ExecutionPolicy Bypass -File bump-version.ps1 -newVersion "2.0.0"
```

## Cache Control Strategy

### HTML Files
- **Cache Duration**: 5 minutes
- **Strategy**: `must-revalidate` ensures fresh content checks
- **Reason**: HTML content changes frequently and should be fresh

### CSS/JS Files  
- **Cache Duration**: 1 hour
- **Strategy**: `must-revalidate` with version parameters
- **Reason**: Allows reasonable caching while ensuring updates through version bumping

### Images/Assets
- **Cache Duration**: 1 year
- **Strategy**: Long caching since they change infrequently
- **Reason**: Optimizes performance for static assets

## Testing Cache Busting

1. Deploy with current version
2. Make CSS changes
3. Run `npm run bump-version`
4. Deploy again
5. Check that new styles appear immediately (version parameter should be different)

## Browser Testing
- **Hard Refresh**: Ctrl+F5 (Chrome/Firefox)
- **Dev Tools**: Disable cache in Network tab
- **Incognito Mode**: Test fresh browser state

## Troubleshooting

### Styles Still Not Updating?
1. Check if version parameter changed in HTML
2. Verify deployment completed successfully
3. Test in incognito/private browsing mode
4. Check browser dev tools Network tab for 304 vs 200 responses

### Azure Static Web Apps Specific
- Azure SWA has its own CDN layer
- May take 5-15 minutes for global CDN propagation
- Use `?v=timestamp` for immediate testing
