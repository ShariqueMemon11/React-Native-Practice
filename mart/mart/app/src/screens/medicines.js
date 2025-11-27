import { View, Text , StyleSheet, Pressable} from 'react-native'
import React from 'react'
import { Feather} from '@expo/vector-icons'
import { router } from 'expo-router'

const MedicineScreen = () => {
  return (
    <View style={styles.con}>
      <Text>medicines</Text> 
     <View>
     <Pressable style={styles.backbtn} onPress={[router.back,Oncomplete()]}>
        <Feather name="arrow-left" size={28} color="#fff" />
        
     </Pressable>
     </View>
    </View>
  )
}

export default MedicineScreen

const styles = StyleSheet.create({
    con:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#f2f2f2',
      paddingHorizontal:20,
    },
    backbtn:{
      width:30,
      height:30,
      position:'absolute',
      bottom:-362,
      right:-172,
      borderRadius:9999,
      backgroundColor:'#e41111',
      justifyContent:'center',
      alignItems:'center',
      shadowColor:'#000',
      shadowOffset:{width:0,height:4},
      shadowOpacity:0.1,
      shadowRadius:8,
      elevation:4,
    }
})