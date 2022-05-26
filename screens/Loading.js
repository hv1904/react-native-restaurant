import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";

const Loading = () => {
  return (
    <View
      style={{
        height: SIZES.height,
        width: SIZES.width,
        position: "absolute",
        zIndex: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: 120,
          width: 120,
          borderRadius: 60,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: '#fff'
        }}
      >
        <ActivityIndicator size={"large"} color={COLORS.primary} />
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
