const words = [
  "tree",
  "president",
  "apple",
  "orange",
  "feather",
  "happiness",
  "lawyer",
  "elephant",
  "fabolous",
  "gentleman",
  "syllable",
  "remainder",
  "airport",
  "modest",
  "marvelous",
  "amazing",
  "tangerine",
  "blossom",
  "parking",
  "headline",
  "portion",
  "formulate",
  "electronics",
  "spectrum",
  "potential",
  "acceptable",
  "midnight",
  "information",
  "garlic",
  "factory",
  "feeling",
  "dealer",
  "patent",
  "physical",
  "requirement",
  "represent",
  "battlefield",
  "passive",
  "relation",
  "admire",
  "recommendation",
  "revive",
  "restrain",
  "appeal",
  "modernize",
  "personal",
  "tradition",
  "pumpkin",
  "distinct",
  "poetry",
  "emergency",
  "transaction",
  "assumption",
  "justify",
  "association",
  "retirement",
  "material",
  "withdraw",
  "picture",
  "cancel",
  "expose",
  "disappear",
  "degree",
  "aluminium",
  "elephant",
  "shallow",
  "diagram",
  "constitutional",
  "banana",
  "fashionable",
  "nationalism",
  "particle",
  "exception",
  "advantage",
  "stride",
  "exemption",
  "production",
  "flavor",
  "uniform",
  "copper",
  "premature",
  "teacher",
  "profile",
  "introduce",
  "observation",
  "sustain",
  "research",
  "ignite",
  "multiply",
  "application",
  "fashion",
  "cheese",
  "correspond",
  "praise",
  "cousin",
  "workshop",
  "friend",
  "promotion",
  "alcohol",
  "market",
  "formula",
  "plagiarize",
  "spirit",
  "protect",
  "deliver",
  "understanding",
  "cotton",
  "mislead",
  "master",
  "repeat",
  "abstract",
  "summer",
  "differ",
  "exhibition",
  "skilled",
  "momentum",
  "unlawful",
  "inspiration",
  "ignorant",
  "painter",
  "borrow",
  "presentation",
  "discreet",
  "reckless",
  "meeting",
  "eyebrow",
  "freshman",
  "sacrifice",
  "revise",
  "replace",
  "expectation",
  "realize",
  "threaten",
  "timber",
  "superior",
  "revenge",
  "concert",
  "simplicity",
  "neighborhood",
  "behavior",
  "production",
  "psychology",
  "magnitude",
  "formation",
  "remark",
  "stubborn",
  "workshop",
  "flower",
  "hospital",
  "energy",
  "observation",
  "theater",
  "mislead",
  "routine",
  "bother",
  "dignity",
  "species",
  "damage",
  "merchant",
  "revival",
  "favour",
  "systematic",
  "consideration",
  "failure",
  "latest",
  "frighten",
  "professor",
  "talkative",
  "category",
  "potential",
  "constituency",
  "aquarium",
  "admission",
  "suffering",
  "chicken",
  "abnormal",
  "gesture",
  "overlook",
  "initial",
  "exploration",
  "suntan",
  "excess",
  "threshold",
  "friendly",
  "gravel",
  "willpower",
  "sphere",
  "diplomatic",
  "assumption",
  "stadium",
  "publication",
  "symbol",
  "bottle",
  "philosophy",
  "economy",
  "paragraph",
  "convenience",
  "concert",
  "degree",
  "tumble",
  "suffer",
  "accountant",
  "twilight",
  "revolution",
  "spider",
  "protection",
  "school",
]; //words from    https://randomwordgenerator.com/

// AUDIO
const audioInterfaceButton = new Audio("./sounds/interface select.wav");
const audioKeyboard = new Audio("./sounds/keyboard press2.wav");
const audioGameWin = new Audio("./sounds/game won.wav");
const audioGameLose = new Audio("./sounds/game lost.wav");

let gameLimit = 10;
let letterCounter = 0; // counts how many letters were guessed
let triesLeft = gameLimit;
prevCounterScore = 0;

// picks random number limited by arr size
function pickWord() {
  random = Math.floor(Math.random() * words.length);
  word = words[random];
  //words that have more that 9 letters are taken out for now
  if (word.length > 9) {
    words.splice(words.indexOf(word), 1);
    console.log("word was taken out, char limit 9");
    pickWord();
  }
}
pickWord();

// creates field for every letter of chosen word
const keyboard = document.querySelector(".keyboard");
function createWord() {
  board = document.querySelector(".board");
  wordPlaceholder = document.createElement("div");
  board.insertBefore(wordPlaceholder, keyboard);
  wordPlaceholder.classList.add("word-placeholder");

  for (let i = 0; i < word.length; i++) {
    let newDiv = document.createElement("div");
    wordPlaceholder.appendChild(newDiv);
    newDiv.classList.add("letter-placeholder");
  }
}
createWord();

// RESTART
function restartGame() {
  words.splice(words.indexOf(word), 1); // takes out last played word
  wordPlaceholder.remove();
  pickWord();
  createWord();
  triesLeft = gameLimit;
  text.innerHTML = `${triesLeft} tries left`;
  letterCounter = 0;
  prevCounterScore = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].childNodes.length; j++) {
      lines[i].childNodes[j].classList.remove(
        "used-letter",
      );
    }
  }
  updateDifficulty();
}

// create keyboard dynamically
const keyboardLetters = "qwertyuiopasdfghjklzxcvbnm";
const lines = document.querySelectorAll(".line");

for (let i = 0; i < keyboardLetters.length; i++) {
  let newKeyButton = document.createElement("div");
  let newkeyLetter = document.createTextNode(`${keyboardLetters[i]}`);
  newKeyButton.append(newkeyLetter);
  if (i < 10) {
    lines[0].appendChild(newKeyButton);
  } else if (i < 19) {
    lines[1].appendChild(newKeyButton);
  } else {
    lines[2].appendChild(newKeyButton);
  }
  newKeyButton.classList.add("key-button");

  // when keyboard button is clicked
  newKeyButton.addEventListener("click", function keyboardClick() {
    var letterDivs = wordPlaceholder.getElementsByTagName("div");
    audioKeyboard.play();
    // also prevents clicking while game message is being shown
    if (
      newKeyButton.className != "key-button used-letter" &&
      word.length != letterCounter &&
      triesLeft > 0
    ) {
      for (let i = 0; i < word.length; i++) {
        if (
          newKeyButton.textContent == word[i] &&
          letterDivs[i].textContent === ""
        ) {
          // if field is empty and selected keyboard letter matches
          let newLetter = document.createTextNode(newKeyButton.textContent); // one of the letters in the given word
          letterDivs[i].appendChild(newLetter);
          letterCounter++;
        }
      }
      if (letterCounter === word.length) {
        audioGameWin.play();
        text.innerHTML = "Congratulations, you won !";
        setTimeout(() => {
          restartGame();
        }, 2000);
      }
      if (letterCounter === prevCounterScore) {
        triesLeft--;
        text.innerHTML = `${triesLeft} tries left`;
      }
      prevCounterScore = letterCounter;
      if (triesLeft === 0) {
        audioGameLose.play();
        text.innerHTML = `You've lost ! Word: ${word}`;
        setTimeout(() => {
          restartGame();
        }, 2500);
      }
      this.classList.add("used-letter");
    }
  });
}

// MENU buttons
const menu = document.querySelector(".menu").children;
const restart = document.querySelector(".restart");
const easy = document.querySelector(".easy");
const medium = document.querySelector(".medium");
const hard = document.querySelector(".hard");

const text = document.querySelector(".text");
text.innerHTML = `${gameLimit} tries left`;

easy.addEventListener("click", () => {
  gameLimit = 10;
});
medium.addEventListener("click", () => {
  gameLimit = 8;
});
hard.addEventListener("click", () => {
  gameLimit = 6;
});

for (let i = 0; i < menu.length; i++) {
  menu[i].addEventListener("click", () => {
    setTimeout(() => {
          audioInterfaceButton.play();
        }, 100);
    
    restartGame();
  });
}

// active state color for difficulty buttons
let prevDifficulty = 1;
function updateDifficulty() {
  menu[prevDifficulty].classList.remove("active-difficulty");
  switch (gameLimit) {
    case 10:
      prevDifficulty = 1;
      break;
    case 8:
      prevDifficulty = 2;
      break;
    case 6:
      prevDifficulty = 3;
      break;
  }
  menu[prevDifficulty].classList.add("active-difficulty");
}
updateDifficulty();
