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

const { height, width } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);

  const [isVerifying, setIsVerifying] = useState(true);
  const [isOpeningActive, setIsOpeningActive] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);

  const contentFade = useRef(new Animated.Value(0)).current;
  const openingViewOpacity = useRef(new Animated.Value(1)).current;
  const logoY = useRef(new Animated.Value(20)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const phraseFade = useRef(new Animated.Value(0)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const messages = [
    "Bem-vindo ao Gasolink!",
    "Economize tempo e dinheiro.",
    "Controle seu veículo facilmente.",
  ];

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const value = await AsyncStorage.getItem("loggedIn");
      if (value === "true") {
        router.replace("/(tabs)/");
      } else {
        setIsVerifying(false);
        startOpeningAnimation();
      }
    } catch (e) {
      setIsVerifying(false);
      startOpeningAnimation();
    }
  };

  const startOpeningAnimation = () => {
    Animated.sequence([
      Animated.delay(100),
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(600),
      Animated.parallel([
        Animated.timing(openingViewOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(contentFade, {
          toValue: 1,
          duration: 700,
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
      duration: 500,
      useNativeDriver: true,
    }).start();
    const interval = setInterval(() => {
      Animated.timing(phraseFade, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
        Animated.timing(phraseFade, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);
    return () => clearInterval(interval);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      triggerErrorAnimation();
      return;
    }
    setIsLoading(true);
    setTimeout(async () => {
      await AsyncStorage.setItem("loggedIn", "true");
      setIsLoading(false);
      router.replace("/(tabs)/");
    }, 1200);
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
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (isVerifying)
    return <View style={{ flex: 1, backgroundColor: "#000000" }} />;

  return (
    <View style={styles.main}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Camada de Abertura - PRETO PURO */}
      {isOpeningActive && (
        <Animated.View
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
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            style={{
              flex: 1,
              opacity: contentFade,
              backgroundColor: "#000000",
            }}
          >
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1545147458-7182281a942a?q=80&w=1200",
              }}
              style={styles.header}
            >
              {/* Overlay da imagem também em preto puro com opacidade controlada */}
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
                  <Text style={styles.errorText}>Preencha todos os campos</Text>
                )}
              </Animated.View>

              <Pressable
                style={styles.forgot}
                onPress={() => router.push("/recuperar-senha")}
              >
                <Text style={styles.forgotText}>Esqueceu a senha?</Text>
              </Pressable>

              <GasoButton
                title={isLoading ? "Carregando..." : "Entrar na Conta"}
                onPress={handleLogin}
              />

              <TouchableOpacity
                style={styles.skipBtn}
                onPress={() => router.replace("/(tabs)/")}
              >
                <Text style={styles.skipText}>Continuar sem login</Text>
              </TouchableOpacity>

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
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#000000", // Preto absoluto
  },
  openingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000", // Preto absoluto
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  logoOpening: {
    color: "#FFFFFF",
    fontSize: 55,
    fontWeight: "900",
    letterSpacing: -2,
  },
  header: {
    height: height * 0.45,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Escurece a imagem com preto
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 52,
    fontWeight: "900",
    letterSpacing: -2,
  },
  animationContainer: { height: 30, marginTop: 10 },
  animatedText: {
    color: "#E2E8F0",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  formCard: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    backgroundColor: "#FFFFFF",
    marginTop: -60,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    minHeight: height * 0.6,
  },
  title: { fontSize: 28, fontWeight: "900", color: "#0F172A" },
  subtitle: { fontSize: 15, color: "#64748B", marginBottom: 25 },
  forgot: { alignSelf: "flex-end", marginBottom: 20 },
  forgotText: { color: "#6366F1", fontWeight: "700" },
  footerBtn: { marginTop: 15, paddingBottom: 40, alignItems: "center" },
  footerText: { color: "#64748B" },
  footerHighlight: { fontWeight: "900", color: "#6366F1" },
  errorText: {
    color: "#EF4444",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  skipBtn: { marginTop: 20, alignSelf: "center", padding: 10 },
  skipText: {
    color: "#94A3B8",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
