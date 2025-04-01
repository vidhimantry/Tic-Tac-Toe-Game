let body = document.querySelector("body");
let boxes = document.querySelectorAll(".box");
let btn = document.querySelector(".buttons");
let msg = document.querySelector(".message");
let themeBtn = document.querySelector("#themeBtn");

let turnX = true;
let theme = "pink"; 
let count = 0;

const winningWays = [[0, 1, 2], [0, 3, 6], [0, 4, 8], 
[1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]];

changeTheme = () => {
  if (theme == "blue") {
    body.classList.add("themeBlue");
    body.classList.remove("themePink");
    theme = "green";
  } else if (theme == "green") {
    body.classList.add("themeGreen");
    body.classList.remove("themeBlue");
    theme = "pink";
  }
  else if (theme == "pink") {
    body.classList.add("themePink");
    body.classList.remove("themeGreen");
    theme = "blue";
  }
};
themeBtn.addEventListener("click", changeTheme);

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText = "X";
      turnX = false;
    } else {
      box.innerText = "O";
      turnX = true;
    }
    box.disabled = true;
    count++;

    let winner = checkWinner();
    if (count === 9 && !winner){
      msg.innerText = `It's a draw! Try again!`;
      endGame();
    }
    else if(winner){
      msg.innerText = `Congratulations, Player ${winner} Wins!`;
      endGame();
    }
    });
});

const checkWinner = () => {
  for (let pattern of winningWays) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        return pos1;
      }
    }
  }
  return 0;
};

endGame = () => {
  msg.classList.remove("hide");
  disableBoxes();
  btn.innerText = "New Game"
};

const resetGame = () => {
  turnX = true;
  count = 0;
  enableBoxes();
  msg.classList.add("hide");
  btn.innerText = "Reset Game"
};
btn.addEventListener("click", resetGame);

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// extra additions that can be done:
// add player name
// undo a move
// users choose their emojis
// change color of winning cells