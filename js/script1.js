const num = [2,3,4,5,6,7,8,9,10,11,12,13,14];
const seeds =["C","D","S","H"];

//sum calcola la somma dei punti della mano
var sum = (array)=> {
    var tot = 0;
    for(i=0;i<array.length;i++) {
        tot += parseInt(array[i]);
    }
return tot;
};

var consec = (array) =>{
    var n_cnsec = 0;
    for(i=0;i<array.length;i++){
        if(array[i]===array[i+1]) n_consec++;       
    }
    if (n_consec === 5) return true;
}


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
        result[k] = createHand(deck);        //ENTRYPOINT ALGORITMO
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
   while((i<=4)&&(cards[x]!==undefined)){
       if (hand.includes(cards[x])==false){
            hand[i] = cards[x];
            //delete(cards[x]);
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
    var c = 0; h = 0;d = 0;s = 0;
    values = 0;
    for(i=0;i<=4;i++){
        //fiveCard = fiveCard.sort(function(a, b){return b - a});
        seed[i] = fiveCard[i].charAt(fiveCard[i].length-1);
        if (fiveCard[i].length === 3){
                value[i] = fiveCard[i].substr(0,2);
                values = values + value[i];
            }
        else if (fiveCard[i].length === 2){ 
            value[i] = fiveCard[i].substr(0,1);
            values = values + value[i];
        };

    }
    for(i=0;i<=4;i++){              
        if (seed[i]==="C") c++;
        else if (seed[i]==="D") d++;
        else if (seed[i]==="H") h++;
        else s++;
    }
    if (c===3)  checkFlush(value,c);
    if (d===3)  checkFlush(value,d);
    if (h===3)  checkFlush(value,h);
    else if(s===3) checkFlush(value,s);
    //else console.log(c,d,h,s);
    return value;
}

var checkFlush = (valuesis,seed) =>{
    valuesis.sort();
    totPoint = sum(valuesis); //totPoint contiene la somma di tutti i punti della mano
    if (totPoint === 60) console.log("scala reale!");
    else if (consec(valuesis)=== true) console.log("scala!");
    else console.log("colore!");
};
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