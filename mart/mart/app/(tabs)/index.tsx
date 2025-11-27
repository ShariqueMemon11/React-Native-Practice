import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <View style={styles.con}>
      <Text>index</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  con:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#f2f2f2',
    paddingHorizontal:20,
  },
})