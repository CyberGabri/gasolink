import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  Dimensions,
  ActivityIndicator,
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
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importação das suas telas
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

// CONFIGURAÇÃO DOS LIMITES ATUALIZADA PARA 7
const MAX_CLICKS = 7;

export default function HomeScreen() {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem("loggedIn");
        setIsLoggedIn(loggedIn === "true");
      } catch (e) {
        setIsLoggedIn(false);
      } finally {
        setIsReady(true);
      }
    };
    checkLoginStatus();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <HomeContent isLoggedIn={isLoggedIn} />
    </SafeAreaProvider>
  );
}

function HomeContent({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<TabType>("inicio");
  const [modalVisible, setModalVisible] = useState(false);

  // Contador de cliques para visitantes
  const [clickCount, setClickCount] = useState(0);

  const insets = useSafeAreaInsets();
  const activeColor = "#3b82f6";
  const translateX = useSharedValue(0);

  const playClick = useCallback(async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/sounds/click.mp3"),
        { volume: 0.5 },
      );
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(
        (s: any) => s.didJustFinish && sound.unloadAsync(),
      );
    } catch (e) {}
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

  const handleTabPress = (tab: TabType) => {
    if (tab === currentTab) return; // Evita contar clique na mesma aba

    playClick();

    if (!isLoggedIn) {
      // Se ele já clicou 7 vezes e tenta o 8º, bloqueia
      if (clickCount >= MAX_CLICKS) {
        setModalVisible(true);
        return;
      }
      // Incrementa o contador
      setClickCount((prev) => prev + 1);
    }

    setCurrentTab(tab);
  };

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
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View>
          <Text style={styles.brand}>
            GASOLINK <Text style={{ color: activeColor }}>AI</Text>
          </Text>
          <View style={styles.carBadge}>
            {isLoggedIn ? (
              <MaterialCommunityIcons
                name="shield-check"
                size={14}
                color="#10b981"
              />
            ) : (
              <Ionicons name="sparkles" size={14} color="#94a3b8" />
            )}
            <Text
              style={[
                styles.carText,
                { color: isLoggedIn ? "#10b981" : "#94a3b8" },
              ]}
            >
              {isLoggedIn
                ? "CONEXÃO ATIVA"
                : `MODO TESTE (${MAX_CLICKS - clickCount} cliques restantes)`}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.proBadge}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.proText}>{isLoggedIn ? "PRO+" : "ENTRAR"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <AnimatePresence exitBeforeEnter>
          <MotiView
            key={currentTab}
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "timing", duration: 150 }}
            style={{ flex: 1 }}
          >
            {renderScreen()}
          </MotiView>
        </AnimatePresence>
      </View>

      {/* Tab Bar */}
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
                onPress={() => handleTabPress(tab)}
              >
                <Ionicons
                  name={getIcon(tab, isActive)}
                  size={24}
                  color={isActive ? activeColor : "#94a3b8"}
                />
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

      {/* Modal Bloqueio */}
      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.overlay}>
          <MotiView
            from={{ translateY: 300 }}
            animate={{ translateY: 0 }}
            style={styles.blackModal}
          >
            <View style={styles.lockContainer}>
              <View style={styles.lockBody}>
                <MaterialCommunityIcons name="lock" size={32} color="#3b82f6" />
              </View>
            </View>

            <Text style={styles.modalBrand}>GASOLINK AI</Text>
            <Text style={styles.modalTitle}>Acesso Expirado</Text>

            <Text style={styles.modalDescription}>
              Você aproveitou seus 7 cliques de teste! Para continuar
              gerenciando seu veículo e economizando, entre na sua conta.
            </Text>

            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => {
                setModalVisible(false);
                router.push("/login");
              }}
            >
              <Text style={styles.loginBtnText}>CRIAR CONTA OU ENTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                // Opcional: manter ele na home se quiser, mas sem poder navegar
              }}
              style={styles.laterBtn}
            >
              <Text style={styles.laterText}>Talvez mais tarde</Text>
            </TouchableOpacity>
          </MotiView>
        </View>
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
    financeiro: "Financeiro",
    "perfil-user": "Perfil",
  };
  return labels[tab];
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
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
  brand: { fontSize: 20, fontWeight: "900", color: "#0f172a" },
  carBadge: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  carText: { marginLeft: 4, fontSize: 10, fontWeight: "800" },
  proBadge: {
    backgroundColor: "#0f172a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  proText: { color: "#FFF", fontWeight: "900", fontSize: 11 },
  content: { flex: 1 },
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: "#F1F5F9",
  },
  tabBar: { height: 70, flexDirection: "row", alignItems: "center" },
  tab: { flex: 1, alignItems: "center", justifyContent: "center" },
  tabText: { fontSize: 10, marginTop: 4 },
  activeIndicator: { position: "absolute", width: width / 4, height: "100%" },
  topLine: { position: "absolute", top: -1, width: width / 4, height: 3 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  blackModal: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 30,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  lockContainer: { marginBottom: 15 },
  lockBody: {
    width: 60,
    height: 60,
    backgroundColor: "#f0f7ff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBrand: {
    color: "#3b82f6",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0f172a",
    marginBottom: 12,
  },
  modalDescription: {
    color: "#64748b",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 30,
  },
  loginBtn: {
    backgroundColor: "#0f172a",
    width: "100%",
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
  },
  loginBtnText: { color: "#FFF", fontWeight: "900", fontSize: 14 },
  laterBtn: { marginTop: 20, marginBottom: 10 },
  laterText: { color: "#94a3b8", fontWeight: "700", fontSize: 12 },
});
