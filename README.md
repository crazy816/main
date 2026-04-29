# Micro-Mentor 🚀

A fully interactive, production-ready professional mentorship platform for connecting mentors and mentees through short, focused chat sessions.

## ✨ Features

### Core Functionality
- 🔐 **User Authentication** - Sign up, login, and LinkedIn integration (mock)
- 💬 **Real-time Chat** - Interactive chat system with live messaging
- 👤 **User Profiles** - Manage your profile, bio, and role
- 🎯 **Mentor Discovery** - Browse and filter available mentors
- 📊 **Dashboard** - Track sessions, stats, and upcoming chats

### Pages Included
1. **Home** (`index.html`) - Landing page with value proposition
2. **Sign Up** (`signup.html`) - User registration with validation
3. **Login** (`login.html`) - User authentication
4. **Dashboard** (`dashboard.html`) - Main user dashboard
5. **Find Mentors** (`mentors.html`) - Browse and search mentors
6. **Chat** (`chat.html`) - Real-time chat interface
7. **My Chats** (`chats.html`) - Chat history and upcoming sessions
8. **Profile** (`profile.html`) - User settings and preferences

### Technical Features
- ✅ Form validation with error messages
- ✅ LocalStorage for user persistence
- ✅ Responsive design for all devices
- ✅ Smooth animations and transitions
- ✅ Toast notifications
- ✅ Loading states
- ✅ Interactive UI elements

## 🛠 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables, Flexbox, Grid
- **JavaScript (ES6+)** - Vanilla JS with modules
- **Google Fonts** - Inter font family
- **LocalStorage** - Data persistence

## 🎨 Design System

### Colors
- **Primary**: `#ff6b35` (Orange)
- **Secondary**: `#1a1a2e` (Dark Navy)
- **Background**: `#faf8f5` (Light Cream)
- **Success**: `#10b981` (Green)
- **Error**: `#ef4444` (Red)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700

## 💡 Usage Flow

1. **New User**: Home → Sign Up → Create Account → Dashboard
2. **Returning User**: Home → Login → Dashboard
3. **Find Mentor**: Dashboard → Find Mentors → Start Chat
4. **Chat Session**: Chat interface with real-time messaging
5. **Manage Account**: Profile settings

## 🔧 Customization

### Add Real Authentication
Replace the mock auth functions in `app.js`:
```javascript
// Replace Auth.signup() with your API call
const response = await fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, role })
});
```

### Add Real Chat
Integrate WebSocket or services like:
- Firebase Realtime Database
- Socket.io
- Pusher

## 📱 Responsive Breakpoints

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px
- Small Mobile: < 480px

## 🔐 Default Test Account

For testing, create an account or use LinkedIn mock login:
- Any email/password works (6+ characters)
- LinkedIn button creates a mock user

Built with ❤️ for professionals seeking growth through mentorship.
