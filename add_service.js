document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.querySelector('.my-form');

    const serviceNameInput = document.getElementById('serviceName');
    const servicePriceInput = document.getElementById('servicePrice');
    const serviceDescriptionTextarea = document.getElementById('serviceDesc');
    const serviceImageInput = document.getElementById('pic'); 

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nameValue = serviceNameInput.value.trim();
        const priceValue = servicePriceInput.value.trim();
        const descriptionValue = serviceDescriptionTextarea.value.trim();
        const imageFileCount = serviceImageInput.files.length;
        
        let errors = [];

        if (!nameValue) { errors.push('الرجاء إدخال اسم الخدمة!'); }
        if (!priceValue) { errors.push('الرجاء إدخال سعر الخدمة!'); }
        if (!descriptionValue) { errors.push('الرجاء إدخال وصف الخدمة!'); }
        if (imageFileCount === 0) { errors.push('الرجاء إضافة صورة للخدمة!'); } 
        
        if (priceValue && isNaN(Number(priceValue))) {
            errors.push('يجب أن يكون سعر الخدمة عبارة عن أرقام فقط!');
        }
        
        if (nameValue && /^\d/.test(nameValue)) {
            errors.push('يجب أن يبدأ اسم الخدمة بحرف، وليس برقم!');
        }

        if (errors.length > 0) {
            alert('يُرجى تصحيح الأخطاء التالية للمتابعة:\n\n' + errors.join('\n'));
            return; 
        }

        let services = JSON.parse(localStorage.getItem('providerServices')) || [];
        const defaultImagePath = 'images/represent.png';

        const newService = {
            name: nameValue,
            price: priceValue,
            description: descriptionValue,
            image: defaultImagePath 
        };

        services.push(newService);
        localStorage.setItem('providerServices', JSON.stringify(services));

        alert(`تمت إضافة خدمة "${nameValue}" بنجاح!`);
        form.reset(); 
    });
});
