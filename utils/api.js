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
