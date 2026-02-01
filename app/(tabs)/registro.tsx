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
  Image, // Adicionado Image
} from "react-native";
import { useRouter } from "expo-router";

import { GasoInput } from "../../components/GasoInput";
import { GasoButton } from "../../components/GasoButton";
import { COLORS } from "../../constants/Colors";

// Importando a logo real
import LogoIcon from "../../assets/logo/logo.png";

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
              {/* SUBSTITUÍDO O QUADRADO PELA LOGO PNG */}
              <Image 
                source={LogoIcon} 
                style={styles.logoImage} 
                resizeMode="contain" 
              />
              <Text style={styles.logoText}>GasoLink</Text>
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
  main: { flex: 1, backgroundColor: COLORS.white },
  header: {
    height: height * 0.25,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  logoContainer: { alignItems: "center" },
  logoImage: {
    width: 70,  // Um pouco menor que no Login para caber melhor no cabeçalho de registro
    height: 70,
    marginBottom: 8,
  },
  logoText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  formCard: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.secondaryText,
    marginBottom: 25,
    marginTop: 5,
  },
  footerBtn: {
    marginTop: 20,
    alignItems: "center",
    paddingBottom: 40,
  },
  footerText: {
    color: COLORS.secondaryText,
    fontSize: 14,
  },
  bold: {
    color: COLORS.primary,
    fontWeight: "800",
  },
});