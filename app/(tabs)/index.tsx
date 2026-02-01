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
} from "react-native";
import { useRouter } from "expo-router";
import { MotiView, MotiText, AnimatePresence } from "moti";

import { GasoInput } from "../../components/GasoInput"; // Ajuste o caminho se necessário
import { GasoButton } from "../../components/GasoButton";
import { COLORS } from "../../constants/Colors";


import LogoIcon from "../../assets/logo/logo.png";

const { height } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const messages = [
    "Bem-vindo ao Gasolink!",
    "Acompanhe seus abastecimentos.",
    "Economize tempo e dinheiro.",
    "Controle seu veículo facilmente."
  ];
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    // Aqui você faria a lógica de autenticação
    console.log({ email, password });
    // Navega para a home-screen dentro de (tabs)
    router.replace("/(tabs)/home-screen");
  };

  return (
    <View style={styles.main}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER ANIMADO COM LOGO */}
          <MotiView
            from={{
              height: height * 0.45,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
            animate={{
              height: height * 0.38,
              borderBottomLeftRadius: 60,
              borderBottomRightRadius: 60,
            }}
            transition={{ type: "timing", duration: 800 }}
            style={styles.header}
          >
            <MotiView
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 300, type: "spring" }}
              style={styles.logoContainer}
            >
              <Image 
                source={LogoIcon} 
                style={styles.logoImage} 
                resizeMode="contain" 
              />
              <Text style={styles.logoText}>GasoLink</Text>
            </MotiView>

            {/* TEXTO ROTATIVO COM ANIMAÇÃO DE TROCA */}
            <View style={styles.messageWrapper}>
              <AnimatePresence exitBeforeEnter>
                <MotiText
                  key={currentMessage}
                  from={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: -10 }}
                  transition={{ type: "timing", duration: 500 }}
                  style={styles.animatedText}
                >
                  {messages[currentMessage]}
                </MotiText>
              </AnimatePresence>
            </View>
          </MotiView>

          {/* FORMULÁRIO DE LOGIN */}
          <View style={styles.formCard}>
            <MotiView
               from={{ opacity: 0, translateY: 20 }}
               animate={{ opacity: 1, translateY: 0 }}
               transition={{ delay: 600 }}
            >
              <Text style={styles.title}>Olá novamente!</Text>
              <Text style={styles.subtitle}>Acesse sua conta para continuar.</Text>

              <GasoInput
                label="E-mail"
                placeholder="seu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <GasoInput
                label="Senha"
                placeholder="••••••••"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <View style={{ marginTop: 10 }}>
                <GasoButton title="Entrar na Conta" onPress={handleLogin} />
              </View>
            </MotiView>

            {/* BOTÃO DE CADASTRO */}
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1000 }}
              style={styles.footerBtnContainer}
            >
              <Pressable
                style={styles.footerBtn}
                onPress={() => router.push("/registro")}
              >
                <Text style={styles.footerText}>
                  Não tem conta? <Text style={styles.bold}>Cadastre-se</Text>
                </Text>
              </Pressable>
            </MotiView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: COLORS?.white || "#FFF" },
  header: {
    backgroundColor: COLORS?.primary || "#000",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
  },
  logoContainer: { alignItems: "center" },
  logoImage: {
    width: 80, 
    height: 80,
    marginBottom: 8,
  },
  logoText: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  messageWrapper: {
    height: 30, 
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animatedText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  formCard: { 
    flex: 1, 
    paddingHorizontal: 30, 
    paddingTop: 35 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "800", 
    color: COLORS?.text || "#1a1a1a" 
  },
  subtitle: {
    fontSize: 15,
    color: COLORS?.secondaryText || "#666",
    marginBottom: 30,
    marginTop: 5,
  },
  footerBtnContainer: {
    marginTop: 'auto', 
    paddingBottom: 30,
  },
  footerBtn: { 
    marginTop: 20, 
    alignItems: "center" 
  },
  footerText: { 
    color: "#666", 
    fontSize: 14 
  },
  bold: { 
    color: COLORS?.primary || "#000", 
    fontWeight: "800" 
  },
});