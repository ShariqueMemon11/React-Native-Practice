import { View, Text, TouchableOpacity , Image, StyleSheet, Alert} from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'


const silver = () =>  {
  const [showchangeprice , setchangeprice] = useState(false)
  return (
    <View style={styles.maincontainer}>
      <TouchableOpacity onPress={() => router.push('/src/component/membership')} style={{ paddingVertical:0 , marginTop: 12 , marginBottom:-12 , marginRight:330}}>
           <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Image style={styles.img} source={require('../src/images/sana.png')} />     
      <Text style={styles.headertext}>Become  SANA’s Community {'\n'} silver Member</Text>
      <Text style={styles.subtext}>Join the Sindhi community across North {'\n'} America. Access events, scholarships, {'\n'} networking, and more.</Text>
      <View style={styles.btns}>
        <TouchableOpacity style={styles.btnM} onPress={() => setchangeprice(false)}>
          <Text style={styles.btntext}>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnY} onPress={() => setchangeprice(true)}>
          <Text style={styles.btntext}>Yearly</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={()=>router.push({pathname:'/src/screens/SigninScreen',params:{plan:'silver',membership:'Silver Single Membership' , price: !showchangeprice ? '$4.99/PerMonth' : '$8.99/Per Year'}}) }>
      <View style={styles.pricingcon}>
        <Feather name='users' color={'white'} size={30} style={{marginLeft:-20, alignSelf:"center"}}/>
        <View>
        <Text style={{color:'white' , fontSize:14 , marginBottom:5}}>Single Membership</Text>
        {!showchangeprice
        ? <Text style={{color:'white' , fontSize:18}}>4.99 $ /Monthly</Text>
        : <Text style={{color:'white' , fontSize:18}}>8.99 $ /Yearly</Text>
        }  
        </View>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push({pathname:'/src/screens/SigninScreen',params:{plan:'silver',membership:'Silver Family Membership' , price: !showchangeprice ? '$4.99/PerMonth' : '$8.99/PerYear'}}) }>
      <View style={styles.pricingcon2}>
        <Feather name='users' color={'white'} size={30} style={{marginLeft:-20, alignSelf:"center"}}/>
        <View>
        <Text style={{color:'white' , fontSize:14 , marginBottom:5}}>Family Membership</Text>
        {!showchangeprice
        ? <Text style={{color:'white' , fontSize:18}}>7.99 $ /Monthly</Text>
        : <Text style={{color:'white' , fontSize:18}}>14.99 $ /Yearly</Text>
        }  
        </View>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push({pathname:'/src/screens/SigninScreen',params:{plan:'silver',membership:'Silver Student Membership' , price: !showchangeprice ? '$4.99/PerMonth' : '$8.99/PerYear'}}) }>
      <View style={[styles.pricingcon,{marginTop:15}]}>
        <Feather name='users' color={'white'} size={30} style={{marginLeft:-20, alignSelf:"center"}}/>
        <View>
        <Text style={{color:'white' , fontSize:14 , marginBottom:5}}>Student Single</Text>
        {!showchangeprice
        ? <Text style={{color:'white' , fontSize:18}}>3.99 $ /Monthly</Text>
        : <Text style={{color:'white' , fontSize:18}}>6.99 $ /Yearly</Text>
        }  
        </View>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push({pathname:'/src/screens/SigninScreen',params:{plan:'silver',membership:'Silver Student Family Membership' , price: !showchangeprice ? '$4.99/PerMonth' : '$8.99/PerYear'}}) }>
      <View style={styles.pricingcon2}>
        <Feather name='users' color={'white'} size={30} style={{marginLeft:-20, alignSelf:"center"}}/>
        <View>
        <Text style={{color:'white' , fontSize:14 , marginBottom:5}}>Student Family</Text>
        {!showchangeprice
        ? <Text style={{color:'white' , fontSize:18}}>8.99 $ /Monthly</Text>
        : <Text style={{color:'white' , fontSize:18}}>16.99 $ /Yearly</Text>
        }   
        </View>
      </View>
      </TouchableOpacity>
    </View>
    
  )
  }
export default silver

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