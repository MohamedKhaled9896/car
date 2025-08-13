// فتح نافذة الدفع عند الضغط على الأيقونة
const paymentIcon = document.getElementById('payment-method-icon');
const paymentModal = document.getElementById('payment-modal');
const closeBtn = document.querySelector('.close-btn');

paymentIcon.addEventListener('click', () => {
    paymentModal.style.display = 'block';
});

// إغلاق النافذة عند الضغط على زر الإغلاق
closeBtn.addEventListener('click', () => {
    paymentModal.style.display = 'none';
});

// إغلاق النافذة عند الضغط خارج المحتوى
window.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        paymentModal.style.display = 'none';
    }
});

// تهيئة قوائم الشهر والسنة
const monthSelect = document.getElementById('expiry-month');
const yearSelect = document.getElementById('expiry-year');
const currentYear = new Date().getFullYear();

for (let m = 1; m <= 12; m++) {
    const opt = document.createElement('option');
    opt.value = m < 10 ? '0' + m : m;
    opt.textContent = m < 10 ? '0' + m : m;
    monthSelect.appendChild(opt);
}

for (let y = currentYear; y <= 2030; y++) {
    const opt = document.createElement('option');
    opt.value = String(y).slice(-2);
    opt.textContent = String(y).slice(-2);
    yearSelect.appendChild(opt);
}

// تغيير أيقونة البطاقة وإظهار الحقول الإضافية عند اكتمال الرقم
const cardInput = document.getElementById('card-number');
const extraFields = document.getElementById('extra-fields');
const cvvInput = document.getElementById('cvv');

// اجعلهم غير متاحين افتراضياً
monthSelect.disabled = true;
yearSelect.disabled = true;
cvvInput.disabled = true;

cardInput.addEventListener('input', () => {
    cardInput.setAttribute('dir', 'ltr');

    let value = cardInput.value.replace(/\D/g, '').substring(0, 16);
    let formatted = value.replace(/(.{4})/g, '$1 ').trim();
    cardInput.value = formatted;

    const first3 = value.substring(0, 3);
    const first2 = value.substring(0, 2);
    const first1 = value.substring(0, 1);
    const thirdDigit = value.charAt(2);
    const icon = document.getElementById('payment-method-icon');

    if (value.length === 0) {
        icon.src = 'images/visa.png';
    } else if (first3 === '507') {
        icon.src = 'images/meeza.png';
    } else if (first2 === '50' && thirdDigit !== '7') {
        icon.src = 'images/mastercard.png';
    } else if (first1 === '4') {
        icon.src = 'images/visa.png';
    } else if (first1 === '5') {
        icon.src = 'images/mastercard.png';
    } else {
        icon.src = 'images/visa.png';
    }

    // إظهار الحقول الإضافية عند اكتمال الرقم
    if (formatted.length === 19) {
        extraFields.classList.add('show');
        monthSelect.disabled = false;
        yearSelect.disabled = false;
        cvvInput.disabled = false;
    } else {
        extraFields.classList.remove('show');
        monthSelect.disabled = true;
        yearSelect.disabled = true;
        cvvInput.disabled = true;
    }
});

function getVisaTypeIcon(type) {
    if (type === 'Visa') return 'images/visa.png';
    if (type === 'Meeza') return 'images/meeza.png';
    if (type === 'MasterCard') return 'images/mastercard.png';
    return 'images/default-card.png';
}

function getVisaType(number) {
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('507')) return 'Meeza';
    if (number.startsWith('50') && number[2] !== '7') return 'MasterCard';
    if (number.startsWith('5')) return 'MasterCard';
    return 'غير معروف';
}

// جلب الفيزات من التخزين
function getAllVisas() {
    return JSON.parse(localStorage.getItem('savedVisaList') || '[]');
}

// حفظ الفيزات
function saveAllVisas(list) {
    localStorage.setItem('savedVisaList', JSON.stringify(list));
}

// جلب الفيزا المختارة
function getSelectedVisaIndex() {
    return parseInt(localStorage.getItem('selectedVisaIndex') || '0', 10);
}

// حفظ الفيزا المختارة
function setSelectedVisaIndex(idx) {
    localStorage.setItem('selectedVisaIndex', idx);
}

// عرض جميع الفيزات
function renderVisaCard() {
    const box = document.getElementById('visa-card-box');
    const visas = getAllVisas();
    const selected = getSelectedVisaIndex();
    if (box) {
        if (visas.length > 0) {
            box.innerHTML = visas.map((data, idx) => `
    <div class="visa-card${selected === idx ? ' selected' : ''}" data-idx="${idx}">
        <span class="delete-visa" title="حذف" data-del="${idx}">×</span>
        <img class="visa-type-img" src="${getVisaTypeIcon(data.type)}" alt="${data.type}">
        <span class="visa-number">${data.number}</span>
        <span class="select-visa" title="اختيار" data-sel="${idx}">${selected === idx ? '✔️' : 'اختيار'}</span>
    </div>
`).join('');
            // حذف فيزا
            box.querySelectorAll('.delete-visa').forEach(btn => {
                btn.onclick = function(e) {
                    const idx = parseInt(e.target.getAttribute('data-del'));
                    visas.splice(idx, 1);
                    saveAllVisas(visas);
                    if (getSelectedVisaIndex() >= visas.length) {
                        setSelectedVisaIndex(0);
                    }
                    renderVisaCard();
                    renderChosenVisaIcon();
                };
            });
            // اختيار فيزا
            box.querySelectorAll('.select-visa').forEach(btn => {
                btn.onclick = function(e) {
                    const idx = parseInt(e.target.getAttribute('data-sel'));
                    setSelectedVisaIndex(idx);
                    renderVisaCard();
                    renderChosenVisaIcon();
                };
            });
        } else {
            box.innerHTML = '';
            setSelectedVisaIndex(0);
            renderChosenVisaIcon();
        }
    }
}

function renderChosenVisaIcon() {
    const visas = getAllVisas();
    const selected = getSelectedVisaIndex();
    const icon = document.getElementById('payment-method-icon');
    if (icon && visas.length > 0 && visas[selected]) {
        icon.src = getVisaTypeIcon(visas[selected].type);
    } else if (icon) {
        icon.src = "images/visa.png";
    }
}

// زر الحفظ
const saveBtn = document.getElementById('save-payment');
if (saveBtn) {
    saveBtn.addEventListener('click', function() {
        const number = cardInput.value.replace(/\D/g, '');
        if (number.length >= 12) {
            const type = getVisaType(number);
            let visas = getAllVisas();
            // لا تضف نفس الفيزا مرتين
            if (!visas.some(v => v.number === cardInput.value && v.type === type)) {
                visas.push({number: cardInput.value, type});
                saveAllVisas(visas);
                setSelectedVisaIndex(visas.length - 1);
            }
            renderVisaCard();
            paymentModal.style.display = 'none';
            setTimeout(() => {
                cardInput.value = '';
                monthSelect.value = '';
                yearSelect.value = '';
                cvvInput.value = '';
                extraFields.classList.remove('show');
            }, 300);
            alert('تم حفظ بيانات الفيزا!');
        } else {
            alert('يرجى إدخال رقم بطاقة صحيح');
        }
    });
}

// عند فتح نافذة الدفع، تأكد من تفريغ الحقول
paymentIcon.addEventListener('click', () => {
    paymentModal.style.display = 'block';
    cardInput.value = '';
    monthSelect.value = '';
    yearSelect.value = '';
    cvvInput.value = '';
    extraFields.classList.remove('show');
    renderVisaCard();
});

// عند تحميل الصفحة، اعرض الكروت وأيقونة الفيزا المختارة إذا كانت محفوظة
window.addEventListener('DOMContentLoaded', function() {
    renderVisaCard();
    renderChosenVisaIcon();
});
