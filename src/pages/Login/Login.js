import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, StatusBar,
} from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import FontIcon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  emoIcons: {
    marginRight: 10,
  },
})

const Login = ({ navigation }) => (
  <View style={styles.root}>
    <StatusBar barStyle="light-content" />
    <View>

      <Button
        title="Login with Google"
        color="#5B374D"
        backgroundColor="#EDEDED"
        onPress={() => {
          navigation.navigate('Onboarding', { from: 'Login' })
        }}
      >
        <FontIcon style={styles.emoIcons} name="logo-google" color="#5B374D" size={20} />
      </Button>
    </View>

  </View>
)

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Login.defaultProps = {
  navigation: { navigate: () => null },
}

export default Login
