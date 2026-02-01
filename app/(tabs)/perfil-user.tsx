import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView, MotiText } from "moti";
import { useRouter } from "expo-router";

const COLORS = {
  primary: "#3b82f6",
  secondary: "#1e293b",
  danger: "#ef4444",
  background: "#f8fafc",
  card: "#ffffff",
  textPrimary: "#0f172a",
  textSecondary: "#64748b",
  accent: "#FFD700",
};

export default function PerfilScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(true);
  };

  const confirmLogout = () => {
    setModalVisible(false);
    if (router.canGoBack()) router.dismissAll();
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.header}
        >
          <Text style={styles.brandTitle}>GASOLINK</Text>
          <TouchableOpacity style={styles.settingsBtn} activeOpacity={0.7}>
            <View style={styles.iconCircle}>
              <Ionicons name="settings-sharp" size={20} color={COLORS.secondary} />
            </View>
          </TouchableOpacity>
        </MotiView>

        {/* PERFIL PRINCIPAL */}
        <View style={styles.profileSection}>
          <MotiView
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            style={styles.avatarWrapper}
          >
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>D</Text>
            </View>
            <MotiView
              from={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 500 }}
              style={styles.verifiedBadge}
            >
              <Ionicons name="checkmark" size={14} color="#FFF" />
            </MotiView>
          </MotiView>

          <MotiText
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            style={styles.userName}
          >
            Dalvan
          </MotiText>

          <Text style={styles.userEmail}>dalvan.premium@gasolink.com</Text>

          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={styles.badgePremium}
          >
            <MaterialCommunityIcons name="crown" size={16} color={COLORS.accent} />
            <Text style={styles.badgeText}>MEMBRO PRO+</Text>
          </MotiView>
        </View>

        {/* STATS CARDS */}
        <View style={styles.statsRow}>
          <StatBox label="Economia" value="450€" icon="cash-check" delay={400} />
          <StatBox label="Abastecidas" value="12" icon="gas-station" delay={500} />
          <StatBox label="Km totais" value="1.240" icon="map-marker-distance" delay={600} />
        </View>

        {/* MENU */}
        <MotiView
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 700, type: "timing" }}
          style={styles.menuContainer}
        >
          <Text style={styles.menuTitle}>Definições de Conta</Text>

          <MenuItem icon="person-circle-outline" label="Dados Pessoais" />
          <MenuItem icon="notifications-outline" label="Alertas de Preço" />
          <MenuItem icon="shield-checkmark-outline" label="Privacidade" />
          <MenuItem icon="help-buoy-outline" label="Suporte & FAQ" />

          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <View style={styles.logoutIconBg}>
              <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
            </View>
            <Text style={styles.logoutText}>Encerrar Sessão</Text>
          </TouchableOpacity>
        </MotiView>
      </ScrollView>

      {/* MODAL MODERNO */}
      <Modal transparent animationType="fade" visible={modalVisible}>
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={styles.modalContent}
          >
            <Ionicons name="alert-circle" size={50} color={COLORS.danger} />
            <Text style={styles.modalTitle}>Confirmação de Logout</Text>
            <Text style={styles.modalText}>
              Tens a certeza que desejas sair da tua conta Gasolink?
            </Text>
            <View style={styles.modalBtnsRow}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#f1f5f9" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: COLORS.secondary, fontWeight: "700" }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: COLORS.danger }]}
                onPress={confirmLogout}
              >
                <Text style={{ color: "#fff", fontWeight: "700" }}>Sair</Text>
              </TouchableOpacity>
            </View>
          </MotiView>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

// COMPONENTES AUXILIARES
interface StatBoxProps {
  label: string;
  value: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  delay: number;
}

const StatBox = ({ label, value, icon, delay }: StatBoxProps) => (
  <MotiView
    from={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    style={styles.statBox}
  >
    <MaterialCommunityIcons name={icon} size={24} color={COLORS.primary} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </MotiView>
);

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

const MenuItem = ({ icon, label }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} activeOpacity={0.6}>
    <View style={styles.menuLeft}>
      <Ionicons name={icon} size={22} color={COLORS.secondary} />
      <Text style={styles.menuLabel}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 60 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 45 : 10,
    marginBottom: 10,
    height: 60,
  },
  brandTitle: { fontSize: 14, fontWeight: "900", color: COLORS.secondary, letterSpacing: 3 },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingsBtn: { padding: 5 },
  profileSection: { alignItems: "center", marginBottom: 30 },
  avatarWrapper: { width: 110, height: 110, marginBottom: 15 },
  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff",
  },
  avatarText: { color: "#FFF", fontSize: 44, fontWeight: "800" },
  verifiedBadge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  userName: { fontSize: 26, fontWeight: "800", color: COLORS.secondary },
  userEmail: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
  badgePremium: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    marginTop: 15,
    elevation: 4,
  },
  badgeText: { color: COLORS.accent, fontSize: 11, fontWeight: "bold", marginLeft: 6 },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 10 },
  statBox: {
    width: "31%",
    backgroundColor: "#fff",
    paddingVertical: 20,
    borderRadius: 24,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  statValue: { fontSize: 15, fontWeight: "800", color: COLORS.secondary, marginTop: 10 },
  statLabel: { fontSize: 10, color: COLORS.textSecondary, fontWeight: "600", marginTop: 4 },
  menuContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
  menuTitle: { fontSize: 13, fontWeight: "700", color: COLORS.textSecondary, marginBottom: 10 },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  menuLeft: { flexDirection: "row", alignItems: "center" },
  menuLabel: { marginLeft: 15, fontSize: 15, fontWeight: "600", color: COLORS.secondary },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#fef2f2",
    borderRadius: 15,
    paddingHorizontal: 15,
  },
  logoutIconBg: {
    width: 36,
    height: 36,
    backgroundColor: "#fee2e2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: { marginLeft: 12, color: COLORS.danger, fontWeight: "700", fontSize: 15 },

  /* MODAL */
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    padding: 25,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginTop: 12, marginBottom: 6, textAlign: "center" },
  modalText: { fontSize: 13, color: "#64748b", textAlign: "center", marginBottom: 20 },
  modalBtnsRow: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
