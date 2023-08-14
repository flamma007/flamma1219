document.addEventListener('DOMContentLoaded', function () {
    // Get form elements
    const fullNameInput = document.getElementById('fullName');
    const mobileNumberInput = document.getElementById('mobileNumber');
    const emailInput = document.getElementById('email');
    const confirmEmailInput = document.getElementById('confirmEmail');
    const genderSelect = document.getElementById('gender');
    const submitButton = document.getElementById('submitButton');

    // Get error message elements
    const fullNameError = document.getElementById('fullNameError');
    const mobileNumberError = document.getElementById('mobileNumberError');
    const emailError = document.getElementById('emailError');
    const confirmEmailError = document.getElementById('confirmEmailError');

    // Function to display error message for an element
    function displayError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    // Function to hide error message for an element
    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }

    // Function to check if all fields are filled
    function checkFormValidity() {
        const fullName = fullNameInput.value.trim();
        const mobileNumber = mobileNumberInput.value.trim();
        const email = emailInput.value.trim();
        const confirmEmail = confirmEmailInput.value.trim();

        // Validate Full Name
        if (fullName === '') {
            displayError(fullNameError, 'Full Name is required.');
        } else {
            hideError(fullNameError);
        }

        // Validate Mobile Number
        if (mobileNumber === '') {
            displayError(mobileNumberError, 'Mobile Number is required.');
        } else {
            hideError(mobileNumberError);
        }

        // Validate Email
        if (email === '') {
            displayError(emailError, 'Email is required.');
        } else {
            hideError(emailError);
        }

        // Validate Confirm Email
        if (confirmEmail === '') {
            displayError(confirmEmailError, 'Confirm Email is required.');
        } else if (email !== confirmEmail) {
            displayError(confirmEmailError, 'Emails do not match.');
        } else {
            hideError(confirmEmailError);
        }

        // Enable/Disable the submit button based on form validity
        if (fullName !== '' && mobileNumber !== '' && email !== '' && confirmEmail !== '' && email === confirmEmail) {
            submitButton.removeAttribute('disabled');
        } else {
            submitButton.setAttribute('disabled', true);
        }
    }

    // Attach event listeners to inputs to check form validity on change
    fullNameInput.addEventListener('change', checkFormValidity);
    mobileNumberInput.addEventListener('change', checkFormValidity);
    emailInput.addEventListener('change', checkFormValidity);
    confirmEmailInput.addEventListener('change', checkFormValidity);

    // Store form inputs in local storage when the form is submitted
    document.getElementById('userForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const userData = {
            fullName: fullNameInput.value,
            mobileNumber: mobileNumberInput.value,
            email: emailInput.value,
            confirmEmail: confirmEmailInput.value,
            gender: genderSelect.value,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        window.location.href = 'payment.html'; // Redirect to the payment page
    });
});