import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, Platform } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";

// Constantes para facilitar ajustes
const { width } = Dimensions.get("window");

export default function Inicio() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const phrases = [
    "Sistema monitorando preços em Fortaleza.",
    "Posto Chesf abaixo da média regional.",
    "Alta do Brent prevista para 48h.",
    "Dados sincronizados em tempo real.",
  ];

  // Efeito de Typewriter (Máquina de escrever)
  useEffect(() => {
    const full = phrases[index];
    const speed = deleting ? 15 : 40; // Mais rápido ao apagar

    const timer = setTimeout(() => {
      if (!deleting && text === full) {
        setTimeout(() => setDeleting(true), 2000);
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

  const postos = [
    { id: "D1", nome: "Ipiranga Chesf", preco: "5,75", latitude: -3.7689, longitude: -38.4966 },
    { id: "D2", nome: "Shell Dragão do Mar", preco: "5,92", latitude: -3.7215, longitude: -38.5134 },
    { id: "D3", nome: "Posto SP Aguanambi", preco: "5,88", latitude: -3.7462, longitude: -38.5211 },
  ];

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER DA PÁGINA */}
      <View style={styles.header}>
        <Text style={styles.title}>Painel Principal</Text>
        <View style={styles.location}>
          <Ionicons name="location" size={14} color="#6366f1" />
          <Text style={styles.locationText}>Fortaleza • CE</Text>
        </View>
      </View>

      {/* TERMINAL ANALÍTICO */}
      <MotiView 
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={styles.terminal}
      >
        <View style={styles.terminalHeader}>
          <Ionicons name="flash" size={14} color="#fbbf24" />
          <Text style={styles.terminalTitle}>ASSISTENTE ANALÍTICO</Text>
        </View>
        <Text style={styles.terminalText}>
          {text}
          <Text style={styles.cursor}>_</Text>
        </Text>
      </MotiView>

      <Text style={styles.sectionTitle}>Mapa de Oportunidades</Text>

      {/* CARD DO MAPA */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 200 }}
        style={styles.mapCard}
      >
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: -3.7462,
            longitude: -38.5134,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          // Melhora a performance no Android
          cacheEnabled={Platform.OS === 'android'}
        >
          {postos.map((posto) => (
            <Marker
              key={posto.id}
              coordinate={{
                latitude: posto.latitude,
                longitude: posto.longitude,
              }}
              title={posto.nome}
            >
              <View style={styles.markerContainer}>
                <Text style={styles.markerText}>R$ {posto.preco}</Text>
              </View>
            </Marker>
          ))}
        </MapView>
      </MotiView>

      <Text style={styles.sectionTitle}>Postos Monitorados</Text>

      {/* LISTA DE POSTOS */}
      {postos.map((p, i) => (
        <MotiView 
          key={p.id} 
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 300 + (i * 100) }}
          style={styles.card}
        >
          <View style={styles.cardInfo}>
            <View style={styles.iconCircle}>
              <Ionicons name="bus-outline" size={20} color="#64748b" />
            </View>
            <View>
              <Text style={styles.cardTitle}>{p.nome}</Text>
              <Text style={styles.cardSub}>Gasolina comum</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>R$ {p.preco}</Text>
            <Ionicons name="chevron-forward" size={16} color="#cbd5e1" />
          </View>
        </MotiView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1e293b",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  locationText: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "500",
  },
  terminal: {
    backgroundColor: "#0f172a",
    borderRadius: 20,
    padding: 18,
    marginBottom: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  terminalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  terminalTitle: {
    fontSize: 11,
    color: "#94a3b8",
    letterSpacing: 1.5,
    fontWeight: "700",
  },
  terminalText: {
    color: "#f8fafc",
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 14,
    lineHeight: 20,
  },
  cursor: {
    color: "#6366f1",
    fontWeight: "900",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 15,
  },
  mapCard: {
    height: 200,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    backgroundColor: "#6366f1",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  markerText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "900",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#334155",
  },
  cardSub: {
    fontSize: 12,
    color: "#94a3b8",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "900",
    color: "#10b981",
  },
});