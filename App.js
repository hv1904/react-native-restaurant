import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./utils/auth_context";
import { Restaurant } from "./screens";
import * as _ from 'lodash';
import Tabs from "./navigation/tabs";
import Loading from "./screens/Loading";
import Login from "./screens/Login";


const userData = [
  {
    id: 1,
    username: 'huevu',
    password: '123456',
    fullname: "Vu Thi Hue",
  },
  {
    id: 2,
    username: 'tsubasa',
    password: '123456',
    fullname: "tsubasa pham",
  },
]

const Stack = createNativeStackNavigator();
export default function App() {
  const [loading, setLoading] = React.useState(false);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SIGN_IN_SUCCESS":
          return {
            ...prevState,
            userToken: action.token,
            user: action.user,
          };
        case "SET_ERR":
           return {
             ...prevState,
             error: action.error
           }
        default:
          break;
      }
    },
    {
      isLoading: false,
      isSignOut: false,
      isGetting: true,
      userToken: null,
      user: {},
      theme: "light",
      currency: "USD",
      positionCurrency: "left",
      countries: [],
      expireCountry: "",
      loadingCountry: false,
      error: null,
    }
  );

  const authContext = React.useMemo(() => ({
    signIn: async ({ username, password }) => {
      setLoading(true);
      const userMap = await _.filter(userData, (e)=> {
        if(e.username === username.toLowerCase().trim() && e.password === password.toLowerCase().trim()) return e
      })
      try {
        setTimeout( () => {
          if(userMap.length > 0) {
            setLoading(false);
            dispatch({ type: "SIGN_IN_SUCCESS",token: username, user: userMap[0] });
            dispatch({ type: "SET_ERR", error: '' });
          }
          else {
            setLoading(false);
            dispatch({ type: "SET_ERR", error: "Login Failed" });
          }
        }, 1000);
      } catch (error) {
        setLoading(false);
        dispatch({ type: "SET_ERR", error: "Login Failed" });
    }},
    signInSuccess: async ({ token, user }) => {
      await AsyncStorage.setItem("user", JSON.stringify({ token, user }));
      dispatch({ type: "SIGN_IN_SUCCESS", token, user });
      showMessage({
        message: "Login",
        description: "Login Success",
        type: "success",
      });
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem("user");
        dispatch({ type: "SIGN_OUT" });
      } catch (e) {
        console.log(e);
      }
    },
  }));

  return (
    <View style={{flex:1}}>
      {loading ? <Loading /> : null}
      <NavigationContainer>
        <AuthContext.Provider value={{ ...authContext, ...state }}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={"Login"}
          >
            {!state.userToken ? (
              <Stack.Screen name="Login" component={Login} />
            ) : (
              <>
                <Stack.Screen name="Home" component={Tabs} />
                <Stack.Screen name="Restaurant" component={Restaurant} />
              </>
            )}
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    </View>
  );
}
