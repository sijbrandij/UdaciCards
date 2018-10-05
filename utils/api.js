import { AsyncStorage } from 'react-native'
import { FLASHCARDS_STORAGE_KEY, formatDeckResults } from './helpers'

export function fetchDecks () {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(formatDeckResults)
}

export function submitDeck ({ deck, key }) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [key]: deck,
  }))
}

export function addQuestion ({ newQuestion, deckId }) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(data => {
      let decks = JSON.parse(data)
      let deck = decks[deckId]
      deck.questions.push(newQuestion)
      decks[deckId] = deck
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
    })
}