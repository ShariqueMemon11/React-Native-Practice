import { View, Image, Pressable, StyleSheet} from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CameraModal from '../component/camera_modal';
import { useState } from 'react';

const main = ({onNavigate}) => {
  const [scanneropen , setsacnneropen] = useState(false)
  return (
    <View style={styles.container}>
      <View style={styles.cardRow}>
        <Pressable style={styles.card} onPress={()=> {
          onNavigate('grocery');
        }}>
          <Image style={styles.cardImage} source={require('../assets/images/grocery.jpg')}/>
        </Pressable>
        <Pressable style={styles.card} onPress={()=> {
          onNavigate('medicines');
        }}>
          <Image style={styles.cardImage} source={require('../assets/images/medi.jpg')}/>
        </Pressable>
      </View>
      <View style={styles.logoWrapper}>
        <View style={styles.logoRow}>
          <View style={styles.logocon}>
            <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
          </View>
          <Pressable style={styles.scannerButton} onPress={()=>setsacnneropen(true)}>
            <MaterialCommunityIcons name="qrcode-scan" size={28} color="#fff" />
          </Pressable>
        </View>
      </View>
      <CameraModal 
      visible={scanneropen}
      onClose={()=>setsacnneropen(false)}
      onScan={(data)=>{
        console.log('qr scanned',data);
      }}
      />
    </View>
  )
}

export default main

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#f2f2f2',
    paddingHorizontal:20,
  },
  cardRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
  },
  card:{
    flex:1,
    marginHorizontal:10,
    marginBottom:470,
    backgroundColor:'#fff',
    borderRadius:16,
    padding:10,
    overflow:'hidden',
    shadowColor:'#000',
    shadowOffset:{width:0,height:4},
    shadowOpacity:0.1,
    shadowRadius:10,
    elevation:6,
  },
  cardImage:{
    width:'100%',
    height:250,
    borderRadius:12,
    resizeMode:'cover'
  },
  logoWrapper:{
    position:'absolute',
    bottom:50,
    left:0,
    right:0,
    alignItems:'center',
  },
  logoRow:{
    flexDirection:'row',
    alignItems:'center',
  },
  logocon:{
    marginBottom:-25
  },
  logo:{
    width:220,
    height:220,
    marginRight:10,
    borderRadius:12,
    resizeMode:'cover'
  },
  scannerButton:{
    width:64,
    height:64,
    marginRight:-70,
    marginTop:90,
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