import { View, Text , StyleSheet, StatusBar, Image} from 'react-native'
import React, { useEffect } from 'react'

const SplashScreen = ({Oncomplete}) => {
    
    useEffect(() => {
        const timer = setTimeout(() => {
            Oncomplete();
        }, 3000);
        
        return () => clearTimeout(timer);
    }, [Oncomplete]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Najeeb Mart</Text>
           <Image style={styles.img} source={require('../assets/images/splashimg.png')}/>
            <StatusBar barStyle={'light-content'}/>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    title:{
        fontSize : 30,
        color : 'black',
        marginTop:10,
    },
    img:{
        height:350,
        width:350,
        resizeMode:'contain'
    },
})