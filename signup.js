const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const paymentMethod = document.getElementById("payment-method");
const cardPayment = document.getElementById("card-payment");
const upiPayment = document.getElementById("upi-payment");

const app = express();
const PORT = 3000;




paymentMethod.addEventListener("change", () => {
    if (paymentMethod.value === "upi") {
        cardPayment.style.display = "none";
        upiPayment.style.display = "block";
    } else {
        cardPayment.style.display = "block";
        upiPayment.style.display = "none";
    }
});
document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form values
    const patientName = document.getElementById('patient-name').value;
    const amount = document.getElementById('amount').value;
    const paymentMethodValue = paymentMethod.value;

    let paymentData = {
        patientName,
        amount
    };

    if (paymentMethodValue === "card") {
        paymentData.cardNumber = document.getElementById('card-number').value;
        paymentData.expiryDate = document.getElementById('expiry-date').value;
        paymentData.cvv = document.getElementById('cvv').value;
    } else if (paymentMethodValue === "upi") {
        paymentData.upiPin = document.getElementById('upi-pin').value;
    }

    // Send data to the server
    fetch('/process-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
    })
    .then(response => response.json())
    .then(data => {
        // Handle success response
        document.getElementById('message').textContent = `Payment of $${amount} for ${patientName} has been processed successfully!`;
        document.getElementById('payment-form').reset(); // Clear the form
    })
    .catch(error => {
        // Handle error response
        console.error('Error:', error);
        document.getElementById('message').textContent = 'There was an error processing your payment.';
    });
});

// Connect to MongoDB (replace `yourMongoDBURL` with your database URL)
mongoose.connect('yourMongoDBURL', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Database Connection Error:', err));

// Define Patient Schema
const patientSchema = new mongoose.Schema({
    fullname: String,
    dob: Date,
    gender: String,
    contact: String,
    email: String,
    username: String,
    password: String,
});

// Create Patient Model
const Patient = mongoose.model('Patient', patientSchema);

const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(patientPassword, 10);


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Path to your signup form
});

app.post('/signup', async (req, res) => {
    try {
        const { patientFullname, patientDob, patientGender, patientContact, patientEmail, patientUsername, patientPassword } = req.body;

        // Save new patient data
        const newPatient = new Patient({
            fullname: patientFullname,
            dob: patientDob,
            gender: patientGender,
            contact: patientContact,
            email: patientEmail,
            username: patientUsername,
            password: patientPassword, // Note: Hash this password before saving
        });

        await newPatient.save();
        res.send('Signup successful!'); // Redirect to a success page or patient dashboard
    } catch (error) {
        console.error('Error saving patient:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
