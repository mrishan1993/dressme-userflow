import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Modal,
  Pressable,
  Image,
} from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import * as ImagePicker from 'expo-image-picker'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
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
    marginTop: 10,
  },
})

const Selfie = ({ navigation }) => {
  const [galleryModalVisible, setGalleryModalVisible] = useState(false)
  const [imageSource, setImageSource] = useState('')
  const openImagePickerAsync = async () => {
    setGalleryModalVisible(false)
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!')
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: false,
      aspect: [3, 4],
    })
    console.log(pickerResult)
    setImageSource({ localURI: pickerResult.uri })
  }
  const openCameraAsync = async () => {
    setGalleryModalVisible(false)
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permission to access camera')
      return
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: false,
      aspect: [3, 4],
    })
    console.log(pickerResult)
    setImageSource({ localURI: pickerResult.uri })
  }
  const openGalleryModal = () => {
    setGalleryModalVisible(true)
  }
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      {imageSource ? (
        <View style={styles.promptContainer}>
          <Image style={styles.image} source={{ uri: imageSource.localURI }} />
          <TouchableOpacity onPress={openGalleryModal}>
            <FontIcon name="camera" color={colors.pink} size={30} />
          </TouchableOpacity>
          <Text style={styles.title}>Upload different picture</Text>
          <Button
            title="Next"
            color="#D8D9CF"
            backgroundColor="#E26868"
            style={styles.button}
            onPress={() => {
              navigation.navigate('OutfitUploadTop', { from: 'Selfie' })
            }}
          />
        </View>
      ) : (
        <View style={styles.promptContainerBefore}>
          <TouchableOpacity onPress={openGalleryModal}>
            <FontIcon name="camera" color={colors.pink} size={100} />
          </TouchableOpacity>
          <Text style={styles.title}>Upload your full body picture</Text>
        </View>
      )}

      <View style={styles.modalViewWrapper}>
        <Modal
          animationType="slide"
          transparent
          visible={galleryModalVisible}
          onRequestClose={() => {
            setGalleryModalVisible(!galleryModalVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.modalButtons]}
                onPress={openCameraAsync}
              >
                <View style={styles.modalTextContainer}>
                  <Text style={styles.textStyle}>Take a Photo</Text>
                  <FontIcon
                    style={styles.inlineIcon}
                    name="camera"
                    color={colors.pink}
                    size={20}
                  />
                </View>
              </Pressable>
              <View style={styles.lineStyle} />
              <Pressable
                style={[styles.modalButtons]}
                onPress={openImagePickerAsync}
              >
                <View style={styles.modalTextContainer}>
                  <Text style={styles.textStyle}>Choose from library</Text>
                  <FontIcon
                    style={styles.inlineIcon}
                    name="upload"
                    color={colors.pink}
                    size={20}
                  />
                </View>
              </Pressable>
              <View style={styles.lineStyle} />
              <Pressable
                style={[styles.modalButtons]}
                onPress={() => setGalleryModalVisible(!galleryModalVisible)}
              >
                <View style={styles.modalTextContainer}>
                  <Text style={styles.textStyle}>Cancel</Text>
                  <FontIcon
                    style={styles.inlineIcon}
                    name="window-close"
                    color={colors.pink}
                    size={20}
                  />
                </View>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

Selfie.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
}

Selfie.defaultProps = {
  navigation: { navigate: () => null },
}

export default Selfie
