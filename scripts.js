document.getElementById('nationalId').addEventListener('input', function () {
    const nationalId = this.value;
    if (nationalId.length === 14) {
        const centuryCode = nationalId.charAt(0);
        const year = nationalId.substr(1, 2);
        const month = nationalId.substr(3, 2);
        const day = nationalId.substr(5, 2);
        const fullYear = (centuryCode === '2') ? `19${year}` : `20${year}`;
        document.getElementById('dob').value = `${fullYear}-${month}-${day}`;
    }
});

async function sendDataToGoogleSheet() {
    const url = "https://script.google.com/macros/s/AKfycbyD8VVKNvLnOp3uT16CXUC2Ukm0fq2fwqK7nbY-CnJx_XmvZ_2iRuXh0aIu0d3iaEzmxg/exec";

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const nationalId = document.getElementById('nationalId').value.trim();
    const dob = document.getElementById('dob').value;
    const address = document.getElementById('address').value.trim();
    const messageBox = document.getElementById('messageBox');
    const button = document.querySelector("button");
    const loader = document.querySelector(".loading");

    document.querySelectorAll("input").forEach(input => input.classList.remove("error"));

    if (!name || !phone || !nationalId || !dob || !address) {
        document.querySelectorAll("input").forEach(input => {
            if (!input.value.trim()) input.classList.add("error");
        });
        messageBox.textContent = "يرجى ملء جميع الحقول!";
        messageBox.className = "message error";
        messageBox.style.display = "block";
        return;
    }

    loader.style.display = "inline-block";
    button.disabled = true;

    try {
        await fetch(url, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone, nationalId, dob, address })
        });
        messageBox.textContent = "تم إرسال البيانات بنجاح!";
        messageBox.className = "message success";
        messageBox.style.display = "block";
        document.getElementById("dataForm").reset();
    } catch (error) {
        messageBox.textContent = "حدث خطأ أثناء الإرسال!";
        messageBox.className = "message error";
        messageBox.style.display = "block";
    } finally {
        loader.style.display = "none";
        button.disabled = false;
    }
}
