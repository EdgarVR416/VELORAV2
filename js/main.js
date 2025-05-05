document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.remove('light-theme');
    localStorage.setItem('theme', 'dark');
});

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.opacity = Math.random() * 0.8 + 0.2;
    snowflake.style.fontSize = Math.random() * 20 + 10 + 'px';
    
    const animationDuration = Math.random() * 10 + 5;
    snowflake.style.animationDuration = animationDuration + 's';
    
    const startPositionX = Math.random() * window.innerWidth;
    const endPositionX = startPositionX + ((Math.random() - 0.5) * 200);
    snowflake.style.transform = `translateX(${startPositionX}px)`;
    
    const keyframes = `
    @keyframes drift-${Date.now()} {
        0% { transform: translateX(0px); }
        50% { transform: translateX(${(Math.random() - 0.5) * 40}px); }
        100% { transform: translateX(${(Math.random() - 0.5) * 40}px); }
    }`;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);
    
    snowflake.style.animation = `fall ${animationDuration}s linear forwards, drift-${Date.now()} ${animationDuration}s ease-in-out infinite`;
    
    document.body.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
        styleSheet.remove();
    }, animationDuration * 1000);
}

function startSnowfall() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createSnowflake();
        }, i * 100);
    }
    
    setInterval(createSnowflake, 150);
}

document.addEventListener('DOMContentLoaded', startSnowfall);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

const header = document.querySelector('.header');
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

function updateHeaderOnScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        header.classList.add('scrolled');
        navbar.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
}

updateHeaderOnScroll();

window.addEventListener('scroll', updateHeaderOnScroll);

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        document.querySelector('.navbar-menu').classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

const currentLocation = location.href;
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    const itemHref = item.href;
    if (currentLocation.includes(itemHref)) {
        item.classList.add('active');
    }
});

function initFaqAccordion() {
    var faqItems = document.querySelectorAll('.faq-item');
    var faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
    
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            var faqItem = this.parentElement;
            var isActive = faqItem.classList.contains('active');
            
            faqItems.forEach(function(item) {
                item.classList.remove('active');
            });
            
            if (!isActive) {
                faqItem.classList.add('active');
            }
            
            console.log('FAQ item clicked');
        });
        
        question.style.cursor = 'pointer';
        question.style.zIndex = '10';
        question.style.position = 'relative';
    });
    
    console.log('FAQ accordion initialized with ' + faqQuestions.length + ' items');
}

document.addEventListener('DOMContentLoaded', function() {
    initFaqAccordion();
});

document.addEventListener('DOMContentLoaded', function() {
    function setupButtons() {
        var buttons = document.querySelectorAll('.open-payment-modal');
        
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].onclick = function(e) {
                e.preventDefault();
                
                var plan = this.getAttribute('data-plan') || 'default';
                var price = this.getAttribute('data-price') || '$0.00';
                var period = this.getAttribute('data-period') || '';
                
                document.getElementById('modalPlanName').textContent = plan.charAt(0).toUpperCase() + plan.slice(1) + ' Plan';
                document.getElementById('modalPlanPrice').textContent = price + period;
                
                document.getElementById('paymentModal').classList.add('active');
                document.body.style.overflow = 'hidden';
                
                console.log('Modal opened for: ' + plan + ' plan');
            };
        }
        
        console.log('Set up ' + buttons.length + ' payment buttons');
    }
    
    var closeButton = document.querySelector('.payment-modal-close');
    if (closeButton) {
        closeButton.onclick = function() {
            document.getElementById('paymentModal').classList.remove('active');
            document.body.style.overflow = '';
            console.log('Modal closed via close button');
        };
    }
    
    var modal = document.getElementById('paymentModal');
    if (modal) {
        modal.onclick = function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
                console.log('Modal closed via outside click');
            }
        };
    }
    
    var tabs = document.querySelectorAll('.payment-tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].onclick = function() {
            var tabId = this.getAttribute('data-tab');
            
            var allTabs = document.querySelectorAll('.payment-tab');
            for (var j = 0; j < allTabs.length; j++) {
                allTabs[j].classList.remove('active');
            }
            
            var allContent = document.querySelectorAll('.payment-tab-content');
            for (var k = 0; k < allContent.length; k++) {
                allContent[k].classList.remove('active');
            }
            
            this.classList.add('active');
            document.getElementById(tabId + '-content').classList.add('active');
            
            console.log('Switched to tab: ' + tabId);
        };
    }
    
    setupButtons();
    
    window.openPaymentModal = function(plan, price, period) {
        document.getElementById('modalPlanName').textContent = plan.charAt(0).toUpperCase() + plan.slice(1) + ' Plan';
        document.getElementById('modalPlanPrice').textContent = price + period;
        document.getElementById('paymentModal').classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Modal opened via global function');
    };
    
    console.log('Payment modal system initialized');
});

function initCopyButtons() {
    var copyButtons = document.querySelectorAll('.copy-btn');
    if (copyButtons.length > 0) {
        copyButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var textToCopy = this.getAttribute('data-clipboard');
                if (!textToCopy) {
                    console.error('No data-clipboard attribute found');
                    return;
                }
                
                navigator.clipboard.writeText(textToCopy)
                    .then(function() {
                        var originalText = button.innerHTML;
                        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!';
                        
                        setTimeout(function() {
                            button.innerHTML = originalText;
                        }, 2000);
                    })
                    .catch(function(err) {
                        console.error('Could not copy text: ', err);
                    });
            });
        });
        console.log('Copy buttons initialized: ' + copyButtons.length);
    }
}

function fixPaymentModalButtons() {
    var closeButton = document.querySelector('.payment-modal-close');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            document.getElementById('paymentModal').classList.remove('active');
            document.body.style.overflow = '';
            console.log('Modal closed via close button');
        });
    }
    
    var tabs = document.querySelectorAll('.payment-tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function() {
            var tabId = this.getAttribute('data-tab');
            
            var allTabs = document.querySelectorAll('.payment-tab');
            for (var j = 0; j < allTabs.length; j++) {
                allTabs[j].classList.remove('active');
            }
            
            var allContent = document.querySelectorAll('.payment-tab-content');
            for (var k = 0; k < allContent.length; k++) {
                allContent[k].classList.remove('active');
            }
            
            this.classList.add('active');
            document.getElementById(tabId + '-content').classList.add('active');
            
            console.log('Switched to tab: ' + tabId);
        });
    }
    
    var modal = document.getElementById('paymentModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initCopyButtons();
    fixPaymentModalButtons();
    console.log('All payment modal buttons should be fixed now');
});

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }
});

function ensureButtonsWork() {
    var allButtons = document.querySelectorAll('.btn, .open-payment-modal, a[href]');
    
    console.log("Found " + allButtons.length + " clickable elements");
    
    allButtons.forEach(function(button) {
        if (button.classList.contains('open-payment-modal') && !button._hasClickHandler) {
            button._hasClickHandler = true;
            button.addEventListener('click', function(e) {
                e.preventDefault();
                var plan = this.getAttribute('data-plan') || 'default';
                var price = this.getAttribute('data-price') || '$0.00';
                var period = this.getAttribute('data-period') || '';
                
                console.log('Button clicked with manual handler: ' + plan);
                
                var modal = document.getElementById('paymentModal');
                document.getElementById('modalPlanName').textContent = plan.charAt(0).toUpperCase() + plan.slice(1) + ' Plan';
                document.getElementById('modalPlanPrice').textContent = price + period;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });
    
    document.addEventListener('click', function(e) {
        var button = e.target.closest('.open-payment-modal');
        if (button) {
            e.preventDefault();
            console.log('Clicked payment button via delegation: ' + (button.getAttribute('data-plan') || 'unknown'));
            
            var plan = button.getAttribute('data-plan') || 'default';
            var price = button.getAttribute('data-price') || '$0.00';
            var period = button.getAttribute('data-period') || '';
            
            var modal = document.getElementById('paymentModal');
            document.getElementById('modalPlanName').textContent = plan.charAt(0).toUpperCase() + plan.slice(1) + ' Plan';
            document.getElementById('modalPlanPrice').textContent = price + period;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    ensureButtonsWork();
    console.log('Button fixer has been initialized');
    
    window.showPaymentModal = function(plan, price, period) {
        var modal = document.getElementById('paymentModal');
        if (!modal) {
            console.error('Payment modal not found');
            return;
        }
        
        document.getElementById('modalPlanName').textContent = plan.charAt(0).toUpperCase() + plan.slice(1) + ' Plan';
        document.getElementById('modalPlanPrice').textContent = price + period;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Modal opened via global test function');
    };
});

function fixDiscordButton() {
    var discordButton = document.querySelector('.payment-modal-footer a[href*="discord"]');
    if (discordButton) {
        discordButton.setAttribute('target', '_blank');
        discordButton.setAttribute('rel', 'noopener');
        discordButton.addEventListener('click', function(e) {
            console.log('Discord button clicked in payment modal');
            window.open(this.href, '_blank');
            e.preventDefault();
        });
        console.log('Discord button fixed in payment modal');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fixDiscordButton();
});

document.addEventListener('click', function(e) {
    var target = e.target;
    var faqQuestion = null;
    
    while (target && target !== document) {
        if (target.classList && target.classList.contains('faq-question')) {
            faqQuestion = target;
            break;
        }
        target = target.parentNode;
    }
    
    if (faqQuestion) {
        var faqItem = faqQuestion.parentElement;
        var wasActive = faqItem.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(function(item) {
            item.classList.remove('active');
        });
        
        if (!wasActive) {
            faqItem.classList.add('active');
        }
        
        console.log('FAQ item toggled via global handler');
    }
}); 