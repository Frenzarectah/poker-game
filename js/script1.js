const num = [2,3,4,5,6,7,8,9,10,11,12,13,14];
const seeds =["C","H","S","D"];
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
var deck = createDeck(); // creazione di variabile "deck" per conservare mazzo completo
//funzione unicamente per aprire form di immissione dati
var openMenu = () =>{
    var btn_start = document.querySelector(".ace");
    var form = document.querySelector(".form");
    var table = document.querySelector(".table");
    btn_start.remove();
    form.style.display = "flex";
}
//funzione che prende in pancia i dati dal form e li utilizza per processare il gioco
var sendData = () =>{
    var form = [];
    var replay_btn = document.querySelector(".nextHand");
    replay_btn.style.display="block";
    form[0] = document.querySelector(".name").value;
    form[1]= document.querySelector(".select_player").value;
    if ((form[0] ==="")||(form[1] === "")){
        alert("tutti i campi obbligatori!");
        return false;
    }
    else{  //svuotare lo schermo per la prossima mano 
        for(i=0;i<=form[1]-1;i++){
            var div = document.getElementsByClassName("player1")[i];
            div.innerHTML="";
        };
        createGame(form);
        return form;
    }
}
//creazione della funzione di gioco, distribuisce le 5 carte a ciascuno dei giocatori
var createGame = (data) =>{
    var clear = document.querySelector(".form");
    clear.style.display="none";
    var result = [];
    var points = [];
    k = 0;
    var n_players = data[1]-1;
    for(k=0;k<=n_players;k++){
        result[k] = createHand(deck);        
        points[k] = score_calc(result[k]);  
    }
    //points[0]: 12C,2C,3H,7D,2D,13
    sorting(points,data);
}
//funzione che dato il mazzo completo, crea una mano da 5 carte non ripetute e casuali
var createHand = (cards)=>{
    var i = 0; x = 0; leng = 0;
    var hand = [];
    while(i<=4){
        leng = cards.length-1;
        x = Math.round(Math.random()*leng);
        hand[i] = cards[x];
        cards.splice(x,1);  //permette di eliminare l'elemento dopo averlo immesso in hand in modo da non ritrovarlo
        i++;
    }
    return hand;
}
//funzione che calcola il punteggio suddividendo la mano in valore carte e loro seme
var score_calc = (fiveCard) =>{
    var value =[];
    var seed = [];
    var c = 0; h = 0;d = 0;s = 0;
    values = 0;
    try{
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
    if((c===5)||(d===5)||(h===5)||(s===5)) return checkFlush(fiveCard,value,c);
        else return checkNoflush(fiveCard,value,seed);
}catch(e){
    var div = document.getElementsByClassName("player1")[1];
    div.innerHTML="GIOCO FINITO!";
    var restart_btn = document.querySelector(".replay");
    restart_btn.style.display="block";
}
}
//funzione per gestire i casi con mazzo flush e restituirne lo score
var checkFlush = (fiveC,valuesis,seed) =>{
    valuesis.sort();
    totPoint = sum(valuesis); //totPoint contiene la somma di tutti i punti della mano (utile per scala reale)
    if (totPoint === 60){ 
        console.log("scala reale!");
        score = 23;
    }
    else if (consec(valuesis)=== true){ 
        console.log("scala colore!");
        score = 22;
    }
    else{ console.log("colore!");
        score = 19;
    }
    output = merging(fiveC,score);
     //mano + score di tale hand ( non ordinato, puro)
    return output;
};
// prende in rassegna l'array in caso non si tratti di un mazzo colore e ne restituisce lo score
var checkNoflush = (fiveC,valuesis,seed) =>{
    valuesis = valuesis.sort(function(a, b){return b - a});
    var same = [];
    cont=1;j=0;
    // creazione dell'array same[] che contiene il numero delle ripetizioni del mazzo
        for(i=0;i<valuesis.length;i++){    
            if(valuesis[i]===valuesis[i+1]){
                cont++;
                same[j]=cont;
            }else{
                j++;
                cont=1;
            }
        //es. same: [3,"",2];  
    };
    same = same.filter(()=>(el)=>{return el!==""}); //filtra gli elementi vuoti dell'array
    if (same.length!==0) occurrCalc(fiveC,same);
    else{ 
        score = valuesis[0]; // lo score in questo caso è il punteggio della carta alta (il primo dell'array ordinato)
    }
    //sfrutta la funct consec per decidere se il mazzo è una scala
    if (consec(valuesis)===true){
        score = 18;
    } 
    output = merging(fiveC,score); 
    return output; //ritorno di mazzo con suo score (non ordinato, puro)
}
//funzione per restituire la mano con punteggio piu alto
var sorting = (handscore,datas) =>{
    var handpoint = [];
    var max = 0; idx=0;
    var msg = "";
    for (i=0;i<=handscore.length-1;i++) handpoint.push(handscore[i]);
    for(k=0;k<=handpoint.length-1;k++){
        if (handpoint[k][5]>max){
            max = handpoint[k][5];
            idx = k;
        }
    }
    //aggiunta del messaggio di congratulazioni se la tua mano coincide con la vincitrice
    if((handpoint[0]===handpoint[idx])) msg="congratulazioni, hai vinto questa mano!</br>";
    render(idx,handpoint,datas,msg);
    return idx,handpoint,datas,msg;
}
//funzione per renderizzare i risultati a video
var render = (index,handz,datas,mess) =>{
    scoreR = [];
    var div_1 = document.getElementsByClassName("player1")[0];
    var p = document.createElement("p");
    div_1.appendChild(p);
    //handz.length come se contenesse numero giocatori
        for(j=0;j<=datas[1]-1;j++){
            for(i=0;i<=4;i++){ 
                var div = document.getElementsByClassName("player1")[j];
                var img = document.createElement("img");
                p.innerHTML=datas[0];
                img.style.width="100%";
                img.style.height="100%";
                pattern = "img/cards/";
                pattern+=handz[j][i];
                pattern+=".jpg";
                img.src=pattern;
                div.appendChild(img);
                pattern="";
                scoreR = handz[j][5];
            
    }
    var scoreRender = document.createElement("p");
    scoreRender.innerText= trad(scoreR);
    div.appendChild(scoreRender);
    }
    var winnerDiv = document.querySelector(".winner");
    winnerDiv.innerHTML=mess; 
    winnerDiv.innerHTML+=" il punteggio più alto è "+trad(handz[index][5]); 
}
/** UTILITY FUNCTS */
//restituisce mano piu il suo punteggio (in base a ripetizioni nel mazzo)
var occurrCalc = (fiveCard,numOcc) =>{
    //[2,3]
        if((numOcc[0]=== 2)&&(numOcc[1]=== 2)) score=16;
        else if ((numOcc[0]=== 2)&&(numOcc.length==1)) score=15;
        else if ((numOcc[0])=== 4) score =21;
        else if ((numOcc[0])===3) score = 17;
        else score =20;
    return fiveCard,score; //dato importantissimo fivecard + score (non ordinato, puro)
}

//sum calcola la somma dei punti della mano
var sum = (array)=> {
    var tot = 0;
    for(i=0;i<array.length;i++) {
        tot += parseInt(array[i]);
    }
return tot;
};
//funzione di traduzione tra il punteggio numerico e la corrispondente descrizione
var trad = (num)=>{
    switch(num){
        case 14: return "CARTA ALTA ALL'ASSO";break;
        case 15: return "COPPIA";break;
        case 16: return "DOPPIA COPPIA";break;
        case 17: return "TRIS";break;
        case 18: return "SCALA";break;
        case 19: return "COLORE";break;
        case 20: return "FULL";break;
        case 21: return "POKER";break;
        case 22: return "SCALA A COLORE";break;
        case 23: return "SCALA REALE!!";break;
        default: return "CARTA ALTA";break;
    }
}
//calcola se mano è fatta da tutti valori consecutivi
var consec = (array) =>{
    var n_consec = 1;
    //ordina array in ordine decrescente
    array.sort(function(a, b){return b - a});
  for (i=0;i<array.length;i++){
    if((array[i] - array[i+1])==1) n_consec++;
  }
  if (n_consec == 5) return true;
  else return array;
}

//aggiunge all'ultima posizione lo score del mazzo
var merging = (fiveC,points) =>{ 
fiveC.push(points);
return fiveC;
};



module.exports = {createDeck,createHand,sum,trad,consec,merging,checkNoflush,checkFlush,occurrCalc};

