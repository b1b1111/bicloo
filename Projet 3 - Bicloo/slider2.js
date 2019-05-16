class Slider {

    constructor() {
        this.slider = document.getElementById('slider');
        this.slide = document.getElementsByClassName('slide');
        this.currentImg = 0;
        this.nextImg = -100*(this.slide.length-1);
        this.play = true;
        this.buttonNext = document.getElementById('next');
        this.buttonPrev = document.getElementById('prev');
        this.buttonPlay = document.getElementById('playSlide');
    }

//----------------Slide suivant
    nextSlide() {
        if (this.play) {
            if (this.currentImg > this.nextImg) {
                this.currentImg = this.currentImg - 100;	
            }
            else {
                this.currentImg = 0;
            }
            
            for(let i = 0; i < this.slide.length; i++) {
                this.slide.item(i).style.left = this.currentImg + '%';
            }
        }
    }
    //----------------Slide précedent
    prevSlide() {
        if (this.play) {
            if (this.currentImg < 0) {
                this.currentImg = this.currentImg + 100;
            }
            else {
                this.currentImg = -200;
            }
            for(let i = 0; i < this.slide.length; i++) {
                this.slide.item(i).style.left = this.currentImg + '%';
            }
        }
    }

    //------------------La boucle
    loop() {

        sliderObject.nextSlide();
            window.setTimeout(sliderObject.loop, 5000);
    }
    //-----------------Play/pause
    playSlide() {
        this.play = !this.play // ! = négation 
    }

    clavier(e) {
        const code = e.keyCode;
        switch (code) {
          case 39:
            this.nextSlide();
            break;
          case 37:
            this.prevSlide();
            break;
        }
    }

    //button
    buttonFunction() {
       
        this.buttonNext.addEventListener('click', function(){ //addEventListener : lié du code à un evenemment.
            sliderObject.nextSlide()
        });
        this.buttonPrev.addEventListener('click', function(){
            sliderObject.prevSlide()
        });
        this.buttonPlay.addEventListener('click', function(){
            sliderObject.playSlide()
        });
        document.addEventListener("keydown", (e) => {
            this.clavier(e);
        });
    }

}

var sliderObject = new Slider();
sliderObject.buttonFunction();
window.setTimeout(sliderObject.loop, 5000);