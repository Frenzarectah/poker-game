const num = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const seeds =["C","D","S","H"];

/**funzione che crea il mazzo completo a partire dall'array del numero di carte per seme e un array col seme, 
 * se l'array restituito è 52 il test è passed
 */
var createDeck = () =>{
    var deck =[];
    for(y=0;y<=seeds.length-1;y++){
        for(i=0;i<=num.length-1;i++){
          var elem = num[i]+(seeds[y]);
          deck.push(elem);
        }
      }
      if (deck.length === 52) return deck;
      else return false;
}
var cards = createDeck();
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
            /*console.log(createCard(createDeck()));*/ 
            return true;
        }
}
/** funzione che genera una carta casuale partendo dall'array del mazzo intero */
var createCard = (cards) =>{
    leng = cards.length;
    var x = Math.round((Math.random()*leng)+1);
    return cards[x];
}  
/***/
var insertHand = (cards)=>{
    var i = 0;
    var hand = [];
    var card;
    while ((i<=4)&&(hand.includes(card)===false)){
        card = createCard(cards);
        hand[i] = card;
        i = i+1;
        card = createCard(cards);
    }
    return hand;
}
console.log(insertHand(cards));

module.exports = {checkData,createDeck,createCard};