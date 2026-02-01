import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView, AnimatePresence } from "moti";
import { COLORS } from "../../constants/Colors";

import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

// Certifique-se que esses arquivos abaixo possuem "export default"
import Inicio from "./inicio";
import VeiculoConfig from "./veiculo-config";
import MeuPlano from "./meu-plano";
import PerfilUser from "./perfil-user";

const TABS = ["inicio", "veiculo-config", "meu-plano", "perfil-user"];

const SCREENS: Record<string, React.ComponentType> = {
  inicio: Inicio,
  "veiculo-config": VeiculoConfig,
  "meu-plano": MeuPlano,
  "perfil-user": PerfilUser,
};

const { width } = Dimensions.get("window");

// EXPORT DEFAULT É OBRIGATÓRIO PARA O EXPO ROUTER
export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <HomeContent />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

function HomeContent() {
  const [currentTab, setCurrentTab] = useState("inicio");
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const Screen = SCREENS[currentTab];

  const onSwipe = ({ nativeEvent }: any) => {
    if (nativeEvent.translationX < -60) {
      const next = Math.min(TABS.indexOf(currentTab) + 1, TABS.length - 1);
      setCurrentTab(TABS[next]);
    }
    if (nativeEvent.translationX > 60) {
      const prev = Math.max(TABS.indexOf(currentTab) - 1, 0);
      setCurrentTab(TABS[prev]);
    }
  };

  const indicatorStyle = useAnimatedStyle(() => ({
    width: (width - 32) / TABS.length,
    transform: [
      {
        translateX: withSpring(
          ((width - 32) / TABS.length) * TABS.indexOf(currentTab)
        ),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header ajustado com Insets */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View>
          <Text style={styles.brand}>GASOLINK</Text>
          <View style={styles.car}>
            <MaterialCommunityIcons name="car-cog" size={14} color="#64748b" />
            <Text style={styles.carText}>Onix 1.0 • Ativo</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.pro} onPress={() => setModalVisible(true)}>
          <Text style={styles.proText}>PRO+</Text>
        </TouchableOpacity>
      </View>

      {/* Área de Conteúdo com Swipe */}
      <PanGestureHandler
        onEnded={onSwipe}
        activeOffsetX={[-30, 30]}
      >
        <View style={styles.content}>
          <AnimatePresence exitBeforeEnter>
            <MotiView
              key={currentTab}
              from={{ opacity: 0, translateX: 50 }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{ opacity: 0, translateX: -50 }}
              transition={{ type: 'timing', duration: 200 }}
              style={{ flex: 1 }}
            >
              <Screen />
            </MotiView>
          </AnimatePresence>
        </View>
      </PanGestureHandler>

      {/* Modal Premium */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
          <MotiView
            from={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={styles.modal}
          >
            <Ionicons name="ribbon" size={42} color="#FFD700" />
            <Text style={styles.modalTitle}>Premium Ativo</Text>
            <Text style={styles.modalText}>Você já está na versão PRO.</Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalBtnText}>OK</Text>
            </TouchableOpacity>
          </MotiView>
        </Pressable>
      </Modal>

      {/* Tab Bar Customizada */}
      <View
        style={[
          styles.tabBar,
          { bottom: insets.bottom > 0 ? insets.bottom + 12 : 16 },
        ]}
      >
        {TABS.map((tab) => (
          <TabButton
            key={tab}
            tab={tab}
            active={currentTab}
            onPress={setCurrentTab}
          />
        ))}
        <Animated.View style={[styles.indicator, indicatorStyle]} />
      </View>
    </View>
  );
}

function TabButton({ tab, active, onPress }: any) {
  const isActive = tab === active;
  const color = isActive ? (COLORS?.primary || "#000") : "#94a3b8";

  const icons: Record<string, any> = {
    inicio: "home",
    "veiculo-config": "car",
    "meu-plano": "flash",
    "perfil-user": "person",
  };

  const labels: Record<string, string> = {
    inicio: "Início",
    "veiculo-config": "Veículo",
    "meu-plano": "Planos",
    "perfil-user": "Perfil",
  };

  return (
    <TouchableOpacity style={styles.tab} onPress={() => onPress(tab)}>
      <MotiView animate={{ scale: isActive ? 1.1 : 1 }}>
        <Ionicons
          name={isActive ? icons[tab] : `${icons[tab]}-outline`}
          size={24}
          color={color}
        />
      </MotiView>
      <Text style={[styles.tabText, { color }]}>{labels[tab]}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee'
  },
  brand: { fontSize: 20, fontWeight: "900", letterSpacing: 2 },
  car: { flexDirection: "row", alignItems: "center" },
  carText: { marginLeft: 6, fontSize: 12, color: "#64748b" },
  pro: { backgroundColor: "#000", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  proText: { color: "#FFD700", fontWeight: "900", fontSize: 12 },
  content: { flex: 1 },
  tabBar: {
    position: "absolute",
    left: 14,
    right: 14,
    height: 65,
    borderRadius: 32,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tab: { flex: 1, alignItems: "center", justifyContent: "center" },
  tabText: { fontSize: 10, marginTop: 4, fontWeight: "600" },
  indicator: {
    position: "absolute",
    bottom: 6,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS?.primary || "#000",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "900", marginTop: 12 },
  modalText: { marginVertical: 16, textAlign: "center", color: '#666' },
  modalBtn: {
    width: "100%",
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  modalBtnText: { color: "#FFD700", fontWeight: "900" },
});