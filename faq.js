let faqTerms = document.querySelectorAll('.faq-term');

for (let i = 0; i < faqTerms.length; i++) {
    faqTerms[i].onclick = function () {

        let definition = this.nextElementSibling;      // RESTORED
        let isActive = this.getAttribute('data-open') === 'true';

        // Close all other FAQ items
        for (let j = 0; j < faqTerms.length; j++) {
            if (faqTerms[j] !== this) {
                faqTerms[j].setAttribute('data-open', 'false');
                faqTerms[j].nextElementSibling.style.display = 'none';
            }
        }

        // Toggle current item
        if (!isActive) {
            this.setAttribute('data-open', 'true');
            definition.style.display = 'block';
        } else {
            this.setAttribute('data-open', 'false');
            definition.style.display = 'none';
        }
    };
}


// Initially hide all FAQ definitions
const faqDefinitions = document.querySelectorAll('.faq-definition');
for (let i = 0; i < faqDefinitions.length; i++) {
    faqDefinitions[i].style.display = 'none';
}

// Form submission handling
const questionForm = document.querySelector('.faq-question-form-section form');
const submitButton = questionForm.querySelector('.card-button');
const questionTextarea = document.getElementById('questionText');

submitButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    const question = questionTextarea.value.trim();
    
    if (question === '') {
        alert('يرجى إدخال سؤالك قبل الإرسال');
        questionTextarea.focus();
        return;
    }
    
    if (question.length < 10) {
        alert('يرجى كتابة سؤال أكثر تفصيلاً (على الأقل 10 أحرف)');
        questionTextarea.focus();
        return;
    }
    
    // Simulate form submission
    submitButton.textContent = 'جاري الإرسال...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(function() {
        alert('شكراً لك! تم استلام سؤالك وسيتم الرد عليك في أقرب فرصة.');
        questionTextarea.value = '';
        submitButton.textContent = 'إرسال';
        submitButton.disabled = false;
    }, 1500);
});

// Smooth scrolling for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
for (let i = 0; i < anchorLinks.length; i++) {
    anchorLinks[i].addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Add loading animation to images
const images = document.querySelectorAll('img');
for (let i = 0; i < images.length; i++) {
    images[i].addEventListener('load', function() {
        this.style.opacity = '1';
    });
    images[i].style.transition = 'opacity 0.3s ease';
    images[i].style.opacity = images[i].complete ? '1' : '0';
}

// Add hover effects to FAQ items
for (let i = 0; i < faqTerms.length; i++) {
    faqTerms[i].style.cursor = 'pointer';
    faqTerms[i].style.transition = 'all 0.3s ease';
    
    faqTerms[i].addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#f8f9fa';
        this.style.paddingRight = '20px';
    });
    
    faqTerms[i].addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.backgroundColor = '';
            this.style.paddingRight = '';
        }
    });
}

// Character counter for question textarea
const charCounter = document.createElement('div');
charCounter.style.textAlign = 'left';
charCounter.style.fontSize = '0.8em';
charCounter.style.color = '#666';
charCounter.style.marginTop = '5px';
questionTextarea.parentNode.insertBefore(charCounter, questionTextarea.nextSibling);

questionTextarea.addEventListener('input', function() {
    const count = this.value.length;
    charCounter.textContent = count + ' حرف';
    
    if (count > 500) {
        charCounter.style.color = 'red';
    } else if (count > 300) {
        charCounter.style.color = 'orange';
    } else {
        charCounter.style.color = '#666';
    }
});

// Add keyboard navigation for FAQ
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const activeTerm = document.querySelector('.faq-term.active');
        if (activeTerm) {
            e.preventDefault();
            const allTerms = faqTerms;
            const currentIndex = allTerms.indexOf(activeTerm);
            
            let nextIndex;
            if (e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % allTerms.length;
            } else {
                nextIndex = (currentIndex - 1 + allTerms.length) % allTerms.length;
            }
            
            allTerms[nextIndex].click();
            allTerms[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
});
