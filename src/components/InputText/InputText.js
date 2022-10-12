import React from 'react'
import { SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { colors } from 'theme'

const styles = StyleSheet.create({
  input: {
    height: 35,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    color: '#E26868',
  },
})

const InputText = (props) => {
  const [text, onChangeText] = React.useState('')
  console.log('value ', props.value)
  const controlledChange = (e) => {
    console.log('input ', e)
    onChangeText(e)
    props.onInput(e)
  }

  return (
    <SafeAreaView>
      <TextInput
        style={[styles.input, props.style]}
        onChangeText={controlledChange}
        value={props.value}
        editable={props.editable !== false}
      />
    </SafeAreaView>
  )
}
InputText.propTypes = {}

InputText.defaultProps = {}

export default InputText
