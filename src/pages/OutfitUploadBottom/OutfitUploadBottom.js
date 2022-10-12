import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Modal,
  Pressable,
  Image,
  FlatList,
  Dimensions,
  SafeAreaView,
  BackHandler,
  ImageBackground,
} from 'react-native'
import _ from 'lodash'
import { colors } from 'theme'
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import Button from 'components/Button'
import * as ImagePicker from 'expo-image-picker'

const screenWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  root: {
    flex: 5,
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
  safeAreaContainer: {
    flex: 4,
    alignItems: 'center',
    padding: 10,
  },
  textBox: {
    flex: 1,
    alignItems: 'center',
  },
  safeAreaInputContainer: {
    width: screenWidth,
  },
  fullScreenModalContainer: {
    flex: 5,
    width: screenWidth,
  },
  deleteContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    alignItems: 'center',
  },
  button: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
  },
})

const OutfitUploadBottom = ({ navigation }) => {
  const [galleryModalVisible, setGalleryModalVisible] = useState(false)
  const [images, setImages] = useState([])
  const [fullScreen, setFullScreen] = useState({
    fullScreenImage: '',
    fullScreenModal: false,
  })
  const numColumns = 3
  const tileSize = screenWidth / numColumns
  let fullImage
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick)
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      )
    }
  }, [fullScreen])
  function handleBackButtonClick() {
    if (fullScreen.fullScreenModal) {
      setFullScreen({
        fullScreenImage: '',
        fullScreenModal: !fullScreen.fullScreenModal,
      })
    }
    return true
  }
  const openImagePickerAsync = async () => {
    setGalleryModalVisible(false)
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    const imageArray = images

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
    imageArray.push(pickerResult.uri)

    setImages([...imageArray])
  }
  const openCameraAsync = async () => {
    setGalleryModalVisible(false)
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    const imageArray = images

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
    imageArray.push(pickerResult.uri)
    console.log(images)
    setImages([...imageArray])
  }
  const openGalleryModal = () => {
    setGalleryModalVisible(true)
  }
  const renderImageItem = ({ item }) => {
    console.log('tilesize ', item)
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={(event) => openImageFullScreen(item)}
      >
        <ImageBackground
          source={{ uri: item }}
          style={{ height: tileSize, width: tileSize }}
        >
          <View style={styles.deleteContainer}>
            <TouchableWithoutFeedback>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={(event) => deleteImage(item)}
              >
                <FontIcon name="trash" color={colors.gray} size={20} />
              </TouchableOpacity>
            </TouchableWithoutFeedback>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  }
  let openImageFullScreen = (item) => {
    console.log('full image uri ', item)
    setFullScreen({
      fullScreenImage: item,
      fullScreenModal: true,
    })
  }
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      {images.length > 0 && !fullScreen.fullScreenModal ? (
        <View style={styles.promptContainer}>
          <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.safeAreaInputContainer}>
              <FlatList
                data={images}
                renderItem={renderImageItem}
                ItemSeparatorComponent={() => <View style={{ height: 3 }} />}
                numColumns={3}
                key={3}
              />
            </View>
          </SafeAreaView>

          <View style={styles.textBox}>
            <TouchableOpacity onPress={openGalleryModal}>
              <FontIcon name="camera" color={colors.pink} size={30} />
            </TouchableOpacity>
            <Text style={styles.title}>Upload another shorts/jeans</Text>
          </View>
          <Button
            title="Next"
            color="#D8D9CF"
            backgroundColor="#E26868"
            style={styles.button}
            onPress={() => {
              console.log('Inside the OutfitUploadBottom')
              navigation.navigate('Home', { from: 'OutfitUploadBottom' })
            }}
          />
        </View>
      ) : !fullScreen.fullScreenModal ? (
        <View style={styles.promptContainerBefore}>
          <TouchableOpacity onPress={openGalleryModal}>
            <FontIcon name="camera" color={colors.pink} size={100} />
          </TouchableOpacity>
          <Text style={styles.title}>Upload your shorts/jeans</Text>
        </View>
      ) : (
        <View style={styles.fullScreenModalContainer}>
          <Image
            source={{ uri: fullScreen.fullScreenImage }}
            style={{ height: '100%', width: Dimensions.width }}
          />
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

OutfitUploadBottom.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
}

OutfitUploadBottom.defaultProps = {
  navigation: { navigate: () => null },
}

export default OutfitUploadBottom
