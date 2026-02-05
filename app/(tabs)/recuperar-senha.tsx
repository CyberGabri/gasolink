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
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { GasoInput } from "../../components/GasoInput";
import { GasoButton } from "../../components/GasoButton";
import { COLORS } from "../../constants/Colors";

const { height, width } = Dimensions.get("window");

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  
  // Animação de entrada
  const contentFade = useRef(new Animated.Value(0)).current;
  const cardY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(contentFade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(cardY, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRecover = () => {
    // Aqui entraria a lógica de API
    console.log("Recuperar e-mail:", email);
    // Após o envio, você poderia voltar para o login
    // router.back();
  };

  return (
    <View style={styles.main}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
          
          <Animated.View style={{ flex: 1, opacity: contentFade }}>
            {/* HEADER COM IMAGEM (Mesma do Login para consistência) */}
            <ImageBackground
              source={{ uri: "https://images.unsplash.com/photo-1545147458-7182281a942a?q=80&w=1200" }}
              style={styles.header}
            >
              <View style={styles.overlay}>
                <Pressable style={styles.backButton} onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={28} color="#FFF" />
                </Pressable>

                <Ionicons name="key-outline" size={60} color="#FFF" style={styles.iconHeader} />
                <Text style={styles.logoText}>Recuperar Senha</Text>
                <Text style={styles.headerDesc}>Enviaremos um código para o seu e-mail.</Text>
              </View>
            </ImageBackground>

            {/* CARD DE RECUPERAÇÃO */}
            <Animated.View 
              style={[
                styles.formCard, 
                { transform: [{ translateY: cardY }] }
              ]}
            >
              <Text style={styles.title}>Perdeu o acesso?</Text>
              <Text style={styles.subtitle}>
                Não se preocupe! Digite seu e-mail abaixo para redefinir sua senha.
              </Text>

              <GasoInput 
                label="Seu E-mail cadastrado" 
                placeholder="exemplo@email.com" 
                value={email} 
                onChangeText={setEmail} 
                keyboardType="email-address"
              />

              <View style={{ marginTop: 20 }}>
                <GasoButton title="Enviar Código de Resgate" onPress={handleRecover} />
              </View>

              <Pressable style={styles.footerBtn} onPress={() => router.back()}>
                <Text style={styles.footerText}>
                  Lembrou a senha? <Text style={styles.footerHighlight}>Voltar ao Login</Text>
                </Text>
              </Pressable>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: "#000" },
  header: {
    height: height * 0.45,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 25,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
  },
  iconHeader: {
    marginBottom: 10,
  },
  logoText: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
  },
  headerDesc: {
    color: "#cbd5e1",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
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
  title: { fontSize: 26, fontWeight: "900", color: "#0f172a" },
  subtitle: { fontSize: 15, color: "#64748b", marginBottom: 30, lineHeight: 22 },
  footerBtn: { marginTop: 30, alignItems: "center" },
  footerText: { color: "#64748b" },
  footerHighlight: { fontWeight: "900", color: COLORS.primary || "#2563eb" },
});