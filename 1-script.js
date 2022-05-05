window.onload = function () {
  // Получаем контекст рисования
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  // Получаем ширину и высоту элемента canvas
  let width = canvas.width;
  let height = canvas.height;

  let drawDecor = function () {
    // Рисуем рамку
    ctx.strokeStyle = "LightGray";
    ctx.strokeRect(0, 0, width, height);

    ctx.strokeStyle = "Black";
    ctx.lineWidth = 3; // земля
    ctx.beginPath();
    ctx.moveTo(20, 241);
    ctx.lineTo(200, 241);
    ctx.stroke();

    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(60, 30); // столб
    ctx.lineTo(60, 240);

    ctx.moveTo(50, 40); // перекладина
    ctx.lineTo(160, 40);

    ctx.moveTo(50, 70); // диагональ
    ctx.lineTo(90, 30);

    ctx.moveTo(30, 240); // левая ножка
    ctx.lineTo(60, 220);

    ctx.moveTo(60, 220); // правая ножка
    ctx.lineTo(90, 240);
    ctx.stroke();

    ctx.strokeStyle = "Brown"; // веревка
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(120, 40);
    ctx.lineTo(120, 80);
    ctx.stroke();
  };

  let drawMan = function () {
    let drawHead = function () {
      ctx.strokeStyle = "SlateBlue";
      ctx.lineWidth = 3;
      ctx.beginPath(); // голова
      ctx.arc(120, 95, 15, 0, Math.PI * 2, false);
      ctx.stroke();
    };

    let drawBody = function () {
      ctx.strokeStyle = "SlateBlue";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(120, 110); // тело
      ctx.lineTo(120, 160);
      ctx.stroke();
    };

    let drawRHend = function () {
      ctx.strokeStyle = "SlateBlue";
      ctx.lineWidth = 3;
      ctx.moveTo(100, 160); // рука 1
      ctx.lineTo(120, 123);
      ctx.stroke();
    };

    let drawLHend = function () {
      ctx.strokeStyle = "SlateBlue";
      ctx.lineWidth = 3;
      ctx.moveTo(120, 123); // рука 2
      ctx.lineTo(140, 160);
      ctx.stroke();
    };

    let drawRLeg = function () {
      ctx.strokeStyle = "SlateBlue";
      ctx.lineWidth = 3;
      ctx.moveTo(120, 160); // нога 1
      ctx.lineTo(105, 200);
      ctx.stroke();
    };

    let drawLLeg = function () {
      ctx.strokeStyle = "SlateBlue";
      ctx.lineWidth = 3;
      ctx.moveTo(120, 160); // нога 2
      ctx.lineTo(135, 200);
      ctx.stroke();
    };

    let drawArray = [
      drawHead,
      drawBody,
      drawLHend,
      drawRHend,
      drawLLeg,
      drawRLeg,
    ];
    for (let i = 0; i < stopCounter; i++) {
      drawArray[i]();
    }
  };

  let writeEnterLetter = function (i) {
    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = "DarkRed";
    ctx.textAlign = "left";
    if (i == "letter") {
      ctx.fillText("Введите букву или нажмите Esc для выхода", 270, 100);
      ctx.fillText("Осталось попыток: " + (6 - stopCounter), 270, 130);
    } else if (i == "esc") {
      ctx.fillText("Выход из игры", 270, 100);
    } else if (i == "win") {
      ctx.fillText("Верно! Было загадано слово:", 270, 100);
    } else if (i == "gameover") {
      ctx.fillText("Вы проиграли", 270, 100);
    }
  };

  let pickWord = function () {
    let words = [
      "lesson",
      "studying",
      "textbook",
      "book",
      "education",
      "notebook",
      "class",
      "classmates",
      "desk",
      "teacher",
      "students",
      "lunchbox",
      "pupil",
      "library",
    ];

    return words[Math.floor(Math.random() * words.length)];
  };

  let setupAnswerArray = function (word) {
    let answerArray = [];
    for (let i = 0; i < word.length; i++) {
      answerArray[i] = "-";
    }
    return answerArray;
  };

  let updateGameState = function (guess, word, answerArray) {
    let checkRes = 0;
    for (var j = 0; j < word.length; j++) {
      if (word[j] === guess && answerArray[j] == "-") {
        answerArray[j] = guess;
        checkRes++;
        remainingLetters--;
      }
    }
    if (guess && checkRes === 0) {
      stopCounter++;
    }
  };

  // word: загаданное слово
  let word = pickWord();

  // answerArray: итоговый массив
  let answerArray = setupAnswerArray(word);

  // remainingLetters: сколько букв осталось угадать
  let remainingLetters = word.length;

  let stopCounter = 0;

  let drawWords = function (answerArray) {
    let lettersArr = answerArray;
    ctx.font = "45px Comic Sans MS";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    for (let i = 0, j = 287; i < lettersArr.length; i++, j += 45) {
      ctx.fillText(lettersArr[i], j, 230);
    }

    ctx.strokeStyle = "Grey";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0, j = 270; i < lettersArr.length; i++, j += 45) {
      ctx.moveTo(j, 241);
      ctx.lineTo(j + 35, 241);
    }
    ctx.stroke();
  };

  let letters = {
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "h",
    90: "z",
    27: "Esc",
  };

  let guess = "";

  let gameStart = function (answerArray) {
    ctx.clearRect(0, 0, width, height);
    drawDecor();
    updateGameState(guess, word, answerArray);
    writeEnterLetter("letter");
    drawMan();
    drawWords(answerArray);
  };

  gameStart(answerArray);

  $("body").keydown(function (event) {
    guess = letters[event.keyCode];
    if (guess !== "Esc") {
      ctx.clearRect(0, 0, width, height);
      drawDecor();
      updateGameState(guess, word, answerArray);
      if (remainingLetters <= 0) {
        writeEnterLetter("win");
      } else if (stopCounter >= 6) {
        ctx.clearRect(0, 0, width, height);
        drawDecor();
        writeEnterLetter("gameover");
        drawMan();
      } else {
        writeEnterLetter("letter");
      }
      drawMan();
      drawWords(answerArray);
    } else if (guess == "Esc") {
      ctx.clearRect(0, 0, width, height);
      drawDecor();
      writeEnterLetter("esc");
      drawMan();
    }
  });
};
