document.addEventListener('DOMContentLoaded', () => {
  const visitDateInput = document.getElementById('visitDate');
  const timeSlotsSelect = document.getElementById('timeSlots');
  const pricingTableDiv = document.getElementById('pricingTable');
  const bookingForm = document.getElementById('bookingForm');
  const summaryTableDiv = document.getElementById('summaryTable');

  // Function to store selected date and time slot in local storage
  function storeSelectedDateTime() {
    const selectedDate = visitDateInput.value;
    const selectedTimeSlot = timeSlotsSelect.value;
    localStorage.setItem('selectedDate', selectedDate);
    localStorage.setItem('selectedTimeSlot', selectedTimeSlot);
    updateSummaryTable();
  }

  // Add event listeners to the visitDateInput and timeSlotsSelect to store the selected date and time slot
  visitDateInput.addEventListener('change', storeSelectedDateTime);
  timeSlotsSelect.addEventListener('change', storeSelectedDateTime);

  // Function to disable date range selection in the calendar
  function disableDateRangeSelection() {
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    visitDateInput.setAttribute('min', minDate);
    visitDateInput.addEventListener('change', () => {
      const selectedDate = new Date(visitDateInput.value);
      if (selectedDate < today) {
        visitDateInput.value = minDate;
      }
    });
  }

  disableDateRangeSelection();

  function changeQuantity(elementId, change) {
    const quantityElement = document.getElementById(elementId);
    let quantity = parseInt(quantityElement.textContent);
    quantity += change;
    if (quantity < 0) {
      quantity = 0; // Quantity should not be negative
    }
    quantityElement.textContent = quantity;
    updateSummaryTable();
  }

  // Add event listeners to quantity controls
  const quantityControls = document.querySelectorAll('.quantity-control');
  quantityControls.forEach(control => {
    control.addEventListener('click', () => {
      const targetId = control.getAttribute('onclick').split('(\'')[1].split('\',')[0];
      const increment = control.textContent === '+' ? 1 : -1;
      changeQuantity(targetId, increment);
    });
  });

  // Function to generate time slots
  function generateTimeSlots() {
    const startTime = 7;
    const endTime = 18;
    const peakHours = [10, 11, 15, 16, 17, 18];
    const timeSlotOptions = [];
  
    for (let hour = startTime; hour < endTime; hour++) {
      const isPeakHour = peakHours.includes(hour);
      const timeSlotLabel = `${hour < 10 ? '0' + hour : hour}:00 ${hour < 12 ? 'am' : 'pm'} - ${hour + 1}:00 ${hour < 11 ? 'am' : 'pm'}`;
      timeSlotOptions.push({ label: timeSlotLabel, peak: isPeakHour });
    }

    // Populate the time slots dropdown
    timeSlotOptions.forEach((slot) => {
      const option = document.createElement('option');
      option.text = slot.label;
      timeSlotsSelect.add(option);
    });
  }


  // Function to generate pricing table
  function generatePricingTable() {
    const pricingTable = document.createElement('table');
    pricingTable.innerHTML = `
      <tr>
        <th>Category</th>
        <th>Normal Hour (USD)</th>
        <th>Peak Hour (USD)</th>
      </tr>
      <tr>
        <td>Foreigner Adult</td>
        <td>10</td>
        <td>13</td>
      </tr>
      <tr>
        <td>Foreigner Child</td>
        <td>5</td>
        <td>8</td>
      </tr>
      <tr>
        <td>SL Adult</td>
        <td>4</td>
        <td>6</td>
      </tr>
      <tr>
        <td>SL Child</td>
        <td>2</td>
        <td>3</td>
      </tr>
    `;

    pricingTableDiv.appendChild(pricingTable);
  }

  // Event listener for time slot selection
  timeSlotsSelect.addEventListener('change', () => {
    updateSummaryTable();
  });

  // Function to generate summary table
  function generateSummaryTable() {
    const summaryTable = document.createElement('div');
    summaryTable.innerHTML = `
      <h3>Summary of the Order</h3>
      <table>
        <tr>
          <th colspan="3">Selected Date</th>
          <td id="selectedDate"></td>
        </tr>
        <tr>
          <th colspan="3">Selected Time Slot</th>
          <td id="selectedTimeSlot"></td>
        </tr>
        <tr>
          <th>Category</th>
          <th>Quantity</th>
          <th>Rate (USD)</th>
          <th>Total (USD)</th>
        </tr>
        <tr>
          <td>Foreigner Adult</td>
          <td id="summaryForeignerAdults">0</td>
          <td>13</td>
          <td id="totalForeignerAdults">0</td>
        </tr>
        <tr>
          <td>Foreigner Child</td>
          <td id="summaryForeignerChildren">0</td>
          <td>8</td>
          <td id="totalForeignerChildren">0</td>
        </tr>
        <tr>
          <td>SL Adult</td>
          <td id="summarySLAdults">0</td>
          <td>6</td>
          <td id="totalSLAdults">0</td>
        </tr>
        <tr>
          <td>SL Child</td>
          <td id="summarySLChildren">0</td>
          <td>3</td>
          <td id="totalSLChildren">0</td>
        </tr>
        <tr>
          <td>Infants (under 4 years)</td>
          <td id="summaryInfants">0</td>
          <td>0</td>
          <td id="totalInfants">0</td>
        </tr>
        <tr>
          <th colspan="3">Total Payable (USD)</th>
          <td id="totalPayable">0</td>
        </tr>
      </table>
    `;

    summaryTableDiv.appendChild(summaryTable);
  }

  // Function to update the summary table based on user inputs
  function updateSummaryTable() {
    const slAdults = parseInt(document.getElementById('slAdultQty').textContent);
    const slChildren = parseInt(document.getElementById('slChildQty').textContent);
    const foreignerAdults = parseInt(document.getElementById('foreignerAdultQty').textContent);
    const foreignerChildren = parseInt(document.getElementById('foreignerChildQty').textContent);
    const infants = parseInt(document.getElementById('infantQty').textContent);
    const selectedDate = visitDateInput.value;
    const selectedTimeSlot = timeSlotsSelect.value;

    const summaryForeignerAdults = document.getElementById('summaryForeignerAdults');
    const summaryForeignerChildren = document.getElementById('summaryForeignerChildren');
    const summarySLAdults = document.getElementById('summarySLAdults');
    const summarySLChildren = document.getElementById('summarySLChildren');
    const summaryInfants = document.getElementById('summaryInfants');

    summaryForeignerAdults.textContent = foreignerAdults;
    summaryForeignerChildren.textContent = foreignerChildren;
    summarySLAdults.textContent = slAdults;
    summarySLChildren.textContent = slChildren;
    summaryInfants.textContent = infants;

    // Calculate totals
    const totalForeignerAdults = foreignerAdults * 13;
    const totalForeignerChildren = foreignerChildren * 8;
    const totalSLAdults = slAdults * 6;
    const totalSLChildren = slChildren * 3;
    const totalInfants = 0; // Infants are free

    const totalPayable = totalForeignerAdults + totalForeignerChildren + totalSLAdults + totalSLChildren;

    // Update totals in the table
    document.getElementById('totalForeignerAdults').textContent = totalForeignerAdults;
    document.getElementById('totalForeignerChildren').textContent = totalForeignerChildren;
    document.getElementById('totalSLAdults').textContent = totalSLAdults;
    document.getElementById('totalSLChildren').textContent = totalSLChildren;
    document.getElementById('totalInfants').textContent = totalInfants;
    document.getElementById('totalPayable').textContent = totalPayable;
    document.getElementById('selectedDate').textContent = selectedDate;
    document.getElementById('selectedTimeSlot').textContent = selectedTimeSlot;
  }

  // Function to retrieve and display the summary from local storage on page load
  function displaySummaryFromLocalStorage() {
    const savedSummary = localStorage.getItem('orderSummary');
    if (savedSummary) {
      const parsedSummary = JSON.parse(savedSummary);
      visitDateInput.value = parsedSummary.selectedDate;
      timeSlotsSelect.value = parsedSummary.selectedTimeSlot;
      document.getElementById('slAdultQty').textContent = parsedSummary.slAdults;
      document.getElementById('slChildQty').textContent = parsedSummary.slChildren;
      document.getElementById('foreignerAdultQty').textContent = parsedSummary.foreignerAdults;
      document.getElementById('foreignerChildQty').textContent = parsedSummary.foreignerChildren;
      document.getElementById('infantQty').textContent = parsedSummary.infants;
      updateSummaryTable();
    }
  }
  
  
  // Add event listener for the "Continue with purchase" button
  const continueButton = document.querySelector('button');
  continueButton.addEventListener('click', redirectToPage);

  // Function to handle the "Continue with purchase" button click
  function redirectToPage() {
    const selectedDate = visitDateInput.value;
    const selectedTimeSlot = timeSlotsSelect.value;
    const slAdults = parseInt(document.getElementById('slAdultQty').textContent);
    const slChildren = parseInt(document.getElementById('slChildQty').textContent);
    const foreignerAdults = parseInt(document.getElementById('foreignerAdultQty').textContent);
    const foreignerChildren = parseInt(document.getElementById('foreignerChildQty').textContent);
    const infants = parseInt(document.getElementById('infantQty').textContent);
    const totalPayable = parseInt(document.getElementById('totalPayable').textContent);

    const summary = {
      selectedDate,
      selectedTimeSlot,
      slAdults,
      slChildren,
      foreignerAdults,
      foreignerChildren,
      infants,
      totalPayable,
    };
    localStorage.setItem('orderSummary', JSON.stringify(summary));

    // Redirect to the next page
    window.location.href = "cpurchase.html";
  }

  // Initialize the page and display summary from local storage
  generateTimeSlots();
  generatePricingTable();
  generateSummaryTable();
  displaySummaryFromLocalStorage();
});
