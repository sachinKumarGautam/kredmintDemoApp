import React, { useState } from 'react'
import { Text, StyleSheet, View, TextInput } from 'react-native'

const FormFlow2 = ({ amount, setAmount }) => {
  const [value, setValue] = useState(0)
  return (
    <View>
      <Text> Please fill these details </Text>
      <View>
        <TextInput
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <TextInput secureTextEntry={true} placeholder="Password" />
      </View>
    </View>
  )
}

export default FormFlow2
