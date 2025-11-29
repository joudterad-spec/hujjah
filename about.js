document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("joinForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // نوقف الإرسال إلى أن نتأكد أن كل شيء صحيح

        // الحقول
        const nameInput   = document.getElementById("jt-name");
        const dobInput    = document.getElementById("jt-dob");
        const emailInput  = document.getElementById("jt-email");
        const expInput    = document.getElementById("jt-exp");
        const skillsInput = document.getElementById("jt-skills");
        const eduInput    = document.getElementById("jt-edu");
        const photoInput  = document.getElementById("jt-photo");

        // أماكن الأخطاء
        const errName   = document.getElementById("err-name");
        const errDob    = document.getElementById("err-dob");
        const errEmail  = document.getElementById("err-email");
        const errExp    = document.getElementById("err-exp");
        const errSkills = document.getElementById("err-skills");
        const errEdu    = document.getElementById("err-edu");
        const errPhoto  = document.getElementById("err-photo");

        // نمسح الأخطاء القديمة ونرجّع البوردر عادي
        [errName, errDob, errEmail, errExp, errSkills, errEdu, errPhoto].forEach(el => el.textContent = "");
        [nameInput, dobInput, emailInput, expInput, skillsInput, eduInput].forEach(el => {
            el.style.border = "1px solid #ccc";
        });

        let hasError = false;

        // 1) لا توجد حقول فارغة
        if (nameInput.value.trim() === "") {
            errName.textContent = "يرجى إدخال اسم العضو.";
            nameInput.style.border = "2px solid #b40a0a";
            hasError = true;
        }

        if (dobInput.value === "") {
            errDob.textContent = "يرجى إدخال تاريخ الميلاد.";
            dobInput.style.border = "2px solid #b40a0a";
            hasError = true;
        }

        if (emailInput.value.trim() === "") {
            errEmail.textContent = "يرجى إدخال البريد الإلكتروني.";
            emailInput.style.border = "2px solid #b40a0a";
            hasError = true;
        }

        if (expInput.value.trim() === "") {
            errExp.textContent = "يرجى إدخال الخبرات.";
            expInput.style.border = "2px solid #b40a0a";
            hasError = true;
        }

        if (skillsInput.value.trim() === "") {
            errSkills.textContent = "يرجى إدخال المهارات.";
            skillsInput.style.border = "2px solid #b40a0a";
            hasError = true;
        }

        if (eduInput.value.trim() === "") {
            errEdu.textContent = "يرجى إدخال التعليم.";
            eduInput.style.border = "2px solid #b40a0a";
            hasError = true;
        }

        // 2) الاسم لا يبدأ برقم
        const nameVal = nameInput.value.trim();
        if (nameVal !== "" && /^\d/.test(nameVal)) {
            errName.textContent = "حقل الاسم لا يجب أن يبدأ برقم.";
            nameInput.style.border = "2px solid #b40a0a";
            hasError = true;
        }

        // 3) البريد صيغة صحيحة
        const emailVal = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailVal !== "" && !emailRegex.test(emailVal)) {
            errEmail.textContent = "صيغة البريد الإلكتروني غير صحيحة.";
            emailInput.style.border = "2px solid #b40a0a";
            hasError = true;
        }

        // 4) DOB لا يكون بعد 2008
        if (dobInput.value !== "") {
            const dobDate = new Date(dobInput.value);
            const year = dobDate.getFullYear();
            if (year > 2008) {
                errDob.textContent = "تاريخ الميلاد يجب ألا يكون بعد عام 2008.";
                dobInput.style.border = "2px solid #b40a0a";
                hasError = true;
            }
        }

        // 5) الصورة: موجودة ومن نوع صورة
        if (!photoInput.files || photoInput.files.length === 0) {
            errPhoto.textContent = "يرجى إرفاق صورة.";
            hasError = true;
        } else {
            const file = photoInput.files[0];
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
            if (!allowedTypes.includes(file.type)) {
                errPhoto.textContent = "يجب أن تكون الصورة من نوع JPG أو PNG أو GIF.";
                hasError = true;
            }
        }

        // لو فيه أخطاء → لا نرسل الفورم
        if (hasError) {
            return;
        }

        // لو كل شيء صحيح → نعرض رسالة تأكيد فيها اسم المرسل
        alert(`تم استلام طلب الانضمام بنجاح يا ${nameVal} 🎉\nشكرًا لانضمامك إلى فريق حُجّة!`);

        // نفرّغ الفورم بعد الإرسال الناجح
        form.reset();
    });
});
