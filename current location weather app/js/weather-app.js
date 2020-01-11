window.addEventListener('load', () => {

    let currentLocation = document.getElementById("current-location");
    let currentTemperature = document.getElementById("temperature");
    let currentState = document.getElementById("current-state");
    let currentTime = document.getElementById("current-time");
    let currentHumidity = document.getElementById("humidity");
    let currentWindSpeed = document.getElementById("wind-speed");
    let currentPrecipIntensity = document.getElementById("precip-intensity");


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            let longitude = pos.coords.longitude;
            let latitude = pos.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/2e03deeaec777f5e5a43eebc5f4fbec0/${latitude},${longitude}`;
            fetch(api)
                .then(res => {
                    return res.json();
                })
                .then(data => {

                    console.log(data);

                    const { temperature, icon, humidity, windSpeed, uvIndex, summary, time, precipIntensity } = data.currently;
                    
                    let celciusTemperature = (temperature - 32) * (5 / 9);
                    
                    currentTemperature.innerHTML = "Temperatur: " + celciusTemperature.toPrecision(2) + "&#8451;";
                    currentLocation.innerHTML = "Location: " + data.timezone;
                    currentState.innerHTML = "Condition: " + summary;
                    currentTime.innerHTML = new Date(time * 1000);
                    currentHumidity.innerHTML = "Humidity: " + humidity;
                    currentPrecipIntensity.innerHTML = "Rainfall: " + precipIntensity + " mm/hr";
                    currentWindSpeed.textContent = "Wind Speed: " + windSpeed + " km/hr";
                    
                })
        })
    }

})