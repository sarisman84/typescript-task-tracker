type Question = {
  description: string;
  potentialAnswers?: string[];
  correctAnswer: number;
};

const questions: Question[] = [
  {
    description: "What is the capital of France?",
    potentialAnswers: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: 0,
  },
  {
    description: "What is the largest planet in our solar system?",
    potentialAnswers: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 2,
  },
  {
    description: "What is the chemical symbol for water?",
    potentialAnswers: ["H2O", "CO2", "NaCl", "O2"],
    correctAnswer: 0,
  },
  {
    description: "What is the smallest country in the world by area?",
    potentialAnswers: ["Monaco", "Liechtenstein", "San Marino", "Vatican City"],
    correctAnswer: 3,
  },
  {
    description: "What is the largest mammal in the world?",
    potentialAnswers: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: 1,
  },
  {
    description: "What is the smallest country in the world by population?",
    potentialAnswers: ["Monaco", "Liechtenstein", "San Marino", "Vatican City"],
    correctAnswer: 3,
  },
  {
    description: "What is the largest desert in the world?",
    potentialAnswers: ["Sahara", "Gobi", "Kalahari", "Antarctic Desert"],
    correctAnswer: 3,
  },
];

let correctAnswersCount = 0;

function askQuestion(question: Question): number {
  let questionPrompt = `Question: ${question.description}\n`;
  if (question.potentialAnswers) {
    question.potentialAnswers.forEach((answer, index) => {
      questionPrompt += `${index + 1}. ${answer}\n`;
    });
  }

  const userInput = prompt(questionPrompt) ?? "";
  const userAnswer = parseInt(userInput, 10);

  return userAnswer;
}

console.log("Welcome to the quiz! Please answer the following questions:");

for (const question of questions) {
  const userAnswer = askQuestion(question);

  if (userAnswer === question.correctAnswer) {
    correctAnswersCount++;
    console.log(`Correct! You got it right.`);
  } else {
    console.log(`Incorrect. The correct answer is ${question.correctAnswer}.`);
  }
}

console.log(
  `You got ${correctAnswersCount} out of ${questions.length} correct!`,
);
