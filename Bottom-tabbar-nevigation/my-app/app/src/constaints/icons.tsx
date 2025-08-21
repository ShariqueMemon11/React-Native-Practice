import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export const iconMap: Record<string, (props: { color: string }) => React.ReactElement> = {
    '(Home)': (props) => <Feather name='home' size={24} {...props} />,
    Profile: (props) => <Feather name='user' size={24} {...props} />,
    '(Add)': (props) => <Feather name='plus' size={24} {...props} />,
    Webview: (props) => <MaterialCommunityIcons name="web" size={22} {...props} />,
    Settings: (props) => <Feather name='settings' size={24} {...props} />,
  };