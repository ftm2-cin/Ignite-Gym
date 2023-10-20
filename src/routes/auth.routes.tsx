import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SignInScreen , SignUpScreen } from "@screens";

type AuthRoutesProps = {
    SignIn: undefined;
    SignUp: undefined;
}

export type AuthNavigatorRouterProps = NativeStackNavigationProp<AuthRoutesProps>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesProps>();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false}}>
            <Screen name="SignIn" component={SignInScreen}/>
            <Screen name="SignUp" component={SignUpScreen}/>
        </Navigator>
    )
}