//Aggiungere la generazione di 16 valori randomici unici, evento al click delle bombe, creazione del counter dei punti 

const btn = document.querySelector("#start-btn");
const squareContainer = document.querySelector(".container");
const bombImg = '<img src="img/Minesweeper_1992.webp" alt="bomb">'

btn.addEventListener("click", function(){
    //reset per iniziare una nuova griglia
    squareContainer.innerHTML = ""

    //numero di quadaratini
    let numSquares = 100;

    //bombe
    let bombsPosition = []
    while(bombsPosition.length < 16){
        let newBomb = randomNumber(numSquares)
        if (!bombsPosition.includes(newBomb)){
            bombsPosition.push(newBomb)
        }
    }
    console.log(bombsPosition)

    //contatore
    let points = 0;

    //creazione div
    for (let i = 1; i <= numSquares; i++){
        const newSquare = createDiv(i);
        squareContainer.append(newSquare);
    }


    //aggiunta dell'onclick fuori dalla funzione
    const allSquares = document.querySelectorAll(".square");

    for (let i = 0; i < allSquares.length; i++){
        allSquares[i].addEventListener("click", function isBombOrNot(){
            const clickedNumber = parseInt(this.children[0].innerHTML);
            //condizioni per decretare se si stanno accumulando punti o no      
            if (bombsPosition.includes(clickedNumber)){
                this.classList.add("exploded");
                this.innerHTML = bombImg
            } else {
                this.classList.add("activated");
                points++;
                this.removeEventListener("click", isBombOrNot);
            }
            console.log(bombsPosition.includes(clickedNumber), clickedNumber, points)
        })
    }
})


// FUNCTIONS
//funzione per generare un div contenente un numero 
//argomenti:
    //number: int -> per assegnare il numero all'interno del div
// return: elemento del DOM
function createDiv(number){
    const newDiv = document.createElement("div");

    newDiv.classList.add("square");
    newDiv.innerHTML = `<span>${number}</span>`;

    return newDiv
}

//funzione che genera un numero intero da 1 a un numero massimo passato in essa
//max: int
//return: int
function randomNumber(max){
    return Math.floor(Math.random() * (max) +1)
}