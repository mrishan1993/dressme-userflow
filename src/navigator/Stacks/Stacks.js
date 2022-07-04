import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from 'theme'
import Login from 'pages/Login'
import Home from 'pages/Home'
import Profile from 'pages/Profile'
import Details from 'pages/Details'
import HeaderLeft from './HeaderLeft'
import HeaderTitle from './HeaderTitle'

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator()

// ------------------------------------
// Navigators
// ------------------------------------

export const HomeNavigator = props => {
  const { state, ...rest } = props
  const newState = { ...state }
  const [navigationProps, setNavigationProps] = useState({
    headerTintColor: 'white',
    headerStyle: { backgroundColor: colors.darkPurple },
    headerTitleStyle: { fontSize: 18 },
    headerShown: props.route.params.loggedIn,
  })
  console.log('rest ', rest)

  return (
    <Stack.Navigator
      initialRouteName="Login"
      headerMode="screen"
      screenOptions={navigationProps}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ navigation }) => ({
          title: 'Login',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: () => <HeaderTitle />,
        })}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: 'Home',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: () => <HeaderTitle />,
        })}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={({ navigation }) => ({
          title: 'Home',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: () => <HeaderTitle />,
        })}
      />
    </Stack.Navigator>
  )
}

export const ProfileNavigator = () => {
  const navigationProps = {
    headerTintColor: 'white',
    headerStyle: { backgroundColor: colors.darkPurple },
    headerTitleStyle: { fontSize: 18 },
    headerShown: false,
  }
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      headerMode="screen"
      screenOptions={navigationProps}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          title: 'Profile',
          headerLeft: () => <HeaderLeft navigation={navigation} />,
          headerTitle: () => <HeaderTitle />,
        })}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: 'Details',
        }}
      />
    </Stack.Navigator>
  )
}
