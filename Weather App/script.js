document.getElementById('getWeatherBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    const apiKey = "d1390cb79a3c1d7c05ce70d918852c48";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('errorMessage').classList.add('hidden');
            document.getElementById('weatherDetails').classList.remove('hidden');

            const cityName = data.name;
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const windSpeed = data.wind.speed;
            const humidity = data.main.humidity;

            document.getElementById('cityName').innerText = `City: ${cityName}`;
            document.getElementById('temp').innerText = `Temperature: ${temp} °C`;
            document.getElementById('description').innerText = `Description: ${description}`;
            document.getElementById('wind').innerText = `Wind Speed: ${windSpeed} m/s`;
            document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;

            updateBackground(description);
        })
        .catch(error => {
            document.getElementById('errorMessage').innerText = error.message;
            document.getElementById('errorMessage').classList.remove('hidden');
            document.getElementById('weatherDetails').classList.add('hidden');
        });
});

function updateBackground(description) {
    const body = document.body;
    body.classList.remove('sunny', 'rainy', 'cloudy');

    if (description.includes('sun')) {
        body.classList.add('sunny');
    } else if (description.includes('rain')) {
        body.classList.add('rainy');
    } else if (description.includes('cloud')) {
        body.classList.add('cloudy');
    }
}
