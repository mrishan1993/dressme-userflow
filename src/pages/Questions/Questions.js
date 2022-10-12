import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Modal,
  Pressable,
  Image,
} from 'react-native'
import Dropdown from 'components/Dropdown'
import { colors } from 'theme'
import InputText from 'components/InputText'
import Button from 'components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import * as ImagePicker from 'expo-image-picker'

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  measurementContainer: {
    flexDirection: 'row',
  },
  measurementHeaderHeight: {
    width: screenWidth * 0.6,
  },
  measurementHeaderWeight: {
    width: screenWidth * 0.2,
  },
  measureMentLabel: {
    marginTop: 15,
  },
  measurementInputs: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    marginTop: 20,
  },
  modalViewWrapper: {},
  centeredView: {
    height: '30%',
    marginTop: 'auto',
  },
  modalView: {
    margin: 20,
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalButtons: {
    fontSize: 18,
    margin: 10,
    width: '100%',
  },
  textStyle: {
    fontSize: 18,
    color: colors.pink,
    alignSelf: 'flex-start',
  },
  inlineIcon: {
    alignSelf: 'flex-end',
  },
  modalTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: '80%',
    marginBottom: 20,
  },
  promptContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  promptContainerBefore: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineStyle: {
    borderWidth: 0.5,
    width: '100%',
    borderColor: colors.pink,
  },
  buttonView: {
    marginTop: 50,
  },
  button: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputText: {
    width: screenWidth * 0.2,
    borderColor: '#D8D9CF',
  },
})

const Questions = ({ navigation }) => {
  const [eyeColor, setEyeColor] = useState()
  const [hairColor, setHairColor] = useState()
  const [bodyShape, setBodyShape] = useState()
  const [skinTone, setSkinTone] = useState()
  const [personKind, setPersonKind] = useState()
  const [heightFt, setHeightFt] = useState()
  const [heightIn, setHeightIn] = useState()
  const [weight, setWeight] = useState()
  const eyeColorOptions = [
    {
      label: 'Brown', value: 'Brown',
    },
    {
      label: 'Blue', value: 'Blue',
    },
    {
      label: 'Gray', value: 'Gray',
    },
    {
      label: 'Green', value: 'Green',
    },
    {
      label: 'Hazel', value: 'Hazel',
    },
    {
      label: 'Amber', value: 'Amber',
    },
    {
      label: 'Red', value: 'Red',
    },
    {
      label: 'White', value: 'White',
    },
    {
      label: 'Other', value: 'Other',
    },
  ]
  const hairColorOptions = [
    {
      label: 'Black', value: 'Black',
    },
    {
      label: 'Brown', value: 'Brown',
    },
    {
      label: 'Blonde', value: 'Blonde',
    },
    {
      label: 'White/gray', value: 'White/gray',
    },
    {
      label: 'Red', value: 'Red',
    },
    {
      label: 'Other', value: 'Other',
    },
  ]
  const bodyShapeOptions = [
    {
      label: 'Apple body', value: 'Apple body',
    },
    {
      label: 'Hourglass body', value: 'Hourglass body',
    },
    {
      label: 'Inverted triangle body', value: 'Inverted triangle body',
    },
    {
      label: 'Pear body', value: 'Pear body',
    },
    {
      label: 'Rectangle body', value: 'Rectangle',
    },
  ]
  const skinToneOptions = [
    {
      label: 'Light', value: 'Light',
    },
    {
      label: 'Fair', value: 'Fair',
    },
    {
      label: 'Medium', value: 'Medium',
    },
    {
      label: 'Dark', value: 'Dark',
    },
  ]
  const personKindOptions = [
    {
      label: 'Indoor person', value: 'Indoor person',
    },
    {
      label: 'Outdoor person', value: 'Outdoor person',
    },
  ]
  const setEyeColorCallback = (value) => {
    console.log('eye color ', value)
    setEyeColor(value)
  }
  const setHairColorCallback = (value) => {
    console.log('hair color ', value)
    setHairColor(value)
  }
  const setBodyShapeCallback = (value) => {
    console.log('body shape ', value)
    setBodyShape(value)
  }
  const setPersonKindCallback = (value) => {
    console.log('person kind ', value)
    setPersonKind(value)
  }
  const setSkinToneCallback = (value) => {
    console.log('skin tone', value)
    setSkinTone(value)
  }
  const setHeightFtCallback = (value) => {
    console.log('height ft ', value)
    setHeightFt(value)
  }
  const setHeightInCallback = (value) => {
    console.log('height in ', value)
    setHeightIn(value)
  }
  const setWeightCallback = (value) => {
    console.log('weight ', value)
    setWeight(value)
  }
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.label}>Eye color</Text>
      <Dropdown style={{ height: 30 }} pickerOptions={eyeColorOptions} setSelectionOptionCallback={setEyeColorCallback} />
      <Text style={styles.label}>Hair color</Text>
      <Dropdown style={{ height: 30 }} pickerOptions={hairColorOptions} setSelectionOptionCallback={setHairColorCallback} />
      <Text style={styles.label}>Body shape</Text>
      <Dropdown style={{ height: 30 }} pickerOptions={bodyShapeOptions} setSelectionOptionCallback={setBodyShapeCallback} />
      <Text style={styles.label}>Skin tone</Text>
      <Dropdown style={{ height: 30 }} pickerOptions={skinToneOptions} setSelectionOptionCallback={setSkinToneCallback} />
      <Text style={styles.label}>Are you a </Text>
      <Dropdown style={{ height: 30 }} pickerOptions={personKindOptions} setSelectionOptionCallback={setPersonKindCallback} />
      <View style={styles.measurementContainer}>
        <Text style={[styles.label, styles.measurementHeaderHeight]}>Height </Text>
        <Text style={[styles.label, styles.measurementHeaderWeight]}>Weight </Text>
      </View>
      <View style={styles.measurementInputs}>
        <InputText value={heightFt} style={styles.inputText} onInput={setHeightFtCallback} />
        <Text style={[styles.label, styles.measureMentLabel]}>ft </Text>
        <InputText value={heightIn} style={styles.inputText} onInput={setHeightInCallback} />
        <Text style={[styles.label, styles.measureMentLabel]}>in </Text>
        <InputText value={weight} style={styles.inputText} onInput={setWeightCallback} />
        <Text style={[styles.label, styles.measureMentLabel]}>kgs </Text>
      </View>
      <View style={styles.buttonView}>
        <Button
          title="Next"
          color="#D8D9CF"
          backgroundColor="#E26868"
          style={styles.button}
          onPress={() => {
            navigation.navigate('Selfie', { from: 'Questions' })
          }}
        />
      </View>
    </View>
  )
}

Questions.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
}

Questions.defaultProps = {
  navigation: { navigate: () => null },
}

export default Questions
