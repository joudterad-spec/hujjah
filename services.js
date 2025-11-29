document.addEventListener("DOMContentLoaded", () => {
    const servicesContainer = document.getElementById("servicesList");
    const sortSelect = document.getElementById("sortSelect");

    if (!servicesContainer || !sortSelect) return;

    // نحفظ الكروت الأصلية
    const cards = Array.from(servicesContainer.querySelectorAll(".card"));

    // دالة لإعادة الرسم
    function render(list) {
        servicesContainer.innerHTML = "";
        list.forEach(card => servicesContainer.appendChild(card));
    }

   
    function shuffle(list) {
        const arr = [...list];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // أول تحميل للصفحة → ترتيب عشوائي
    render(shuffle(cards));

    // عند تغيير نوع الترتيب
    sortSelect.addEventListener("change", () => {
        const value = sortSelect.value;
        let sorted = [...cards];

        if (value === "inc-name") {
            // بالاسم من الأقل للأعلى
            sorted.sort((a, b) =>
                a.dataset.name.localeCompare(b.dataset.name, "ar")
            );
        } else if (value === "dec-name") {
            // بالاسم من الأعلى للأقل
            sorted.sort((a, b) =>
                b.dataset.name.localeCompare(a.dataset.name, "ar")
            );
        } else if (value === "inc-price") {
            // بالسعر من الأقل للأعلى
            sorted.sort((a, b) =>
                Number(a.dataset.price) - Number(b.dataset.price)
            );
        } else if (value === "dec-price") {
            // بالسعر من الأعلى للأقل
            sorted.sort((a, b) =>
                Number(b.dataset.price) - Number(a.dataset.price)
            );
        } else if (value === "default") {
            // نرجّع عشوائي
            sorted = shuffle(cards);
        }

        render(sorted);
    });
});
