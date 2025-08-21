import { View, Text, StyleSheet, StatusBar, Image} from 'react-native'
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
            <Image style={styles.imgtop} source={require('../images/topstyle.png')}/>
            <Image style={styles.img} source={require('../images/logo.png')}/>
            <Image style={styles.imgbottom} source={require('../images/bottomstyle.png')}/>
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
        backgroundColor:'#185f9f'
    },
    img:{
        height:51.83,
        width:194,
        marginTop:220,
        marginBottom:220
    },
    imgtop:{
        height:212.02462768554688,
        width:403.0001525878906,
        marginTop:-500,
        opacity:0.1,
    },
    imgbottom:{
        height:212.02462768554688,
        width:403.0001525878906,
        marginBottom:-500,
        opacity:0.1
    }
})