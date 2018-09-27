import { AsyncStorage } from 'react-native'
import { FLASHCARDS_STORAGE_KEY } from './helpers'

export function submitDeck ({ deck, key }) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [key]: deck,
  }))
}
