document.getElementById('createAccount').addEventListener('click', function() {
    document.getElementById('hero').style.display = 'none';
    document.getElementById('signup').style.display = 'block';
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

     // Check if both passwords match
     if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return; // Stop the form submission if passwords do not match
    }

    var payload = {
        email: email,
        password: password
    };

    fetch('https://api.iamcalledned.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login successful!');
            // Redirect to user dashboard or other appropriate action
        } else {
            alert('Login failed: ' + data.message);
            // Handle login failure
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during login.');
    });
});

document.getElementById('showSignup').addEventListener('click', function() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('signup').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('signup').style.display = 'none';
    document.getElementById('login').style.display = 'block';
});

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    var userId = document.getElementById('user-id').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var payload = {
        user_id: userId,
        email: email,
        password: password
    };

    fetch('https://api.iamcalledned.com/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            if(response.status === 409) {
                throw new Error('User ID or Email already exists.');
            } else {
                throw new Error('Network response was not ok ' + response.statusText);
            }
        }
        return response.json();
    })
    .then(data => {
        if (data.message) {
            alert('Signup successful!');
            // Redirect to login page or clear the form
        } else if (data.error) {
            alert('Error: ' + data.error);
            // Display the error to the user
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message); // Updated to show the custom error message
    });
});



