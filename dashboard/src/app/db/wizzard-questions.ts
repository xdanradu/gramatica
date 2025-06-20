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
    questionText: 'În seria: *Profesoara mă învaţă* [GN *algebra*].; *L-au uns* [GN *patriarh*].; *S-a supărat* [GPrep *pe* [GN *Ion*].; [GPrep *Pe* [GN *Ion*] *îl apreciază*., există în ordine:',
    answers: [
      { id: 1, text: 'CD, CSec, CPO, CI', isCorrect: false },
      { id: 2, text: 'CSec, CPO, CPrep, CD', isCorrect: true },
      { id: 3, text: 'CSec, CPO, CD, CD', isCorrect: false },
      { id: 4, text: 'CPO, Csec, CPrep, CD', isCorrect: false },
    ],
    userSelectedAnswerId: null,
    extendedDescription: '*b.* (În propoziţia 1: *Profesoara* [GNpron *mă învaţă* [GN *algebra*]CSec., există complementul secundar [*algebra*], coocurent cu complementul direct [*mă*], solicitat de verbul tranzitiv cu dublu obiect [*învaţă*]. În propoziţia a 2-a: [GNpron *L*]CD*-au uns* [GN *patriarh*]CPO., verbul atributiv [*au uns*] solicită complementul predicativ al obiectului [*patriarh*], raportat la complementul direct [*l*-]. Verbul atributiv[*au uns*], complementul direct [*l*-] şi complementul predicativ al obiectului [*patriarh*] alcătuiesc o structură ternară. În propoziţia a 3-a: *S-a supărat* [GPrep *pe* [GN *Ion*]]., verbul intranzitiv [*s-a supărat*] îi impune nominalului substantiv [*pe Ion*] regimul prepoziţional şi îi atribuie rolul de *PACIENT*, îndeplinind funcţia de complement prepoziţional. În propoziţia a 4-a: [GPrep *Pe* [GN *Ion*]CD [GNpron *îl*]CDdublat  *apreciază*., grupul prepoziţional, cu nominalul inclus [*pe Ion*], are funcţia sintactică de complement direct, impusă de regimul semantico sintactic al verbului tranzitiv [*apreciază*].);',
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
