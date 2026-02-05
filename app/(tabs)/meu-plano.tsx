import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView, AnimatePresence } from "moti";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Constantes de Planos
const PLANOS = [
  { id: "basico", nome: "Básico", preco: "Grátis", cor: "#94a3b8", desc: "Mapa básico e preços" },
  { id: "medio", nome: "Médio", preco: "R$ 9,90", cor: "#3b82f6", desc: "Alertas em tempo real" },
  { id: "premium", nome: "Premium", preco: "R$ 19,90", cor: "#FFD700", desc: "Autonomia + Zero Ads" },
  { id: "ultra", nome: "Ultra", preco: "R$ 34,90", cor: "#f97316", desc: "Suporte VIP e Histórico" },
  { id: "mega", nome: "MEGA", preco: "R$ 59,90", cor: "#a855f7", desc: "IA Predictor de Preços" },
];

export default function PlanosScreen() {
  const [selecionado, setSelecionado] = useState("premium");
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

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

  const handleAtivarPlano = () => {
    // Redireciona para a home após selecionar o plano
    router.replace("/(tabs)/");
  };

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
        <ActivityIndicator size="small" color="#3b82f6" />
      </View>
    );
  }

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
          const cardColor = isSelected ? plano.cor : "#E2E8F0";

          return (
            <TouchableOpacity
              key={plano.id}
              activeOpacity={0.8}
              onPress={() => setSelecionado(plano.id)}
            >
              <MotiView
                from={{ opacity: 0, translateY: 15 }}
                animate={{
                  opacity: 1,
                  translateY: 0,
                  scale: isSelected ? 1.02 : 1,
                  borderColor: cardColor,
                }}
                transition={{ 
                  type: "spring", 
                  damping: 15,
                  delay: index * 50 
                }}
                style={[
                  styles.planCard, 
                  isSelected && { elevation: 8, shadowColor: plano.cor }
                ]}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.colorBar, { backgroundColor: plano.cor }]} />
                  <View style={styles.textInfo}>
                    <Text style={[styles.planName, { color: isSelected ? plano.cor : "#1e293b" }]}>
                      {plano.nome} {isSelected && "✓"}
                    </Text>
                    <Text style={styles.planDesc} numberOfLines={1}>{plano.desc}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.planPrice}>{plano.preco}</Text>
                  </View>
                </View>

                <AnimatePresence>
                  {isSelected && (
                    <MotiView
                      from={{ opacity: 0, scaleY: 0.8 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0.8 }}
                      transition={{ type: 'timing', duration: 200 }}
                      style={styles.expandedArea}
                    >
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.subscribeBtn, { backgroundColor: plano.cor }]}
                        onPress={handleAtivarPlano}
                      >
                        <Text style={styles.subscribeBtnText}>ATIVAR AGORA</Text>
                      </TouchableOpacity>
                    </MotiView>
                  )}
                </AnimatePresence>
              </MotiView>
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContent: { 
    paddingHorizontal: 20, 
    paddingTop: Platform.OS === "android" ? 40 : 10 
  },
  header: {
    marginBottom: 30,
    marginTop: 20
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
    padding: 18,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#E2E8F0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorBar: {
    width: 5,
    height: 35,
    borderRadius: 10,
    marginRight: 15,
  },
  textInfo: { flex: 1 },
  planName: { fontSize: 18, fontWeight: "900" },
  planDesc: { fontSize: 12, color: "#94a3b8", marginTop: 2, fontWeight: "600" },
  priceContainer: { alignItems: "flex-end", marginLeft: 10 },
  planPrice: { fontSize: 16, fontWeight: "900", color: "#1e293b" },
  expandedArea: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 15,
  },
  subscribeBtn: {
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    elevation: 3,
  },
  subscribeBtnText: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 14,
    letterSpacing: 1,
  },
});