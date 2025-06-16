export interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  questionText: string;
  answers: Answer[];
  userSelectedAnswerId?: number | null;
  extendedDescription?: string;
}

export const wizzardQuestions: Question[] = [
  {
    id: 1,
    questionText: 'What is the capital of France?',
    answers: [
      { id: 1, text: 'Berlin', isCorrect: false },
      { id: 2, text: 'Madrid', isCorrect: false },
      { id: 3, text: 'Paris', isCorrect: true },
      { id: 4, text: 'Rome', isCorrect: false },
    ],
    userSelectedAnswerId: null,
    extendedDescription: 'Paris is the capital and most populous city of France. It is known for its art, fashion, gastronomy and culture. Major landmarks include the Eiffel Tower, the Louvre Museum, and Notre-Dame Cathedral.',
  },
  {
    id: 2,
    questionText: 'Which planet is known as the Red Planet?',
    answers: [
      { id: 1, text: 'Earth', isCorrect: false },
      { id: 2, text: 'Mars', isCorrect: true },
      { id: 3, text: 'Jupiter', isCorrect: false },
      { id: 4, text: 'Saturn', isCorrect: false },
    ],
    userSelectedAnswerId: null,
    extendedDescription: 'Mars is often called the "Red Planet" because the iron oxide prevalent on its surface gives it a reddish appearance. It is the fourth planet from the Sun and the second-smallest planet in the Solar System.',
  },
  {
    id: 3,
    questionText: 'What is the largest ocean on Earth?',
    answers: [
      { id: 1, text: 'Atlantic Ocean', isCorrect: false },
      { id: 2, text: 'Indian Ocean', isCorrect: false },
      { id: 3, text: 'Arctic Ocean', isCorrect: false },
      { id: 4, text: 'Pacific Ocean', isCorrect: true },
    ],
    userSelectedAnswerId: null,
    extendedDescription: 'The Pacific Ocean is the largest and deepest of Earth\'s five oceanic divisions. It extends from the Arctic Ocean in the north to the Southern Ocean in the south and is bounded by Asia and Australia in the west and the Americas in the east.',
  },
  {
    id: 4,
    questionText: 'Who wrote "Romeo and Juliet"?',
    answers: [
      { id: 1, text: 'William Shakespeare', isCorrect: true },
      { id: 2, text: 'Charles Dickens', isCorrect: false },
      { id: 3, text: 'Mark Twain', isCorrect: false },
      { id: 4, text: 'Jane Austen', isCorrect: false },
    ],
    userSelectedAnswerId: null,
    extendedDescription: '"Romeo and Juliet" is a tragedy written by William Shakespeare early in his career about two young Italian star-crossed lovers whose deaths ultimately reconcile their feuding families. It was among Shakespeare\'s most popular plays during his lifetime.',
  },
];
