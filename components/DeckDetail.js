import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default function DeckDetail ({ deck }) {
  return (
    <View>
      <Text>{deck.title}</Text>
      <Text>{deck.questions.length} cards</Text>
    </View>
  )
}