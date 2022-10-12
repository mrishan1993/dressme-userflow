import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, StatusBar, Image,
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
  listRow: {
    flexDirection: 'row',
  },
  gridImage: {
    height: 75,
    width: 75,
    marginLeft: 30,
  },
  indexNumber: {
    fontSize: 22,
    marginTop: 20,
    color: colors.pink,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  emoIcons: {
    marginLeft: 20,
    marginTop: 20,
  },
})

const defaultCombinations = [
  {
    top: 'https://www.gstatic.com/webp/gallery/1.jpg',
    bottom: 'https://www.gstatic.com/webp/gallery/1.jpg',
  },
  {
    top: 'https://www.gstatic.com/webp/gallery/1.jpg',
    bottom: 'https://www.gstatic.com/webp/gallery/1.jpg',
  },
]
const Home = ({ navigation }) => {
  const [combinations, setCombinations] = useState([])
  useEffect(() => {
    setCombinations(defaultCombinations)
  }, [])
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Recommendations</Text>
      {combinations && combinations.length > 0 ? (
        combinations.map((o, i) => {
          console.log('o -->', o)
          return (
            <View style={styles.listRow}>
              <Text style={styles.indexNumber}>{i + 1}</Text>
              <Image
                source={{ uri: o.top }}
                style={styles.gridImage}
              />
              <Image
                source={{ uri: o.bottom }}
                style={styles.gridImage}
              />
              <FontIcon style={styles.emoIcons} name="happy-outline" color={colors.pink} size={40} />
              <FontIcon style={styles.emoIcons} name="sad-outline" color={colors.pink} size={40} />
            </View>
          )
        })
      ) : (
        null
      )}
    </View>
  )
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Home.defaultProps = {
  navigation: { navigate: () => null },
}

export default Home
