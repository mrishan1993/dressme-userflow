import React from 'react'
import { SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { colors } from 'theme'

const styles = StyleSheet.create({
  input: {
    height: 35,
    margin: 10,
    padding: 10,
    borderWidth: 1,
  },
})

const InputText = (props) => {
  const [text, onChangeText] = React.useState('')
  console.log("value ", props.value)
  const controlledChange = (e) => {
    onChangeText(e.target.value)
    props.onInput(e.target.value)
  }

  return (
    <SafeAreaView>
      <TextInput
        style={[styles.input, props.style]}
        onChangeText={controlledChange}
        value={props.value}
        editable={props.editable === false ? false : true}
      />
    </SafeAreaView>
  )
}
InputText.propTypes = {}

InputText.defaultProps = {}

export default InputText
