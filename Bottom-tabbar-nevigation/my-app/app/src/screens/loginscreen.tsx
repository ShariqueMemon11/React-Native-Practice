import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const Loginscreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../images/logo.png')}/>
      <View style={{backgroundColor:'white'}}>
        <Text>Login</Text>

      </View>
    </View>
  )
}

export default Loginscreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#185f9f'
  },
  img:{
    marginTop:-600,
  },
})