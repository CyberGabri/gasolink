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
    console.log({ name, email, password });
    router.replace("/home");
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
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
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              {/* Removido Image e ajustado o texto para o novo padrão visual */}
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
  main: { flex: 1, backgroundColor: "#FFF" },
  header: {
    height: height * 0.22, // Levemente menor que o login por ser registro
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  logoContainer: { alignItems: "center" },
  logoText: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -1,
  },
  divider: {
    width: 30,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginVertical: 4,
    borderRadius: 2,
  },
  headerTagline: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
  },
  formCard: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
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
    marginTop: 20,
    alignItems: "center",
    paddingBottom: 40,
  },
  footerText: {
    color: "#64748b",
    fontSize: 14,
  },
  bold: {
    color: COLORS.primary,
    fontWeight: "800",
  },
});