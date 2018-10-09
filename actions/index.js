import { ADD_DECK, ADD_QUESTION, RECEIVE_DECKS } from './ActionTypes'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function addQuestion (deckId, newQuestion) {
	return {
		type: ADD_QUESTION,
		deckId,
		newQuestion,
	}
}
