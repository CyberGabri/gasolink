import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  version: string;
  onUpdate: () => void;
};

export default function ForceUpdateModal({
  visible,
  version,
  onUpdate,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Atualização obrigatória</Text>
          <Text style={styles.text}>
            Uma nova versão do Gasolink ({version}) está disponível.
            {"\n\n"}
            Para continuar usando o app, você precisa atualizar.
          </Text>

          <TouchableOpacity style={styles.button} onPress={onUpdate}>
            <Text style={styles.buttonText}>Atualizar agora</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    color: "#444",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0D6EFD",
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
