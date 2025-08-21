import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import React, { useContext } from 'react'
import SettingsBtn from '@/app/src/component/SettingsBtn'
import { ThemeContext } from '@/app/src/context/ThemeContext';
import TabBarLayout1 from './TabBar-Layout-1';
import TabBarlayout2 from './TabBar-Layout-2';
import { ScrollView } from 'react-native-gesture-handler';
const Theme = () => {

  const {currentTheme, toggleTheme} = useContext(ThemeContext);
  
  return (
    <ScrollView>
    <View style={[styles.container,{backgroundColor:currentTheme === 'dark' ? '#212121':'#f7f7fb'}]}>
      <View style={{padding:25 }}>
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
      <View style={{ marginBottom:80 , marginTop:-30}}>
      <TabBarLayout1/>
      <View style={{marginTop:-17}}>
      <TabBarlayout2/>
      </View>
      </View>
    </View>
    </ScrollView>
    
  )
}

export default Theme

const styles = StyleSheet.create({
  container:{
    flex:1,
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