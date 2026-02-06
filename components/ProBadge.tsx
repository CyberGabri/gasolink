import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProBadge() {
  const handlePress = () => {
    Alert.alert(
      "Gasolink Pro",
      "Dalvan está utilizando a versão Pro deste aplicativo 🚀",
      [{ text: "OK" }]
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={handlePress}
    >
      <MaterialIcons name="verified" size={18} color="#FACC15" />
      <Text style={styles.text}>Gasolink Pro</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#111827",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 6,

    ...(Platform.OS === "web"
      ? { boxShadow: "0 4px 10px rgba(0,0,0,0.25)" }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 4,
        }),
  },
  text: {
    color: "#FACC15",
    fontWeight: "600",
    marginLeft: 6,
    fontSize: 13,
  },
});
