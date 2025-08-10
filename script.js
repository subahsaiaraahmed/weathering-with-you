function getWeather()
{
    var city = document.getElementById("cityInput").value;
    if (city === "")
    {
        alert("Please give city name.");
        return;
    }

    var apiKey = "0aab8cd95550b6ef6ba1592c9c6e5ebe";
    var url = 
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";
    fetch(url)
        .then(function (response)
    {
        if (!response.ok)
        {
            alert("Hello! Function is working");
        }
        return response.json();
    })
    .then(function (data)
        {
            document.getElementById("cityName").innerText = data.name;
            document.getElementById("temperature").innerText = "Temperature: " + data.main.temp + " degree C";
            document.getElementById("weatherDescription").innerText = data.weather[0].description;
            document.getElementById("weatherIcon").src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        })
        .catch(function (error)
            {
                console.log(error);
            }
        );
}