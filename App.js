import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./utils/auth_context";
import { Restaurant } from "./screens";
import Tabs from "./navigation/tabs";
import Loading from "./screens/Loading";
import Login from "./screens/Login";

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
    }
  );

  const authContext = React.useMemo(() => ({
    signIn: async ({ username, password }) => {
        console.log(username,password);
      setLoading(true);
      let user = {
        name: "user",
      };
      try {
        setTimeout(() => {
          dispatch({ type: "SIGN_IN_SUCCESS",token: username, user });
          setLoading(false);
        }, 2000);
      } catch (error) {
        showMessage({
          message: "Login",
          description: error.message.replace(regex, ""),
          type: "danger",
        });
        dispatch({ type: "SIGN_IN_ERROR", error });
      }
    },
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

  console.log(state.userToken)

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
