class form {

    constructor() { 

        this.initClearEvent();
        this.initSubmitEvent();
        $('#nom').keypress(this.enableSaveBtn); // text written

        $('#prenom').keypress(this.enableSaveBtn);
        
        $('#nom').keyup(this.enableSaveBtn);
        $('#prenom').keyup(this.enableSaveBtn);
        $('#nom').bind('paste', this.enableSaveBtn);
        $('#prenom').bind('paste', this.enableSaveBtn);
        
        $('#nom').change(this.enableSaveBtn);
        $('#prenom').change(this.enableSaveBtn);

        if((localStorage.getItem('nom'))&&(localStorage.getItem('prenom'))) {
                
            $('#nom').val(localStorage.getItem('nom'));
            $('#prenom').val(localStorage.getItem('prenom'));

        }
    }
  
    enableSaveBtn() {
        if ($('#nom').val().length == 0) {
            $('#valider')[0].disabled = true;
            return;
        }
        else if ($('#prenom').val().length == 0) {
            $('#valider')[0].disabled = true;
            return;
        }
        else if (myCanvas.pixel == 0) {
            $('#valider')[0].disabled = true;
            return;
        }
        else {
            $('#valider')[0].disabled = false;
        }
    }

    initClearEvent(){
        $("#button_annuler")[0].addEventListener("click", function(e) {
            e.preventDefault();
            $('#effacer').click();
            $('#nom').val("");
            $('#prenom').val("");
        });
    }

    initSubmitEvent(){
        $("#valider")[0].addEventListener("click", function(e) {
            e.preventDefault();
            timer.start($('.adresse').text(), 1200);
            reservation.style.display = "none";
            
            if((!localStorage.getItem('nom'))&&(!localStorage.getItem('prenom'))) {
                
                localStorage.setItem('nom',$('#nom').val());
                localStorage.setItem('prenom',$('#prenom').val());

            }
        });
    }
}