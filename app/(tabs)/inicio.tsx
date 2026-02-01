import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  Platform, 
  TouchableOpacity 
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView, AnimatePresence } from "moti";
import { COLORS } from "../../constants/Colors";

const { width } = Dimensions.get("window");

export default function Inicio() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const activeColor = COLORS?.primary ?? "#0f172a";

  const phrases = [
    "Analisando preços em Fortaleza...",
    "Posto Chesf: Oportunidade detectada.",
    "Tendência de alta no Brent em 48h.",
    "Monitoramento ativo em tempo real.",
  ];

  useEffect(() => {
  // Remova a tipagem ": NodeJS.Timeout"
  let timer: any; 
  const full = phrases[index] || "";
  const speed = deleting ? 20 : 50;

  timer = setTimeout(() => {
    if (!deleting && text === full) {
      setTimeout(() => setDeleting(true), 2500);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((p) => (p + 1) % phrases.length);
    } else {
      setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }
  }, speed);

  return () => clearTimeout(timer);
}, [text, deleting, index]);
  const postos = [
    { id: "D1", nome: "Ipiranga Chesf", preco: "5,75", latitude: -3.7689, longitude: -38.4966, status: 'Barato' },
    { id: "D2", nome: "Shell Dragão", preco: "5,92", latitude: -3.7215, longitude: -38.5134, status: 'Médio' },
    { id: "D3", nome: "Posto SP Aguanambi", preco: "5,88", latitude: -3.7462, longitude: -38.5211, status: 'Médio' },
  ];

  return (
    <ScrollView 
      style={styles.main} 
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Estilizado */}
      <MotiView 
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        style={styles.header}
      >
        <View>
          <Text style={styles.greeting}>Painel de Controle</Text>
          <View style={styles.locationBadge}>
            <Ionicons name="location" size={12} color={activeColor} />
            <Text style={styles.locationText}>Fortaleza, CE</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={22} color="#1e293b" />
          <View style={styles.dot} />
        </TouchableOpacity>
      </MotiView>

      {/* Terminal Analítico (Estilo Dark Mode) */}
      <MotiView 
        from={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={styles.terminal}
      >
        <View style={styles.terminalHeader}>
          <View style={styles.terminalDots}>
            <View style={[styles.tDot, { backgroundColor: '#ff5f56' }]} />
            <View style={[styles.tDot, { backgroundColor: '#ffbd2e' }]} />
            <View style={[styles.tDot, { backgroundColor: '#27c93f' }]} />
          </View>
          <Text style={styles.terminalTitle}>GASOLINK AI • LIVE FEED</Text>
        </View>
        <View style={styles.terminalContent}>
          <Text style={styles.terminalText}>
            {"> "}
            {text}
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ loop: true, duration: 400 }}
              style={styles.cursor}
            />
          </Text>
        </View>
      </MotiView>

      <Text style={styles.sectionTitle}>Mapa Inteligente</Text>

      {/* Container do Mapa com Fallback de Segurança */}
      <View style={styles.mapWrapper}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -3.7462,
            longitude: -38.5134,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
          pitchEnabled={false}
          rotateEnabled={false}
          cacheEnabled={true} // Crucial para não travar Android
        >
          {postos.map((p) => (
            <Marker key={p.id} coordinate={{ latitude: p.latitude, longitude: p.longitude }}>
              <View style={styles.customMarker}>
                <Text style={styles.markerPrice}>R${p.preco}</Text>
              </View>
            </Marker>
          ))}
        </MapView>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>Melhores Opções</Text>
        <TouchableOpacity><Text style={styles.seeAll}>Ver todos</Text></TouchableOpacity>
      </View>

      {/* Lista de Postos Refinada */}
      {postos.map((p, i) => (
        <MotiView 
          key={p.id}
          from={{ opacity: 0, translateX: -10 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 400 + (i * 100) }}
          style={styles.postoCard}
        >
          <View style={styles.postoInfo}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name="gas-station" size={24} color={activeColor} />
            </View>
            <View>
              <Text style={styles.postoNome}>{p.nome}</Text>
              <Text style={styles.postoDist}>A 2.4 km de você</Text>
            </View>
          </View>
          <View style={styles.postoPriceBox}>
            <Text style={styles.postoPrice}>R$ {p.preco}</Text>
            <View style={[styles.statusTag, { backgroundColor: p.status === 'Barato' ? '#dcfce7' : '#f1f5f9' }]}>
              <Text style={[styles.statusText, { color: p.status === 'Barato' ? '#16a34a' : '#64748b' }]}>
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
  main: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContainer: { padding: 24, paddingBottom: 120 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 25 },
  greeting: { fontSize: 24, fontWeight: "900", color: "#0f172a" },
  locationBadge: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  locationText: { marginLeft: 4, fontSize: 13, color: "#64748b", fontWeight: "600" },
  notificationBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", elevation: 2 },
  dot: { position: "absolute", top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: "#ef4444", borderWidth: 2, borderColor: "#fff" },
  
  terminal: { backgroundColor: "#0f172a", borderRadius: 24, padding: 20, marginBottom: 30, elevation: 8 },
  terminalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15, borderBottomWidth: 0.5, borderBottomColor: "#334155", paddingBottom: 10 },
  terminalDots: { flexDirection: "row", gap: 6 },
  tDot: { width: 8, height: 8, borderRadius: 4 },
  terminalTitle: { fontSize: 10, color: "#94a3b8", fontWeight: "800", letterSpacing: 1 },
  terminalContent: { height: 45, justifyContent: "center" },
  terminalText: { color: "#38bdf8", fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 14, fontWeight: "600" },
  cursor: { width: 8, height: 16, backgroundColor: "#38bdf8", marginLeft: 4 },

  sectionTitle: { fontSize: 18, fontWeight: "900", color: "#1e293b", marginBottom: 15 },
  mapWrapper: { height: 180, borderRadius: 30, overflow: "hidden", marginBottom: 30, borderWidth: 1, borderColor: "#e2e8f0" },
  map: { flex: 1 },
  customMarker: { backgroundColor: "#0f172a", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 12, borderWidth: 2, borderColor: "#fff" },
  markerPrice: { color: "#fff", fontSize: 11, fontWeight: "900" },

  listHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  seeAll: { color: "#6366f1", fontWeight: "700", fontSize: 13 },

  postoCard: { backgroundColor: "#fff", borderRadius: 24, padding: 16, marginBottom: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 2 },
  postoInfo: { flexDirection: "row", alignItems: "center", gap: 15 },
  iconBox: { width: 48, height: 48, borderRadius: 16, backgroundColor: "#f1f5f9", justifyContent: "center", alignItems: "center" },
  postoNome: { fontSize: 15, fontWeight: "800", color: "#1e293b" },
  postoDist: { fontSize: 12, color: "#94a3b8", marginTop: 2 },
  postoPriceBox: { alignItems: "flex-end" },
  postoPrice: { fontSize: 18, fontWeight: "900", color: "#0f172a" },
  statusTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginTop: 4 },
  statusText: { fontSize: 10, fontWeight: "800", textTransform: "uppercase" }
});