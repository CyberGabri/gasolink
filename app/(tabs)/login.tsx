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
  Easing,
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
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showOpening, setShowOpening] = useState(true);

  const openingTranslateY = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(30)).current;
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
    const value = await AsyncStorage.getItem("loggedIn");
    if (value === "true") {
      router.replace("/(tabs)/");
    } else {
      setIsVerifying(false);
      startOpeningAnimation();
      startPhraseLoop();
    }
  };

  const startOpeningAnimation = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1.1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(700),
      Animated.parallel([
        Animated.timing(openingTranslateY, {
          toValue: -height,
          duration: 1100,
          easing: Easing.bezier(0.77, 0, 0.175, 1),
          useNativeDriver: true,
        }),
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 700,
          delay: 300,
          useNativeDriver: true,
        }),
        Animated.timing(contentTranslateY, {
          toValue: 0,
          duration: 700,
          delay: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setShowOpening(false);
    });
  };

  const startPhraseLoop = () => {
    Animated.timing(phraseFade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setInterval(() => {
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
        duration: 40,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 40,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 40,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (isVerifying) {
    return <View style={{ flex: 1, backgroundColor: "#000" }} />;
  }

  return (
    <View style={styles.main}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000"
        translucent={false}
      />

      <Animated.View
        style={{
          flex: 1,
          opacity: contentOpacity,
          transform: [{ translateY: contentTranslateY }],
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1545147458-7182281a942a?q=80&w=1200",
              }}
              style={styles.header}
            >
              <View style={styles.overlay}>
                <Text style={styles.logoText}>GasoLink</Text>
                <Animated.View style={{ opacity: phraseFade, marginTop: 10 }}>
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
          </ScrollView>
        </KeyboardAvoidingView>
      </Animated.View>

      {showOpening && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.openingOverlay,
            { transform: [{ translateY: openingTranslateY }] },
          ]}
        >
          <Animated.Text
            style={[
              styles.logoOpening,
              { opacity: logoOpacity, transform: [{ scale: logoScale }] },
            ]}
          >
            GasoLink
          </Animated.Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: "#000" },
  openingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  logoOpening: {
    color: "#FFF",
    fontSize: 64,
    fontWeight: "900",
    letterSpacing: -3,
  },
  header: {
    height: height * 0.48,
    width,
    backgroundColor: "#000",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "#FFF",
    fontSize: 52,
    fontWeight: "900",
    letterSpacing: -2,
  },
  animatedText: {
    color: "#E2E8F0",
    fontSize: 16,
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
    minHeight: height * 0.65,
    elevation: 5,
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
    marginTop: 5,
  },
  skipBtn: { marginTop: 20, alignSelf: "center", padding: 10 },
  skipText: {
    color: "#94A3B8",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
