function submitFeedback() {
    // 1. Get values from the form
    const username = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const job = document.getElementById('job').value;
    const designation = document.getElementById('designation').value;
    const productType = document.getElementById('productType').value;
    const feedback = document.getElementById('feedbackText').value;

    // 2. Display the alert
    alert('Thank you for your valuable feedback');

    // 3. Populate the display area
    document.getElementById('userName').innerText = username;
    document.getElementById('userAge').innerText = age;
    document.getElementById('userEmail').innerText = email;
    document.getElementById('userJob').innerText = job;
    document.getElementById('userDesignation').innerText = designation;
    document.getElementById('userProductChoice').innerText = productType;
    document.getElementById('userFeedback').innerText = feedback;

    // 4. Make the info div visible
    document.getElementById('userInfo').style.display = 'block';
}

// --- EVENT LISTENERS ---

const submitButton = document.getElementById('submitBtn');

// Trigger on click
submitButton.onclick = submitFeedback;

// Trigger on Enter key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        submitFeedback();
    }
});