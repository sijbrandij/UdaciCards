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

export function addQuestion ({ question, key }) {
	return AsyncStorage.getItem(key)
		.then( data => {
			console.log(data)
			data = JSON.parse(data)
			console.log(data)
			data.questions.push(question)
			AsyncStorage.setItem(key, JSON.stringify(data))
		}).done()
}