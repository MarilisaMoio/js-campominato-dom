//Aggiungere la generazione di 16 valori randomici unici, evento al click delle bombe, creazione del counter dei punti 

//raccolta elementi del dom
const btn = document.querySelector("#start-btn");
const squareContainer = document.querySelector(".container");
const bombImg = '<img src="img/Minesweeper_1992.webp" alt="bomb">';
const counter = document.querySelector("#counter");

btn.addEventListener("click", function(){
    //reset per iniziare una nuova griglia
    counter.innerHTML = "0";
    squareContainer.innerHTML = "";
    squareContainer.classList.remove("event-none");

    //recupero scelte utente e conversione in numero
    let choice = document.querySelector("#difficulty").value;
    
    let numSquares;
    if (choice === "easy"){
        numSquares = 100;
    } else if (choice === "medium") {
        numSquares = 81;
    } else if (choice === "hard") {
        numSquares = 49;
    }

    //bombe
    let bombsPosition = []
    while(bombsPosition.length < 16){
        let newBomb = randomNumber(numSquares);
        if (!bombsPosition.includes(newBomb)){
            bombsPosition.push(newBomb);
        }
    }

    //contatore
    let points = 0;

    //creazione div
    for (let i = 1; i <= numSquares; i++){
        const newSquare = createDiv(i, choice);
        squareContainer.append(newSquare);
    }

    //aggiunta dell'onclick fuori dalla funzione
    // TODO refactoring
    const allSquares = document.querySelectorAll(".square");

    for (let i = 0; i < allSquares.length; i++){
        allSquares[i].addEventListener("click", function isBombOrNot(){
            const clickedNumber = parseInt(this.children[0].innerHTML);
            //condizioni per decretare se si stanno accumulando punti o no ed eventuali eventi correlati     
            if (bombsPosition.includes(clickedNumber)){
                this.classList.add("exploded");
                this.innerHTML = bombImg;
                squareContainer.classList.add("event-none");
                squareContainer.innerHTML += '<div class="loss">hai perso</div>';
            } else {
                this.classList.add("activated");
                counter.innerHTML = ++points;
                this.removeEventListener("click", isBombOrNot);
            }

            //messaggio di vittoria finale
            if (points === (numSquares - 16)){
                squareContainer.innerHTML += '<div class="win">hai vinto!</div>';
            }
        })
    }
})


// FUNCTIONS
//funzione per generare un div contenente un numero e con una dimensione basata sulla scelta dell'utente
//argomenti:
    //number: int -> per assegnare il numero all'interno del div
    //choice: str -> per assegnare la classe
// return: elemento del DOM
function createDiv(number, choice){
    const newDiv = document.createElement("div");

    newDiv.classList.add("square");
    newDiv.innerHTML = `<span>${number}</span>`;
    newDiv.classList.add(`${choice}`)

    return newDiv
}

//funzione che genera un numero intero da 1 a un numero massimo passato in essa
//max: int
//return: int
function randomNumber(max){
    return Math.floor(Math.random() * (max) +1);
}
