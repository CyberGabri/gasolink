import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Switch,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useRouter } from "expo-router";

const COLORS = {
  primary: "#6366f1",
  secondary: "#0f172a",
  background: "#ffffff",
  card: "#f8fafc",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
};

export default function PreferenciasScreen() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [ecoMode, setEcoMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/home")}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preferências</Text>
        <View style={{ width: 45 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.topIllustration}>
          <MotiView
            from={{ rotate: "0deg" }}
            animate={{ rotate: "360deg" }}
            transition={{ loop: true, duration: 20000 }}
            style={styles.settingsGearBg}
          >
            <Ionicons name="settings-sharp" size={100} color="#f1f5f9" />
          </MotiView>

          <MotiView
            from={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={styles.iconOverlay}
          >
            <MaterialCommunityIcons
              name="tune-variant"
              size={40}
              color={COLORS.primary}
            />
          </MotiView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPERIÊNCIA VISUAL</Text>

          <PreferenceItem
            icon="moon-outline"
            label="Modo Escuro"
            desc="Reduz o cansaço visual à noite"
            value={darkMode}
            onValueChange={setDarkMode}
            color="#818cf8"
          />

          <PreferenceItem
            icon="leaf-outline"
            label="Modo Eco"
            desc="Otimiza o consumo de bateria"
            value={ecoMode}
            onValueChange={setEcoMode}
            color="#10b981"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SISTEMA E PRIVACIDADE</Text>

          <PreferenceItem
            icon="notifications-outline"
            label="Notificações Push"
            desc="Alertas de novas corridas e bônus"
            value={notifications}
            onValueChange={setNotifications}
            color="#f59e0b"
          />

          <PreferenceItem
            icon="location-outline"
            label="Localização em 2º Plano"
            desc="Melhora a precisão do GPS"
            value={location}
            onValueChange={setLocation}
            color="#ef4444"
          />
        </View>

        <TouchableOpacity style={styles.languageCard} activeOpacity={0.7}>
          <View style={styles.languageInfo}>
            <View style={styles.langIconCircle}>
              <Ionicons
                name="language-outline"
                size={22}
                color={COLORS.secondary}
              />
            </View>
            <View>
              <Text style={styles.langLabel}>Idioma do App</Text>
              <Text style={styles.langValue}>Português (Brasil)</Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => router.replace("/(tabs)/home")}
        >
          <MotiView
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ loop: true, duration: 2000 }}
          >
            <Text style={styles.saveBtnText}>CONCLUÍDO</Text>
          </MotiView>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const PreferenceItem = ({
  icon,
  label,
  desc,
  value,
  onValueChange,
  color,
}: any) => (
  <MotiView
    animate={{
      backgroundColor: value ? "#fff" : COLORS.card,
      borderColor: value ? color + "40" : "#f1f5f9",
    }}
    style={styles.prefCard}
  >
    <View style={styles.prefLeft}>
      <View
        style={[
          styles.prefIconBg,
          { backgroundColor: value ? color : "#e2e8f0" },
        ]}
      >
        <Ionicons
          name={icon}
          size={22}
          color={value ? "#fff" : COLORS.textSecondary}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.prefLabel}>{label}</Text>
        <Text style={styles.prefDesc}>{desc}</Text>
      </View>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: "#cbd5e1", true: color }}
      thumbColor="#fff"
      ios_backgroundColor="#cbd5e1"
    />
  </MotiView>
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
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "800", color: COLORS.secondary },
  scrollContent: { paddingHorizontal: 25 },
  topIllustration: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsGearBg: { position: "absolute" },
  iconOverlay: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  section: { marginTop: 20 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "900",
    color: COLORS.textSecondary,
    marginBottom: 15,
    letterSpacing: 1.2,
  },
  prefCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 22,
    marginBottom: 12,
    borderWidth: 1.5,
  },
  prefLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  prefIconBg: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  prefLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  prefDesc: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
    paddingRight: 10,
  },
  languageCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 22,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  languageInfo: { flexDirection: "row", alignItems: "center" },
  langIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  langLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  langValue: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "600",
  },
  saveBtn: {
    height: 65,
    backgroundColor: COLORS.secondary,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 15,
    letterSpacing: 1,
  },
});
