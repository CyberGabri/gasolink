import React, { useState } from "react";
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
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";

import { GasoInput } from "../../components/GasoInput";
import { GasoButton } from "../../components/GasoButton";
import { COLORS } from "../../constants/Colors";

const { height } = Dimensions.get("window");

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) return;
    // Lógica de registro aqui
    router.replace("/login");
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/login");
    }
  };

  return (
    <View style={styles.main}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER COM IMAGEM (IGUAL AO LOGIN) */}
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1545147458-7182281a942a?q=80&w=1200",
            }}
            style={styles.header}
          >
            <View style={styles.overlay}>
              <Text style={styles.logoText}>GasoLink</Text>
              <View style={styles.animationContainer}>
                <Text style={styles.tagline}>CRIE SUA CONTA AGORA</Text>
              </View>
            </View>
          </ImageBackground>

          {/* CARD BRANCO QUE SOBE SOBRE A IMAGEM */}
          <View style={styles.formCard}>
            <Text style={styles.title}>Cadastre-se</Text>
            <Text style={styles.subtitle}>
              Preencha os campos para criar seu perfil.
            </Text>

            <GasoInput
              label="Nome Completo"
              placeholder="Ex: João Silva"
              value={name}
              onChangeText={setName}
            />

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
              <GasoButton 
                title="Finalizar Cadastro" 
                onPress={handleRegister} 
              />
            </View>

            <Pressable style={styles.footerBtn} onPress={handleGoBack}>
              <Text style={styles.footerText}>
                Já tem uma conta?{" "}
                <Text style={styles.footerHighlight}>Entrar</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: "#000" },
  header: {
    height: height * 0.40, // Mantendo proporção similar ao login
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.65)", // Overlay escuro
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "#FFF",
    fontSize: 52,
    fontWeight: "900",
    letterSpacing: -2,
  },
  animationContainer: { marginTop: 10 },
  tagline: {
    color: "#3b82f6", // Azul para destaque
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 3,
  },
  formCard: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    backgroundColor: "#FFF",
    marginTop: -60, // Efeito de subir sobre o header
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    minHeight: height * 0.6,
  },
  title: { 
    fontSize: 28, 
    fontWeight: "900", 
    color: "#0f172a" 
  },
  subtitle: { 
    fontSize: 15, 
    color: "#64748b", 
    marginBottom: 25 
  },
  footerBtn: { 
    marginTop: 20, 
    marginBottom: 40, 
    alignItems: "center" 
  },
  footerText: { 
    color: "#64748b",
    fontSize: 14 
  },
  footerHighlight: { 
    fontWeight: "900", 
    color: "#3b82f6" 
  },
});