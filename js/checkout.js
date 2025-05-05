document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const planParam = urlParams.get('plan');
    
    updatePlanInSummary(planParam);
    
    initCheckoutSteps();
    
    initPaymentMethods();
    
    initCryptoOptions();
    
    initCopyButtons();
    
    const completePurchaseButton = document.getElementById('complete-purchase');
    if (completePurchaseButton) {
        completePurchaseButton.addEventListener('click', handleCompletePurchase);
    }
});

function updatePlanInSummary(planParam) {
    if (!planParam) return;
    
    const planInfo = document.querySelector('.plan-info');
    const planIcon = document.querySelector('.plan-icon');
    const orderItemName = document.querySelector('.order-item-name .plan-type');
    const orderItemPrice = document.querySelector('.order-item-price');
    const subtotalPrice = document.querySelector('.order-subtotal div:last-child');
    const totalPrice = document.querySelector('.order-total div:last-child');
    const summaryPricing = document.querySelector('.pricing-row:not(.total) div:last-child');
    const summaryTotal = document.querySelector('.pricing-row.total div:last-child');
    const pricingNote = document.querySelector('.pricing-note');
    
    let planName, planPrice, planDuration, planClass, pricingText;
    
    switch (planParam.toLowerCase()) {
        case 'pro':
            planName = 'Velora Pro';
            planPrice = '$4.99';
            planDuration = 'Monthly Subscription';
            planClass = 'pro';
            pricingText = 'Billed monthly. Cancel anytime.';
            break;
        case 'gold':
            planName = 'Velora Gold';
            planPrice = '$9.99';
            planDuration = 'Monthly Subscription';
            planClass = 'gold';
            pricingText = 'Billed monthly. Cancel anytime.';
            break;
        case 'lifetime':
            planName = 'Velora Lifetime';
            planPrice = '$69.99';
            planDuration = 'One-time Payment';
            planClass = 'lifetime';
            pricingText = 'One-time payment. Lifetime access.';
            break;
        default:
            return;
    }
    
    if (planInfo) {
        planInfo.querySelector('.plan-name').textContent = planName;
        planInfo.querySelector('.plan-duration').textContent = planDuration;
    }
    
    if (planIcon) {
        planIcon.classList.remove('pro', 'gold', 'lifetime');
        planIcon.classList.add(planClass);
    }
    
    if (orderItemName) orderItemName.textContent = planParam.charAt(0).toUpperCase() + planParam.slice(1);
    if (orderItemPrice) orderItemPrice.textContent = planPrice;
    if (subtotalPrice) subtotalPrice.textContent = planPrice;
    if (totalPrice) totalPrice.textContent = planPrice;
    if (summaryPricing) summaryPricing.textContent = planPrice;
    if (summaryTotal) summaryTotal.textContent = planPrice;
    if (pricingNote) pricingNote.textContent = pricingText;
}

function initCheckoutSteps() {
    const steps = document.querySelectorAll('.checkout-step');
    const stepContents = document.querySelectorAll('.step-content');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const activeStepIndex = [...steps].findIndex(step => step.classList.contains('active'));
            if (activeStepIndex >= 0 && activeStepIndex < steps.length - 1) {
                if (activeStepIndex === 0 && !validateAccountStep()) return;
                if (activeStepIndex === 1 && !validatePaymentStep()) return;
                
                steps[activeStepIndex].classList.remove('active');
                steps[activeStepIndex].classList.add('completed');
                steps[activeStepIndex + 1].classList.add('active');
                
                stepContents[activeStepIndex].classList.remove('active');
                stepContents[activeStepIndex + 1].classList.add('active');
                
                if (activeStepIndex === 0) {
                    updateSummaryEmail();
                }
                
                if (activeStepIndex === 1) {
                    updateSummaryPayment();
                }
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            const activeStepIndex = [...steps].findIndex(step => step.classList.contains('active'));
            if (activeStepIndex > 0) {
                steps[activeStepIndex].classList.remove('active');
                steps[activeStepIndex - 1].classList.remove('completed');
                steps[activeStepIndex - 1].classList.add('active');
                
                stepContents[activeStepIndex].classList.remove('active');
                stepContents[activeStepIndex - 1].classList.add('active');
            }
        });
    });
}

function validateAccountStep() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    
    if (!email.value || !isValidEmail(email.value)) {
        alert('Please enter a valid email address');
        email.focus();
        return false;
    }
    
    if (!password.value || password.value.length < 6) {
        alert('Password must be at least 6 characters long');
        password.focus();
        return false;
    }
    
    if (password.value !== confirmPassword.value) {
        alert('Passwords do not match');
        confirmPassword.focus();
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePaymentStep() {
    const activePaymentMethod = document.querySelector('.payment-method.active input').id;
    
    if (activePaymentMethod === 'card') {
        const cardName = document.getElementById('card-name');
        const cardNumber = document.getElementById('card-number');
        const expiry = document.getElementById('expiry');
        const cvv = document.getElementById('cvv');
        
        if (!cardName.value) {
            alert('Please enter the cardholder name');
            cardName.focus();
            return false;
        }
        
        if (!cardNumber.value || !isValidCardNumber(cardNumber.value)) {
            alert('Please enter a valid card number');
            cardNumber.focus();
            return false;
        }
        
        if (!expiry.value || !isValidExpiry(expiry.value)) {
            alert('Please enter a valid expiry date (MM/YY)');
            expiry.focus();
            return false;
        }
        
        if (!cvv.value || !isValidCVV(cvv.value)) {
            alert('Please enter a valid CVV code');
            cvv.focus();
            return false;
        }
    }
    
    return true;
}

function isValidCardNumber(cardNumber) {
    return cardNumber.replace(/\s/g, '').length >= 16;
}

function isValidExpiry(expiry) {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    return regex.test(expiry);
}

function isValidCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

function updateSummaryEmail() {
    const email = document.getElementById('email').value;
    const summaryEmail = document.getElementById('summary-email');
    const confirmationEmail = document.getElementById('confirmation-email');
    
    if (summaryEmail) summaryEmail.textContent = email;
    if (confirmationEmail) confirmationEmail.textContent = email;
}

function updateSummaryPayment() {
    const activePaymentMethod = document.querySelector('.payment-method.active input').id;
    const summaryPayment = document.getElementById('summary-payment');
    
    let paymentMethodText = 'Credit Card';
    
    if (activePaymentMethod === 'paypal') {
        paymentMethodText = 'PayPal';
    } else if (activePaymentMethod === 'crypto') {
        const activeCrypto = document.querySelector('.crypto-option.active input').id;
        paymentMethodText = activeCrypto === 'bitcoin' ? 'Bitcoin' : 'Litecoin';
    }
    
    if (summaryPayment) summaryPayment.textContent = paymentMethodText;
}

function initPaymentMethods() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentForms = document.querySelectorAll('.payment-form');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            paymentMethods.forEach(m => m.classList.remove('active'));
            method.classList.add('active');
            
            const methodId = method.querySelector('input').id;
            paymentForms.forEach(form => form.classList.remove('active'));
            document.querySelector(`.${methodId}-form`).classList.add('active');
        });
    });
}

function initCryptoOptions() {
    const cryptoOptions = document.querySelectorAll('.crypto-option');
    const cryptoInfos = document.querySelectorAll('.crypto-info');
    
    cryptoOptions.forEach(option => {
        option.addEventListener('click', () => {
            cryptoOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            
            const cryptoId = option.querySelector('input').id;
            cryptoInfos.forEach(info => info.classList.remove('active'));
            document.querySelector(`.${cryptoId}-info`).classList.add('active');
        });
    });
}

function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const textToCopy = button.getAttribute('data-clipboard');
            
            const tempInput = document.createElement('input');
            tempInput.value = textToCopy;
            document.body.appendChild(tempInput);
            
            tempInput.select();
            document.execCommand('copy');
            
            document.body.removeChild(tempInput);
            
            const originalText = button.innerHTML;
            button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!';
            
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 2000);
        });
    });
}

function handleCompletePurchase() {
    const agreementCheckbox = document.getElementById('agreement');
    
    if (!agreementCheckbox.checked) {
        alert('Please agree to the Terms of Service and Privacy Policy');
        agreementCheckbox.focus();
        return;
    }
    
    const completePurchaseButton = document.getElementById('complete-purchase');
    const originalText = completePurchaseButton.textContent;
    
    completePurchaseButton.disabled = true;
    completePurchaseButton.textContent = 'Processing...';
    
    setTimeout(() => {
        console.log('Payment successful for email:', document.getElementById('email').value);
        
        const successModal = document.getElementById('success-modal');
        successModal.classList.add('active');
        
        setTimeout(() => {
            console.log('Redirecting to dashboard...');
            window.location.href = 'dashboard.html';
        }, 5000);
    }, 2000);
    
    console.log('Discord webhook: New purchase!', {
        email: document.getElementById('email').value,
        plan: document.querySelector('.plan-type').textContent,
        paymentMethod: document.getElementById('summary-payment').textContent,
        timestamp: new Date().toISOString()
    });
} 