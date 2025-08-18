# DankDash Frontend

Premium Cannabis Delivery Platform - React Frontend

## 🌿 Overview

DankDash is a cutting-edge cannabis delivery platform featuring AI-powered logistics, real-time tracking, and seamless partner integration. This repository contains the React frontend application.

## 🚀 Features

- **Age Verification System** - Legal compliance for cannabis products
- **AI-Powered Delivery** - Smart routing and predictive logistics
- **Real-Time Tracking** - Live order updates from dispensary to doorstep
- **Partner Portal** - Complete application and management system
- **Admin Dashboard** - Comprehensive business management interface
- **Responsive Design** - Mobile-first approach with Tailwind CSS

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript/JSX** - Modern ES6+ syntax

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌍 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
VITE_SENDGRID_API_KEY=your_sendgrid_api_key
```

## 🔄 Development Workflow

### Branch Structure
- **`main`** - Production-ready code (protected)
- **`development`** - Active development branch
- **`feature/*`** - Feature-specific branches
- **`hotfix/*`** - Critical bug fixes

### Workflow Process
1. Create feature branch from `development`
2. Make changes and test thoroughly
3. Create pull request to `development`
4. After review, merge to `development`
5. Deploy `development` to staging
6. Merge `development` to `main` for production

## 🚀 Deployment

### Railway Deployment
1. Connect GitHub repository to Railway
2. Set environment variables
3. Deploy automatically on push to `main`

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to hosting provider
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── AdminDashboard.jsx
│   ├── EnhancedPartnerPortal.jsx
│   ├── PartnerApplicationManager.jsx
│   ├── VoiceAIIntegration.jsx
│   └── ComprehensiveCheckout.jsx
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For support, email dev@dankdash.com or create an issue in this repository.

