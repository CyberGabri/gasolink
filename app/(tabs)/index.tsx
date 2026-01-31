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
import { MotiView, MotiText } from "moti";

import { GasoInput } from "../../components/GasoInput";
import { GasoButton } from "../../components/GasoButton";
import { COLORS } from "../../constants/Colors";

const { height } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log({ email, password });
    router.replace("/HomeScreen");
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
          <MotiView
            from={{
              height: height * 0.5,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
            animate={{
              height: height * 0.35,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
            transition={{ type: "timing", duration: 800 }}
            style={styles.header}
          >
            <MotiView
              from={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 400, type: "spring" }}
              style={styles.logoContainer}
            >
              <View style={styles.logoSquare}>
                <View style={styles.logoCircle} />
              </View>
              <Text style={styles.logoText}>GasoLink</Text>
            </MotiView>
          </MotiView>

          <View style={styles.formCard}>
            <MotiText
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: 600 }}
              style={styles.title}
            >
              Olá novamente!
            </MotiText>

            <MotiText
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: 700 }}
              style={styles.subtitle}
            >
              Acesse sua conta para continuar.
            </MotiText>

            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 800 }}
            >
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

              <GasoButton title="Entrar na Conta" onPress={handleLogin} />
            </MotiView>

            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1000 }}
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
  main: { flex: 1, backgroundColor: COLORS.white },
  header: {
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  logoContainer: { alignItems: "center" },
  logoSquare: {
    width: 64,
    height: 64,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  logoCircle: {
    width: 28,
    height: 28,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
  },
  logoText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  formCard: { flex: 1, paddingHorizontal: 30, paddingTop: 40 },
  title: { fontSize: 28, fontWeight: "800", color: COLORS.text },
  subtitle: {
    fontSize: 15,
    color: COLORS.secondaryText,
    marginBottom: 35,
    marginTop: 5,
  },
  footerBtn: { marginTop: 30, alignItems: "center", paddingBottom: 40 },
  footerText: { color: COLORS.secondaryText, fontSize: 14 },
  bold: { color: COLORS.primary, fontWeight: "800" },
});
