import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

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

const KredmintHome = props => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [modalError, setError] = React.useState('')
  const [date, setDate] = React.useState(new Date())
  const [amount, setAmount] = React.useState(null)
  // const userId = useSelector(state => state.userDetails.userId)
  // const token = useSelector(state => state.userDetails.token)

  // const { t } = useTranslation()

  const handleModal = async () => {
    let userId = await getStorageData('userId')
    userId = userId.replace(/^"(.*)"$/, '$1')
    let token = await getStorageData('authToken')
    token = token.replace(/^"(.*)"$/, '$1')

    if (!userId) {
      setError(
        'User Id is not present please complete sign up and submit details',
      )
      return
    }
    if (!amount) {
      setError('Please enter valid amount')
      return
    }

    if (!token) {
      setError(
        'User token is not present please complete sign up and submit details',
      )
      return
    }

    if (!date) {
      setError('Enter Invoice date')
      return
    }

    try {
      const initData = await fetch(
        'https://account-dev.kredmint.in/account/init',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            invoiceNumber: randomInvoiceId(),
            date: date,
            amount: amount,
            userId: userId,
          }),
        },
      ).then(data => data.json())
      const url = initData.payload
      if (url) {
        props.navigation.push('WebView1', {
          customUrl: `${url}&token=${token}`,
        })
        setError('')
        setIsModalVisible(false)
      } else {
        if (initData.error) {
          setError(initData.error)
        }
      }
      //Navigate to webui
    } catch (err) {
      console.log('error from init', InitData)
    }

    // setIsModalVisible(() => !isModalVisible)
  }
  //   const init = async () => {
  //     await new Promise(resolve =>
  //       setTimeout(() => {
  //         resolve(true)
  //       }, 2000),
  //     )
  //     await setDefaultTheme({ theme: 'default', darkMode: null })
  //     navigateAndSimpleReset('MainReal')
  //   }

  //   useEffect(() => {
  //     init()
  //   })
  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      {/* <Brand /> */}
      {/* <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} /> */}
      <Text style={[Fonts.textRegular, styles.mainHeading]}>
        {'Welcome to Kredmint Demo App'}
      </Text>
      {/* <Text style={Fonts.textCenter}>{'Test flow 1'}</Text> */}
      <TouchableOpacity
        style={[Common.button.outline, Gutters.regularBMargin]}
        onPress={() => props.navigation.navigate('WebView1', { customUrl: '' })}
      >
        <Text style={Fonts.textRegular}>Get credit limit flow</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[Common.button.outline, Gutters.regularBMargin]}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={Fonts.textRegular}>Pay via Kredmint flow</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <Modal.Header title="Enter these details" />
          <Modal.Body>
            <FormFlow2
              amount={amount}
              setAmount={setAmount}
              date={date}
              setDate={setDate}
            />
            {modalError ? (
              <Text style={styles.errorText}>{modalError}</Text>
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <Button
              title="Cancel"
              onPress={() => {
                setError('')
                setIsModalVisible(false)
              }}
            />
            <Button title="Submit" onPress={handleModal} />
          </Modal.Footer>
        </Modal.Container>
      </Modal>
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
  },
  errorText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'red',
    textAlign: 'left',
  },
  separator: {
    marginVertical: 40,
    height: 1,
    width: '80%',
  },
  mainHeading: {
    paddingBottom: 60,
  },
})

export default KredmintHome
