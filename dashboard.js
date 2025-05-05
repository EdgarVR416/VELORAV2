document.addEventListener('DOMContentLoaded', () => {
    initUserDropdown();
    simulateUserData();
    simulateUserData();
});

function initUserDropdown() {
    const userToggle = document.querySelector('.user-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (!userToggle || !dropdownMenu) return;
    
    userToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!dropdownMenu.contains(e.target) && e.target !== userToggle) {
            dropdownMenu.classList.remove('active');
        }
    });
}

function simulateUserData() {
    console.log('Loading user data from simulated API...');
    console.log('Loading user data from simulated API...');
    
    const userData = {
        email: 'baksoayam467@gmail.com',
        username: 'baksoayam467',
        plan: 'pro',
        status: 'active',
        nextBilling: 'June 15, 2025',
        paymentMethod: 'Credit Card (**** 4242)',
        joinDate: 'January 10, 2025',
        downloads: 12
    };
    
    updateUserInterface(userData);
    
    initSubscriptionManagement(userData);
}

function updateUserInterface(userData) {
    console.log('Updating user interface with data:', userData);
    
    const usernameElements = document.querySelectorAll('#user-name');
    usernameElements.forEach(element => {
        element.textContent = userData.username;
    });
    
    const subscriptionBadge = document.querySelector('.subscription-badge');
    if (subscriptionBadge) {
        subscriptionBadge.textContent = userData.plan.charAt(0).toUpperCase() + userData.plan.slice(1);
        subscriptionBadge.className = 'subscription-badge ' + userData.plan.toLowerCase();
    }
    
    const userAvatar = document.querySelector('.user-avatar span');
    if (userAvatar && userData.username) {
        userAvatar.textContent = userData.username.substring(0, 2).toUpperCase();
    }
    
    document.querySelector('.item-value.status-active').textContent = 
        userData.status.charAt(0).toUpperCase() + userData.status.slice(1);
    
    const statusElement = document.querySelector('.item-value.status-active');
    if (statusElement) {
        statusElement.className = `item-value status-${userData.status.toLowerCase()}`;
    }
}

function initSubscriptionManagement(userData) {
    const cancelButton = document.querySelector('.subscription-buttons .btn-outline');
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your current billing period.')) {
                console.log('Subscription cancellation request sent for user:', userData.email);
                alert('Your subscription has been cancelled. You will have access until the end of your current billing period.');
            }
        });
    }
    
    const upgradeButton = document.querySelector('.benefit-upgrade .btn');
    if (upgradeButton) {
        upgradeButton.addEventListener('click', (e) => {
            console.log('User requested plan upgrade');
        });
    }
    
    const downloadButton = document.querySelector('.download-button .btn');
    if (downloadButton) {
        downloadButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            downloadButton.textContent = 'Downloading...';
            downloadButton.disabled = true;
            
            setTimeout(() => {
                console.log('Download started for user:', userData.email);
                alert('Your download has started. If it doesn\'t begin automatically, please click the button again.');
                downloadButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg><span>Download Velora</span>`;
                downloadButton.disabled = false;
                
                console.log('Analytics: Download event', {
                    user: userData.email,
                    plan: userData.plan,
                    version: 'v3.2.1',
                    timestamp: new Date().toISOString()
                });
            }, 2000);
        });
    }
} 