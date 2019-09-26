window.addEventListener("load",() => {
  let long = 0;
  let lat = 0;

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(pos => {
      long = pos.coords.longitude;
      lat = pos.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`
      const api = `${proxy}https://api.darksky.net/forecast/b11b0d0c571cb29f57dab6203fbe9643/${lat},${long}`

      fetch(api)
      .then(res => {
        return res.json()
      })
      .then(data => {

        const {temperature, icon, windSpeed} = data.currently;
        const {summary} = data.hourly;
        const timezone = data.timezone.split("/");


        document.getElementsByClassName("temp-value")[0].innerHTML = Math.floor(((temperature -32) * 5/9));
        document.getElementsByClassName("summary")[0].innerHTML = summary;
        document.getElementsByClassName("location")[0].innerHTML = timezone[1];
        document.getElementsByClassName("wind-value")[0].innerHTML = Math.floor(windSpeed);

        setIcons(icon, document.getElementsByClassName("icon")[0]);
      });
    });
  
  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
  } else {
    alert("Please Allow location")
  }
})