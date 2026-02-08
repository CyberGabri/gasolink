import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProBadge() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.name}>Gasolink IA</Text>

        <View style={styles.proContainer}>
          <MaterialIcons name="verified" size={20} color="#000000" />
          <Text style={styles.proText}>PRO</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <MaterialIcons name="verified" size={28} color="#FFFFFF" />

            <Text style={styles.modalTitle}>Gasolink Pro</Text>
            <Text style={styles.modalText}>
              Você está utilizando a versão Pro do Gasolink IA
            </Text>

            <Pressable style={styles.button} onPress={() => setVisible(false)}>
              <Text style={styles.buttonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginTop: 4,
    minWidth: 150,

    ...(Platform.OS === "web"
      ? { boxShadow: "0 3px 8px rgba(0, 0, 0, 0.35)" }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.35,
          shadowRadius: 3,
          elevation: 4,
        }),
  },

  name: { color: "#fff", fontSize: 16, fontWeight: "600" },

  proContainer: { flexDirection: "row", alignItems: "center", gap: 6 },

  proText: { color: "#fff", fontSize: 14, fontWeight: "800", letterSpacing: 0.5 },

  overlay: {
    flex: 6,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    backgroundColor: "#000",
    borderRadius: 16,
    padding: 40,
    width: "90%",
    alignItems: "center",
  },

  modalTitle: { color: "#fff", fontSize: 18, fontWeight: "700", marginTop: 8 },
  modalText: { color: "#fff", fontSize: 15, textAlign: "center", marginTop: 8, opacity: 0.85 },

  button: {
    marginTop: 16,
    borderWidth: 0.5,
    borderColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
  },

  buttonText: { color: "#fff", fontWeight: "600", fontSize: 14 },
});
