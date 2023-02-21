import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Snackbar from 'react-native-snackbar'

import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
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

const KredmintCTA = ({ eligibilityData, navigation, eyebrow }) => {
  const { Common, Fonts, Gutters } = useTheme()
  return (
    <>
      <Text style={styles.text}>{eyebrow}</Text>
      <TouchableOpacity
        style={[Common.button.outline, Gutters.regularBMargin, styles.button1]}
        onPress={() =>
          navigation.navigate('WebView1', {
            customUrl: eligibilityData?.landingUrl,
          })
        }
      >
        <View style={styles.buttonInner}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: eligibilityData?.logoUrl,
            }}
          />
          <View>
            <Text style={Fonts.textSmall}>{eligibilityData?.title}</Text>
            <Text style={[Fonts.textSmall, styles.textSmall]}>
              {eligibilityData?.subTitle}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  )
}

const KredmintHome = ({ route, navigation }) => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [modalError, setError] = React.useState('')
  const [showError, setApiError] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  const phoneFromRedux = useSelector(state => state.userDetails?.phone)

  const [eligibilityData1, setEligibilityData1] = React.useState(null)
  const [eligibilityData2, setEligibilityData2] = React.useState(null)

  // const { phone = '' } = route?.params
  const [date, setDate] = React.useState(new Date())
  const [amount, setAmount] = React.useState(null)
  // console.log('phone', phone)
  useEffect(() => {
    checkEligibility('profile', setEligibilityData1)
  }, [])

  useEffect(() => {
    // dispatch(updatePhone({ phone }))
  }, [phoneFromRedux])

  const checkEligibility = async (type, setFn) => {
    const body = {
      username: phoneFromRedux,
      page: 'profile',
    }
    if (type === 'payment') {
      body.invoiceNumber = randomInvoiceId()
      body.paymentDate = 1671906600000
      body.amount = 1000
    }

    try {
      setLoading(true)
      const data = await fetch(
        'https://user-dev.kredmint.in/user/eligibility',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic UXFwd2RaNlZiVGtOcG0wRmtYc2NDekd5ZDY6VzRwcW9YUndKN2RzeUczejh3dWd5OEJERDd2SHZy`,
          },
          body: JSON.stringify(body),
        },
      ).then(async data => {
        if (!data.ok) {
          console.log('helo', data)
          console.log('helo2', data.message)
          const errorData = await data.json()
          console.log('helo', errorData)
          throw errorData
        } else {
          return data.json()
        }
      })

      if (data && data.payload) {
        setFn(data.payload)
      }
      setLoading(false)
      return data
    } catch (error) {
      setLoading(false)
      setApiError(true)
      console.log('rrrr', error)
    }
  }

  const handleModal = async () => {
    if (!amount) {
      setError('Please enter valid amount')
      return
    }

    if (!date) {
      setError('Enter Invoice date')
      return
    }

    checkEligibility('payment', setEligibilityData2)

    setIsModalVisible(() => !isModalVisible)
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
      <Brand />
      {/* <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} /> */}
      <Text style={[Fonts.textRegular, styles.mainHeading]}>
        {'Welcome to Kredmint Demo App'}
      </Text>
      {/* <Text style={Fonts.textCenter}>{'Test flow 1'}</Text> */}
      {!isLoading && !showError ? (
        <>
          {eligibilityData1 ? (
            <KredmintCTA
              eligibilityData={eligibilityData1}
              navigation={navigation}
              eyebrow="Profile"
            />
          ) : null}
          {eligibilityData2 ? (
            <KredmintCTA
              eligibilityData={eligibilityData2}
              navigation={navigation}
              eyebrow="Payment"
            />
          ) : (
            <TouchableOpacity
              style={[
                Common.button.outline,
                Gutters.regularBMargin,
                styles.button1,
              ]}
              onPress={() => {
                setIsModalVisible(true)
              }}
            >
              <Text style={[Fonts.textRegular]}>Show Payment CTA</Text>
            </TouchableOpacity>
          )}
        </>
      ) : null}
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
      {(!phoneFromRedux || showError) &&
        Snackbar.show({
          text: 'Something went wrong',
          duration: Snackbar.LENGTH_SHORT,
        })}
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
  textSmall: {
    fontSize: 12,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    paddingRight: 10,
  },
  button1: {
    minHeight: 80,
    height: 'auto',
    width: '90%',
    borderColor: '#224091',
  },
  buttonInner: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'left',
    color: '#000',
    paddingBottom: 10,
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
