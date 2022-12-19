import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'

import { Text, StyleSheet, View, TextInput } from 'react-native'
import { Fonts } from '@/Theme'
import { useTheme } from '@/Hooks'

const FormFlow2 = ({ amount, setAmount, date, setDate }) => {
  const [dateSelected, setDateSelected] = useState(false)
  const [showDatePicker, setShowPicker] = useState(false)
  const { Common, Fonts, Gutters, Layout } = useTheme()

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShowPicker(false)

    setDate(currentDate)
    setDateSelected(true)
  }

  return (
    <View style={styles.container}>
      <Text style={[Fonts.textRegular, styles.title]}>
        {' '}
        Please fill these details{' '}
      </Text>
      <View>
        <Text style={styles.title}>Enter Amount</Text>
        <TextInput
          value={amount}
          style={styles.text}
          onChangeText={e => setAmount(e)}
          placeholder="Amount"
        />
        {dateSelected ? (
          <Text onPress={e => setShowPicker(true)} style={styles.selectDate}>
            {date.toDateString()}
          </Text>
        ) : (
          <Text style={styles.selectDate} onPress={e => setShowPicker(true)}>
            Select invoice date
          </Text>
        )}
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 300,
  },
  title: {
    color: 'black',
    paddingBottom: 30,
  },
  text: {
    borderWidth: 1,
    color: 'grey',
    borderRadius: 2,
    borderColor: 'grey',
    placeholder: 'grey',
  },
  selectDate: {
    color: 'grey',
    marginTop: 30,
    height: 60,
    paddingLeft: 15,
    paddingTop: 20,
    alignContent: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 2,
  },
})

export default FormFlow2
