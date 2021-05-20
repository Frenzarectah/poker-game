const num = [1,2,3,4,5,6,7,8,9,10,11,12,13];
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
    var n_players = data[1];
    var mano = createHand(deck); 
    return mano;
}

var createHand = (cards) =>{
    leng = cards.length;
    var i = 0;
    var hand =[];
    var x = Math.round((Math.random()*leng)+1);
    while ((i!=5)&&(i<=5)&&(((hand.includes(cards[x])===false)&&(cards[x]!==""))&&(cards[x] !==undefined))){
        hand[i] = cards[x];
        cards[x]="";
        i = i+1;
        x = Math.round((Math.random()*leng)+1);
    }
    return hand;

}  






//funzione unicamente per aprire dorm di immissione dati

var openMenu = () =>{
    var btn_start = document.querySelector(".ace");
    var form = document.querySelector(".form");
    var table = document.querySelector(".table");
    btn_start.remove();
    form.style.display = "flex";
}