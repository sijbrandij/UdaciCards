import React from 'react'
import { AsyncStorage } from 'react-native'

export const FLASHCARDS_STORAGE_KEY = 'UdaciCards:flashcards'

export function parameterizeString (string) {
  return string.trim().toLowerCase().replace(/[^a-zA-Z0-9 -]/, "").replace(/\s/g, "-")
}

function setDummyData() {
  const decks = {
    'react': {
      'title': 'React',
      'questions': [
        {
          'question': 'What is React?',
          'answer': 'A library for managing user interfaces'
        },
        {
          'question': 'Where do you make Ajax requests in React?',
          'answer': 'The componentDidMount lifecycle event'
        }
      ]
    },
    'javaScript': {
      'title': 'JavaScript',
      'questions': [
        {
          'question': 'What is a closure?',
          'answer': 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

  AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))

  return decks
}

export function formatDeckResults (results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}
