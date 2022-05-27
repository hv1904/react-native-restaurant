import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import React from "react";
import { AuthContext } from "../utils/auth_context";
import { COLORS, images } from "../constants";

export default function Login() {
  const { signIn, error } = React.useContext(AuthContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userErr, setUserErr] = React.useState(false);
  const [passErr, setPasswordErr] = React.useState(false);

  const onSignIn = async () => {
    if (username === "") {
      setUserErr(true);
      return;
    }
    else {
      setUserErr(false);
    }
    if (password === "") {
      setPasswordErr(true);
      return;
    }
    else {
      setPasswordErr(false);
    }
    const res = await signIn({ username, password });
    console.log(res);
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 30,
        }}
        source={images.background}
      >
        <Text style={{ fontSize: 30, marginBottom: 20, color: "#fff" }}>
          Login
        </Text>
        {error && error !== "" && (
          <Text style={{ marginTop: 5, fontSize: 16, color: "red" }}>
            {error}
          </Text>
        )}
        <View style={{ width: "100%", marginTop: 10 }}>
          <Text style={{ fontSize: 18, color: "#fff" }}>Username</Text>
          <TextInput
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={{
              width: "100%",
              paddingVertical: 5,
              fontSize: 16,
              marginTop: 5,
              borderBottomWidth: 1,
              borderBottomColor: "#fff",
              color: "#fff",
            }}
          />
          {userErr && (
            <Text style={{ marginTop: 5, fontSize: 14, color: "red" }}>
              Fill data
            </Text>
          )}
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Text style={{ fontSize: 18, color: "#fff" }}>Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={{
              width: "100%",
              // backgroundColor: "red",
              paddingVertical: 5,
              fontSize: 16,
              marginTop: 5,
              borderBottomWidth: 1,
              borderBottomColor: "#fff",
              color: "#fff",
            }}
          />
          {passErr && (
            <Text style={{ marginTop: 5, fontSize: 14, color: "red" }}>
              Fill data
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={{
            marginTop: 60,
            width: "100%",
            height: 50,
            backgroundColor: COLORS.primary,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
          }}
          onPress={onSignIn}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Login</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
