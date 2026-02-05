import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  SafeAreaView,
  Image,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const COLORS = {
  primary: "#6366f1",
  secondary: "#0f172a",
  background: "#ffffff",
  inputBg: "#f8fafc",
  border: "#e2e8f0",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  success: "#10b981",
};

export default function DadosPessoaisScreen() {
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const [nome, setNome] = useState("Dalvan Silva");
  const [email, setEmail] = useState("dalvan.pro@motorista.com");
  const [telefone, setTelefone] = useState("(85) 99999-9999");
  const [documento, setDocumento] = useState("000.000.000-00");
  const [cidade, setCidade] = useState("Fortaleza, CE");

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso às suas fotos.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* HEADER - VOLTA PARA O PERFIL */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.replace("/(tabs)/home")} // <--- VOLTA AQUI
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.secondary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dados Pessoais</Text>
          <View style={{ width: 45 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.photoSection}>
            <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
              <MotiView
                from={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={styles.avatarContainer}
              >
                {image ? (
                  <Image source={{ uri: image }} style={styles.avatarImage} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarLetter}>{nome.charAt(0)}</Text>
                  </View>
                )}
                <View style={styles.cameraBadge}>
                  <Ionicons name="camera" size={16} color="#fff" />
                </View>
              </MotiView>
            </TouchableOpacity>
            <Text style={styles.userNameHeader}>{nome}</Text>
          </View>

          <View style={styles.section}>
            <CustomInput
              label="NOME COMPLETO"
              icon="person-outline"
              value={nome}
              onChangeText={setNome}
            />
            <CustomInput
              label="E-MAIL"
              icon="mail-outline"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <CustomInput
              label="TELEFONE"
              icon="call-outline"
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
            />
            <CustomInput
              label="CPF"
              icon="document-text-outline"
              value={documento}
              onChangeText={setDocumento}
            />
            <CustomInput
              label="CIDADE"
              icon="location-outline"
              value={cidade}
              onChangeText={setCidade}
            />
          </View>

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => {
              // Lógica de salvar aqui...
              router.replace("/(tabs)/home"); // <--- VOLTA APÓS SALVAR
            }}
          >
            <Text style={styles.saveBtnText}>SALVAR E VOLTAR</Text>
          </TouchableOpacity>

          <View style={{ height: 50 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const CustomInput = ({ label, icon, ...props }: any) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <Ionicons
        name={icon}
        size={20}
        color={COLORS.primary}
        style={styles.inputIcon}
      />
      <TextInput style={styles.input} {...props} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 70,
  },
  backBtn: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: COLORS.inputBg,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "800", color: COLORS.secondary },
  scrollContent: { paddingHorizontal: 25, paddingTop: 20 },
  photoSection: { alignItems: "center", marginBottom: 30 },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    elevation: 10,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  avatarImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#fff",
  },
  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  avatarLetter: { color: "#fff", fontSize: 44, fontWeight: "800" },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  userNameHeader: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.secondary,
    marginTop: 15,
  },
  section: { marginBottom: 25 },
  inputContainer: { marginBottom: 18 },
  label: {
    fontSize: 10,
    fontWeight: "800",
    color: COLORS.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderRadius: 18,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputIcon: { marginRight: 12 },
  input: {
    flex: 1,
    height: 55,
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  saveBtn: {
    width: "100%",
    height: 65,
    backgroundColor: COLORS.secondary,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 15,
    letterSpacing: 1,
  },
});
