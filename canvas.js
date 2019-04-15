/*-------------------------------------Canvas----------------------------------*/

function canvas() {

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
	var signature = false;

    //style du canvas et signature
    context.fillStyle = "white";
    context.fillRect = (0, 0);
    context.strokeStyle = "black";

    //Bouton cliqué
    canvas.onmousedown = function(m) {
        signature = true;
        context.moveTo(m.offsetX, m.offsetY); //moveTo, déplace la souris et offset renvoi respectivement au coin 0. 
    };

    //Mouvement de la souris
    canvas.onmousemove = function(m) {
		
		if(signature) {
		design(m.offsetX, m.offsetY);
		}
		
		function design(x, y) {
			context.lineTo(x, y); //dessine une ligne du clic jusque x y
			context.stroke(); //dessine la forme
		};
    };

    //Bouton de souris relaché
    canvas.onmouseup = function(m) {
        signature = false;
	};

    //Effacer canvas

    button_clear.addEventListener('click', (event) => {
        event.preventDefault(); //Pour n'effectuer que l'action d'effacement.
        canvas.width = canvas.width;
    })

}

canvas('') //appel du canvas