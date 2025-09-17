import { View, Text, TouchableOpacity , Image, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'


const goldpricing = () =>  {
const [showchangeprice , setchangeprice] = useState(false)
return (
  <View style={styles.maincontainer}>
    <TouchableOpacity onPress={() => router.push('/src/component/membership')} style={{ paddingVertical:0 , marginTop: 12 , marginBottom:-12 , marginRight:330}}>
         <Feather name="arrow-left" size={24} color="black" />
    </TouchableOpacity>
    <Image style={styles.img} source={require('../src/images/sana.png')} />     
    <Text style={styles.headertext}>Become  SANA’s Community {'\n'} Gold Member</Text>
    <Text style={styles.subtext}>Join the Sindhi community across North {'\n'} America. Access events, scholarships, {'\n'} networking, and more.</Text>
    <View style={styles.btns}>
      <TouchableOpacity style={styles.btnM} onPress={() => setchangeprice(false)}>
        <Text style={styles.btntext}>Monthly</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnY} onPress={() => setchangeprice(true)}>
        <Text style={styles.btntext}>Yearly</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={()=>router.push({pathname:'/src/screens/SigninScreen',params:{plan:'gold',membership:'gold Single Membership' , price: !showchangeprice ? '$7.99/PerMonth' : '$14.99/Per Year'}}) }>
    <View style={styles.pricingcon}>
      <Feather name='users' color={'white'} size={30} style={{marginLeft:-20, alignSelf:"center"}}/>
      <View>
      <Text style={{color:'white' , fontSize:14 , marginBottom:5}}>Single Membership</Text>
      {!showchangeprice
      ? <Text style={{color:'white' , fontSize:18}}>7.99 $ /Monthly</Text>
      : <Text style={{color:'white' , fontSize:18}}>14.99 $ /Yearly</Text>
      }  
      </View>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>router.push({pathname:'/src/screens/SigninScreen',params:{plan:'gold',membership:'gold Single Membership' , price: !showchangeprice ? '$14.99/PerMonth' : '$28.99/Per Year'}}) }>
    <View style={styles.pricingcon2}>
      <Feather name='users' color={'white'} size={30} style={{marginLeft:-20, alignSelf:"center"}}/>
      <View>      
      <Text style={{color:'white' , fontSize:14 , marginBottom:5}}>Family Membership</Text>
      {!showchangeprice
      ? <Text style={{color:'white' , fontSize:18}}>14.99 $ /Monthly</Text>
      : <Text style={{color:'white' , fontSize:18}}>28.99 $ /Yearly</Text>
      }
      </View>    
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>router.push({pathname:'/src/screens/SigninScreen',params:{plan:'gold',membership:'gold Single Membership' , price: !showchangeprice ? '$5.99/PerMonth' : '$10.99/Per Year'}}) }>
    <View style={[styles.pricingcon,{marginTop:15}]}>
      <Feather name='users' color={'white'} size={30} style={{marginLeft:-20, alignSelf:"center"}}/>
      <View>
      <Text style={{color:'white' , fontSize:14 , marginBottom:5}}>Student Single</Text>
      {!showchangeprice
      ? <Text style={{color:'white' , fontSize:18}}>5.99 $ /Monthly</Text>
      : <Text style={{color:'white' , fontSize:18}}>10.99 $ /Yearly</Text>
      }  
      </View>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>router.push({pathname:'/src/screens/SigninScreen',params:{plan:'gold',membership:'gold Single Membership' , price: !showchangeprice ? '$10.99/PerMonth' : '$20.99/Per Year'}}) }>
    <View style={styles.pricingcon2}>
      <Feather name='users' color={'white'} size={30} style={{marginLeft:-20, alignSelf:"center"}}/>
      <View>
      <Text style={{color:'white' , fontSize:14 , marginBottom:5}}>Student Family</Text>
      {!showchangeprice
      ? <Text style={{color:'white' , fontSize:18}}>10.99 $ /Monthly</Text>
      : <Text style={{color:'white' , fontSize:18}}>20.99 $ /Yearly</Text>
      }   
      </View>
    </View>
    </TouchableOpacity>
  </View>
)
}

export default goldpricing

const styles = StyleSheet.create({
  maincontainer:{
    paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:30
  },
  img:{
    marginTop:30
  },
  headertext:{
    marginTop:15,
    fontSize:24,
    fontFamily:'Montserrat',
    fontWeight:'600',
    textAlign:'center'
  },
  subtext:{
    marginTop:15,
    fontSize:14,
    fontFamily:'Montserrat',
    fontWeight:'500',
    textAlign:'center',
    color: '#666565'
  },
  btntext:{
    color:'white',
  },
  btns:{
    flexDirection:'row',
    gap:20,
    marginTop:30
  },
  btnM:{
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,   
    backgroundColor:"#A20000"
  },
  btnY:{
    
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,   
    backgroundColor:"#01053C"
  },
  pricingcon:{
    flexDirection:'row',
    marginTop:25,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,   
    backgroundColor:"#A20000",
    gap:30,
    paddingRight:70
  },
  pricingcon2:{
    flexDirection:'row',
    marginTop:15,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,   
    backgroundColor:"#01053C",
    gap:30,
    paddingRight:70
  }

})