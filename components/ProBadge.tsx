import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
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
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <MaterialIcons name="verified" size={18} color="#FFCC00" />
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 6,
  },
  text: {
    color: "#facc15",
    fontWeight: "600",
    marginLeft: 6,
    fontSize: 13,
  },
});
