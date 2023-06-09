import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NAVIGATION_KEY from "../constans/NavigationKey";
import AuthNavigator from "./AuthNavigator";
import SamplePopupScreen from "../src/screens/SamplePopupScreen";
import AppTabsNavigator from "./AppTabsNavigator";
import LoginScreen from "../src/screens/LoginScreen";
import SignupScreen from "../src/screens/SignupScreen/Signup";
import IntroductionScreen from "../src/screens/Introduction/Introduction";
import TransactionDetailsScreen from "../src/screens/Transaction/transactionDetails";
import thisMonth from "../src/screens/Transaction/thismonth";
import { Button, Text } from "native-base";
import AddTranSactionScreen from "../src/screens/AddTransaction/addtransaction";
import AuthContext from "./AuthContext";
import { useContext } from 'react';
import ChangeAccountScreen from "../src/screens/User/changepassword";
import Wallet from "../src/screens/User/wallet";
import Tienmat from "../src/screens/User/tienmat";
export default function Navigation() {
  // hooks
  //const [isAppReady, setAppReady] = useState(false);
  //const isLogin = useSelector((state) => state.auth.isLogin); 
  // action
  const prepare = async () => {
    // await waitAsyncAction(2000);
    // rehydrate
    // const token = (await storage.get('token')) ?? '';
    // dispatch(reLogin({ token: token }));
    // dispatch(
    //     changeApplicationState({
    //         isAppReady: true,
    //     }),
    // );
  };

  return (
    <NavigationContainer onReady={prepare}>
      <RootNavigator />
    </NavigationContainer>
  );
}
const Stack = createNativeStackNavigator();
function RootNavigator({navigation}) {
  // const isAppReady = useAppSelector((state) => state.application.isAppReady);
  // const { isLogin } = useAppSelector((state) => state.auth);
  const { isLogin } = useContext(AuthContext);
  // console.log(isAppReady);
  // if (!isAppReady) {
  //     return <IntroScreen />;
  // }
  return (
    <Stack.Navigator>
      {!isLogin ? (
        <Stack.Screen
          name={NAVIGATION_KEY.Auth}
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name={NAVIGATION_KEY.AppTabs}
            component={AppTabsNavigator}
            options={{ headerShown: false }}
          />
        </>
      )}
      <Stack.Group
        navigationKey={isLogin ? "user" : "guest"}
        screenOptions={{ presentation: "modal" }}
      >
        <Stack.Screen
          name={NAVIGATION_KEY.SamplePopup}
          component={SamplePopupScreen}
          options={{ headerShown: true }}
        />
      </Stack.Group>
      <Stack.Group >
        <Stack.Screen
          name={"addtransaction"}
          component={AddTranSactionScreen}
          options={{
            
            headerShown: false,

            title: "Thêm giao dịch",
          }}
        />
      </Stack.Group>

      <Stack.Screen
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
        name="introduction"
        component={IntroductionScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
        name="login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
        name="signup"
        component={SignupScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: "Chi tiết giao dịch",
          headerBackTitle: "Trở về",
          headerBackTitleVisible: true,
        }}
        name="transactiondetails"
        component={TransactionDetailsScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: "Đổi mật khẩu",
          headerBackTitle: "Trở về",
          headerBackTitleVisible: true,
        }}
        name="changepassword"
        component={ChangeAccountScreen}
      />
        <Stack.Screen
        options={{
          headerTitle: "Ví",
          headerBackTitle: "Trở về",
          headerBackTitleVisible: true,
        }}
        name="wallet"
        component={Wallet}
      />
        <Stack.Screen
        options={{
          headerTitle: "Tiền mặt",
          headerBackTitle: "Trở về",
          headerBackTitleVisible: true,
        }}
        name="tienmat"
        component={Tienmat}
      />
    </Stack.Navigator>
  );
}
