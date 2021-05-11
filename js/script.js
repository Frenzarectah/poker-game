const num = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const seeds =["C","D","S","H"];
var deck = [];

/**funzione che crea il mazzo completo a partire dall'array del numero di carte per seme e un array col seme, 
 * se l'array restituito è 52 il test è passed
 */
var createDeck = (num,seeds) =>{
    for(y=0;y<=seeds.length-1;y++){
        for(i=0;i<=num.length-1;i++){
          var elem = num[i]+(seeds[y]);
          deck.push(elem);
          console.log(deck.length);
        }
      }
      if (deck.length === 52) return true;
      else return false;
}

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
var checkData = (data,cards) =>{
        if ((data[0] === "null")||(data[0] === "undefined")||(data[0] ==="")) return false;
        else{ 
            return true;
        }
}
/*var giveCards = (data) =>{
        for (i=0;i<=data[1]-1;i++){
            console.log(cards[i]);
            console.log(cards.assopicca);
        }
}*/


module.exports = {checkData,createDeck};