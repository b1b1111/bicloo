var slider = document.getElementById('slider');
var slide = document.getElementsByClassName('slide');
var currentImg = 0;
var nextImg = -100*(slide.length-1);
var play = true;
var timer = document.getElementById('timer');

//----------------Slide suivant
function nextSlide() {
	if (play) {
		if (currentImg > nextImg) {
			currentImg = currentImg - 100;	
		}
		else {
			currentImg = 0;
		}
	
		for(let i = 0; i < slide.length; i++) {
			slide.item(i).style.left = currentImg + '%';
	  	}
	}
}

//----------------Slide précedent
function prevSlide() {
	if (play) {
  		if (currentImg < 0) {
			currentImg = currentImg + 100;
  		}
  		else {
    		currentImg = -200;
		}
		for(let i = 0; i < slide.length; i++) {
			slide.item(i).style.left = currentImg + '%';
		}
	}
}

//------------------La boucle
function loop() {

	nextSlide();
	window.setTimeout(loop, 5000);
}
  window.setTimeout(loop, 5000);

//-----------------Play/pause
function playSlide() {
	play = !play // ! = négation 
}

/*-------------------------------Requete AJAX-------------------------------*/

function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            
			callback(req.responseText);
			
		} 
		else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

/*-----------------------------------JC Decaux-------------------------------------*/

ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=82471397bcff5d1637ae10b315aa2824d36ec577", function (reponse) {
    var station = JSON.parse(reponse);


/*------------------------MAP-------------------------*/
//Coordonnées de nantes
var nantes = [47.2186371, -1.5541362];

//création de la map
var map = L.map('map').setView(nantes, 14);

//création des calques images
var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 45,
}).addTo(map);

//icone
var icon_open = L.icon({
    iconUrl: 'images/marker_good.png',
    iconSize: [32, 32],
    iconAnchor: [16, 31],
    popupAnchor: [-3, -23],
});

var icon_closed = L.icon({
    iconUrl: 'images/marker_none.png',
    iconSize: [32, 32],
    iconAnchor: [16, 31],
    popupAnchor: [-3, -23],
});

var station_closed = L.icon({
    iconUrl: 'images/marker_travaux.png',
    iconSize: [32, 32],
    iconAnchor: [16, 31],
    popupAnchor: [-3, -23],
});

//Positionnement des marker.

	station.forEach(element => {

		var name = element.name.substr(3);
			console.log(name);
		/*-------------Popup--------------*/
		var popup = L.popup()
					.setContent('Nom : ' + name)
		
		/*-------------Marker--------------*/
		var marker = L.marker()
			if (element.available_bikes > 0) {
				marker = L.marker(element.position, {icon: icon_open}).addTo(map).bindPopup(popup);
			}
		
			else if ((element.available_bikes === 0)&&(element.status === "OPEN")) {
				marker = L.marker(element.position, {icon: icon_closed}).addTo(map).bindPopup(popup);
			}
			
			else {
				console.log(element.status + element.available_bikes);
			marker = L.marker(element.position, {icon: station_closed}).addTo(map).bindPopup(popup);
			}
		
		/*-------------Information--------------*/
			marker.addEventListener('click', () => {
				var formulaire = document.getElementById('formulaire');

				if (element.available_bikes === 0) {
					button_reservation.style.display = 'none';
				}

				else { 
					button_reservation.style.display = 'block';
				}

			  	infos.innerHTML = `
				<h1>INFORMATION STATION</h1><br/>
				<h4>Nom : <span>${name}</span></h4>
				<h4>Adresse : <span>${element.address}</span><h4>
				<p>État de la station : <span>${element.status}</span></p>
				<p>Bicloo disponibles : <span>${element.available_bikes}</span></p>
				<p>Places disponibles : <span>${element.available_bike_stands}</span></p>
				
				`;

				infos.style.display = 'block';
				reservation.style.display = 'block';
				formulaire.style.display = 'none';	
				
			});

		/*-------------Reservation--------------*/
			button_reservation.addEventListener('click', () => {

				formulaire.style.display = 'block';

				infos.innerHTML = '';
				infos.style.display = 'none';
				button_reservation.style.display = 'none';		
			});
	});

//--------------------------------Time-----------------------------------
/*var chrono = new Date(2019,3,12,15,56,0);

timeReservation();
	function timeReservation(){
		var now = new Date();
		var s = (chrono.getTime() - now.getTime())/1000;

		var m = Math.floor(s/60);
		s -= m*60;

		s = Math.floor(s);
		
		timer.innerHTML = m + `Minutes` + s + `Secondes`;

		setTimeout(timeReservation, 1000);

	}*/

	function timer(secondes, minutes) {
		let timeText = document.getElementById('timer');
		
		if (secondes == 0 && minutes == 0) {

		  setInterval(function () {
				secondes += 1;
					if (secondes === 60) {
			  			secondes = 0;
			  			minutes += 1;
					}
				
		  	}, 1000);
		} 

		else {
		  setInterval(function () {
				if (secondes === 0) {
						secondes = 60;
						minutes -= 1;
					}
				if (minutes == 0 || minutes == -1) {
						minutes = 19;
					}
				secondes -= 1;
				timeText.innerHTML = minutes + ":" + secondes;

		  }, 1000);
		}
	}
	  //    secondes,minutes
	timer(0, 1);

	/*---------------------------STOCKAGE----------------------------*/
	

});
