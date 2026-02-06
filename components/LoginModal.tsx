import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface Props {
  visible: boolean;
  remainingClicks: number;
  onClose: () => void;
  onLogin: () => void;
}

export default function LoginModal({
  visible,
  remainingClicks,
  onClose,
  onLogin,
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Login necessário</Text>
          <Text style={styles.subtitle}>
            Tentativas restantes: {remainingClicks}
          </Text>

          <TouchableOpacity style={styles.btn} onPress={onLogin}>
            <Text style={styles.btnText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancel}>Cancelar</Text>
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
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    width: "80%",
  },
  title: {
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 16,
    color: "#64748b",
  },
  btn: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "900",
  },
  cancel: {
    textAlign: "center",
    marginTop: 12,
    color: "#64748b",
    fontWeight: "700",
  },
});
