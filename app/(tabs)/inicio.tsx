import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView, AnimatePresence } from "moti";

const { width } = Dimensions.get("window");

type Posto = {
  id: string;
  nome: string;
  preco: string;
  bairro: string;
  status: string;
  icone: string;
};

const POSTOS_FORTALEZA: Posto[] = [
  {
    id: "1",
    nome: "Ipiranga Chesf",
    preco: "5.75",
    bairro: "Passaré",
    status: "Melhor Preço",
    icone: "gas-station",
  },
  {
    id: "2",
    nome: "Shell Dragão",
    preco: "5.92",
    bairro: "Centro",
    status: "Conveniência",
    icone: "gas-station-outline",
  },
  {
    id: "3",
    nome: "Posto SP Aguanambi",
    preco: "5.88",
    bairro: "Fátima",
    status: "Médio",
    icone: "gas-station",
  },
  {
    id: "4",
    nome: "Petrobras Aldeota",
    preco: "6.05",
    bairro: "Aldeota",
    status: "Premium",
    icone: "gas-station",
  },
  {
    id: "5",
    nome: "Posto Cidade",
    preco: "5.69",
    bairro: "Maraponga",
    status: "Melhor Preço",
    icone: "gas-station",
  },
];

export default function Inicio() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [showMapInfo, setShowMapInfo] = useState(false);

  const phrases = [
    "Analisando 42 postos em Fortaleza...",
    "Economia média atual: R$ 0,45/litro.",
    "IA: Evite a região da Aldeota agora.",
    "Oportunidade no Passaré detectada.",
    "Refinaria reduziu preço em 1.2% hoje.",
  ];

  useEffect(() => {
    const full = phrases[index];
    const speed = deleting ? 20 : 50;

    const timer = setTimeout(() => {
      if (!deleting && text === full) {
        setTimeout(() => setDeleting(true), 2500);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((p) => (p + 1) % phrases.length);
      } else {
        setText(
          deleting
            ? full.slice(0, text.length - 1)
            : full.slice(0, text.length + 1),
        );
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  return (
    <ScrollView
      style={styles.main}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <MotiView
        from={{ opacity: 0, translateY: -12 }}
        animate={{ opacity: 1, translateY: 0 }}
        style={styles.header}
      >
        <View>
          <Text style={styles.dateText}>QUINTA, 05 DE FEVEREIRO</Text>
          <Text style={styles.greeting}>Olá, Dalvan</Text>
        </View>

        <TouchableOpacity style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={24} color="#0f172a" />
          <View style={styles.badge} />
        </TouchableOpacity>
      </MotiView>

      <MotiView
        from={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={styles.aiCard}
      >
        <LinearGradient
          colors={["#1e293b", "#0f172a"]}
          style={styles.aiGradient}
        >
          <View style={styles.aiHeader}>
            <Ionicons name="sparkles" size={18} color="#60a5fa" />
            <Text style={styles.aiTitle}>GASOLINK INTELLIGENCE</Text>
          </View>
          <Text style={styles.aiText}>
            {text}
            <Text style={styles.cursor}>|</Text>
          </Text>
        </LinearGradient>
      </MotiView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Cobertura Local</Text>
        <View style={styles.liveTag}>
          <MotiView
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ loop: true, duration: 1000 }}
          >
            <View style={styles.liveDot} />
          </MotiView>
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setShowMapInfo(!showMapInfo)}
        style={styles.mapCard}
      >
        <LinearGradient
          colors={["#f8fafc", "#f1f5f9"]}
          style={styles.mapContent}
        >
          <MaterialCommunityIcons
            name="map-marker-path"
            size={40}
            color="#3b82f6"
            style={styles.mapIcon}
          />

          <AnimatePresence>
            {!showMapInfo ? (
              <MotiView
                key="a"
                from={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Text style={styles.mapStatusTitle}>Visão Geográfica</Text>
                <Text style={styles.mapStatusSub}>
                  Toque para detalhes do Roadmap 2026
                </Text>
              </MotiView>
            ) : (
              <MotiView
                key="b"
                from={{ opacity: 0, translateY: 8 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0 }}
              >
                <Text style={styles.mapStrategicText}>
                  Módulo de satélite em implantação estratégica.
                  <Text style={{ fontWeight: "800", color: "#3b82f6" }}>
                    {" "}
                    Previsão: Q2 2026.
                  </Text>
                </Text>
              </MotiView>
            )}
          </AnimatePresence>

          <View style={styles.mapTag}>
            <Text style={styles.mapTagText}>ROADMAP</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Ranking de Preços</Text>
      </View>

      {POSTOS_FORTALEZA.map((p, i) => (
        <MotiView
          key={p.id}
          from={{ opacity: 0, translateX: -16 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: i * 80 }}
          style={styles.postoCard}
        >
          <View style={styles.postoInfo}>
            <View
              style={[
                styles.postoIcon,
                {
                  backgroundColor:
                    p.status === "Melhor Preço" ? "#dcfce7" : "#f1f5f9",
                },
              ]}
            >
              <MaterialCommunityIcons
                name={p.icone as any}
                size={22}
                color={p.status === "Melhor Preço" ? "#16a34a" : "#64748b"}
              />
            </View>
            <View>
              <Text style={styles.postoNome}>{p.nome}</Text>
              <Text style={styles.postoBairro}>{p.bairro} • 1.2 km</Text>
            </View>
          </View>

          <View style={styles.postoPriceContainer}>
            <Text style={styles.priceLabel}>GASOLINA</Text>
            <Text style={styles.priceValue}>
              <Text style={styles.currency}>R$</Text> {p.preco}
            </Text>
          </View>
        </MotiView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { padding: 20, paddingBottom: 100 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  dateText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#94a3b8",
    letterSpacing: 1,
  },
  greeting: { fontSize: 26, fontWeight: "900", color: "#0f172a", marginTop: 2 },
  notificationBtn: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
    borderWidth: 2,
    borderColor: "#fff",
  },
  aiCard: { marginBottom: 30, borderRadius: 24, overflow: "hidden" },
  aiGradient: { padding: 20 },
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  aiTitle: {
    color: "#60a5fa",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  aiText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    minHeight: 48,
  },
  cursor: { color: "#3b82f6", fontWeight: "bold" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "900", color: "#0f172a" },
  liveTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef2f2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ef4444",
    marginRight: 5,
  },
  liveText: { fontSize: 9, fontWeight: "900", color: "#ef4444" },
  mapCard: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 30,
    backgroundColor: "#f8fafc",
  },
  mapContent: { padding: 25, alignItems: "center" },
  mapIcon: { marginBottom: 15 },
  mapStatusTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1e293b",
    textAlign: "center",
  },
  mapStatusSub: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 5,
    textAlign: "center",
  },
  mapStrategicText: {
    fontSize: 13,
    color: "#475569",
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "500",
  },
  mapTag: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "#3b82f6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  mapTagText: { color: "#fff", fontSize: 9, fontWeight: "900" },
  postoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  postoInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
  postoIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  postoNome: { fontSize: 15, fontWeight: "800", color: "#1e293b" },
  postoBairro: { fontSize: 12, color: "#94a3b8", marginTop: 2 },
  postoPriceContainer: { alignItems: "flex-end" },
  priceLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: "#94a3b8",
    marginBottom: 2,
  },
  priceValue: { fontSize: 20, fontWeight: "900", color: "#0f172a" },
  currency: { color: "#3b82f6", fontSize: 12 },
});
