function updateReceipt() {
    const litres = parseFloat(document.getElementById('litres').value) || 0;
    const rate = parseFloat(document.getElementById('rate').value) || 0;
    const amount = (litres * rate).toFixed(2);

    document.getElementById('outStation').innerText =
        document.getElementById('stationName').value || 'Bharat Petroleum';
    document.getElementById('outTaxNo').innerText =
        document.getElementById('taxNo').value;
    document.getElementById('outTelNo').innerText =
        document.getElementById('telNo').value;
    document.getElementById('outReceiptNo').innerText =
        document.getElementById('receiptNo').value;
    document.getElementById('outFccId').innerText =
        document.getElementById('fccId').value || '';
    document.getElementById('outFipNo').innerText =
        document.getElementById('fipNo').value || '';
    document.getElementById('outNozzleNo').innerText =
        document.getElementById('nozzleNo').value || '';

    document.getElementById('outCust').innerText =
        document.getElementById('customerName').value || '---';
    document.getElementById('outVeh').innerText =
        document.getElementById('vehicleNo').value || '---';
    document.getElementById('outFuel').innerText =
        document.getElementById('fuelType').value;
    document.getElementById('outLitres').innerText = litres;
    document.getElementById('outRate').innerText = rate;
    document.getElementById('outAmount').innerText = amount;
    document.getElementById('outMode').innerText =
        document.getElementById('mode').value;

    const inputDate = document.getElementById('date').value;
    const inputTime = document.getElementById('time')
        ? document.getElementById('time').value
        : '';

    document.getElementById('outDate').innerText =
        inputDate || new Date().toISOString().split('T')[0];

    const outputTime = document.getElementById('outTime');
    if (outputTime) {
        outputTime.innerText =
            inputTime ||
            new Date().toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
    }
}

function downloadReceipt() {
    const receipt = document.querySelector('.receipt');

    const inputDate =
        document.getElementById('date').value ||
        new Date().toISOString().split('T')[0];

    const timeField = document.getElementById('time');
    const inputTime = timeField.value
        ? timeField.value.replace(/:/g, '-')
        : new Date()
              .toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
              })
              .replace(/:/g, '-')
              .replace(/\s/g, '');

    html2canvas(receipt).then((canvas) => {
        const link = document.createElement('a');
        link.download = `fuel_receipt_${inputDate}_${inputTime}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

// Generate a random tax number (15 characters)
function generateRandomTaxNo(length = 15) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let taxNo = '';

    for (let i = 0; i < length; i++) {
        taxNo += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return taxNo;
}

// Generate a random 4-digit receipt number
function generateRandomReceiptNo() {
    return Math.floor(1000 + Math.random() * 9000);
}

// Generate a random Indian mobile number
function generateRandomPhoneNumber() {
    const start = ['9', '8', '7', '6'];
    let number = start[Math.floor(Math.random() * start.length)];

    for (let i = 0; i < 9; i++) {
        number += Math.floor(Math.random() * 10);
    }

    return number;
}

// Show a logo bundled with the website
function selectPresetLogo() {
    const source = document.getElementById('presetLogo').value;
    const logo = document.getElementById('receiptLogo');

    if (!source) {
        logo.removeAttribute('src');
        logo.style.display = 'none';
        return;
    }

    logo.src = source;
    logo.style.display = 'block';

    // Clear the local file selection when choosing a bundled logo.
    document.getElementById('logoUpload').value = '';
}

// Handle a logo uploaded from the user's device
function updateLogo() {
    const input = document.getElementById('logoUpload');
    const logo = document.getElementById('receiptLogo');

    if (input.files && input.files[0]) {
        // Clear the bundled logo selection when uploading a custom logo.
        document.getElementById('presetLogo').value = '';

        const reader = new FileReader();

        reader.onload = function (event) {
            logo.src = event.target.result;
            logo.style.display = 'block';
        };

        reader.readAsDataURL(input.files[0]);
    }
}

// Set random values and update the receipt when the page loads
window.onload = function () {
    const randomTax = generateRandomTaxNo();
    const randomReceipt = generateRandomReceiptNo();
    const randomPhone = generateRandomPhoneNumber();

    document.getElementById('taxNo').value = randomTax;
    document.getElementById('receiptNo').value = randomReceipt;
    document.getElementById('telNo').value = randomPhone;

    document.getElementById('outTaxNo').innerText = randomTax;
    document.getElementById('outReceiptNo').innerText = randomReceipt;
    document.getElementById('outTelNo').innerText = randomPhone;

    updateReceipt();
};