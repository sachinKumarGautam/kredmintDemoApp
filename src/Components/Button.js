import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    margin: 15,
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
})
