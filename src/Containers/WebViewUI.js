import { updateUserDetails } from '@/Store/UserDetails'
import React from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import { WebView } from 'react-native-webview'
import { useDispatch } from 'react-redux'

function WebViewUI(props) {
  const webviewRef = React.useRef(null)
  const dispatch = useDispatch()

  function onMessage(data) {
    // alert(data.nativeEvent.data)

    try {
      const messageData =
        data?.nativeEvent?.data && JSON.parse(data?.nativeEvent?.data)
      const message = messageData && messageData.message

      if (message && message == 'SAVE_DATA') {
        console.log(messageData)
        const userId = messageData.data.userId
        const token = messageData.data.token

        dispatch(updateUserDetails({ userId, token }))
      } else {
        props.navigation.navigate('MainReal')
      }
    } catch (err) {
      console.log(err)
    }
  }

  function handleSaveFromWebview() {}

  function webViewgoback() {
    if (webviewRef.current) webviewRef.current.goBack()
  }

  function webViewNext() {
    if (webviewRef.current) webviewRef.current.goForward()
  }

  function LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    )
  }
  return (
    <>
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          // source={{ uri: 'http://localhost:3001/login' }}
          source={{ uri: 'https://bnpl-dev.kredmint.in/' }}
          renderLoading={LoadingIndicatorView}
          startInLoadingState={true}
          ref={webviewRef}
          onMessage={onMessage}
        />
        <View style={styles.tabBarContainer}>
          <TouchableOpacity onPress={webViewgoback}>
            <Text style={{ color: 'green' }}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('MainReal')}
          >
            <Text style={{ color: 'green' }}>Exit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={webViewNext}>
            <Text style={{ color: 'green' }}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  flexContainer: {
    flex: 1,
  },
  tabBarContainer: {
    backgroundColor: '#d3d3d3',
    height: 56,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 24,
  },
  arrow: {
    color: '#ef4771',
  },
  icon: {
    width: 20,
    height: 20,
  },
})
export default WebViewUI
