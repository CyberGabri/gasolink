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
        activeOpacity={0.85}
        style={styles.container}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.name}>Gasolink IA</Text>

        <View style={styles.proContainer}>
          <MaterialIcons name="verified" size={18} color="#2563eb" />
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
            <MaterialIcons name="verified" size={32} color="#2563eb" />

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
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    minWidth: 180,

    ...(Platform.OS === "web"
      ? { boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 4,
        }),
  },

  name: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.3,
  },

  proContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  proText: {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.6,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 36,
    width: "90%",
    alignItems: "center",
  },

  modalTitle: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 10,
  },

  modalText: {
    color: "#475569",
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#2563eb",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 999,
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
});
