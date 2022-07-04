import React from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import DrawerMenu from './DrawerMenu'
import TabNavigator from '../Tabs'

const Drawer = createDrawerNavigator()

const DrawerMenuContainer = props => {
  const { state, ...rest } = props
  const newState = { ...state }
  console.log('rest ', rest)
  console.log('state ', newState)
  newState.routes = newState.routes.filter(item => item.name !== 'Login')
  return (
    <DrawerContentScrollView {...props}>
      <DrawerMenu {...props} />
      <DrawerItemList state={newState} {...rest} />
    </DrawerContentScrollView>
  )
}

export default props => {
  console.log('drawer props ', props)
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        initialParams={{ loggedIn: props.loggedIn }}
      />
    </Drawer.Navigator>
  )
}
