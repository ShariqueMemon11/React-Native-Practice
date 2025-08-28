import { View, Text, Switch, StyleSheet } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { useTabBar } from '@/app/src/context/TabBarContext'
import {Feather ,MaterialCommunityIcons} from '@expo/vector-icons'
import { ThemeContext } from '@/app/src/context/ThemeContext'

const TabBarLayout1 = () => {
  const { setVariant, variant } = useTabBar();
  const { currentTheme } = useContext(ThemeContext)

  const isDark = currentTheme === 'dark'
  const colors = useMemo(() => ({
    background: isDark ? '#212121' : '#f7f7fb',
    card: isDark ? '#212121' : '#ffffff',
    textPrimary: isDark ? '#e6e6e6' : '#1f2937',
    textSecondary: isDark ? '#a8b0ba' : '#6b7280',
    border: isDark ? '#2a2f3a' : '#e5e7eb',
    accent: '#34d399'
  }), [isDark])

  const isOn = variant === 'layout1'

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: colors.background }}>
      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: 16,
          padding: 20,
          shadowColor: '#000',
          shadowOpacity: 0.4,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
          borderWidth: isDark ? 0 : 1,
          borderColor: colors.border
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isDark ? '#0e9f6e22' : '#723FEB'
            }}
          >
            <MaterialCommunityIcons name="shape" size={22} color={colors.accent} />
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={{ color: colors.textPrimary, fontSize: 18, fontWeight: '700' }}>Tab Bar Layout 1</Text>
            <Text style={{ color: colors.textSecondary, marginTop: 2 ,fontSize:12}}>Clean, rounded tabs with elevation and animations</Text>
          </View>
        </View>

        <View
          style={{
            height: 64,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: isDark ? '#111418' : '#f9fafb',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginBottom: 18
          }}
        >
          <View style={styles.iconstyle}>
          <Feather name="home" size={22} color={isDark ? 'white' : 'black'} />
          <Text style={[styles.textstyle,{color : isDark ? 'white' : 'black'}]}>Home</Text>
          </View>
          <View style={styles.iconstyle}>
          <MaterialCommunityIcons name="plus" size={24}  color={isDark ? 'white' : 'black'} />
          <Text style={[styles.textstyle,{color : isDark ? 'white' : 'black'}]}>Add</Text>
          </View>
          <View style={styles.iconstyle}>
          <Feather name="user" size={22}  color={isDark ? 'white' : 'black'} />
          <Text style={[styles.textstyle,{color : isDark ? 'white' : 'black'}]}>Profile</Text>
          </View>
         
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 23,
              backgroundColor: '#723FEB',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <MaterialCommunityIcons name="cog" size={22} color={'white'} />
       
          </View>
             </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ color: colors.textPrimary, fontSize: 16, fontWeight: '600' }}>Apply this layout</Text>
            <Text style={{ color: colors.textSecondary, marginTop: 4 }}>Switch on to use Layout 1 for tabs</Text>
          </View>
          <Switch
            value={isOn}
            onValueChange={(next) => setVariant(next ? 'layout1' : 'layout2')}
            trackColor={{ false: isDark ? '#3a3f4a' : '#e5e7eb', true: '#34d399' }}
            thumbColor={isOn ? '#ffffff' : isDark ? '#c7cdd6' : '#ffffff'}
            ios_backgroundColor={isDark ? '#3a3f4a' : '#e5e7eb'}
          />
        </View>
      </View>
    </View>
  )
}

export default TabBarLayout1

const styles = StyleSheet.create({
  iconstyle:{
    flexDirection:'column',justifyContent:'center',alignItems:'center'
  },
  textstyle:{color:'#9aa4af' , marginTop:2}
})