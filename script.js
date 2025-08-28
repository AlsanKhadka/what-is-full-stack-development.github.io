// script.js
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevents the form from submitting in the default way (page refresh)

    // Get values from the input fields
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    // Basic validation to ensure both fields are filled
    if (!username || !email) {
        document.getElementById('response-message').textContent = 'Please fill in all fields.';
        return;  // Stop the function if validation fails
    }

    // Simulate a successful submission
    setTimeout(function() {
        document.getElementById('response-message').textContent = 'Signup successful!';
        document.getElementById('response-message').style.color = 'green';  // Change text color to green
    }, 1000);  // Simulate a 1-second delay
});
