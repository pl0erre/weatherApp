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
        console.log(data);
        const {temperature} = data.currently;

      });
    });

  } else {
    alert("Please Allow location")
  }
})