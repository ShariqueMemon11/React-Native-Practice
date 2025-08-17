import { View, Text, Image, StyleSheet } from 'react-native'
import { ThemeContext } from '@/app/src/context/ThemeContext'
import React, { useContext } from 'react'

const Home = () => {
  const {currentTheme} = useContext(ThemeContext);

  return (
    <View style={[styles.container,{backgroundColor:currentTheme === 'dark' ? '#212121' : '#ffffff',}]}>
      <Image style={styles.img} source={require('../images/group.png')}/>
      <Text style={[styles.text,
      {color:currentTheme === 'dark' ? 'white' : '#111827'}]}
      >Comming soon</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  img:{
    marginTop:-60,
    marginBottom:30
  },
  text:{
    fontSize:20,
    fontWeight:'bold'

  }

})