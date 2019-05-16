class Canvas {

  constructor() {
    this.canvas = document.getElementById("canvas"); //création du canvas.
    this.context = this.canvas.getContext("2d"); //création du contexte du canvas.
    this.lastPos = null;
    this.clear();
    this.initMouseEvents();
    this.initTouchEvents();
    this.initClearEvent();
    this.pixel = 0;
    this.context.save();
  }

  initMouseEvents(){ //Lance la signature avec la souris.
    this.canvas.addEventListener("mousedown", (e) => { //Quand click souris, démarre le dessin.
      if (e.buttons === 1) this.start(this.positionSouris(e));
    });
    this.canvas.addEventListener("mouseup", (e) => { //Stop le dessin si la souris est relachée.
      this.stop(this.positionSouris(e));
    });
    this.canvas.addEventListener("mousemove", (e) => { //Poursuis le dessin quand la souris bouge.
      this.move(this.positionSouris(e));
    });
    this.canvas.addEventListener("mouseleave", (e) => { //Stop le dessin si la souris sort du cadre.
      this.stop(this.positionSouris(e));
    });
    this.canvas.addEventListener("mouseenter", (e) => { //Reprend le dessin si la souris entre dans le cadre.
      if (e.buttons === 1) this.start(this.positionSouris(e));
    });
  }

  initTouchEvents(){ //Lance la signature au touché.
    this.canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      if (e.touches.length > 0) this.start(this.positionToucher(e));
    });
    this.canvas.addEventListener("touchend", (e) => {
      e.preventDefault();
      if (e.touches.length > 0) this.stop(this.positionToucher(e));
    });
    this.canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      if (e.touches.length > 0) this.move(this.positionToucher(e));
    });
  }

  initClearEvent(){ //efface le canvas au click du bouton.
    $("#effacer")[0].addEventListener("click", 
      function(e) { //Appel de l'evennement au click du bouton effacer.
        e.preventDefault(); //Annule l'action par defaut de l'evennement.
        myCanvas.pixel = 0;
        myCanvas.clear(); //Appel de la fonction clear.
        myForm.enableSaveBtn();  //fonction du formulaire pour activer le bouton.
      }); 
  }

  position(pos) {
    const rect = this.canvas.getBoundingClientRect(); //renvoie la taille du rectangle.
    pos.x = (pos.x - rect.left) / (rect.right - rect.left) * this.canvas.width; //récupèration de la souris en X
    pos.y = (pos.y - rect.top) / (rect.bottom - rect.top) * this.canvas.height; //idem en Y
    return pos;
  }

  positionSouris(e) {
    return this.position({
      x: e.clientX,
      y: e.clientY
    });
  }

  positionToucher(e) {
    return this.position({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }); //récupère la position du premier toucher dans le navigateur
  }

  dessiner(pos1, pos2) {
    this.pixel++;
    myForm.enableSaveBtn();
    this.context.moveTo(pos1.x, pos1.y); //point de départ du crayon
    this.context.lineTo(pos2.x, pos2.y); //point d'arrivée du crayon
    this.context.stroke(); //element vide.
  }

  start(pos) {
    this.lastPos = pos; //prend la dernière position connue.
  }

  stop(pos) {
    if (this.lastPos) { 
      this.dessiner(this.lastPos, pos);
      this.lastPos = null; //stop la signature a la derniere position.
    }
  }

  move(pos) {
    if (this.lastPos) {
      const newPos = pos; //variable nouvelle position.
      this.dessiner(this.lastPos, newPos);
      this.lastPos = newPos; //La nouvelle position prend le pas sur l'ancienne.
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); //vide x, y puis largeur et hauteur.
    this.context.beginPath(); //Création d'un nouveau chemin avec beginPath.
  }
}