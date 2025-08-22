const cityInput = document.getElementById('city-input');
const suggestions = document.getElementById('suggestions');
const weatherInfo = document.getElementById('weather-info');
const nearbyCities = document.getElementById('nearby-cities');

const apiKey = '0aab8cd95550b6ef6ba1592c9c6e5ebe';

// Example city list for autocomplete (replace with API for production)
const cityList = ['London', 'Paris', 'New York', 'Tokyo', 'Delhi', 'Sydney', 'Moscow', 'Beijing'];

cityInput.addEventListener('input', function() 
{
  const value = this.value.toLowerCase();
  suggestions.innerHTML = '';
  if (value.length === 0) return;
  const matches = cityList.filter(city => city.toLowerCase().startsWith(value));
  matches.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    li.onclick = () => 
    {
      cityInput.value = city;
      suggestions.innerHTML = '';
      fetchWeather(city);
    };
    suggestions.appendChild(li);
  });
});

cityInput.addEventListener('keydown', function(e) 
{
  if (e.key === 'Enter') {
    suggestions.innerHTML = '';
    fetchWeather(this.value);
  }
});

async function fetchWeather(city) 
{
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) 
    {
    weatherInfo.textContent = 'City not found.';
    nearbyCities.innerHTML = '';
    return;
    }
  const data = await res.json();
  const celsius = data.main.temp.toFixed(1);
  const fahrenheit = (data.main.temp * 9/5 + 32).toFixed(1);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;
  weatherInfo.innerHTML = `
    <h2>${data.name}</h2>
    <img id="weatherIcon" src="http://openweathermap.org/img/w/${icon}.png" alt="${description}" />
    <p>${description}</p>
    <p>${celsius}°C / ${fahrenheit}°F</p>
  `;
  fetchNearbyCities(data.coord.lat, data.coord.lon, data.name);
}

async function fetchNearbyCities(lat, lon, excludeCity) 
{
  const url = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=5&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  const cities = data.list
    .filter(city => city.name !== excludeCity)
    .map(city => `<li>${city.name}</li>`)
    .join('');
  nearbyCities.innerHTML = `<h3>Nearby Cities:</h3><ul>${cities}</ul>`;
}