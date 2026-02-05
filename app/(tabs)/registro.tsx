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
        backgroundColor="#000"
        animated={false}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER MAIOR E PRETO */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>GasoLink</Text>
              <View style={styles.divider} />
              <Text style={styles.headerTagline}>CRIE SUA CONTA</Text>
            </View>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.subtitle}>
              Preencha os dados abaixo para começar.
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

            <GasoButton title="Finalizar Cadastro" onPress={handleRegister} />

            <Pressable style={styles.footerBtn} onPress={handleGoBack}>
              <Text style={styles.footerText}>
                Já tem uma conta? <Text style={styles.bold}>Entrar</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { 
    flex: 1, 
    backgroundColor: "#FFF" 
  },
  keyboardView: { 
    flex: 1 
  },
  scrollContent: { 
    flexGrow: 1,
    backgroundColor: "#FFF"
  },
  header: {
    height: height * 0.35, // Aumentado de 0.22 para 0.35 (mais de 1/3 da tela)
    backgroundColor: "#000", // Fundo preto escuro conforme pedido
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 60, // Arredondamento maior para combinar com o tamanho
    borderBottomRightRadius: 60,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    zIndex: 10,
  },
  logoContainer: { 
    alignItems: "center" 
  },
  logoText: {
    color: "#FFF",
    fontSize: 42, // Texto maior para preencher o novo espaço
    fontWeight: "900",
    letterSpacing: -1,
  },
  divider: {
    width: 45,
    height: 4,
    backgroundColor: "#3b82f6", // Um toque de azul para destaque
    marginVertical: 10,
    borderRadius: 2,
  },
  headerTagline: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 4,
  },
  formCard: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 35,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 15,
    color: "#64748b",
    marginBottom: 25,
    marginTop: 5,
  },
  footerBtn: {
    marginTop: 15,
    alignItems: "center",
    paddingBottom: 40,
  },
  footerText: {
    color: "#64748b",
    fontSize: 14,
  },
  bold: {
    color: "#3b82f6",
    fontWeight: "800",
  },
});