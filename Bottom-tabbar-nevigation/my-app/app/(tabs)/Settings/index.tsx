import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import React, { useContext } from 'react'
import SettingsBtn from '@/app/src/component/SettingsBtn'
import { ThemeContext } from '@/app/src/context/ThemeContext';
const Theme = () => {

  const {currentTheme, toggleTheme} = useContext(ThemeContext);
  
  return (
    <View style={[styles.container,{backgroundColor:currentTheme === 'dark' ? '#212121':'white'}]}>
      
      <Text style={[styles.title,{color:currentTheme === 'dark' ? 'white':''}]}>Theme Switch</Text>

      <TouchableOpacity style={[styles.btn,{backgroundColor:currentTheme === 'dark' ? '#333':'white'}]} onPress={()=>{}}>
        
        <Text style={{color:currentTheme === 'dark' ? 'white':''}}>Dark Mode</Text>

        <Switch value={currentTheme === 'dark'} onValueChange={()=>toggleTheme(currentTheme=== 'light' ? 'dark':'light')}/>

      </TouchableOpacity>

      <Text style={[styles.title,{color:currentTheme === 'dark' ? 'white' : ''}]}>Theme Settings</Text>

      <SettingsBtn title='Light'
       icon='lightbulb-on'
       onPress={()=>{toggleTheme('light')}} 
       isActive={currentTheme ==='light'}
      />
      
      <SettingsBtn title='Dark'
       icon='weather-night'
       onPress={()=>{toggleTheme('dark')}} 
       isActive={currentTheme==='dark'}
      />

    </View>
  )
}

export default Theme

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
  },
  title:{
    fontSize:18,
    fontWeight:600,
    marginVertical:10,
  },
  btn:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    borderRadius:15,
    marginBottom:10
  }

})