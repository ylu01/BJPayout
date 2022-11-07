const rates = {
  Straight: 35,
  Split: 17,
  Street: 11,
  "Double Street": 5,
  Corner: 8,
};
const maxMultiple = 500,
  twoFifty = 2.5;
const sixToFive = 1.2;
const threeToTwo = 1.5;
let questionText = {};
let current = "sixToFive";
$("#selectSixToFive").prop("disabled", true);
questionText = make65Question();
document.getElementById("answerButton").onclick = function () {
  reveal();
};
document.getElementById("questionButton").onclick = function () {
  if (current === "sixToFive") {
    questionText = make65Question();
  } else if (current === "threeToTwo") {
    questionText = make32Question();
  }
};

document.getElementById("selectSixToFive").onclick = function () {
  $("#selectThreeToTwo").prop("disabled", false);
  $("#selectSixToFive").prop("disabled", true);
  questionText = make65Question();
  current = "sixToFive";
};

document.getElementById("selectThreeToTwo").onclick = function () {
  $("#selectThreeToTwo").prop("disabled", true);
  $("#selectSixToFive").prop("disabled", false);
  questionText = make32Question();
  current = "threeToTwo";
};
//function to generate a new 6-5 wager
function make65Question() {
  let wager = 0;
  let text = "";
  let answer = 0;
  let ratesText = " In 6 to 5";
  let br;
  hide();
  document.getElementById("answer").innerHTML = "";
  wager = twoFifty * getRandomInt(maxMultiple);
  text = "Wager: " + wager + "<br>" + ratesText;

  //console.log(`${key}: ${value}`);
  answer = get65Answer(wager);
  document.getElementById("question").innerHTML = text;
  document.getElementById("answer").innerHTML = "Answer: " + answer;
  current = "threeToTwo";
  return {
    question: text,
    answer: answer,
  };
}

//function to generate a 3-2 wager
function make32Question() {
  let wager = 0;
  let text = "";
  let answer = 0;
  let ratesText = " In 3 to 2";
  let br;
  hide();
  document.getElementById("answer").innerHTML = "";
  wager = twoFifty * getRandomInt(maxMultiple);
  text = "Wager: " + wager + "<br>" + ratesText;

  //console.log(`${key}: ${value}`);
  answer = get32Answer(wager);
  document.getElementById("question").innerHTML = text;
  document.getElementById("answer").innerHTML = "Answer: " + answer;
  return {
    question: text,
    answer: answer,
  };
}
function get65Answer(wager) {
  let fifty = 0;
  let final = 0;
  if (wager.toString().includes(".")) {
    //extract the 2.50 or 7.5
    fifty = parseFloat(
      wager
        .toString()
        .substring(wager.toString().indexOf(".") - 1, wager.toString().length)
    );
    //if fifty is 7.50 or 2.50
    if (fifty / twoFifty === 1) {
      fifty = 3;
    } else if (fifty / twoFifty >= 1) {
      fifty = 9;
    } else {
      fifty = 0;
    }
  }
  if (fifty > 0) {
    final =
      parseInt(
        wager.toString().substring(0, wager.toString().indexOf(".") - 1) + "0"
      ) *
        sixToFive +
      fifty;
  } else {
    final = parseInt(wager.toString()) * sixToFive;
  }
  current = "sixToFive";
  return final;
}
function get32Answer(wager) {
  let fifty = 0;
  let final = 0;
  if (wager.toString().includes(".")) {
    //extract the 2.50 or 7.5
    fifty = parseFloat(
      wager
        .toString()
        .substring(wager.toString().indexOf(".") - 1, wager.toString().length)
    );
    //if fifty is 7.50 or 2.50
    //in 3-2 2.5 is rounded to 4
    if (fifty / twoFifty === 1) {
      fifty = 4;
      //7.5
    } else if (fifty / twoFifty >= 1) {
      fifty = 11.5;
    } else {
      fifty = 0;
    }
  }
  if (fifty > 0) {
    final =
      parseInt(
        wager.toString().substring(0, wager.toString().indexOf(".") - 1) + "0"
      ) *
        threeToTwo +
      fifty;
  } else {
    final = parseInt(wager.toString()) * threeToTwo;
  }
  current = "threeToTwo";
  return final;
}
function hide() {
  document.getElementById("answer").style.visibility = "hidden";
}
function reveal() {
  document.getElementById("answer").style.visibility = "visible";
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
