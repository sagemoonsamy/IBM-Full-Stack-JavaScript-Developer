/**
 * travel_recommendation.js
 * Final version including Tasks 6, 9, and 10.
 */

const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const conditionInput = document.getElementById('conditionInput');
const resultsContainer = document.getElementById('resultsContainer');

// Task 10: Timezone Mapping Helper
const timeZones = {
    "Sydney, Australia": "Australia/Sydney",
    "Melbourne, Australia": "Australia/Melbourne",
    "Tokyo, Japan": "Asia/Tokyo",
    "Kyoto, Japan": "Asia/Tokyo",
    "Rio de Janeiro, Brazil": "America/Sao_Paulo",
    "São Paulo, Brazil": "America/Sao_Paulo",
    "Copacabana Beach, Brazil": "America/Sao_Paulo",
    "Angkor Wat, Cambodia": "Asia/Phnom_Penh",
    "Taj Mahal, India": "Asia/Kolkata",
    "Bora Bora, French Polynesia": "Pacific/Tahiti"
};

function performSearch(keyword) {
    if (!keyword) return;
    const searchTerm = keyword.toLowerCase().trim();
    
    if (resultsContainer) resultsContainer.innerHTML = ''; 

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            if (searchTerm.includes('beach')) {
                displayResults(data.beaches);
            } else if (searchTerm.includes('temple')) {
                displayResults(data.temples);
            } else if (searchTerm.includes('australia') || searchTerm.includes('japan') || searchTerm.includes('brazil')) {
                const country = data.countries.find(c => c.name.toLowerCase().includes(searchTerm));
                if (country) displayResults(country.cities);
            } else {
                resultsContainer.innerHTML = `<p class="error-msg">No results found for "${searchTerm}". Try "beach", "temple", or "brazil".</p>`;
            }
        })
        .catch(error => console.error('Error:', error));
}

function displayResults(items) {
    if (!resultsContainer) return;

    items.forEach(item => {
        // Task 10: Get Local Time
        const tz = timeZones[item.name] || 'UTC';
        const options = { 
            timeZone: tz, 
            hour12: true, 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric' 
        };
        const localTime = new Date().toLocaleTimeString('en-US', options);

        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result-card');
        resultDiv.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="result-info">
                <h3>${item.name}</h3>
                <p class="time-display"><strong>Current Local Time:</strong> ${localTime}</p>
                <p>${item.description}</p>
                <button class="btn-visit">Visit</button>
            </div>
        `;
        resultsContainer.appendChild(resultDiv);
    });
}

// Task 9: Clear Function
function resetSearch() {
    if (conditionInput) conditionInput.value = '';
    if (resultsContainer) resultsContainer.innerHTML = '';
    window.history.replaceState({}, document.title, window.location.pathname);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('search');
    if (query) {
        performSearch(query);
        if (conditionInput) conditionInput.value = query;
    }

    btnSearch?.addEventListener('click', () => performSearch(conditionInput.value));
    btnClear?.addEventListener('click', resetSearch);
});