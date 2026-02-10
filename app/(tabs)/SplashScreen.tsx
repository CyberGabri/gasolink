import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";


async function getPushToken() {
  if (!Device.isDevice) return null;

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") return null;

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

export default function SplashScreen() {
  useEffect(() => {
    async function initPush() {
      const token = await getPushToken();
      if (token) {
        console.log("Expo Push Token:", token);
       
      }
    }

    initPush();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <Text style={styles.title}>Gasolink</Text>
      <Text style={styles.subtitle}>liga você ao caminho</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  subtitle: {
    marginTop: 12,
    color: "#AAAAAA",
    fontSize: 16,
    letterSpacing: 1,
  },
});
