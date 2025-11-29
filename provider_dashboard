document.addEventListener('DOMContentLoaded', () => {
    const servicesContainer = document.getElementById('providerServicesList');
    if (servicesContainer) {
        servicesContainer.innerHTML = '';
    }
    const storedServicesJSON = localStorage.getItem('providerServices');

    if (storedServicesJSON && servicesContainer) {
        let services; 
        try {
            services = JSON.parse(storedServicesJSON);
        } catch (e) {
            console.error('Error parsing stored services:', e);
            return;
        }

        if (Array.isArray(services) && services.length > 0) {
            
            services.forEach(service => {
                const card = document.createElement('div');
                card.className = 'card';
                
                const name = service.name || 'خدمة غير مسماة';
                const price = service.price ? `${service.price}ر.س` : 'غير محدد';
                const description = service.description || 'لا يوجد وصف متوفر حاليًا';
                const imageSrc = service.image || 'images/represent.png'; 

                card.innerHTML = `
                    <img src="${imageSrc}" alt="صورة للتعبير عن ${name}">
                    <p>${name}</p>
                    <p>${description}</p>
                    <div class="price"><p>${price}</p></div>
                `;

                servicesContainer.appendChild(card);
            });
        }
        
    }
    
    if (servicesContainer && servicesContainer.children.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'لا توجد خدمات مضافة حتى الآن!';
        message.style.textAlign = 'center';
        message.style.width = '100%';
        message.style.padding = '20px';
        message.style.color = '#777';
        servicesContainer.appendChild(message);
    }
});
