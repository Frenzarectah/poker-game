const num = [2,3,4,5,6,7,8,9,10,11,12,13,14];
const seeds =["C","D","S","H"];
 //creazione tramite funzione del mazzo completo
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
var deck = createDeck();  // creazione di variabile "deck" per conservare mazzo completo

var sendData = () =>{
    var form = [];
    form[0] = document.querySelector(".name").value;
    form[1]= document.querySelector(".select_player").value;
    if ((form[0] ==="")||(form[1] === "")){
        alert("tutti i campi obbligatori!");
        return false;
    }
    else{
        console.log(createGame(form)); 
        return form;
    }
}
//creazione della funzione di gioco, prende dati del form e mazzo,crea randomicamente carte e distribuisce
var createGame = (data) =>{
    var result = [];
    k = 0;
    var n_players = data[1]-1;
    for(k=0;k<=n_players;k++){
        result[k] = createHand(deck);
        console.log("molto bene "+result[k]);
    }
    return result;
}

//funzione che dato il mazzo completo, crea una mano da 5 carte non ripetute e casuali
var createHand = (cards) =>{
    leng = cards.length-1;
    var i = 0;
    var hand =[];
    var x = Math.round(Math.random()*leng);
   while(i<=4){
       if (hand.includes(cards[x])==false){
            hand[i] = cards[x];
            x = Math.round(Math.random()*leng);
            i++;
       }   
   }
   return hand;
}
//funzione che calcola il punteggio in base alle regole del poker 5 carte
var score_calc = (fiveCard) =>{
    var value =[];
    var seed = [];
    var c = 0;
    var d = 0;
    var s = 0;
    var h = 0;
    value[i] = 0;
    values = 0;
    fiveCard.sort();
    for(i=0;i<=4;i++){
        seed[i] = fiveCard[i].charAt(fiveCard[i].length-1);
        if (fiveCard[i].length === 3){
                value[i] = parseInt(fiveCard[i].substr(0,2));
                values = values + value[i];
            }
        else { 
            value[i] = parseInt(fiveCard[i].substr(0,1));
            values = values + value[i];
        };
        switch(seed[i]){
            case "C": 
                c=c+1;
                break;
            case "H": 
                h=h+1;
                break;
            case "D": 
                d=d+1; 
                break;
            case "S": 
                s=s+1; 
                break;
            }
    }
    switch(c){
            case 1: console.log("una sola c mazzo!"+fiveCard);break;
            case 2: console.log("due c in un mazzo!"+fiveCard);break; 
            case 3: console.log("tre c in un mazzo!"+fiveCard);break;
            case 4: console.log("quattro c in un mazzo!"+fiveCard);break;
            case 5: console.log("COLORE!"+fiveCard);break;
        }
        return "diocancaro!";
}

//funzione unicamente per aprire form di immissione dati

var openMenu = () =>{
    var btn_start = document.querySelector(".ace");
    var form = document.querySelector(".form");
    var table = document.querySelector(".table");
    btn_start.remove();
    form.style.display = "flex";
}

x = score_calc(createHand(deck));
console.log(x);

module.exports = {createDeck,createHand};