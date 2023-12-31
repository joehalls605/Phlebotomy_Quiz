// script.js

function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function shufflePhlebotomyLines(array){
    for(let p = array.length -1; p > 0; p--){
      const x = Math.floor(Math.random() * (p + 1));
      [array[p], array[x]] = [array[x], array[p]];
    }
  
  }
  
    //using a switch statement
    function shuffleEmoji(array){
      const randomNumber = Math.floor(Math.random() * 3); 
    
      switch(randomNumber){
        case 0:
        emojiToShow = phlebotomyEmoji[0];
        break;
        case 1:
        emojiToShow = phlebotomyEmoji[1];
        break;
        case 2:
        emojiToShow = phlebotomyEmoji[2];
        break;
      }
      console.log(emojiToShow);
      return emojiToShow;
    }
  
  
  const questions = [
    {
      question: "What does CBC stand for in phlebotomy?",
      correctAnswer: "Complete Blood Count",
      hint: "Hint: This test involves a comprehensive analysis of different elements in the bloodstream, exploring the 'complete balance.'"
    },
    {
      question: "Which vein is commonly used for venipuncture?",
      correctAnswer: "Median cubital vein",
      hint: "Hint: Seek a central vein in the arm, often the preferred choice for blood collection due to its accessibility and stability."
    },
    {
      question: "What is the purpose of using a tourniquet during venipuncture?",
      correctAnswer: "To make veins more visible and easier to access",
      hint: "Hint: Enhances the process by improving visibility and simplifying entry, typically involving a temporary band."
    },
    {
      question: "Which anticoagulant is commonly used in blood collection tubes for coagulation studies?",
      correctAnswer: "Sodium citrate",
      hint: "Hint: Frequently employed in studies related to blood clotting, this substance starts with 'Sodium c...'"
    },
    {
      question: "What is the purpose of the Order of Draw in venipuncture?",
      correctAnswer: "Prevent cross-contamination of additives between tubes",
      hint: "Hint: Follow a specific sequence during blood collection to maintain the purity of substances, avoiding 'mixing' issues."
    },
    {
      question: "Which color-coded tube is commonly used for serum tests in phlebotomy?",
      correctAnswer: "Red",
      hint: "Hint: Look for a tube with a distinct color."
    },
    {
      question: "What is the term for the liquid portion of blood that remains after clotting?",
      correctAnswer: "Serum",
      hint: "Hint: After the blood transforms, the remaining liquid is called the 'golden fluid,' signifying its valuable properties."
    },
    {
      question: "Why is it important to label blood collection tubes accurately?",
      correctAnswer: "To ensure proper patient identification and sample integrity",
      hint: "Hint: Place significant emphasis on precision when marking tubes to uphold patient identity and safeguard the sample's 'soundness.'"
    },
    {
      question: "What is the purpose of the basilic vein in venipuncture?",
      correctAnswer: "It is a common site for blood collection in the antecubital area",
      hint: "Hint: Considered a prime location for blood retrieval, this vein is often associated with the 'inner' part of the elbow region."
    },
    {
      question: "What is the recommended angle for needle insertion during routine venipuncture?",
      correctAnswer: "15 to 30 degrees",
      hint: "Hint: Follow a moderate angle when introducing the needle into the skin during a standard blood collection procedure, aiming between 'low' and 'high.'"
    },
    // Add more questions with improved hints as needed
  ];
  
  const phlebotomyLines = [
    {
      line: "Welcome back, phlebotomy champion! let's see your needle-sharp knowledge."
    },
    {
      line: "Thrilled to have you back for another phlebotomy quiz!"
    },
    {
      line: "Back in action! Shine bright like the perfect blood draw"
    }
  ];
  
  
  const phlebotomyEmoji = [
    {
      line: "🩺"
    },
    {
      line: "👩🏼‍⚕️"
    },
    {
      line: "🧬"
    }
  ];
  
  
  shuffleQuestions(questions);
  shufflePhlebotomyLines(phlebotomyLines);
  shuffleEmoji(phlebotomyEmoji);
  
  let currentQuestionIndex = 0;
  let score = 0;
  let currentPhlebotomyLinesIndex = 0;
  
  const maxQuestionLimit = 9; // Set your desired maximum question limit
  showPhlebotomyLines();
  showEmoji()
  
  function loadQuestion(callback) {

    if (currentQuestionIndex < maxQuestionLimit) {
      const currentQuestion = questions[currentQuestionIndex];
      const questionElement = document.getElementById("question");
      const answerButtonsContainer = document.getElementById("answerButtons");
  
      // Display the question and hide the hint
      if (currentQuestion) {
        questionElement.textContent = currentQuestion.question;
  
        answerButtonsContainer.innerHTML = "";
  
        const correctAnswer = currentQuestion.correctAnswer;
        const incorrectAnswers = getIncorrectAnswers(currentQuestion);
  
        // Randomly choose the position for the correct answer button
        const correctAnswerIndex = Math.floor(Math.random() * 3);
  
        for (let i = 0; i < 3; i++) {
          const button = document.createElement("button");
          button.classList.add("answer-button"); // Add a class to the button
  
          if (i === correctAnswerIndex) {
            button.textContent = correctAnswer;
            button.onclick = function () {
              checkAnswer(correctAnswer);
            };
          } else {
            button.textContent = incorrectAnswers.pop(); // Get an incorrect answer
            button.onclick = function () {
              checkAnswer(button.textContent);
            };
          }
  
          answerButtonsContainer.appendChild(button);
        }
  
        hideHint();

        setTimeout(function(){
          if(typeof callback === 'function'){
            callback();
          }
        })

      } else {
        questionElement.textContent = "No more questions";
        hideHint();
        hideQuestion();
      }
    } else {
      // If the maximum question limit is reached, end the game
      gameOver();
      resetQuiz();
    }
  }
  
  //test
  console.log()

  document.getElementById("next-btn").addEventListener("click", function(){
    try{
        nextQuestion();
    }
    catch (error){
        console.error("A next quesiton error occurred", error);
    }
});

document.getElementById("hint-btn").addEventListener("click", function(){
  try{
      showHint();
  }
  catch (error){
      console.error("A hint display error occurred", error);
  }
});

  function getIncorrectAnswers(currentQuestion) {
    const allAnswers = [...questions.map((q) => q.correctAnswer)];
    const correctAnswerIndex = allAnswers.indexOf(currentQuestion.correctAnswer);
    allAnswers.splice(correctAnswerIndex, 1); // Remove the correct answer
    shuffleArray(allAnswers); // Shuffle the array
    return allAnswers.slice(0, 2); // Get two incorrect answers
  }
  
  function hideQuestion() {
    const quizContainerElement = document.querySelector(".quiz-container");
    quizContainerElement.style.display = "none";
  }
  
  function gameOver() {
    hideQuestion();
    const thankYouMessage = "Thank you for playing! <br><br>";
    const finalScore = `Your final score is ${score} 🩸`;
    const finalScoreElement = document.getElementById("game-over");
    finalScoreElement.innerHTML = thankYouMessage + finalScore;
  
    // Show the game-over-container
    const gameOverContainer = document.getElementById("game-over-container");
    gameOverContainer.style.display = "flex";
  
    // Show the reset button
    const resetButton = document.getElementById("reset-btn");
    resetButton.style.display = "block";
  }
  
  function showPhlebotomyLines(){
    const currentPhlebotomyLine = phlebotomyLines[currentPhlebotomyLinesIndex];
    const phlebotomyElement = document.getElementById("phlebotomyLines");
    phlebotomyElement.textContent = currentPhlebotomyLine.line;
  }
  
  function showEmoji(){
    const currentEmoji = shuffleEmoji(phlebotomyEmoji);
    const emojiElement = document.getElementById("emoji-element");
    emojiElement.textContent = currentEmoji.line;
  
  }
  
  
  function showHint() {
    const currentQuestion = questions[currentQuestionIndex];
    const hintElement = document.getElementById("hint-text");
    hintElement.textContent = currentQuestion.hint;
  }
  
  function hideHint() {
    const hintElement = document.getElementById("hint-text");
    hintElement.textContent = "";
  }
  
  function checkAnswer(userAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    const headerInfo = document.getElementById("header-info");
    const answerButtons = document.getElementsByClassName("answer-button");
  
    if (userAnswer === currentQuestion.correctAnswer.trim()) {
      headerInfo.textContent = "Correct!";
      score++;
      // answerButtons[currentQuestionIndex % 3].style.backgroundColor = "#4CAF50";
    } else {
      headerInfo.textContent = "Incorrect!";
      // answerButtons[currentQuestionIndex % 3].style.backgroundColor = "#FF5252";
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      gameOver();
      resetQuiz();
    }
  }
  
  function nextQuestion() {
    hideHint();
    loadQuestion(); // Call loadQuestion instead of checkAnswer
  }
  
  function getIncorrectAnswers(currentQuestion) {
    const allAnswers = [...questions.map((q) => q.correctAnswer)];
    const correctAnswerIndex = allAnswers.indexOf(currentQuestion.correctAnswer);
    allAnswers.splice(correctAnswerIndex, 1); // Remove the correct answer
  
    const relatedIncorrectAnswers = generateRelatedIncorrectAnswers(
      currentQuestion
    );
  
    // Combine related incorrect answers with other random incorrect answers
    const combinedIncorrectAnswers = relatedIncorrectAnswers.concat(allAnswers);
  
    shuffleArray(combinedIncorrectAnswers); // Shuffle the array
    return combinedIncorrectAnswers.slice(0, 2); // Get two incorrect answers
  }
  
  function generateRelatedIncorrectAnswers(currentQuestion) {
    const relatedAnswers = [];
  
    const keywords = currentQuestion.question
      .split(" ")
      .map((word) => word.toLowerCase());
  
    keywords.forEach((keyword) => {
      if (keyword === "vein" || keyword === "venipuncture") {
        relatedAnswers.push("Arterial vein");
      }
    });
  
    return relatedAnswers;
  }
  
  function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
  
    const resetButton = document.getElementById("reset-btn");
    resetButton.style.display = "none";
  
    loadQuestion().then(() => {
      console.log("Testing async")
    })
    ;
  }
  
  window.onload = loadQuestion;