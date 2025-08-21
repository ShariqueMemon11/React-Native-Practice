import { View, Text, TouchableOpacity , StyleSheet } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import React from 'react'
import { useContext } from 'react';
import { ThemeContext } from '@/app/src/context/ThemeContext';

type Settingsbtnprops={
  title: string,
  icon: React.ComponentProps<typeof MaterialCommunityIcons> ['name'],
  onPress: ()=> void
  isActive: boolean
}
const SettingsBtn = ({title,icon,onPress,isActive}:Settingsbtnprops) => {
  const {currentTheme} = useContext(ThemeContext)
  return (
    <TouchableOpacity style={[styles.settingsbtn,{backgroundColor:currentTheme ==='dark' ? '#333' : '#e6e8e6'}]} onPress={onPress}>
        <View style={styles.titlewrapper}>
        <MaterialCommunityIcons name={icon} size={20} color={currentTheme ==='dark' ? 'white' : ''}/>
        <Text style={[styles.title,{color:currentTheme ==='dark' ? 'white' : ''}]}>{title}</Text>
        </View>
        <MaterialCommunityIcons name={isActive ? 'check-circle':'checkbox-blank-circle-outline'} 
        size={20} color={isActive ? '#7743DB': currentTheme === 'dark' ? 'white' : 'black'}/>
    </TouchableOpacity>
  )
}

export default SettingsBtn

const styles = StyleSheet.create({
  settingsbtn:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:15,
    borderRadius:15,
    marginBottom:15
  },
  titlewrapper:{
    flexDirection:'row',
    alignItems:'center',
    gap:10
  },
  title:{
    fontSize:14,
    fontWeight:500
  }
})