import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { COLORS } from "../../constants/Colors";

export default function VeiculoScreen() {
  // Fallbacks de cores para evitar erro de 'undefined' no APK
  const primaryColor = COLORS?.primary ?? "#0f172a";
  const accentColor = "#FFD700"; // Dourado Premium

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER DA TELA */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandTitle}>MEU VEÍCULO</Text>
            <Text style={styles.subTitle}>Status do Sistema</Text>
          </View>
          <MotiView
            from={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ loop: true, duration: 1000, type: "timing" }}
            style={styles.activeBadge}
          >
            <View style={styles.pulseDot} />
            <Text style={styles.activeText}>MONITORANDO</Text>
          </MotiView>
        </View>

        {/* CARD DO CARRO - DESIGN PREMIUM */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          style={[styles.carMainCard, { backgroundColor: primaryColor }]}
        >
          <View style={styles.carInfoRow}>
            <MaterialCommunityIcons
              name="car-back"
              size={50}
              color={accentColor}
            />
            <View style={{ marginLeft: 15, flex: 1 }}>
              <Text style={styles.carModel}>Chevrolet Onix 1.0</Text>
              <Text style={styles.carPlate}>Placa: GAS-2026</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={[styles.recommendationLabel, { color: accentColor }]}>
            RECOMENDAÇÃO GASOLINK:
          </Text>
          <Text style={styles.recommendationText}>
            Para o motor 1.0 Flex, recomendamos o uso de{" "}
            <Text style={{ color: accentColor, fontWeight: "900" }}>
              Gasolina Aditivada
            </Text>{" "}
            neste trajeto para manter a limpeza dos bicos e autonomia de 14km/l.
          </Text>
        </MotiView>

        {/* MÉTRICAS DE DESEMPENHO */}
        <View style={styles.statsGrid}>
          <MetricCard
            icon="gas-station-outline"
            label="Combustível"
            value="Gasolina"
            detail="Melhor Custo"
            accent={accentColor}
          />
          <MetricCard
            icon="leaf-outline"
            label="Eco Score"
            value="8.5/10"
            detail="Muito Bom"
            accent={accentColor}
          />
        </View>

        {/* CHECKLIST DE OTIMIZAÇÃO */}
        <Text style={styles.sectionTitle}>Checklist de Eficiência</Text>

        <CheckItem
          icon="speedometer"
          label="Calibragem de Pneus"
          status="Revisar"
          warning
        />
        <CheckItem icon="oil" label="Troca de Óleo" status="Em dia" />
        <CheckItem icon="filter-outline" label="Filtro de Ar" status="Em dia" />

        {/* BOTÃO DE AJUSTES */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.configButton, { backgroundColor: accentColor }]}
        >
          <Ionicons name="options-outline" size={20} color="#000" />
          <Text style={styles.configButtonText}>CONFIGURAÇÕES DO MOTOR</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// COMPONENTE: CARD DE MÉTRICA
const MetricCard = ({ icon, label, value, detail, accent }: any) => (
  <View style={styles.metricCard}>
    <Ionicons name={icon} size={24} color={accent} />
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricDetail}>{detail}</Text>
  </View>
);

// COMPONENTE: ITEM DE CHECKLIST
const CheckItem = ({ icon, label, status, warning }: any) => (
  <View style={styles.checkItem}>
    <View style={styles.checkLeft}>
      <MaterialCommunityIcons
        name={icon}
        size={22}
        color={warning ? "#ef4444" : "#10b981"}
      />
      <Text style={styles.checkLabel}>{label}</Text>
    </View>
    <Text
      style={[styles.checkStatus, { color: warning ? "#ef4444" : "#10b981" }]}
    >
      {status}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 140, // Espaço extra para não cobrir com a TabBar flutuante
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
    marginTop: Platform.OS === "android" ? 20 : 0,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1e293b",
    letterSpacing: 2,
  },
  subTitle: { fontSize: 12, color: "#64748b", fontWeight: "700" },
  activeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22c55e",
    marginRight: 6,
  },
  activeText: { fontSize: 10, fontWeight: "900", color: "#166534" },

  carMainCard: {
    borderRadius: 30,
    padding: 25,
    marginTop: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  carInfoRow: { flexDirection: "row", alignItems: "center" },
  carModel: { color: "#FFF", fontSize: 20, fontWeight: "900" },
  carPlate: { color: "#94a3b8", fontSize: 12, fontWeight: "600" },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 20,
  },
  recommendationLabel: { fontSize: 11, fontWeight: "900", marginBottom: 8 },
  recommendationText: { color: "#cbd5e1", fontSize: 14, lineHeight: 22 },

  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  metricCard: {
    width: "48%",
    backgroundColor: "#f8fafc",
    borderRadius: 25,
    padding: 20,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    elevation: 2,
  },
  metricLabel: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "600",
    marginTop: 10,
  },
  metricValue: {
    fontSize: 17,
    fontWeight: "900",
    color: "#1e293b",
    marginVertical: 4,
  },
  metricDetail: { fontSize: 11, color: "#10b981", fontWeight: "700" },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1e293b",
    marginTop: 30,
    marginBottom: 20,
  },
  checkItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 18,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  checkLeft: { flexDirection: "row", alignItems: "center" },
  checkLabel: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  checkStatus: { fontSize: 12, fontWeight: "900" },

  configButton: {
    height: 60,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
    elevation: 5,
  },
  configButtonText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 13,
    letterSpacing: 1,
  },
});
