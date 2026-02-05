import React, { useState, useEffect, useRef } from "react";
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
  Animated,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GasoInput } from "../../components/GasoInput";
import { GasoButton } from "../../components/GasoButton";
import { COLORS } from "../../constants/Colors";

const { height } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const [isOpeningActive, setIsOpeningActive] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);

  // Referências de animação
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const contentFade = useRef(new Animated.Value(0)).current;
  const openingViewOpacity = useRef(new Animated.Value(1)).current;
  const logoY = useRef(new Animated.Value(30)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const phraseFade = useRef(new Animated.Value(0)).current;

  const messages = [
    "Bem-vindo ao Gasolink!",
    "Economize tempo e dinheiro.",
    "Controle seu veículo facilmente.",
  ];

  useEffect(() => {
    AsyncStorage.getItem("loggedIn").then((value) => {
      if (value === "true") {
        setIsOpeningActive(false);
        contentFade.setValue(1);
        router.replace("/(tabs)/");
      } else {
        startOpeningAnimation();
      }
    });
  }, []);

  const startOpeningAnimation = () => {
    Animated.sequence([
      Animated.delay(400),
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(logoY, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1000),
      Animated.parallel([
        Animated.timing(openingViewOpacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(contentFade, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setIsOpeningActive(false);
      startPhraseLoop();
    });
  };

  const startPhraseLoop = () => {
    Animated.timing(phraseFade, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
    const interval = setInterval(() => {
      Animated.timing(phraseFade, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
        Animated.timing(phraseFade, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);
    return () => clearInterval(interval);
  };

  const triggerErrorAnimation = () => {
    setErrors(true);
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => setErrors(false), 3000);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      triggerErrorAnimation();
      return;
    }

    setIsLoading(true);

    setTimeout(async () => {
      try {
        await AsyncStorage.setItem("loggedIn", "true");
        setIsLoading(false);
       
        router.replace("/(tabs)/");
      } catch (e) {
        setIsLoading(false);
        triggerErrorAnimation();
      }
    }, 1500);
  };

  return (
    <View style={styles.main}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {isOpeningActive && (
        <Animated.View
          pointerEvents="none"
          style={[styles.openingOverlay, { opacity: openingViewOpacity }]}
        >
          <Animated.Text
            style={[
              styles.logoOpening,
              { opacity: logoOpacity, transform: [{ translateY: logoY }] },
            ]}
          >
            GasoLink
          </Animated.Text>
        </Animated.View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={{ flex: 1, opacity: contentFade }}>
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1545147458-7182281a942a?q=80&w=1200",
              }}
              style={styles.header}
            >
              <View style={styles.overlay}>
                <Text style={styles.logoText}>GasoLink</Text>
                <Animated.View
                  style={[styles.animationContainer, { opacity: phraseFade }]}
                >
                  <Text style={styles.animatedText}>
                    {messages[currentMessage]}
                  </Text>
                </Animated.View>
              </View>
            </ImageBackground>

            <View style={styles.formCard}>
              <Text style={styles.title}>Olá novamente!</Text>
              <Text style={styles.subtitle}>
                Acesse sua conta para continuar.
              </Text>

              <Animated.View
                style={{ transform: [{ translateX: shakeAnimation }] }}
              >
                <GasoInput
                  label="E-mail"
                  placeholder="seu@email.com"
                  value={email}
                  onChangeText={(t) => {
                    setEmail(t);
                    setErrors(false);
                  }}
                  editable={!isLoading}
                />
                <GasoInput
                  label="Senha"
                  placeholder="Sua senha"
                  secureTextEntry
                  value={password}
                  onChangeText={(t) => {
                    setPassword(t);
                    setErrors(false);
                  }}
                  editable={!isLoading}
                />

                {errors && (
                  <Text style={styles.errorText}>
                    Preencha todos os campos para entrar
                  </Text>
                )}
              </Animated.View>

              <Pressable
                style={styles.forgot}
                onPress={() => !isLoading && router.push("/recuperar-senha")}
              >
                <Text style={styles.forgotText}>Esqueceu a senha?</Text>
              </Pressable>

              <GasoButton
                title={isLoading ? "Carregando..." : "Entrar na Conta"}
                onPress={() => !isLoading && handleLogin()}
              />

              {/* AJUSTE AQUI: O caminho correto para o index das tabs */}
              <TouchableOpacity
                style={styles.skipBtn}
                onPress={() => router.replace("/(tabs)/")}
              >
                <Text style={styles.skipText}>Continuar sem login</Text>
              </TouchableOpacity>

              <Pressable
                style={styles.footerBtn}
                onPress={() => !isLoading && router.push("/registro")}
              >
                <Text style={styles.footerText}>
                  Não tem conta?{" "}
                  <Text style={styles.footerHighlight}>Cadastre-se</Text>
                </Text>
              </Pressable>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: "#000" },
  openingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    zIndex: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  logoOpening: {
    color: "#FFF",
    fontSize: 55,
    fontWeight: "900",
    letterSpacing: -2,
  },
  header: {
    height: height * 0.45,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "#FFF",
    fontSize: 52,
    fontWeight: "900",
    letterSpacing: -2,
  },
  animationContainer: { height: 30, marginTop: 10 },
  animatedText: {
    color: "#cbd5e1",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  formCard: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    backgroundColor: "#FFF",
    marginTop: -60,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    minHeight: height * 0.6,
  },
  title: { fontSize: 28, fontWeight: "900", color: "#0f172a" },
  subtitle: { fontSize: 15, color: "#64748b", marginBottom: 25 },
  forgot: { alignSelf: "flex-end", marginBottom: 20 },
  forgotText: { color: "#6366f1", fontWeight: "700" },
  footerBtn: { marginTop: 15, marginBottom: 40, alignItems: "center" },
  footerText: { color: "#64748b" },
  footerHighlight: { fontWeight: "900", color: "#6366f1" },
  errorText: {
    color: "#ef4444",
    fontSize: 13,
    fontWeight: "600",
    marginTop: -10,
    marginBottom: 15,
    textAlign: "center",
  },
  skipBtn: { marginTop: 20, alignSelf: "center", padding: 10 },
  skipText: {
    color: "#94a3b8",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
