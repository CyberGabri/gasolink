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
  Modal,
  Animated,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { GasoInput } from "../../components/GasoInput";
import { GasoButton } from "../../components/GasoButton";
import { COLORS } from "../../constants/Colors";

const { height, width } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [currentMessage, setCurrentMessage] = useState(0);

  // Estado para controlar se a abertura ainda está ativa (evita erro de tipo no pointerEvents)
  const [isOpeningActive, setIsOpeningActive] = useState(true);

  // --- ANIMAÇÕES ---
  const openingViewOpacity = useRef(new Animated.Value(1)).current; // Overlay preto
  const logoY = useRef(new Animated.Value(30)).current; // Subida do logo
  const logoOpacity = useRef(new Animated.Value(0)).current; // Opacidade do logo
  const contentFade = useRef(new Animated.Value(0)).current; // Opacidade do App atrás
  const phraseFade = useRef(new Animated.Value(0)).current; // Opacidade das frases

  const messages = [
    "Bem-vindo ao Gasolink!",
    "Economize tempo e dinheiro.",
    "Controle seu veículo facilmente.",
  ];

  useEffect(() => {
    // Sequência de Abertura Cinematográfica
    Animated.sequence([
      Animated.delay(400),
      // 1. Revela o nome branco subindo no fundo preto
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(logoY, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(1200), // Tempo com o nome parado no preto
      // 2. A "cortina" preta some e revela o conteúdo
      Animated.parallel([
        Animated.timing(openingViewOpacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(contentFade, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Desativa o overlay para permitir cliques no formulário
      setIsOpeningActive(false);
      startPhraseLoop();
    });
  }, []);

  const startPhraseLoop = () => {
    Animated.timing(phraseFade, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
    setInterval(() => {
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
  };

  return (
    <View style={styles.main}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* OVERLAY DE ABERTURA PRETO */}
      {isOpeningActive && (
        <Animated.View
          style={[styles.openingOverlay, { opacity: openingViewOpacity }]}
        >
          <Animated.Text
            style={[
              styles.logoOpening,
              {
                opacity: logoOpacity,
                transform: [{ translateY: logoY }],
              },
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
          <Animated.View style={{ flex: 1, opacity: contentFade }}>
            {/* HEADER COM IMAGEM */}
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1545147458-7182281a942a?q=80&w=1200",
              }}
              style={styles.header}
            >
              <View style={styles.overlay}>
                {/* O LOGO NO HEADER (FICA PARADO) */}
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

            {/* CARD DE LOGIN */}
            <View style={styles.formCard}>
              <Text style={styles.title}>Olá novamente!</Text>
              <Text style={styles.subtitle}>
                Acesse sua conta para continuar.
              </Text>

              <GasoInput
                label="E-mail"
                placeholder="seu@email.com"
                value={email}
                onChangeText={setEmail}
              />
              <GasoInput
                label="Senha"
                placeholder="Sua senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <Pressable
  style={styles.forgot}
  onPress={() => {
    // Redireciona o usuário para a tela de recuperação de senha
    router.push("/recuperar-senha"); 
  }}
>
  <Text style={styles.forgotText}>Esqueceu a senha?</Text>
</Pressable>

              <GasoButton
                title="Entrar na Conta"
                onPress={() => router.replace("/home")}
              />

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
  main: { flex: 1, backgroundColor: "#000" },
  openingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    zIndex: 99,
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
    backgroundColor: "rgba(0, 0, 0, 0.65)", // Escurece um pouco a foto para o logo brilhar
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  logoText: {
    color: "#FFF",
    fontSize: 52,
    fontWeight: "900",
    letterSpacing: -2,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
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
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  title: { fontSize: 28, fontWeight: "900", color: "#0f172a" },
  subtitle: { fontSize: 15, color: "#64748b", marginBottom: 25 },
  forgot: { alignSelf: "flex-end", marginBottom: 20 },
  forgotText: { color: COLORS.primary || "#2563eb", fontWeight: "700" },
  footerBtn: { marginTop: 25, alignItems: "center" },
  footerText: { color: "#64748b" },
  footerHighlight: { fontWeight: "900", color: COLORS.primary || "#2563eb" },
});
