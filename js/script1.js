const num = [2,3,4,5,6,7,8,9,10,11,12,13,14];
const seeds =["C","C","C","C"];
//sum calcola la somma dei punti della mano
var sum = (array)=> {
    var tot = 0;
    for(i=0;i<array.length;i++) {
        tot += parseInt(array[i]);
    }
return tot;
};
//calcola se mano è fatta da tutti valori consecutivi
var consec = (array) =>{
    var n_consec = 1;
    array.sort(function(a, b){return b - a});
  //5,4,3,2,1
  for (i=0;i<array.length;i++){
    if((array[i] - array[i+1])==1) n_consec++;
  }
  if (n_consec == 5) return true;
  else return array;
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
        createGame(form);
        return form;
    }
}
//creazione della funzione di gioco, distribuisce le 5 carte a ciascuno dei giocatori
var createGame = (data) =>{
    var result = [];
    k = 0;
    var n_players = data[1]-1;
    for(k=0;k<=n_players;k++){
        result[k] = createHand(deck);        //ENTRYPOINT ALGORITMO
        console.log(result[k]);
        score_calc(result[k]);  
    }
}

//funzione che dato il mazzo completo, crea una mano da 5 carte non ripetute e casuali
var createHand = (cards)=>{
    var i = 0; x = 0; leng = 0;
    var hand = [];
    while(i<=4){
        leng = cards.length-1;
        x = Math.round(Math.random()*leng);
        hand[i] = cards[x];
        cards.splice(x,1);
        i++;
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
    if((c===5)||(d===5)||(h===5)||(s===5)) checkFlush(fiveCard,value,c);
        else checkNoflush(fiveCard,value,seed);
    
    return fiveCard,value;
}

var checkFlush = (fiveC,valuesis,seed) =>{
    valuesis.sort();
    totPoint = sum(valuesis); //totPoint contiene la somma di tutti i punti della mano
    if (totPoint === 60){ 
        console.log("scala reale!");
        score = 10;
    }
    else if (consec(valuesis)=== true){ 
        console.log("scala colore!");
        score = 9;
    }
    else{ console.log("colore!");
        score = 6;
    }
    console.log(fiveC,score);
};
var checkNoflush = (fiveC,valuesis,seed) =>{
    valuesis.sort();
    var same = [];
    cont=1;j=0;
    console.log("carte:"+valuesis+" seed:"+seed);
    if (consec(valuesis)===true){ 
        console.log("scala!");
        score = 5;
    }
    //11,11,14,14,14
    for(i=0;i<valuesis.length;i++){    
        if(valuesis[i]===valuesis[i+1]){
            cont++;
            same[j]=cont;
        }else{
            j++;
            cont=1;
        }  
    };
    same = same.filter(()=>(el)=>{return el!==""}); //filtra gli elementi vuoti dell'array
    if (same.length!==0) occurrCalc(fiveC,same);
    else{ 
        console.log(valuesis[0]);
        score = 1;
    }
    console.log(fiveC,score);
}

var occurrCalc = (fiveCard,numOcc) =>{
    //[2,3]
    for(i=0;i<=numOcc.length-1;i++){
        switch (numOcc[i]){
            case 2:{ if (numOcc[i]===numOcc[i+1]){ 
                console.log("doppia coppia!");
                score = 3;break;
            }
            else if ((numOcc[i] === 2)&&(numOcc.length===1)){ 
                console.log("coppia");
                score = 2;break;
            }
        }
            case 3:{
                if (numOcc[i]>numOcc[i+1]){ 
                    console.log("full");
                    score = 7;break;
                }
                else{ 
                    console.log("tris");
                    score = 4;break;
                }
            }
            case 4:{ 
                console.log("poker");
                score = 8;break;
            }
        }
    }
    console.log(fiveCard,score);
}
//funzione unicamente per aprire form di immissione dati

var openMenu = () =>{
    var btn_start = document.querySelector(".ace");
    var form = document.querySelector(".form");
    var table = document.querySelector(".table");
    btn_start.remove();
    form.style.display = "flex";
}

//var occ = [3];
//occurrCalc(occ);

module.exports = {createDeck,createHand};