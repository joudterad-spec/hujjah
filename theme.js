// =======================
// Theme toggle + حفظ الثيم
// =======================
document.addEventListener("DOMContentLoaded", () => {
    // 1) استرجاع الثيم المحفوظ وتطبيقه على كل الصفحات
    const savedTheme = localStorage.getItem("hujjah-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    } else {
        // الأبيض هو الديفولت
        document.body.classList.remove("dark-theme");
    }

    // 2) زر تغيير الثيم (موجود مثلاً في الهوم فقط)
    const btn = document.getElementById("theme-toggle");

    // لو ما فيه زر في هذي الصفحة، نكتفي بتطبيق الثيم ونطلع
    if (!btn) return;

    // 3) نص الزر حسب الثيم الحالي
    if (document.body.classList.contains("dark-theme")) {
        btn.textContent = "ثيم فاتح";
    } else {
        btn.textContent = "ثيم غامق";
    }

    // 4) عند الضغط على الزر
    btn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("hujjah-theme", "dark");
            btn.textContent = "ثيم فاتح";
        } else {
            localStorage.setItem("hujjah-theme", "light");
            btn.textContent = "ثيم غامق";
        }
    });
});

// =======================
// Back to top (محمي بشرط)
// =======================
const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// =======================
// real time clock (محمي بشرط)
// =======================
function updateClock() {
    const clock = document.getElementById("clock");
    if (!clock) return;

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");

    let ampm = hours >= 12 ? "م" : "ص";
    hours = hours % 12 || 12;

    clock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

setInterval(updateClock, 1000);
updateClock();
