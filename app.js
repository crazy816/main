// Micro-Mentor Application - Complete Interactive Functionality

// ============================================
// STATE MANAGEMENT
// ============================================
const AppState = {
    currentUser: null,
    users: JSON.parse(localStorage.getItem('microMentorUsers')) || [],
    chats: JSON.parse(localStorage.getItem('microMentorChats')) || [],
    
    init() {
        this.currentUser = JSON.parse(localStorage.getItem('microMentorCurrentUser'));
        this.updateUI();
    },
    
    saveUsers() {
        localStorage.setItem('microMentorUsers', JSON.stringify(this.users));
    },
    
    saveCurrentUser() {
        if (this.currentUser) {
            localStorage.setItem('microMentorCurrentUser', JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem('microMentorCurrentUser');
        }
    },
    
    updateUI() {
        this.updateNavigation();
    },
    
    updateNavigation() {
        const navButtons = document.querySelector('.nav-buttons');
        const userMenu = document.querySelector('.user-menu');
        
        if (this.currentUser && navButtons) {
            navButtons.innerHTML = `
                <div class="user-menu">
                    <button class="btn btn-user" onclick="App.toggleUserMenu()">
                        <span class="user-avatar">${this.currentUser.name.charAt(0).toUpperCase()}</span>
                        <span class="user-name">${this.currentUser.name}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M2 4l4 4 4-4"/>
                        </svg>
                    </button>
                    <div class="user-dropdown" id="userDropdown">
                        <a href="dashboard.html" class="dropdown-item">📊 Dashboard</a>
                        <a href="profile.html" class="dropdown-item">👤 Profile</a>
                        <a href="chats.html" class="dropdown-item">💬 My Chats</a>
                        <hr class="dropdown-divider">
                        <button onclick="App.logout()" class="dropdown-item logout">🚪 Logout</button>
                    </div>
                </div>
            `;
        }
    },
    
    toggleUserMenu() {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.toggle('show');
        }
    }
};

// ============================================
// MAIN APP OBJECT
// ============================================
const App = {
    // Initialize the application
    init() {
        AppState.init();
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupFormValidation();
    },
    
    // Setup global event listeners
    setupEventListeners() {
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-menu')) {
                const dropdown = document.getElementById('userDropdown');
                if (dropdown) dropdown.classList.remove('show');
            }
        });
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    },
    
    // Setup scroll animations
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.info-card, .hero-section, .feature-card').forEach(el => {
            observer.observe(el);
        });
    },
    
    // Setup form validation
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.setAttribute('novalidate', '');
        });
    },
    
    // Toggle user menu
    toggleUserMenu() {
        AppState.toggleUserMenu();
    },
    
    // Logout user
    logout() {
        AppState.currentUser = null;
        AppState.saveCurrentUser();
        this.showNotification('Logged out successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    },
    
    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// ============================================
// AUTHENTICATION MODULE
// ============================================
const Auth = {
    // Sign up new user
    signup(name, email, password, role) {
        // Check if user exists
        const existingUser = AppState.users.find(u => u.email === email);
        if (existingUser) {
            App.showNotification('An account with this email already exists!', 'error');
            return false;
        }
        
        // Validate inputs
        if (!this.validateEmail(email)) {
            App.showNotification('Please enter a valid email address!', 'error');
            return false;
        }
        
        if (password.length < 6) {
            App.showNotification('Password must be at least 6 characters!', 'error');
            return false;
        }
        
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // In production, this would be hashed
            role,
            avatar: null,
            bio: '',
            expertise: [],
            createdAt: new Date().toISOString()
        };
        
        AppState.users.push(newUser);
        AppState.saveUsers();
        
        // Auto login
        AppState.currentUser = { ...newUser };
        delete AppState.currentUser.password;
        AppState.saveCurrentUser();
        
        App.showNotification('Account created successfully!', 'success');
        return true;
    },
    
    // Login user
    login(email, password) {
        const user = AppState.users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            App.showNotification('Invalid email or password!', 'error');
            return false;
        }
        
        AppState.currentUser = { ...user };
        delete AppState.currentUser.password;
        AppState.saveCurrentUser();
        
        App.showNotification('Welcome back!', 'success');
        return true;
    },
    
    // LinkedIn authentication (mock)
    linkedinAuth() {
        App.showNotification('LinkedIn authentication would open here. Using mock data for demo...', 'info');
        
        // Simulate LinkedIn auth delay
        setTimeout(() => {
            const mockUser = {
                id: Date.now().toString(),
                name: 'LinkedIn User',
                email: 'linkedin.user@example.com',
                role: 'mentee',
                avatar: null,
                bio: 'Connected via LinkedIn',
                expertise: [],
                createdAt: new Date().toISOString()
            };
            
            // Check if user exists
            let user = AppState.users.find(u => u.email === mockUser.email);
            if (!user) {
                AppState.users.push(mockUser);
                AppState.saveUsers();
                user = mockUser;
            }
            
            AppState.currentUser = { ...user };
            delete AppState.currentUser.password;
            AppState.saveCurrentUser();
            
            App.showNotification('Logged in with LinkedIn!', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        }, 1500);
    },
    
    // Validate email format
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};

// ============================================
// DASHBOARD MODULE
// ============================================
const Dashboard = {
    init() {
        if (!AppState.currentUser) {
            window.location.href = 'login.html';
            return;
        }
        
        this.loadUserData();
        this.loadAvailableMentors();
        this.loadUpcomingChats();
    },
    
    loadUserData() {
        const userNameEl = document.getElementById('userName');
        const userRoleEl = document.getElementById('userRole');
        
        if (userNameEl && AppState.currentUser) {
            userNameEl.textContent = AppState.currentUser.name;
        }
        if (userRoleEl && AppState.currentUser) {
            userRoleEl.textContent = AppState.currentUser.role === 'mentor' ? 'Mentor' : 'Mentee';
        }
    },
    
    loadAvailableMentors() {
        const mentorsContainer = document.getElementById('mentorsGrid');
        if (!mentorsContainer) return;
        
        const mentors = [
            { id: 1, name: 'Sarah Chen', role: 'Product Design Lead', company: 'Google', expertise: ['UX', 'Design Systems'], rating: 4.9, sessions: 156 },
            { id: 2, name: 'Michael Park', role: 'Senior Engineer', company: 'Meta', expertise: ['React', 'System Design'], rating: 4.8, sessions: 89 },
            { id: 3, name: 'Emily Rodriguez', role: 'VP of Engineering', company: 'Stripe', expertise: ['Leadership', 'Scaling'], rating: 5.0, sessions: 234 },
            { id: 4, name: 'David Kim', role: 'Founder & CEO', company: 'TechStart', expertise: ['Startups', 'Fundraising'], rating: 4.7, sessions: 67 }
        ];
        
        mentorsContainer.innerHTML = mentors.map(mentor => `
            <div class="mentor-card" onclick="Dashboard.startChat(${mentor.id})">
                <div class="mentor-avatar">${mentor.name.charAt(0)}</div>
                <div class="mentor-info">
                    <h3 class="mentor-name">${mentor.name}</h3>
                    <p class="mentor-title">${mentor.role} at ${mentor.company}</p>
                    <div class="mentor-expertise">
                        ${mentor.expertise.map(e => `<span class="expertise-tag">${e}</span>`).join('')}
                    </div>
                    <div class="mentor-stats">
                        <span class="rating">⭐ ${mentor.rating}</span>
                        <span class="sessions">${mentor.sessions} sessions</span>
                    </div>
                </div>
                <button class="btn btn-primary btn-sm">Start Chat</button>
            </div>
        `).join('');
    },
    
    loadUpcomingChats() {
        const chatsContainer = document.getElementById('upcomingChats');
        if (!chatsContainer) return;
        
        const upcomingChats = [
            { id: 1, with: 'Sarah Chen', topic: 'Design Systems', time: 'Today, 3:00 PM', status: 'upcoming' },
            { id: 2, with: 'Michael Park', topic: 'System Design', time: 'Tomorrow, 10:00 AM', status: 'scheduled' }
        ];
        
        if (upcomingChats.length === 0) {
            chatsContainer.innerHTML = '<p class="no-chats">No upcoming chats scheduled</p>';
            return;
        }
        
        chatsContainer.innerHTML = upcomingChats.map(chat => `
            <div class="chat-item">
                <div class="chat-avatar">${chat.with.charAt(0)}</div>
                <div class="chat-details">
                    <h4>${chat.with}</h4>
                    <p>${chat.topic}</p>
                </div>
                <div class="chat-time">${chat.time}</div>
                <button class="btn btn-secondary btn-sm" onclick="Dashboard.joinChat(${chat.id})">Join</button>
            </div>
        `).join('');
    },
    
    startChat(mentorId) {
        App.showNotification('Starting chat session...', 'info');
        setTimeout(() => {
            window.location.href = `chat.html?mentor=${mentorId}`;
        }, 1000);
    },
    
    joinChat(chatId) {
        window.location.href = `chat.html?id=${chatId}`;
    }
};

// ============================================
// CHAT MODULE
// ============================================
const Chat = {
    messages: [],
    
    init() {
        if (!AppState.currentUser) {
            window.location.href = 'login.html';
            return;
        }
        
        this.loadChat();
        this.setupChatInput();
    },
    
    loadChat() {
        const chatPartner = document.getElementById('chatPartner');
        if (chatPartner) {
            chatPartner.textContent = 'Sarah Chen';
        }
        
        // Load mock messages
        this.messages = [
            { id: 1, sender: 'them', text: 'Hi! I\'m excited to chat with you. What would you like to focus on today?', time: '2:55 PM' },
            { id: 2, sender: 'me', text: 'Hi Sarah! I\'d love to learn more about design systems and how to approach them.', time: '2:56 PM' },
            { id: 3, sender: 'them', text: 'Great topic! Design systems are crucial for scaling products. Let me share some key principles...', time: '2:57 PM' }
        ];
        
        this.renderMessages();
    },
    
    setupChatInput() {
        const input = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        
        if (input && sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
    },
    
    sendMessage() {
        const input = document.getElementById('chatInput');
        const text = input.value.trim();
        
        if (!text) return;
        
        const message = {
            id: Date.now(),
            sender: 'me',
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        this.messages.push(message);
        input.value = '';
        this.renderMessages();
        
        // Simulate response
        setTimeout(() => {
            this.receiveMessage();
        }, 1000 + Math.random() * 2000);
    },
    
    receiveMessage() {
        const responses = [
            'That\'s a great question! Let me think about that...',
            'I\'ve seen this work well in many teams. Here\'s what I\'d suggest...',
            'Exactly! You\'re on the right track.',
            'Let me share a practical example from my experience...',
            'Would you like me to elaborate on that?'
        ];
        
        const message = {
            id: Date.now(),
            sender: 'them',
            text: responses[Math.floor(Math.random() * responses.length)],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        this.messages.push(message);
        this.renderMessages();
    },
    
    renderMessages() {
        const container = document.getElementById('chatMessages');
        if (!container) return;
        
        container.innerHTML = this.messages.map(msg => `
            <div class="message ${msg.sender === 'me' ? 'message-sent' : 'message-received'}">
                <div class="message-content">${msg.text}</div>
                <div class="message-time">${msg.time}</div>
            </div>
        `).join('');
        
        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    },
    
    endChat() {
        if (confirm('Are you sure you want to end this chat session?')) {
            App.showNotification('Chat session ended. Thank you for the conversation!', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }
    }
};

// ============================================
// PROFILE MODULE
// ============================================
const Profile = {
    init() {
        if (!AppState.currentUser) {
            window.location.href = 'login.html';
            return;
        }
        
        this.loadProfile();
    },
    
    loadProfile() {
        const form = document.getElementById('profileForm');
        if (!form || !AppState.currentUser) return;
        
        document.getElementById('profileName').value = AppState.currentUser.name || '';
        document.getElementById('profileEmail').value = AppState.currentUser.email || '';
        document.getElementById('profileBio').value = AppState.currentUser.bio || '';
    },
    
    updateProfile(data) {
        if (!AppState.currentUser) return;
        
        AppState.currentUser.name = data.name;
        AppState.currentUser.bio = data.bio;
        
        // Update in users array
        const userIndex = AppState.users.findIndex(u => u.id === AppState.currentUser.id);
        if (userIndex !== -1) {
            AppState.users[userIndex] = { ...AppState.users[userIndex], ...data };
            AppState.saveUsers();
        }
        
        AppState.saveCurrentUser();
        App.showNotification('Profile updated successfully!', 'success');
    }
};

// ============================================
// INITIALIZE ON DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    App.init();
    
    // Page-specific initialization
    const page = document.body.dataset.page;
    
    switch(page) {
        case 'dashboard':
            Dashboard.init();
            break;
        case 'chat':
            Chat.init();
            break;
        case 'profile':
            Profile.init();
            break;
    }
});

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.user-menu, .user-menu *')) {
        const dropdowns = document.getElementsByClassName('user-dropdown');
        for (let dropdown of dropdowns) {
            dropdown.classList.remove('show');
        }
    }
}