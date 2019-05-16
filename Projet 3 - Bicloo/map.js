class Map {
  constructor() {
    
    this.initMap();
    this.loadApi();
    this.initReservationListener();
    timer.restartExistingTimer();
  }

  //---------- Initialisation map -----------
  initMap() {
    this.map = L.map('map', {
      center: [47.2186371, -1.5541362],
      zoom: 14
    });

    this.layer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 45,
    }).addTo(this.map);
  }

  //---------- Récupération données stations -----------
  loadApi() {
    $.getJSON("https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=82471397bcff5d1637ae10b315aa2824d36ec577")
      .then((api) => {
        this.api = api;
        this.initMarkers();
      });
  }

  //---------- initialisation des markers -----------

  initMarkers() {
    this.markerCluster = L.markerClusterGroup();

    for (let i = 0; i < this.api.length; i++) {
      const station = this.api[i];
      let imageLink = "marker_good";

      if (station.available_bikes === 0) {
        imageLink = "marker_none";
      } else if (station.status === "CLOSE") {
        imageLink = "marker_travaux";
      }

      const markerIcon = L.icon({
        iconUrl: `images/${imageLink}.png`,
      });

      this.marker = L.marker(station.position, {icon: markerIcon});
      this.marker.bindPopup(station.address);
      this.markerCluster.addLayer(this.marker);

      this.infoStation(station);
    }

    this.map.addLayer(this.markerCluster);
  }


  //--------------- informations station -----------
  infoStation(station) {
    this.marker.addEventListener('click', () => {
      this.station = station;
      const reservation = document.querySelector("#reservation");
      const reserver = document.querySelector("#reserver");
      const confirmation = document.querySelector("#confirmation");
      const infos = document.querySelector("#informations");

      reservation.style.display = "block";
      reserver.style.display = "block";
      confirmation.style.display = "none";
      reservation.scrollIntoView();

      if (station.status === "OPEN") {
        station.status = "OUVERTE";
      } else if (station.status === "CLOSE") {
        station.status = "FERMÉE";
      }

      infos.innerHTML = `
          <p>Adresse : <span class='adresse'>${station.address}</span><p>
          <p>État de la station: <span>${station.status}</span></p>
          <p>Vélos disponibles: <span>${station.available_bikes}</span></p>
          <p>Places disponibles: <span>${station.available_bike_stands}</span></p>
        `;
        if (typeof myForm == "undefined") { 
          myForm = new form();
        }
    });
  }

  //------------------------ réserveration -------------------
  initReservationListener() {
    const buttonReserver = document.querySelector("#button-reservation").querySelector("button");
    buttonReserver.addEventListener("click", () => {
      if (this.station.available_bikes > 0) {
        confirmation.style.display = "block";
        reserver.style.display = "none";
      } else {
        confirmation.style.display = "none";
        reservation.style.display = "block";
        alert("aucun bicloo de disponible dans cette station");
      }
    })
  }
}

//$(document).ready(function(){
  var myCanvas = new Canvas();
  var myForm;
  var timer = new Timer();
  var map = new Map();
//});