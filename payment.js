const paymentMethod = document.getElementById("payment-method");
const cardPayment = document.getElementById("card-payment");
const upiPayment = document.getElementById("upi-payment");



// Handle UPI PIN verification
document.getElementById('verify-upi-pin').addEventListener('click', function() {
    const upiPin = document.getElementById('upi-pin').value;
    const verificationMessage = document.getElementById('upi-verification-message');

    // Example validation: Check if the UPI PIN is 6 digits long
    if (upiPin.length === 4) {
        verificationMessage.textContent = "UPI PIN verified successfully!";
        verificationMessage.style.color = "green";
        // You can proceed with the payment process here
    } else {
        verificationMessage.textContent = "Invalid UPI PIN. Please enter a valid 6-digit UPI PIN.";
        verificationMessage.style.color = "red";
    }
});

paymentMethod.addEventListener("change", () => {
    if (paymentMethod.value === "upi") {
        cardPayment.style.display = "none";
        upiPayment.style.display = "block";
        generateQRCode();
    } else {
        cardPayment.style.display = "block";
        upiPayment.style.display = "none";
    }
});

// Generate QR Code for UPI Payment
function generateQRCode() {
    const amount = document.getElementById("amount").value || "0";
    const upiID = "abhijitkaluke3-2@okicici";
    const qrCodeData = `upi://pay?pa=${upiID}&pn=Abhijeet Hospital&am=${amount}&cu=INR`;

    const qr = new QRious({
        element: document.getElementById("upi-qr"),
        value: qrCodeData,
        size: 200
    });
}