
export interface ScrambleWordState {
    currentWord: string;
    errorCounter: number;
    guess: string;
    isGameOver: boolean;
    maxAllowErrors: number;
    maxSkips: number;
    points: number;
    scrambledWord: string;
    skipCounter: number;
    words: string[];
    totalWords: number;
}

const GAME_WORDS = [
    'REACT',
    'JAVASCRIPT',
    'TYPESCRIPT',
    'HTML',
    'ANGULAR',
    'SOLID',
    'NODE',
    'VUEJS',
    'SVELTE',
    'EXPRESS',
    'MONGODB',
    'POSTGRES',
    'DOCKER',
    'KUBERNETES',
    'WEBPACK',
    'VITE',
    'TAILWIND',
];

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = '') => {
  return word
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};

export const getInitialState = (): ScrambleWordState => {

    const shuffledWords = shuffleArray(GAME_WORDS);

    return {
        currentWord: shuffledWords[0] || '',
        errorCounter: 0,
        guess: '',
        isGameOver: false,
        maxAllowErrors: 3,
        maxSkips: 3,
        points: 0,
        scrambledWord: scrambleWord(shuffledWords[0] || ''),
        skipCounter: 0,
        words: shuffledWords,
        totalWords: shuffledWords.length,
    };
}

export type ScrambleWordAction =
    | { type: 'SET_GUESS'; payload: string }
    | { type: 'SKIP_WORD'; }
    | { type: 'RESET_GAME'; payload: ScrambleWordState }
    | { type: 'CHECK_ANSWER'; };

export const scrambleWordsReducer = (state: ScrambleWordState, action: ScrambleWordAction): ScrambleWordState => {
    switch (action.type) {
        case 'SET_GUESS': return { ...state, guess: action.payload.trim().toUpperCase() };
        case 'CHECK_ANSWER': {
            if (state.isGameOver) return state;

            if (state.guess === state.currentWord) {

                const newWords = state.words.slice(1);

                return {
                    ...state,
                    words: newWords,
                    currentWord: newWords[0] || '',
                    scrambledWord: scrambleWord(newWords[0] || ''),
                    guess: '',
                    points: state.points + 1,
                };
            } else {
                return {
                    ...state,
                    errorCounter: state.errorCounter + 1,
                    isGameOver: state.errorCounter + 1 >= state.maxAllowErrors,
                    guess: '',
                };
            }
        }
        case 'SKIP_WORD': {
            if (state.isGameOver) return state;
            if (state.skipCounter >= state.maxSkips) return state;

            const updatedWords = state.words.slice(1);

            return {
                ...state,
                skipCounter: state.skipCounter + 1,
                words: updatedWords,
                currentWord: updatedWords[0] || '',
                scrambledWord: scrambleWord(updatedWords[0] || ''),
                guess: '',
            };
        }
        case 'RESET_GAME': return action.payload;
        default: return state;
    }
}
