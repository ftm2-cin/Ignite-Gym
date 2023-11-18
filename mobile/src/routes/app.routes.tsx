import { useTheme } from 'native-base';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { HomeScreen, ExerciseScreen, HistoryScreen, ProfileScreen } from "@screens";
import HomeSvg from '@assets/home.svg';
import HistorySvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';

type AppRoutesProps = {
    Home: undefined;
    History: undefined;
    Profile: undefined;
    Exercise: undefined;
}

export type AppRoutesNavigationProps = BottomTabNavigationProp<AppRoutesProps>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>();

export function AppRoutes() {

    const { sizes, colors } = useTheme();
    const iconSize = sizes[6];


    return (
        <Navigator screenOptions={{ 
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.green[500],
            tabBarInactiveTintColor: colors.gray[200],
            tabBarStyle: {
                height: sizes[16],
                backgroundColor: colors.gray[600],
                borderTopWidth: 0,
            }
        }}>
            <Screen 
                name="Home" 
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => <HomeSvg fill={color} width={iconSize} height={iconSize}/>,
                }}
            />
            <Screen 
                name="History" 
                component={HistoryScreen}
                options={{
                    tabBarIcon: ({ color }) => <HistorySvg fill={color} width={iconSize} height={iconSize}/>
                }}
            />
            <Screen 
                name="Profile" 
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => <ProfileSvg fill={color} width={iconSize} height={iconSize}/>
                }}
            />
            <Screen 
                name="Exercise" 
                component={ExerciseScreen}
                options={{
                    tabBarButton: () => null,
                }}
            />
        </Navigator>
    )
}