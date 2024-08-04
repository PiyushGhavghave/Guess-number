//-------------- Guess Number game --------------

//Global scope
let randomNum;

const form = document.querySelector("form")
const guessField = document.querySelector("#guessField")
const submit = document.querySelector('#sbmt')
const prevGuess = document.querySelector(".guesses")
const remaining = document.querySelector(".remaining")
const lowOrHi = document.querySelector(".lowOrHi")
const resultParas = document.querySelector(".resultParas")

let start = true;
let remain = 10;


randomNum = parseInt(Math.random() * 100 +1);
if(start){
  form.addEventListener("submit", function(e){
    e.preventDefault();
    const guess = parseInt(guessField.value)
    console.log(randomNum)
    console.log(guess)

    validate(guess);
  })
}


//validate the input
function validate(guess){
  if(isNaN(guess)){
    display("Please enter valid Guess");
    guessField.value = '';
  }
  else if(guess < 1 || guess > 100){
    display("Please enter number between 1 and 100");
    guessField.value = '';
  }
  else{
    if(remain === 0){
      display(`GAME OVER! Random number is ${randomNum}`)
      endGame();
    }
    else{
      update(guess);
      checkGuess(guess); 
    }
  }
}
//check if guess is equal, small or large
function checkGuess(guess){
  if(guess === randomNum){
    display(`You Won!🎉🤩`);
    endGame();
  }
  else if(guess < randomNum){
    display(`Guess higher number`);
  }
  else{
    display(`Guess lower number`);
  }
}
//display message at lowOrHigh
function display(message){
  lowOrHi.innerHTML = `<span>${message}</span>`;

}
//update 
function update(guess){
  //clear input
  guessField.value = '';
  //display previous guess
  prevGuess.innerHTML += `${guess} `
  //update remaining guess
  remain --;
  remaining.innerHTML = `${remain}`
}

const reStart = document.createElement("button")

//End game
function endGame(){
  guessField.value = '';
  guessField.setAttribute("disabled",'');

  reStart.className = "reStart-button";
  reStart.innerHTML = "Start new game!";
  submit.replaceWith(reStart)

  start = false;
  startGame();
}

//start game
function startGame(){
  const newGameBtn = document.querySelector(".reStart-button")
  newGameBtn.addEventListener("click", function(e){
    randomNum = parseInt(Math.random() * 100 +1)
    
    guessField.value = '';
    guessField.removeAttribute("disabled")

    newGameBtn.replaceWith(submit);

    prevGuess.innerHTML = ''
    remain = 10;
    remaining.innerHTML = `${remain}`
    lowOrHi.innerHTML = '';

    start = true;

  })
}
