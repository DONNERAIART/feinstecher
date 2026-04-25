/**
 * Auth Service Mock for Feinstecher
 * Handles local session state and mock social login
 */

export const AuthService = {
    _getUsers() {
        const users = localStorage.getItem('feinstecher_db_users');
        return users ? JSON.parse(users) : {};
    },

    _saveUsers(users) {
        localStorage.setItem('feinstecher_db_users', JSON.stringify(users));
    },

    isLoggedIn() {
        return localStorage.getItem('feinstecher_user') !== null;
    },

    getUser() {
        const data = localStorage.getItem('feinstecher_user');
        return data ? JSON.parse(data) : null;
    },

    login(email, password) {
        const users = this._getUsers();
        
        // If user doesn't exist, create one (mock auto-registration)
        if (!users[email]) {
            users[email] = {
                email: email,
                password: password,
                username: email.split('@')[0],
                displayName: email.split('@')[0],
                title: '',
                firstName: '',
                lastName: '',
                phone: '',
                profileUrl: `https://www.feinstecher.net/profile/${email.split('@')[0].toUpperCase()}/profile`,
                isPrivate: false,
                walletBalance: 0,
                address: { street: '', city: '', zip: '' }
            };
            this._saveUsers(users);
        }

        const user = users[email];
        
        // Basic password check
        if (user.password !== password) {
            return false;
        }

        localStorage.setItem('feinstecher_user', JSON.stringify(user));
        return true;
    },

    register(email, password) {
        return this.login(email, password);
    },

    socialLogin(provider) {
        return this.login(`${provider.toLowerCase()}_user@example.com`, 'social');
    },

    logout() {
        localStorage.removeItem('feinstecher_user');
        window.location.href = 'index.html';
    },

    updateUser(newData) {
        const currentUser = this.getUser();
        if (!currentUser) return null;

        const users = this._getUsers();
        const userInDb = users[currentUser.email];
        
        if (userInDb) {
            const updated = { ...userInDb, ...newData };
            
            // Handle profile URL update
            if (newData.displayName) {
                const slug = newData.displayName.toUpperCase().replace(/\s+/g, '-');
                updated.profileUrl = `https://www.feinstecher.net/profile/${slug}/profile`;
            }

            // Handle email change in DB keys
            if (newData.email && newData.email !== currentUser.email) {
                delete users[currentUser.email];
                users[newData.email] = updated;
            } else {
                users[currentUser.email] = updated;
            }

            this._saveUsers(users);
            localStorage.setItem('feinstecher_user', JSON.stringify(updated));
            return updated;
        }
        return null;
    }
};

// Auto-redirect if trying to access profile while logged out
if (window.location.pathname.includes('profile.html') && !AuthService.isLoggedIn()) {
    window.location.href = 'login.html';
}
