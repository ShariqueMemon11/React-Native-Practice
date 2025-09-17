import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

// Simple card component (no variants). Duplicate usage for Silver/Gold/Platinum.
const TierCard = ({
  title,
  subtitle,
  price,
  features = [],
  buttonLabel = 'View Pricing',
  colors,
  route,
  onPress,
}) => {
  const defaultPalette = {
    cardBg: '#B2B0B3',
    headerText: 'white',
    priceText: 'white',
    panelBg: '#FFFFFF',
    bulletBg: '#4D8EF7',
    bulletText: '#FFFFFF',
    featureText: '#333333',
    buttonBg: '#B50D0D',
    buttonText: '#FFFFFF',
  }
  const palette = { ...defaultPalette, ...(colors || {}) }
  return (
    <View style={{
      width: '90%',
      alignSelf: 'center',
      backgroundColor: palette.cardBg,
      borderRadius: 20,
      padding: 35,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 6,
      marginBottom:-380
    }}>
      <Text style={{
        fontFamily: 'Poppins',
        fontWeight: '700',
        fontSize: 22,
        color: palette.headerText,
        textAlign: 'center',
        marginBottom: 6,
      }}>{title}</Text>
      {!!subtitle && (
        <Text style={{
          fontFamily: 'Montserrat',
          fontSize: 12,
          color: palette.headerText,
          textAlign: 'center',
          marginBottom: 12,
        }}>{subtitle}</Text>
      )}
      <Text style={{
        fontFamily: 'Poppins',
        fontWeight: '700',
        fontSize: 28,
        color: palette.priceText,
        textAlign: 'center',
        marginBottom: 14,
      }}>{price}</Text>

      <View style={{
        backgroundColor: palette.panelBg,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
      }}>
        {features.map((feature, idx) => (
          <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 6 }}>
            <View style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: palette.bulletBg,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
              <Text style={{ color: palette.bulletText, fontSize: 12 }}>✓</Text>
            </View>
            <Text style={{
              flex: 1,
              fontFamily: 'Montserrat',
              fontSize: 12,
              color: palette.featureText,
            }}>{feature}</Text>
            
          </View>
        ))} 
        <TouchableOpacity
          style={{
            backgroundColor: palette.buttonBg,
            height: 44,
            borderRadius: 22,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={onPress}
        >
          <Text style={{ color: palette.buttonText, fontFamily: 'Poppins', fontWeight: '600' }}>{buttonLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TierCard

