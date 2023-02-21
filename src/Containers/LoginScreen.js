import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Snackbar from 'react-native-snackbar'

import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { setDefaultTheme } from '@/Store/Theme'
import {
  getStorageData,
  navigateAndSimpleReset,
  randomInvoiceId,
} from '@/Navigators/utils'
import { Modal } from '@/Components/Modal'
import { Button } from '@/Components/Button'
import FormFlow2 from '@/Components/Flow2Form'
import { updatePhone } from '@/Store/UserDetails'

const LoginScreen = props => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()

  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const handleOnsubmit = (phone, navigation) => {
    if (phone.length === 10 && /^[0-9]{10}$/.test(phone)) {
      dispatch(updatePhone({ phone }))
      navigation.navigate('MainReal', { phone: phone })
    } else {
      setError('Please enter a valid Phone number')
    }
  }

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand />
      <Text style={[Fonts.textRegular, styles.mainHeading]}>
        {'Welcome to Kredmint Demo App'}
      </Text>
      <Text style={[Fonts.textRegular, styles.subHeading]}>
        {'Enter your phone number to continue'}
      </Text>
      <TextInput
        value={phone}
        keyboardType={'phone-pad'}
        style={styles.text}
        onChangeText={e => setPhone(e)}
        placeholder="Enter your Phone number"
        placeholderTextColor="grey"
      />
      {error && (
        <Text style={[Fonts.textRegular, styles.subHeading, styles.errorText]}>
          {error}
        </Text>
      )}
      {/* <Text style={Fonts.textCenter}>{'Test flow 1'}</Text> */}
      <TouchableOpacity
        style={[Common.button.outline, styles.submitButton]}
        onPress={() => handleOnsubmit(phone, props.navigation)}
      >
        <Text style={[Fonts.textRegular, styles.textWhite]}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    borderWidth: 1,
    width: '90%',
    color: '#000000',
  },
  textWhite: {
    color: '#fff',
  },
  errorText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'red',
    // textAlign: 'left',
    alignItems: 'flex-end',
  },
  separator: {
    marginVertical: 40,
    height: 1,
    width: '80%',
  },
  mainHeading: {
    paddingBottom: 60,
  },
  subHeading: {
    fontSize: 14,
    paddingBottom: 30,
  },
  submitButton: {
    marginTop: 60,
    width: '90%',
    borderColor: '#224091',
    color: 'white',
    backgroundColor: '#224091',
    height: 50,
  },
})

export default LoginScreen
