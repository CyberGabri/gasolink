import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";

// Definição dos planos com cores e benefícios crescentes
const PLANOS = [
  {
    id: "basico",
    nome: "Básico",
    preco: "Grátis",
    cor: "#94a3b8",
    desc: "Acesso ao mapa básico",
  },
  {
    id: "medio",
    nome: "Médio",
    preco: "R$ 9,90",
    cor: "#3b82f6",
    desc: "Alertas de preço em tempo real",
  },
  {
    id: "premium",
    nome: "Premium",
    preco: "R$ 19,90",
    cor: "#FFD700",
    desc: "Cálculo de autonomia + Zero Ads",
  },
  {
    id: "ultra",
    nome: "Ultra",
    preco: "R$ 34,90",
    cor: "#f97316",
    desc: "Suporte VIP + Histórico ilimitado",
  },
  {
    id: "mega",
    nome: "MEGA",
    preco: "R$ 59,90",
    cor: "#a855f7",
    desc: "IA Predictor + Clube de Vantagens",
  },
];

export default function PlanosScreen() {
  const [selecionado, setSelecionado] = useState("premium");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.brandTitle}>GASOLINK</Text>
          <Text style={styles.subTitle}>Escolha seu nível de economia</Text>
        </View>

        {PLANOS.map((plano, index) => {
          const isSelected = selecionado === plano.id;

          return (
            <TouchableOpacity
              key={plano.id}
              activeOpacity={0.9}
              onPress={() => setSelecionado(plano.id)}
            >
              <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{
                  opacity: 1,
                  translateY: 0,
                  scale: isSelected ? 1.02 : 1,
                  borderColor: isSelected ? plano.cor : "#E2E8F0",
                }}
                transition={{ delay: index * 100, type: "timing" }}
                style={[styles.planCard, isSelected && styles.selectedShadow]}
              >
                <View style={styles.cardHeader}>
                  <View
                    style={[styles.colorBar, { backgroundColor: plano.cor }]}
                  />
                  <View style={styles.textInfo}>
                    <Text
                      style={[
                        styles.planName,
                        { color: isSelected ? plano.cor : "#1e293b" },
                      ]}
                    >
                      {plano.nome} {isSelected && "✓"}
                    </Text>
                    <Text style={styles.planDesc}>{plano.desc}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.planPrice}>{plano.preco}</Text>
                  </View>
                </View>

                {isSelected && (
                  <MotiView
                    from={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 60 }}
                    style={styles.expandedArea}
                  >
                    <TouchableOpacity
                      style={[
                        styles.subscribeBtn,
                        { backgroundColor: plano.cor },
                      ]}
                    >
                      <Text style={styles.subscribeBtnText}>ATIVAR AGORA</Text>
                    </TouchableOpacity>
                  </MotiView>
                )}
              </MotiView>
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
  header: {
    paddingTop: Platform.OS === "android" ? 50 : 20,
    marginBottom: 30,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1e293b",
    letterSpacing: 1,
  },
  subTitle: { fontSize: 14, color: "#64748b", fontWeight: "600" },

  planCard: {
    backgroundColor: "#FFF",
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#E2E8F0",
  },
  selectedShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorBar: {
    width: 6,
    height: 40,
    borderRadius: 3,
    marginRight: 15,
  },
  textInfo: { flex: 1 },
  planName: { fontSize: 18, fontWeight: "900" },
  planDesc: { fontSize: 12, color: "#94a3b8", marginTop: 2, fontWeight: "600" },
  priceContainer: { alignItems: "flex-end" },
  planPrice: { fontSize: 16, fontWeight: "900", color: "#1e293b" },

  expandedArea: {
    marginTop: 15,
    justifyContent: "center",
    overflow: "hidden",
  },
  subscribeBtn: {
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  subscribeBtnText: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 13,
    letterSpacing: 1,
  },
});
