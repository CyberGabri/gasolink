import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Modal,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#6366f1",
  secondary: "#0f172a",
  danger: "#ff4757",
  background: "#fdfdff",
  textPrimary: "#1e293b",
  textSecondary: "#94a3b8",
  success: "#22c55e",
  border: "#f1f5f9",
};

export default function PerfilScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  // --- PROTEÇÃO DE ROTA ---
  useEffect(() => {
    const checkAuth = async () => {
      const logged = await AsyncStorage.getItem("loggedIn");
      if (logged !== "true") {
        router.replace("/login");
      } else {
        setIsReady(true);
      }
    };
    checkAuth();
  }, []);

  // --- FUNÇÃO DE LOGOUT REAL ---
  const handleLogout = async () => {
    setModalVisible(false);
    await AsyncStorage.removeItem("loggedIn"); // Limpa o estado de login
    router.replace("/login"); // Volta para a tela de entrada
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  // Enquanto verifica o login
  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background }}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTag}>CENTRAL DO MOTORISTA</Text>
            <Text style={styles.headerTitle}>Meu Perfil</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push("/notificacoes")}
            >
              <Ionicons
                name="notifications-outline"
                size={22}
                color={COLORS.secondary}
              />
              <View style={styles.dotBadge} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.exitBtn]}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons
                name="log-out-outline"
                size={22}
                color={COLORS.danger}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* PROFILE HERO */}
        <View style={styles.profileHero}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.9}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarBorder}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.avatarImg} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarInitial}>D</Text>
                  </View>
                )}
              </View>
              <View style={styles.cameraBadge}>
                <Ionicons name="camera" size={14} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.userName}>Dalvan Silva</Text>
          <View style={styles.badgePremium}>
            <MaterialCommunityIcons
              name="shield-check"
              size={14}
              color={COLORS.success}
            />
            <Text style={styles.badgePremiumText}>MOTORISTA VERIFICADO</Text>
          </View>
        </View>

        {/* FIDELIDADE */}
        <View style={styles.loyaltyCard}>
          <LinearGradient
            colors={["#1e293b", "#0f172a"]}
            style={styles.loyaltyGradient}
          >
            <View style={styles.loyaltyTop}>
              <View>
                <Text style={styles.loyaltyLabel}>NÍVEL ATUAL</Text>
                <Text style={styles.loyaltyRank}>Prata Elite</Text>
              </View>
              <View style={styles.pointsCircle}>
                <Text style={styles.pointsValue}>850</Text>
                <Text style={styles.pointsText}>PTS</Text>
              </View>
            </View>
            <View style={styles.barContainer}>
              <MotiView
                from={{ width: "0%" }}
                animate={{ width: "85%" }}
                style={styles.barFill}
              />
            </View>
          </LinearGradient>
        </View>

        {/* STATS */}
        <View style={styles.statsGrid}>
          <StatCard
            icon="speedometer"
            label="Eco Score"
            value="92"
            suffix="/100"
            color={COLORS.success}
          />
          <StatCard
            icon="wallet"
            label="Ganhos"
            value="2.8k"
            suffix="R$"
            color={COLORS.primary}
          />
        </View>

        {/* MENU */}
        <View style={styles.menuBox}>
          <Text style={styles.menuHeader}>CONFIGURAÇÕES</Text>
          <MenuRow
            icon="person-outline"
            label="Dados Pessoais"
            sub="Nome e e-mail"
            onPress={() => router.push("/dados-pessoais")}
          />
          <View style={styles.divider} />
          <MenuRow
            icon="card-outline"
            label="Pagamentos"
            sub="Carteira e cartões"
            onPress={() => router.push("/pagamentos")}
          />
          <View style={styles.divider} />
          <MenuRow
            icon="shield-checkmark-outline"
            label="Segurança"
            sub="Senha e biometria"
            onPress={() => router.push("/seguranca")}
          />
          <View style={styles.divider} />
          <MenuRow
            icon="options-outline"
            label="Preferências"
            sub="Notificações e tema"
            onPress={() => router.push("/configuracoes")}
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* MODAL DE SAÍDA */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <MotiView
            from={{ opacity: 0, scale: 0.9, translateY: 15 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            style={styles.centerModal}
          >
            <View style={styles.modalIconBg}>
              <Ionicons name="alert-circle" size={32} color={COLORS.danger} />
            </View>
            <Text style={styles.modalTitle}>Deseja sair?</Text>
            <Text style={styles.modalDesc}>
              Sua sessão será encerrada com segurança.
            </Text>

            <View style={styles.modalRow}>
              <TouchableOpacity
                style={styles.btnStay}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.btnStayText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnExit}
                onPress={handleLogout} // Chama a função que limpa o login
              >
                <Text style={styles.btnExitText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </MotiView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Componentes auxiliares (StatCard e MenuRow) e estilos permanecem iguais...
const StatCard = ({ icon, label, value, suffix, color }: any) => (
  <View style={styles.statCard}>
    <View style={[styles.statIconBox, { backgroundColor: color + "10" }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <Text style={styles.statLabelText}>{label}</Text>
    <View style={styles.statValueRow}>
      <Text style={styles.statValueText}>{value}</Text>
      <Text style={styles.statSuffixText}>{suffix}</Text>
    </View>
  </View>
);

const MenuRow = ({ icon, label, sub, onPress }: any) => (
  <TouchableOpacity
    style={styles.menuRow}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.menuIconCircle}>
      <Ionicons name={icon} size={20} color={COLORS.secondary} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.menuLabelText}>{label}</Text>
      <Text style={styles.menuSubText}>{sub}</Text>
    </View>
    <Ionicons name="chevron-forward" size={16} color={COLORS.textSecondary} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, flexGrow: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  headerTag: {
    fontSize: 10,
    fontWeight: "900",
    color: COLORS.primary,
    letterSpacing: 1,
  },
  headerTitle: { fontSize: 24, fontWeight: "800", color: COLORS.secondary },
  headerActions: { flexDirection: "row", gap: 8 },
  actionBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  exitBtn: { borderColor: COLORS.danger + "20" },
  dotBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  profileHero: { alignItems: "center", marginBottom: 25 },
  avatarWrapper: {
    padding: 4,
    backgroundColor: "#fff",
    borderRadius: 55,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  avatarBorder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.secondary,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImg: { width: "100%", height: "100%" },
  avatarPlaceholder: { justifyContent: "center", alignItems: "center" },
  avatarInitial: { fontSize: 32, color: "#fff", fontWeight: "800" },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  userName: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.secondary,
    marginTop: 10,
  },
  badgePremium: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.success + "10",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 5,
  },
  badgePremiumText: {
    fontSize: 9,
    fontWeight: "900",
    color: COLORS.success,
    marginLeft: 4,
  },
  loyaltyCard: { borderRadius: 20, overflow: "hidden" },
  loyaltyGradient: { padding: 20 },
  loyaltyTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  loyaltyLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 10,
    fontWeight: "700",
  },
  loyaltyRank: { color: "#fff", fontSize: 18, fontWeight: "800" },
  pointsCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  pointsValue: { color: "#fbbf24", fontWeight: "900", fontSize: 14 },
  pointsText: { color: "#fff", fontSize: 6, fontWeight: "700" },
  barContainer: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },
  barFill: { height: "100%", backgroundColor: COLORS.primary, borderRadius: 3 },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  statCard: {
    width: (width - 52) / 2,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statLabelText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
  statValueRow: { flexDirection: "row", alignItems: "baseline", marginTop: 2 },
  statValueText: { fontSize: 16, fontWeight: "800", color: COLORS.secondary },
  statSuffixText: { fontSize: 10, color: COLORS.textSecondary, marginLeft: 2 },
  menuBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuHeader: {
    fontSize: 10,
    fontWeight: "900",
    color: COLORS.textSecondary,
    marginBottom: 10,
    marginLeft: 5,
  },
  menuRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  menuIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuLabelText: { fontSize: 14, fontWeight: "700", color: COLORS.textPrimary },
  menuSubText: { fontSize: 11, color: COLORS.textSecondary },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 2 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  centerModal: {
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    elevation: 10,
  },
  modalIconBg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.danger + "10",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: { fontSize: 18, fontWeight: "800", color: COLORS.secondary },
  modalDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginVertical: 10,
  },
  modalRow: { flexDirection: "row", gap: 10, marginTop: 15 },
  btnStay: {
    flex: 1,
    height: 45,
    borderRadius: 12,
    backgroundColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },
  btnExit: {
    flex: 1,
    height: 45,
    borderRadius: 12,
    backgroundColor: COLORS.danger,
    justifyContent: "center",
    alignItems: "center",
  },
  btnStayText: { fontWeight: "700", color: COLORS.secondary, fontSize: 13 },
  btnExitText: { fontWeight: "700", color: "#fff", fontSize: 13 },
});