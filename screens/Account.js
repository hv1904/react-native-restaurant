import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { COLORS, images } from "../constants";
import { AuthContext } from "../utils/auth_context";

export default function Account() {
  const { user, signOut } = React.useContext(AuthContext);
  console.log(user);
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}
        source={images.background}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 60,
            backgroundColor: "tomato",
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}
        >
          <Image
            style={{ height: 60, width: 60, resizeMode: "contain" }}
            source={images.avatar_1}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 20,
              color: "#fff",
            }}
          >{`Hi, ${user.fullname}`}</Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            style={{
              width: "100%",
              borderBottomWidth: 1,
              borderBottomColor: COLORS.darkgray,
              height: 40,
              justifyContent: "center",
            }}
            onPress={()=>{signOut()}}
          >
            <Text style={{fontSize: 18, color: 'white'}}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
