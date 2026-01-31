import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, SafeAreaView } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { COLORS } from "../../constants/Colors";

export default function VeiculoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* HEADER DA TELA */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandTitle}>MEU VEÍCULO</Text>
            <Text style={styles.subTitle}>Status do Sistema</Text>
          </View>
          <View style={styles.activeBadge}>
            <View style={styles.pulseDot} />
            <Text style={styles.activeText}>MONITORANDO</Text>
          </View>
        </View>

        {/* CARD DO CARRO - DESIGN PREMIUM */}
        <MotiView 
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.carMainCard}
        >
          <View style={styles.carInfoRow}>
            <MaterialCommunityIcons name="car-back" size={50} color="#FFD700" />
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.carModel}>Chevrolet Onix 1.0</Text>
              <Text style={styles.carPlate}>Placa: GAS-2026</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.recommendationLabel}>RECOMENDAÇÃO GASOLINK:</Text>
          <Text style={styles.recommendationText}>
            Para o motor 1.0 Flex, recomendamos o uso de <Text style={{color: '#FFD700', fontWeight: '900'}}>Gasolina Aditivada</Text> neste trajeto para manter a limpeza dos bicos e autonomia de 14km/l.
          </Text>
        </MotiView>

        {/* MÉTRICAS DE DESEMPENHO */}
        <View style={styles.statsGrid}>
          <MetricCard icon="gas-station-outline" label="Combustível" value="Gasolina" detail="Melhor Custo" />
          <MetricCard icon="leaf-outline" label="Eco Score" value="8.5/10" detail="Muito Bom" />
        </View>

        {/* CHECKLIST DE OTIMIZAÇÃO */}
        <Text style={styles.sectionTitle}>Checklist de Eficiência</Text>
        
        <CheckItem icon="speedometer" label="Calibragem de Pneus" status="Revisar" warning />
        <CheckItem icon="oil" label="Troca de Óleo" status="Em dia" />
        <CheckItem icon="filter-outline" label="Filtro de Ar" status="Em dia" />

        {/* BOTÃO DE AJUSTES */}
        <TouchableOpacity style={styles.configButton}>
          <Ionicons name="options-outline" size={20} color="#000" />
          <Text style={styles.configButtonText}>CONFIGURAÇÕES DO MOTOR</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// COMPONENTE: CARD DE MÉTRICA
const MetricCard = ({ icon, label, value, detail }: any) => (
  <View style={styles.metricCard}>
    <Ionicons name={icon} size={24} color="#FFD700" />
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricDetail}>{detail}</Text>
  </View>
);

// COMPONENTE: ITEM DE CHECKLIST
const CheckItem = ({ icon, label, status, warning }: any) => (
  <View style={styles.checkItem}>
    <View style={styles.checkLeft}>
      <MaterialCommunityIcons name={icon} size={22} color={warning ? "#ef4444" : "#10b981"} />
      <Text style={styles.checkLabel}>{label}</Text>
    </View>
    <Text style={[styles.checkStatus, { color: warning ? "#ef4444" : "#10b981" }]}>
      {status}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 120 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 40 : 10,
    height: 90,
  },
  brandTitle: { fontSize: 18, fontWeight: "900", color: "#1e293b", letterSpacing: 2 },
  subTitle: { fontSize: 12, color: "#64748b", fontWeight: "700" },
  activeBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0fdf4', padding: 8, borderRadius: 12 },
  pulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22c55e', marginRight: 6 },
  activeText: { fontSize: 10, fontWeight: '900', color: '#166534' },

  carMainCard: { backgroundColor: "#000", borderRadius: 30, padding: 25, marginTop: 20 },
  carInfoRow: { flexDirection: 'row', alignItems: 'center' },
  carModel: { color: '#FFF', fontSize: 20, fontWeight: '900' },
  carPlate: { color: '#94a3b8', fontSize: 12, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#334155', marginVertical: 20 },
  recommendationLabel: { color: '#FFD700', fontSize: 11, fontWeight: '900', marginBottom: 8 },
  recommendationText: { color: '#cbd5e1', fontSize: 14, lineHeight: 22 },

  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  metricCard: { width: '47%', backgroundColor: '#f8fafc', borderRadius: 25, padding: 20, borderWidth: 1, borderColor: '#f1f5f9' },
  metricLabel: { fontSize: 12, color: '#64748b', fontWeight: '600', marginTop: 10 },
  metricValue: { fontSize: 18, fontWeight: '900', color: '#1e293b', marginVertical: 4 },
  metricDetail: { fontSize: 11, color: '#10b981', fontWeight: '700' },

  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#1e293b', marginTop: 30, marginBottom: 20 },
  checkItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', padding: 18, borderRadius: 20, marginBottom: 12 },
  checkLeft: { flexDirection: 'row', alignItems: 'center' },
  checkLabel: { marginLeft: 12, fontSize: 14, fontWeight: '600', color: '#334155' },
  checkStatus: { fontSize: 12, fontWeight: '900' },

  configButton: { backgroundColor: "#FFD700", height: 60, borderRadius: 20, flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20, gap: 10 },
  configButtonText: { color: "#000", fontWeight: "900", fontSize: 13, letterSpacing: 1 },
});