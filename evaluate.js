document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".my-form");

    const service = document.querySelector("select[name='service']");
    const rating = document.querySelectorAll("input[name='rating']");
    const feedback = document.getElementById("feedback");

    const serviceError = document.getElementById("service-error");
    const ratingError  = document.getElementById("rating-error");
    const feedbackError = document.getElementById("feedback-error");

    // دالة إضافة الخطأ + الاهتزاز
    function showError(input, msg, errorElement) {
        errorElement.textContent = msg;
        input.classList.add("error");

        // الاهتزاز
        input.classList.add("shake");
        setTimeout(() => input.classList.remove("shake"), 400);
    }

    // دالة إزالة الخطأ
    function clearError(input, errorElement) {
        errorElement.textContent = "";
        input.classList.remove("error");
    }

    // عند إرسال النموذج
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let valid = true;

        // 1) التحقق من الخدمة
        if (service.value === "") {
            showError(service, "الرجاء اختيار الخدمة", serviceError);
            valid = false;
        }

        // 2) التحقق من التقييم
        let ratingSelected = false;
        rating.forEach(r => { if (r.checked) ratingSelected = true });

        if (!ratingSelected) {
            showError(document.querySelector(".eval_option"), "الرجاء اختيار التقييم", ratingError);
            valid = false;
        }

        // 3) التحقق من ملاحظات العميل
        if (feedback.value.trim() === "") {
            showError(feedback, "الرجاء كتابة ملاحظاتك", feedbackError);
            valid = false;
        }

        if (!valid) return;

        // لو كل شيء صحيح → نشوف التقييم
        let chosenRating = document.querySelector("input[name='rating']:checked").value;

        if (chosenRating === "راض جدا" || chosenRating === "راض") {
          alert("شكرًا لك على وقتك وثقتك بنا! يسعدنا رضاك، ونسعد بخدمتك دائمًا. 🌿");
        } else {
         alert(" نعتذر إن لم تكن التجربة بالمستوى الذي يليق بك، ونسعى دائمًا لتحسين خدماتنا والعمل على تلبية توقعاتك. 🙏");


        }

        window.location.href = "customer-dashboard.html";
    });

    // إزالة اللون الأحمر عند التصحيح ← مهم جداً
    service.addEventListener("change", () => clearError(service, serviceError));
    feedback.addEventListener("input", () => clearError(feedback, feedbackError));

    rating.forEach(r => {
        r.addEventListener("change", () => clearError(document.querySelector(".eval_option"), ratingError));
    });

});
