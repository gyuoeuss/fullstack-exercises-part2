
const getAll = () => {
    return (fetch('https://studies.cs.helsinki.fi/restcountries/api/all').then(data => data.json()))

}
const getalone = (country) => {
    const apiKey = import.meta.env.VITE_WEATHER_KEY
    return(fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric`).then(data=>data.json()))

}
export default { getAll, getalone }