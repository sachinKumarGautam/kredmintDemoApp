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
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { Modal } from '@/Components/Modal'
import { Button } from '@/Components/Button'
import FormFlow2 from '@/Components/Flow2Form'

const KredmintHome = props => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [amount, setAmount] = React.useState('')
  const userId = useSelector(state => state.userDetails.userId)
  const token = useSelector(state => state.userDetails.token)

  console.log(userId)
  const { t } = useTranslation()

  const handleModal = () => {
    setIsModalVisible(() => !isModalVisible)

    fetch('https://account-dev.kredmint.in/account/init', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        invoiceNumber: 'yourValue',
        amount: amount,
        userId: 'userId',
      }),
    })
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
      <Text style={Fonts.textCenter}>{'Welcome to Kredmint test APP'}</Text>
      {/* <Text style={Fonts.textCenter}>{'Test flow 1'}</Text> */}
      <TouchableOpacity
        style={[Common.button.outline, Gutters.regularBMargin]}
        onPress={() => props.navigation.navigate('WebView1')}
      >
        <Text style={Fonts.textRegular}>Test flow 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[Common.button.outline, Gutters.regularBMargin]}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={Fonts.textRegular}>Test flow 2</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <Modal.Header title="Enter these details" />
          <Modal.Body>
            <FormFlow2 amount={amount} setAmount={setAmount} />
            <Text style={styles.text}>Agree to continue with this guide</Text>
          </Modal.Body>
          <Modal.Footer>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})

export default KredmintHome
