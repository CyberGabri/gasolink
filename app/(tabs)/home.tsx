import React, { useState, useCallback, useEffect } from "react";
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
} from "react-native-reanimated";
import { Audio } from "expo-av";

import Inicio from "./inicio";
import VeiculoConfig from "./veiculo-config";
import Financeiro from "./meu-plano";
import PerfilUser from "./perfil-user";

const { width } = Dimensions.get("window");

type TabType = "inicio" | "veiculo-config" | "financeiro" | "perfil-user";
const TABS: TabType[] = [
  "inicio",
  "veiculo-config",
  "financeiro",
  "perfil-user",
];
const TAB_WIDTH = width / TABS.length;
const TAB_BAR_HEIGHT = 70;

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <HomeContent />
    </SafeAreaProvider>
  );
}

function HomeContent() {
  const [currentTab, setCurrentTab] = useState<TabType>("inicio");
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const activeColor = "#3b82f6";

  const translateX = useSharedValue(0);

  const playClick = useCallback(async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/click.mp3"),
      { volume: 0.5 }
    );

    sound.playAsync();

    sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded) return;
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  }, []);

  useEffect(() => {
    const index = TABS.indexOf(currentTab);
    translateX.value = withSpring(index * TAB_WIDTH, {
      damping: 20,
      stiffness: 150,
    });
  }, [currentTab]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const renderScreen = useCallback(() => {
    switch (currentTab) {
      case "inicio":
        return <Inicio />;
      case "veiculo-config":
        return <VeiculoConfig />;
      case "financeiro":
        return <Financeiro />;
      case "perfil-user":
        return <PerfilUser />;
      default:
        return <Inicio />;
    }
  }, [currentTab]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />

      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View>
          <Text style={styles.brand}>
            GASOLINK <Text style={{ color: activeColor }}>AI</Text>
          </Text>
          <View style={styles.carBadge}>
            <MaterialCommunityIcons
              name="shield-check"
              size={14}
              color="#10b981"
            />
            <Text style={styles.carText}>CONEXÃO SEGURA</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.proBadge}
          onPress={() => {
            playClick();
            setModalVisible(true);
          }}
        >
          <Text style={styles.proText}>PRO+</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.content,
          { paddingBottom: TAB_BAR_HEIGHT + insets.bottom },
        ]}
      >
        <AnimatePresence exitBeforeEnter>
          <MotiView
            key={currentTab}
            from={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ type: "timing", duration: 150 }}
            style={{ flex: 1 }}
          >
            {renderScreen()}
          </MotiView>
        </AnimatePresence>
      </View>

      <View
        style={[
          styles.tabBarContainer,
          {
            height: TAB_BAR_HEIGHT + insets.bottom,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <View style={styles.tabBar}>
          <Animated.View
            style={[
              styles.activeIndicator,
              indicatorStyle,
              { backgroundColor: activeColor + "08" },
            ]}
          />
          <Animated.View
            style={[
              styles.topLine,
              indicatorStyle,
              { backgroundColor: activeColor },
            ]}
          />

          {TABS.map((tab) => {
            const isActive = currentTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={styles.tab}
                onPress={() => {
                  playClick();
                  setCurrentTab(tab);
                }}
              >
                <MotiView
                  animate={{ translateY: isActive ? -2 : 0 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <Ionicons
                    name={getIcon(tab, isActive)}
                    size={width < 375 ? 22 : 25}
                    color={isActive ? activeColor : "#94a3b8"}
                  />
                </MotiView>
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: isActive ? activeColor : "#94a3b8",
                      fontWeight: isActive ? "800" : "500",
                    },
                  ]}
                >
                  {getLabel(tab)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <Modal transparent visible={modalVisible} animationType="fade">
        <Pressable
          style={styles.overlay}
          onPress={() => setModalVisible(false)}
        >
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={styles.modal}
          >
            <View style={styles.modalIconBg}>
              <Ionicons name="sparkles" size={32} color="#fbbf24" />
            </View>
            <Text style={styles.modalTitle}>Versão PRO+ Ativa</Text>
            <Text style={styles.modalText}>
              Você tem acesso total aos algoritmos de inteligência artificial e
              economia em tempo real.
            </Text>
            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: activeColor }]}
              onPress={() => {
                playClick();
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalBtnText}>EXCELENTE</Text>
            </TouchableOpacity>
          </MotiView>
        </Pressable>
      </Modal>
    </View>
  );
}

function getIcon(tab: TabType, active: boolean): any {
  const icons: Record<TabType, string> = {
    inicio: "flash",
    "veiculo-config": "car-sport",
    financeiro: "receipt",
    "perfil-user": "person",
  };
  return active ? icons[tab] : `${icons[tab]}-outline`;
}

function getLabel(tab: TabType): string {
  const labels: Record<TabType, string> = {
    inicio: "Home",
    "veiculo-config": "Veículo",
    financeiro: "Plano",
    "perfil-user": "Perfil",
  };
  return labels[tab];
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
  },
  brand: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0f172a",
  },
  carBadge: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  carText: { marginLeft: 4, fontSize: 10, color: "#10b981", fontWeight: "800" },
  proBadge: {
    backgroundColor: "#0f172a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  proText: { color: "#FFD700", fontWeight: "900", fontSize: 11 },
  content: { flex: 1 },
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: "#F1F5F9",
  },
  tabBar: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
  },
  tab: { flex: 1, alignItems: "center", justifyContent: "center" },
  tabText: { fontSize: 10, marginTop: 4 },
  activeIndicator: { position: "absolute", width: TAB_WIDTH, height: "100%" },
  topLine: {
    position: "absolute",
    top: -1,
    width: TAB_WIDTH,
    height: 3,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15,23,42,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 24,
    alignItems: "center",
  },
  modalIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFFBEB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: { fontSize: 22, fontWeight: "900", color: "#0f172a" },
  modalText: {
    marginVertical: 12,
    textAlign: "center",
    color: "#64748b",
    fontSize: 15,
  },
  modalBtn: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  modalBtnText: { color: "#FFF", fontWeight: "900", fontSize: 16 },
});
