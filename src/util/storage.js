import { AsyncStorage } from 'react-native';

export const KEY = 'decks:flashcards';

let data =
{
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces',
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event',
            },
        ],
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.',
            },
        ],
    },
};

export function initialData() {
    AsyncStorage.setItem(KEY, JSON.stringify(data));
    return data;
}

export function fetchDecks() {
    return AsyncStorage
        .getItem(KEY)
        .then((results) => {
            return results === null ? initialData() : JSON.parse(results);
        });
}

export function createDeck(deck) {
    return AsyncStorage.mergeItem(KEY, JSON.stringify(deck));
}

export function addQuestionForDeck(newCard, name) {
    return AsyncStorage
        .getItem(KEY, (err, result) => {
            let decks = JSON.parse(result);
            let newQuestions = JSON.parse(JSON.stringify(decks[name].questions));
            newQuestions[newQuestions.length] = newCard;
            const value = JSON.stringify({
                [name]: {
                  title: name,
                  questions: newQuestions,
                },
            });

            AsyncStorage.mergeItem(KEY, value);
        });
}
