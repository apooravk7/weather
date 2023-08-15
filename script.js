const apiId = "d00b27579bf9554e771b0d06b579c183"
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric"
const searchcity = document.getElementById("search-bar")
const btn = document.getElementById("search-button")
const temp = document.getElementById("temperature")
const cityName = document.getElementById("city-name")
const humidity = document.getElementById("humid")
const windSpeed = document.getElementById("wind-speed")
const show = document.getElementById("full-details") 
const error = document.getElementById("no-city")
const displayimage = document.getElementById("display-icon")

async function getWeather(city){
    
    const response = await fetch(url + `&q=${city}` + `&appid=${apiId}`);
    if(response.status == 404){
        error.style.display = "block";
        show.style.display = "none";
    }
    else{
        error.style.display = "none";
        var data = await response.json();
        var condition = data.weather[0].main;
        temp.innerHTML = data.main.temp +"°C";
        cityName.innerHTML = data.name;
        humidity.innerHTML = data.main.humidity+"%";
        windSpeed.innerHTML = data.wind.speed+"km/h";
        if(condition == "Thunderstorm"){
            displayimage.src = "images/storm.png";
        }
        else if(condition == "Drizzle"){
            displayimage.src = "images/rainy.png";
        }
        else if(condition == "Rain"){
            displayimage.src = "images/heavy-rain.png";
        }
        else if(condition == "Snow"){
            displayimage.src = "images/snow.png";
        }
        else if(condition == "Clear"){
            if(data.weather[0].icon.search("n")==-1){
                displayimage.src = "images/sunny.png";
            }
            else{
                displayimage.src = "images/waxing-moon.png";
            }
        }
        else if(condition == "Clouds"){
            if(data.weather[0].icon.search("n")==-1){
                displayimage.src = "images/cloudy (1).png";
            }
            else{
                displayimage.src = "images/cloudy.png";
            }
        }
        else{
            displayimage.src = "images/haze.png";
        }
        show.style.display = "block";
        console.log(data)
    }

}


btn.addEventListener("click", ()=>{
    getWeather(searchcity.value)
})
searchcity.addEventListener("keydown", (e)=>{
    if (e.key==="Enter"){
        getWeather(searchcity.value)
    }
})