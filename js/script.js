var cards = ["1C.jpg","1D.jpg","1H.jpg","1S.jpg","2C.jpg","2D.jpg","2H.jpg","2S.jpg"];

var openMenu = () =>{
    var btn_start = document.querySelector(".ace");
    var form = document.querySelector(".form");
    var table = document.querySelector(".table");
    btn_start.remove();
    form.style.display = "flex";
}
var sendData = () =>{
    var data = [];
     data[0] = document.querySelector(".name").value;
     data[1]= document.querySelector(".select_player").value;
    return data;
}
/**funzione atta al controllo dell'immissione del nome utente che non può essere vuoto */
var checkData = (data) =>{
    if ((data[0] === "null")||(data[0] === "undefined")||(data[0] ==="")) return false;
    else return data;
}



module.exports = {checkData};

