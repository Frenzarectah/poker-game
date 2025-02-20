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

var cards = createDeck();  /** esportazione del mazzo creato nella funzione createDeck all'esterno di essa */

var openMenu = () =>{
    var btn_start = document.querySelector(".ace");
    var form = document.querySelector(".form");
    var table = document.querySelector(".table");
    btn_start.remove();
    form.style.display = "flex";
}
var sendData = () =>{
    var form = [];
     form[0] = document.querySelector(".name").value;
     form[1]= document.querySelector(".select_player").value;
    return form;
}
/**funzione atta al controllo dell'immissione dei dati nel form, se tutto è ok allora restituisce mazzo completo e 
 * dati immessi
 */
var checkData = (form,cards) =>{
        datas = [];
        if ((form[0] === "null")||(form[0] === "undefined")||(form[0] ==="")) return false;
        else{
            datas[0] = createDeck(); 
            datas[1] = form;
            console.log(destrCard(datas));
            return datas;
        }
}
var destrCard = (data) =>{
    var hand = [];
    var carte = data[0];
    var n_players = parseInt(data[1][1]);
    var i = 0;
    for (i=0;i++;i<=n_players){
        hand = createHand(carte);    
    }
    return hand;
}

/** funzione che genera una mano di gioco partendo dall'array del mazzo intero */
var createHand = (cards) =>{
    leng = cards.length;
    var i = 0;
    var hand =[];
    var x = Math.round((Math.random()*leng)+1);
   for(i=0;i<=4;i++){
       if ((hand.includes(cards[x])==false)&&(cards[x]!=="")&&(cards[x]!==undefined)){
            hand[i] = cards[x];
            cards[x]="";
            x = Math.round((Math.random()*leng)+1);
       } else i = i-1;
    }
    return hand;

}  
/**
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
*/
module.exports = {checkData,createDeck,createCard};