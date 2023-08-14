document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('paymentForm');
    const payButton = document.getElementById('payButton');

    // Retrieve total payable amount from local storage (assuming it's stored as 'totalPayable')
    const totalPayable = parseFloat(localStorage.getItem('totalPayable'));

    

    // Display the total payable amount in the Pay button
    document.getElementById('amountToPay').textContent = `$${totalPayable.toFixed(2)}`;

    // Function to display error messages
    function displayError(inputElement, errorMessage) {
      removeError(inputElement); // Remove any existing error messages
      const errorElement = document.createElement('div');
      errorElement.classList.add('error-message');
      errorElement.textContent = errorMessage;
      const parentElement = inputElement.parentElement;
      parentElement.appendChild(errorElement);
    }

    // Function to remove error messages
    function removeError(inputElement) {
      const parentElement = inputElement.parentElement;
      const errorElement = parentElement.querySelector('.error-message');
      if (errorElement) {
        parentElement.removeChild(errorElement);
      }
    }

    // Function to enable the Pay button when all fields are filled correctly
    function enablePayButton() {
      const cardNumber = document.getElementById('cardNumber').value;
      const expiryDate = document.getElementById('expiryDate').value;
      const cvc = document.getElementById('cvc').value;
      const nameOnCard = document.getElementById('nameOnCard').value;

      const isValidCardNumber = cardNumber.trim() !== '';
      const isValidExpiryDate = expiryDate.trim() !== '';
      const isValidCVC = cvc.trim() !== '' && /^\d{3}$/.test(cvc);
      const isValidNameOnCard = nameOnCard.trim() !== '';

      if (!isValidCardNumber) {
        displayError(document.getElementById('cardNumber'), 'Please enter a valid card number.');
      } else {
        removeError(document.getElementById('cardNumber'));
      }

      if (!isValidExpiryDate) {
        displayError(document.getElementById('expiryDate'), 'Please enter a valid expiry date.');
      } else {
        removeError(document.getElementById('expiryDate'));
      }

      if (!isValidCVC) {
        displayError(document.getElementById('cvc'), 'Please enter a valid CVC/CVV.');
      } else {
        removeError(document.getElementById('cvc'));
      }

      if (!isValidNameOnCard) {
        displayError(document.getElementById('nameOnCard'), 'Please enter the name on the card.');
      } else {
        removeError(document.getElementById('nameOnCard'));
      }

      payButton.disabled = !(isValidCardNumber && isValidExpiryDate && isValidCVC && isValidNameOnCard);
    }

    // Event listeners for form inputs
    paymentForm.addEventListener('input', enablePayButton);

    // Store user inputs in the browser's local storage
    paymentForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const paymentDetails = {
        cardNumber: document.getElementById('cardNumber').value,
        expiryDate: document.getElementById('expiryDate').value,
        cvc: document.getElementById('cvc').value,
        nameOnCard: document.getElementById('nameOnCard').value,
      };

      localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
      window.location.href = 'confirmation.html';
    });
  });