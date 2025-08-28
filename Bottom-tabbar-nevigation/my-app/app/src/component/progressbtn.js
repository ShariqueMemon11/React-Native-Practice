import Svg, { Circle } from 'react-native-svg';
import { TouchableOpacity , View} from 'react-native';

const BUTTON_SIZE = 60;
const STROKE_WIDTH = 4;
const RADIUS = (BUTTON_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ProgressButton = ({ progress, onPress, disabled, children }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={{
      width: BUTTON_SIZE,
      height: BUTTON_SIZE,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      opacity: disabled ? 0.5 : 1,
    }}
  >
    <Svg width={BUTTON_SIZE} height={BUTTON_SIZE}>
      <Circle
        stroke="#eee"
        fill="none"
        cx={BUTTON_SIZE / 2}
        cy={BUTTON_SIZE / 2}
        r={RADIUS}
        strokeWidth={STROKE_WIDTH}
      />
      <Circle
        stroke="#007AFF"
        fill="none"
        cx={BUTTON_SIZE / 2}
        cy={BUTTON_SIZE / 2}
        r={RADIUS}
        strokeWidth={STROKE_WIDTH}
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
        strokeLinecap="round"
      />
    </Svg>
    <View style={{
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      width: BUTTON_SIZE,
      height: BUTTON_SIZE,
    }}>
      {children}
    </View>
  </TouchableOpacity>
);

export default ProgressButton