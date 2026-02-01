import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Pressable,
  Image,
  Modal,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { GasoInput } from "../../components/GasoInput";
import { GasoButton } from "../../components/GasoButton";
import { COLORS } from "../../constants/Colors";
import LogoIcon from "../../assets/logo/logo.png";

const { height, width } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [currentMessage, setCurrentMessage] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const messages = [
    "Bem-vindo ao Gasolink!",
    "Economize tempo e dinheiro.",
    "Controle seu veículo facilmente.",
    "Segurança ao abastecer"
    
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 3000);

    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    return () => clearInterval(timer);
  }, []);

  const handleLogin = () => {
    try {
      router.replace("/home");
    } catch {
      setModalMsg("Erro ao navegar. Verifique a rota de destino.");
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.main}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="alert-circle" size={44} color="#ef4444" />
            <Text style={styles.modalTitle}>Atenção</Text>
            <Text style={styles.modalText}>{modalMsg}</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Entendido</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
            <Image
              source={LogoIcon}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>GasoLink</Text>

            <Animated.View style={{ opacity: fadeAnim, marginTop: 10 }}>
              <Text style={styles.animatedText}>
                {messages[currentMessage]}
              </Text>
            </Animated.View>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.title}>Olá novamente!</Text>
            <Text style={styles.subtitle}>
              Acesse sua conta para continuar.
            </Text>

            <GasoInput label="E-mail" value={email} onChangeText={setEmail} />
            <GasoInput
              label="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Pressable
              style={styles.forgot}
              onPress={() => {
                setModalMsg("Recuperação de senha em breve.");
                setModalVisible(true);
              }}
            >
              <Text style={styles.forgotText}>Esqueceu a senha?</Text>
            </Pressable>

            <GasoButton title="Entrar na Conta" onPress={handleLogin} />

            <Pressable
              style={styles.footerBtn}
              onPress={() => router.push("/registro")}
            >
              <Text style={styles.footerText}>
                Não tem conta?{" "}
                <Text style={styles.footerHighlight}>Cadastre-se</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: "#FFF" },
  header: {
    height: height * 0.38,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  logoImage: { width: 80, height: 80 },
  logoText: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 2,
  },
  animatedText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    textAlign: "center",
  },
  formCard: { flex: 1, padding: 30 },
  title: { fontSize: 28, fontWeight: "900", color: "#0f172a" },
  subtitle: { fontSize: 15, color: "#64748b", marginBottom: 20 },
  forgot: { alignSelf: "flex-end", marginBottom: 15 },
  forgotText: { color: "#3b82f6", fontWeight: "700" },
  footerBtn: { marginTop: 30, alignItems: "center" },
  footerText: { color: "#64748b" },
  footerHighlight: { fontWeight: "900", color: COLORS.primary },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: "#FFF",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "900", marginTop: 10 },
  modalText: { textAlign: "center", marginVertical: 15, color: "#64748b" },
  modalButton: {
    backgroundColor: "#0f172a",
    paddingVertical: 12,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: { color: "#FFF", fontWeight: "700" },
});
