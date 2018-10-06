import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons' // meh, smiley, frown-open
import { red, orange, green, white, purple } from '../utils/colors'

class Quiz extends Component {
  render() {
    return (
      <View>
        <Text>Quiz</Text>
        <FontAwesome name='frown-o' size={30} color={red} />
        <FontAwesome name='meh-o' size={30} color={orange} />
        <FontAwesome name='smile-o' size={30} color={green} />
      </View>
    )
  }
}

export default Quiz