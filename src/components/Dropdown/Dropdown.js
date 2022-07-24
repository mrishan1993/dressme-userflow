import React from 'react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { TouchableOpacity, Text, View, Dimensions } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import InputText from "components/InputText"
const screenWidth = Dimensions.get('window').width
const styles = {
  root: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
  picker: {
    width: 30,
  },
  dropdownContainer: {
    flexDirection: 'row',
  },
}

const Dropdown = (props) => {
  const [selectedOption, setSelectedOption] = useState()
  const [selectedIndex, setSelectedIndex] = useState()
  const [pickerOptions, setPickerOptions] = useState([])
  const onInput = (value) => {
    console.log("Value ", value)
  }
  useEffect(() => {
    setPickerOptions(props.pickerOptions)
  }, [])
  const setDropdownInput = (value, index) => {
    console.log("seelcted option ", index)
    setSelectedOption(value)
    setSelectedIndex(index)
    props.setSelectionOptionCallback(value)
  }
  return (
    <View style={styles.dropdownContainer}>
      <InputText value={selectedOption} style={{width: screenWidth*0.8 }} editable={false} onInput={onInput} />
      <Picker
        selectedValue={selectedOption}
        style={styles.picker}
        enabled={props.enabled}
        mode={props.mode}
        dropdownIconColor={props.dropdownIconColor}
        dropdownIconRippleColor={props.dropdownIconRippleColor}
        itemStyle={props.itemStyle}
        onValueChange={(itemValue, itemIndex) => setDropdownInput(itemValue, itemIndex)}
      >
        {pickerOptions.length > 0 ? (
          pickerOptions.map(function(o) {
            return (
              <Picker.Item label={o.label} value={o.value} />
            )
          } )
        ): <Picker.Item label="None" value="None" />}
      </Picker>
    </View>
  )
}

Dropdown.propTypes = {}

Dropdown.defaultProps = {}

export default Dropdown
