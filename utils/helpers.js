import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const FLASHCARDS_STORAGE_KEY = 'UdaciCards:flashcards'
const NOTIFICATION_KEY = 'UdaciCards:notifications'

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

function formatResults (results) {
  let decks = {}
  Object.keys(results).map((key) => {
    decks[key] = results[key]
  })
  return {decks: decks}
}

export function formatDeckResults (results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification () {
  return {
    title: 'Quiz time!',
    body: 'Don\'t forget to take a quiz today!',
    ios: {
      sound: true,

    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
