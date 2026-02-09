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

  const contentOpacity = useRef(new Animated.Value(0)).current;
  const phraseFade = useRef(new Animated.Value(0)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const messages = [
    "O melhor preço de Fortaleza.",
    "Economia real no seu tanque.",
    "Inteligência em combustíveis.",
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
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      startPhraseLoop();
    }
  };

  const startPhraseLoop = () => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(phraseFade, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.delay(2000),
        Animated.timing(phraseFade, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]).start(() => {
        setCurrentMessage((p) => (p + 1) % messages.length);
        animate();
      });
    };
    animate();
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setErrors(true);
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 8, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -8, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
      return;
    }
    setIsLoading(true);
    setTimeout(async () => {
      await AsyncStorage.setItem("loggedIn", "true");
      setIsLoading(false);
      router.replace("/(tabs)/");
    }, 1000);
  };

  if (isVerifying) return <View style={{ flex: 1, backgroundColor: "#000" }} />;

  return (
    <View style={styles.main}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <Animated.View style={{ flex: 1, opacity: contentOpacity }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} keyboardShouldPersistTaps="handled">
            <ImageBackground
              source={{ uri: "https://images.unsplash.com/photo-1626014903708-4140026330a8?q=80&w=1200" }}
              style={styles.header}
            >
              <View style={styles.overlay}>
                <Text style={styles.logoMain}>GasoLink</Text>
                <View style={styles.phraseBox}>
                  <Animated.Text style={[styles.phraseText, { opacity: phraseFade }]}>
                    {messages[currentMessage]}
                  </Animated.Text>
                </View>
              </View>
            </ImageBackground>

            <View style={styles.formCard}>
              <Text style={styles.welcome}>Bem-vindo!</Text>
              <Text style={styles.instruction}>Identifique-se para continuar.</Text>

              <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
                <GasoInput
                  label="E-mail"
                  placeholder="usuario@email.com"
                  value={email}
                  onChangeText={(t) => {
                    setEmail(t);
                    setErrors(false);
                  }}
                  autoCapitalize="none"
                />
                <GasoInput
                  label="Senha"
                  placeholder="••••••••"
                  secureTextEntry
                  value={password}
                  onChangeText={(t) => {
                    setPassword(t);
                    setErrors(false);
                  }}
                />
                {errors && <Text style={styles.errorText}>Verifique os campos acima</Text>}
              </Animated.View>

              <Pressable style={styles.forgotPass} onPress={() => router.push("/recuperar-senha")}>
                <Text style={styles.forgotText}>Esqueceu a senha?</Text>
              </Pressable>

              <GasoButton title={isLoading ? "Entrando..." : "Entrar"} onPress={handleLogin} />

              <TouchableOpacity style={styles.guestBtn} onPress={() => router.replace("/(tabs)/")}>
                <Text style={styles.guestText}>Continuar sem Login</Text>
              </TouchableOpacity>

              <View style={styles.signupBox}>
                <Text style={styles.newText}>Novo aqui? </Text>
                <Pressable onPress={() => router.push("/registro")}>
                  <Text style={styles.signupLink}>Crie sua conta</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: "#000" },
  header: { height: height * 0.42, width },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },
  logoMain: { color: "#FFF", fontSize: 44, fontWeight: "900", letterSpacing: -1.5 },
  phraseBox: { height: 24, marginTop: 8 },
  phraseText: { color: "#94a3b8", fontSize: 14, fontWeight: "500", textAlign: "center" },
  formCard: {
    flex: 1,
    backgroundColor: "#FFF",
    marginTop: -40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 32,
    paddingTop: 40,
  },
  welcome: { fontSize: 28, fontWeight: "800", color: "#0f172a" },
  instruction: { fontSize: 15, color: "#64748b", marginBottom: 25, marginTop: 4 },
  forgotPass: { alignSelf: "flex-end", marginBottom: 25 },
  forgotText: { color: "#3b82f6", fontWeight: "700" },
  errorText: { color: "#ef4444", fontSize: 12, textAlign: "center", marginTop: 4 },
  guestBtn: { marginTop: 20, alignSelf: "center", padding: 10 },
  guestText: { color: "#94a3b8", fontWeight: "600", textDecorationLine: "underline" },
  signupBox: { flexDirection: "row", justifyContent: "center", marginTop: 30, paddingBottom: 30 },
  newText: { color: "#64748b" },
  signupLink: { color: "#0f172a", fontWeight: "800" },
});
