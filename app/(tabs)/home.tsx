import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  Pressable,
  Dimensions,
  Platform,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView, AnimatePresence } from "moti";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// Telas
import Inicio from "./inicio";
import VeiculoConfig from "./veiculo-config";
import MeuPlano from "./meu-plano";
import PerfilUser from "./perfil-user";

const { width } = Dimensions.get("window");
const TABS = ["inicio", "veiculo-config", "meu-plano", "perfil-user"];
const TAB_WIDTH = (width - 40) / TABS.length;

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <HomeContent />
    </SafeAreaProvider>
  );
}

function HomeContent() {
  const [currentTab, setCurrentTab] = useState("inicio");
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const activeColor = "#3b82f6";

  // Valor compartilhado para a posição do indicador
  const translateX = useSharedValue(0);

  // Atualiza o indicador sempre que a tab muda
  useEffect(() => {
    const index = TABS.indexOf(currentTab);
    translateX.value = withSpring(index * TAB_WIDTH, {
      damping: 18,
      stiffness: 120,
    });
  }, [currentTab]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const renderScreen = useCallback(() => {
    switch (currentTab) {
      case "inicio": return <Inicio />;
      case "veiculo-config": return <VeiculoConfig />;
      case "meu-plano": return <MeuPlano />;
      case "perfil-user": return <PerfilUser />;
      default: return <Inicio />;
    }
  }, [currentTab]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* HEADER PREMIUM FIXO */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View>
          <Text style={styles.brand}>GASOLINK <Text style={{ color: activeColor }}>AI</Text></Text>
          <View style={styles.carBadge}>
            <MaterialCommunityIcons name="shield-check" size={14} color="#10b981" />
            <Text style={styles.carText}>CONEXÃO SEGURA</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.proBadge} onPress={() => setModalVisible(true)}>
          <Text style={styles.proText}>PRO+</Text>
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO COM TRANSIÇÃO SUAVE */}
      <View style={styles.content}>
        <AnimatePresence exitBeforeEnter>
          <MotiView
            key={currentTab}
            from={{ opacity: 0, translateX: 10 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -10 }}
            transition={{ type: 'timing', duration: 200 }}
            style={{ flex: 1 }}
          >
            {renderScreen()}
          </MotiView>
        </AnimatePresence>
      </View>

      {/* BARRA DE NAVEGAÇÃO (TAB BAR) */}
      <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.tabBar}>
          {/* Indicador Animado de Fundo */}
          <Animated.View style={[styles.activeIndicator, indicatorStyle, { backgroundColor: activeColor + '15' }]} />
          
          {/* Indicador de Linha Superior */}
          <Animated.View style={[styles.topLine, indicatorStyle, { backgroundColor: activeColor }]} />

          {TABS.map((tab) => {
            const isActive = currentTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={styles.tab}
                onPress={() => setCurrentTab(tab)}
                activeOpacity={0.7}
              >
                <MotiView
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    translateY: isActive ? -2 : 0
                  }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  <Ionicons
                    name={getIcon(tab, isActive)}
                    size={22}
                    color={isActive ? activeColor : "#94a3b8"}
                  />
                </MotiView>
                <Text style={[styles.tabText, { color: isActive ? activeColor : "#94a3b8", fontWeight: isActive ? "800" : "500" }]}>
                  {getLabel(tab)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* MODAL PRO */}
      <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
          <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={styles.modal}>
            <Ionicons name="sparkles" size={40} color="#FFD700" style={{ marginBottom: 10 }} />
            <Text style={styles.modalTitle}>Versão PRO+ Ativa</Text>
            <Text style={styles.modalText}>Você tem acesso total aos algoritmos de economia.</Text>
            <TouchableOpacity style={[styles.modalBtn, { backgroundColor: activeColor }]} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalBtnText}>ENTENDIDO</Text>
            </TouchableOpacity>
          </MotiView>
        </Pressable>
      </Modal>
    </View>
  );
}

// Helpers
function getIcon(tab: string, active: boolean) {
  const icons: any = { inicio: "flash", "veiculo-config": "car", "meu-plano": "wallet", "perfil-user": "person" };
  return active ? icons[tab] : `${icons[tab]}-outline`;
}

function getLabel(tab: string) {
  const labels: any = { inicio: "Home", "veiculo-config": "Veículo", "meu-plano": "Extrato", "perfil-user": "Perfil" };
  return labels[tab];
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    paddingHorizontal: 25,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    zIndex: 10,
  },
  brand: { fontSize: 18, fontWeight: "900", color: "#0f172a", letterSpacing: -0.5 },
  carBadge: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  carText: { marginLeft: 4, fontSize: 10, color: "#10b981", fontWeight: "800" },
  proBadge: { backgroundColor: "#0f172a", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: "#FFD700" },
  proText: { color: "#FFD700", fontWeight: "900", fontSize: 10 },
  content: { flex: 1, zIndex: 1 },
  
  // Tab Bar Melhorada
  tabBarContainer: { position: "absolute", bottom: 0, left: 0, right: 0, alignItems: "center", zIndex: 20 },
  tabBar: {
    width: width - 40,
    height: 65,
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 15,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    overflow: 'hidden',
  },
  tab: { flex: 1, alignItems: "center", justifyContent: "center", height: '100%' },
  tabText: { fontSize: 10, marginTop: 4 },
  
  // Indicadores da TabBar
  activeIndicator: {
    position: "absolute",
    left: 0,
    width: TAB_WIDTH,
    height: '100%',
    borderRadius: 15,
  },
  topLine: {
    position: "absolute",
    top: 0,
    left: 15,
    width: TAB_WIDTH - 30,
    height: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },

  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" },
  modal: { width: "80%", backgroundColor: "#fff", borderRadius: 25, padding: 25, alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "900", color: "#0f172a" },
  modalText: { marginVertical: 12, textAlign: "center", color: "#64748b", fontSize: 13, lineHeight: 18 },
  modalBtn: { width: "100%", paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  modalBtnText: { color: "#FFF", fontWeight: "900" },
});