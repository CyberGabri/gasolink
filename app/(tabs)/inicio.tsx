import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
// Se o erro persistir no VS Code após instalar, tente reiniciar o TS Server
// (Ctrl+Shift+P > TypeScript: Restart TS Server)
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";

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
  {
    id: "6",
    nome: "Shell W. Soares",
    preco: "5.99",
    bairro: "Edson Queiroz",
    status: "Médio",
    icone: "gas-station",
  },
  {
    id: "7",
    nome: "Ipiranga Bezerra",
    preco: "5.85",
    bairro: "Parquelândia",
    status: "Promoção",
    icone: "gas-station",
  },
];

export default function Inicio() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const activeColor = "#3b82f6";

  const phrases = [
    "Analisando 42 postos em Fortaleza...",
    "Economia média atual: R$ 0,45/litro.",
    "IA: Evite a região da Aldeota agora.",
    "Oportunidade no Passaré detectada.",
    "Refinaria reduziu preço em 1.2% hoje.",
  ];

  useEffect(() => {
    // Solução para o erro 2503: Usar 'ReturnType<typeof setTimeout>'
    // Isso funciona tanto em Node quanto no Browser/React Native
    let timer: ReturnType<typeof setTimeout>;

    const full = phrases[index];
    const speed = deleting ? 30 : 60;

    timer = setTimeout(() => {
      if (!deleting && text === full) {
        setTimeout(() => setDeleting(true), 3000);
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
      {/* HEADER */}
      <MotiView
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        style={styles.header}
      >
        <View>
          <Text style={styles.greeting}>Olá, Dalvan</Text>
          <Text style={styles.subGreeting}>
            Sua economia está 12% maior este mês.
          </Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <LinearGradient
            colors={["#3b82f6", "#8b5cf6"]}
            style={styles.avatarGradient}
          >
            <Text style={styles.avatarText}>LN</Text>
          </LinearGradient>
        </TouchableOpacity>
      </MotiView>

      <View style={styles.chipRow}>
        <View style={styles.activeChip}>
          <View style={styles.pulseDot} />
          <Text style={styles.activeChipText}>Monitorando: Fortaleza</Text>
        </View>
      </View>

      {/* TERMINAL IA */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        style={styles.aiCard}
      >
        <View style={styles.aiHeader}>
          <MaterialCommunityIcons name="auto-fix" size={20} color="#fff" />
          <Text style={styles.aiTitle}>Insights da GasoLink AI</Text>
        </View>
        <View style={styles.aiContent}>
          <Text style={styles.aiText}>
            {"> "}
            {text}
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ loop: true, duration: 500, type: "timing" }}
              style={styles.cursor}
            />
          </Text>
        </View>
      </MotiView>

      <View style={styles.mapContainer}>
        <View style={styles.mapBlur}>
          <MaterialCommunityIcons
            name="map-marker-radius"
            size={40}
            color="#cbd5e1"
          />
          <Text style={styles.mapTitle}>Visualização Geográfica</Text>
          <Text style={styles.mapSub}>
            Módulo em processamento para versão Web
          </Text>
          <TouchableOpacity style={styles.mapBtn}>
            <Text style={styles.mapBtnText}>Ativar GPS</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Ranking de Preços</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={18} color="#64748b" />
          <Text style={styles.filterText}>Filtros</Text>
        </TouchableOpacity>
      </View>

      {POSTOS_FORTALEZA.map((p, i) => (
        <MotiView
          key={p.id}
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 200 + i * 100, type: "spring", damping: 15 }}
          style={styles.cardPosto}
        >
          <View style={styles.cardLeft}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor:
                    p.status === "Melhor Preço" ? "#eff6ff" : "#f8fafc",
                },
              ]}
            >
              <MaterialCommunityIcons
                name={p.icone as any}
                size={22}
                color={p.status === "Melhor Preço" ? "#3b82f6" : "#94a3b8"}
              />
            </View>
            <View>
              <Text style={styles.nomePosto}>{p.nome}</Text>
              <View style={styles.bairroRow}>
                <Ionicons name="navigate-outline" size={10} color="#94a3b8" />
                <Text style={styles.bairroText}>{p.bairro} • 1.2km</Text>
              </View>
            </View>
          </View>

          <View style={styles.cardRight}>
            <Text style={styles.labelPreco}>Gasolina Comum</Text>
            <Text style={styles.precoText}>
              <Text style={styles.cifrao}>R$</Text> {p.preco}
            </Text>
            <View
              style={[
                styles.tagStatus,
                {
                  backgroundColor:
                    p.status === "Melhor Preço" ? "#dcfce7" : "#f1f5f9",
                },
              ]}
            >
              <Text
                style={[
                  styles.tagText,
                  {
                    color: p.status === "Melhor Preço" ? "#16a34a" : "#64748b",
                  },
                ]}
              >
                {p.status}
              </Text>
            </View>
          </View>
        </MotiView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { padding: 20, paddingBottom: 120 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  greeting: { fontSize: 22, fontWeight: "900", color: "#0f172a" },
  subGreeting: { fontSize: 13, color: "#64748b", marginTop: 2 },
  profileBtn: {
    shadowColor: "#3b82f6",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  avatarGradient: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  chipRow: { marginBottom: 25 },
  activeChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10b981",
    marginRight: 8,
  },
  activeChipText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
    textTransform: "uppercase",
  },
  aiCard: {
    backgroundColor: "#0f172a",
    borderRadius: 24,
    padding: 20,
    marginBottom: 25,
    overflow: "hidden",
  },
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  aiTitle: {
    fontSize: 10,
    color: "#94a3b8",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  aiContent: { minHeight: 45 },
  aiText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 22,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  cursor: {
    width: 6,
    height: 15,
    backgroundColor: "#3b82f6",
    marginLeft: 4,
    alignSelf: "center",
  },
  mapContainer: {
    height: 160,
    backgroundColor: "#f8fafc",
    borderRadius: 24,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    overflow: "hidden",
  },
  mapBlur: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  mapTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1e293b",
    marginTop: 10,
  },
  mapSub: { fontSize: 12, color: "#94a3b8", textAlign: "center", marginTop: 4 },
  mapBtn: {
    marginTop: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    elevation: 1,
  },
  mapBtnText: { fontSize: 12, fontWeight: "700", color: "#3b82f6" },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "900", color: "#0f172a" },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#f8fafc",
    padding: 8,
    borderRadius: 10,
  },
  filterText: { fontSize: 12, fontWeight: "600", color: "#64748b" },
  cardPosto: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f1f5f9",
    elevation: 2,
  },
  cardLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  nomePosto: { fontSize: 15, fontWeight: "800", color: "#1e293b" },
  bairroRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  bairroText: { fontSize: 11, color: "#94a3b8", fontWeight: "500" },
  cardRight: { alignItems: "flex-end" },
  labelPreco: {
    fontSize: 9,
    color: "#94a3b8",
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  precoText: { fontSize: 20, fontWeight: "900", color: "#0f172a" },
  cifrao: { fontSize: 12, color: "#3b82f6" },
  tagStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
  },
  tagText: { fontSize: 9, fontWeight: "800", textTransform: "uppercase" },
});
