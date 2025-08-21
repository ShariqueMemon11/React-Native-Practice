import { Pressable, StyleSheet, View, GestureResponderEvent } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { iconMap } from '../constaints/icons'

type Props = {
  onPress: (event: GestureResponderEvent) => void
  onLongPress: (event: GestureResponderEvent) => void
  isFocused: boolean
  routeName: string
  labelText: string
  color?: string
  renderIcon?: (p: { color: string; focused: boolean }) => React.ReactElement
}

const TabBarBtn2: React.FC<Props> = ({ onPress, onLongPress, isFocused, routeName, color, renderIcon }) => {
  

  const FallbackIcon = (p: { color: string }) => <Feather name="circle" size={22} {...p} />
  const normalizedRouteName = (routeName?.split('/')?.pop() ?? routeName) as string
  const DefaultIcon = iconMap[normalizedRouteName] ?? FallbackIcon
  const IconComponent = renderIcon
    ? (p: { color: string }) => renderIcon({ color: p.color, focused: isFocused })
    : (p: { color: string }) => <DefaultIcon {...p} />

  const iconColor = color ?? (isFocused ? 'white' : 'gray')

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
      accessibilityRole="button"
      accessibilityState={{ selected: isFocused }}
    >
      <View style={styles.iconWrapper}>
        <IconComponent color={iconColor} />
      </View>
      
    </Pressable>
  )
}

export default TabBarBtn2

const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})