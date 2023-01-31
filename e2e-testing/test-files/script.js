(() => {
  let hasFlippedCard = false;
  let firstCard, secondCard;
  let lockBoard = false;
  const gameCards = document.querySelectorAll(".game-card");

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let t = array[i];
      array[i] = array[j];
      array[j] = t;
    }

    return array;
  }


  function createCardArray() {
    const arrayOfCards = [];

    for (let i = 1; i < 9; ++i) {
     arrayOfCards.push(i);
    }

    let cardsPairArray = arrayOfCards.concat(arrayOfCards);

    const shuffledArray = shuffle(cardsPairArray);
    return shuffledArray;
  };


  function creatGameBoard(shuffledArray) {
    const gameBoard = document.querySelector(".memory-game");

    for (let i = 0; i < shuffledArray.length; ++i) {
      const gameCard = document.createElement("div");
      gameCard.classList.add("game-card");
      gameCard.dataset.cardValue = shuffledArray[i];
      const frontFace = document.createElement("div");
      frontFace.textContent = shuffledArray[i];
      frontFace.classList.add("front-face");
      gameCard.appendChild(frontFace);

      const backFace = document.createElement("div");
      backFace.classList.add("back-face");
      gameCard.appendChild(backFace);
      gameBoard.append(gameCard);

      gameCard.addEventListener("click", flipCard);
    };

    return gameBoard;
  }


  function startGame() {
    let array = createCardArray();
    let gameBoard = creatGameBoard(array);
  }

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;

    if (document.querySelectorAll(".game-card").length === document.querySelectorAll(".game-card.flip").length) {
      replayGame();
    }

    checkForMatch();
  }


  function checkForMatch() {
    /* let pairsFound; */
    let isMatch = firstCard.dataset.cardValue === secondCard.dataset.cardValue;

    isMatch ? disableCards(): unflipCards();
  }

  function replayGame() {
    const replayBtn = document.createElement("button");
    replayBtn.textContent = "Сыграть ещё раз";
    replayBtn.classList.add("replay-btn");
    //add a button for restarting the game
    document.querySelector(".memory-game").append(replayBtn);
    //add event listener to it, when clicked reload the window
    replayBtn.addEventListener("click", function() {
      window.location.reload();
    });
  }


  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
  }


  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }


  window.startGame = startGame;

})();


