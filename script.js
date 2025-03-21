
const apiKey = "4441bd45818038ac60a48d8838b84f81";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
        const data = await response.json();

        if (response.ok) {
            console.log(data);

            // Atualizando informações no HTML
            document.querySelector(".city").textContent = data.name;
            document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").textContent = data.main.humidity + "%";
            document.querySelector(".wind").textContent = data.wind.speed + " km/h";

            const weatherMap = {
                "Clouds": "imagens/sol e nuven.png",
                "Clear": "imagens/sol.png",
                "Rain": "imagens/sol e chuva.png",
                "Thunderstorm": "imagens/raio.png",
                "Drizzle": "imagens/chuva.png",
                "Snow": "imagens/neve.png",
                "Mist": "imagens/nevoa.png"
            };


            weatherIcon.src = weatherMap[data.weather[0].main] || "imagens/default.png";


            document.querySelector(".weather").style.display = "block";
        } else {
            alert("Cidade não encontrada. Por favor, tente novamente.");
        }
    } catch (error) {
        console.error("Erro ao buscar clima:", error);
        alert("Não foi possível obter informações do clima. Verifique sua conexão.");
    }
}


searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Por favor, insira o nome de uma cidade.");
    }
});
