import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default function TextButton ({ children, onPress, style }) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  )
}