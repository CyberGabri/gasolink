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
import { MotiView } from "moti";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";

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
const MAX_CLICKS = 7;

export default function HomeScreen() {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const loggedIn = await AsyncStorage.getItem("loggedIn");
      setIsLoggedIn(loggedIn === "true");
      setIsReady(true);
    })();
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
  const insets = useSafeAreaInsets();

  const [currentTab, setCurrentTab] = useState<TabType>("inicio");
  const [modalVisible, setModalVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updating, setUpdating] = useState(false);

  const activeColor = "#3b82f6";
  const translateX = useSharedValue(0);

  useEffect(() => {
    (async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) setUpdateAvailable(true);
      } catch {}
    })();
  }, []);

  const handleUpdateNow = async () => {
    try {
      setUpdating(true);
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch {
      setUpdating(false);
    }
  };

  const playClick = useCallback(async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/sounds/click.mp3"),
        { volume: 0.5 }
      );
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(
        (s: any) => s.didJustFinish && sound.unloadAsync()
      );
    } catch {}
  }, []);

  useEffect(() => {
    translateX.value = withSpring(TABS.indexOf(currentTab) * TAB_WIDTH, {
      damping: 20,
      stiffness: 150,
    });
  }, [currentTab]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const consumeClick = () => {
    if (clickCount + 1 >= MAX_CLICKS) {
      setModalVisible(true);
      return false;
    }
    setClickCount((p) => p + 1);
    return true;
  };

  const handleTabPress = (tab: TabType) => {
    if (tab === currentTab) return;

    playClick();

    if (!isLoggedIn) {
      const canContinue = consumeClick();
      if (!canContinue) return;
    }

    setCurrentTab(tab);
  };

  const handleEnterPress = () => {
    if (isLoggedIn) {
      router.push("/perfil-user");
      return;
    }

    const canContinue = consumeClick();
    if (!canContinue) return;
  };

  const renderScreen = () => {
    switch (currentTab) {
      case "inicio":
        return <Inicio />;
      case "veiculo-config":
        return <VeiculoConfig />;
      case "financeiro":
        return <Financeiro />;
      case "perfil-user":
        return <PerfilUser />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

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
                : `MODO TESTE (${MAX_CLICKS - clickCount})`}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.proBadge} onPress={handleEnterPress}>
          <Text style={styles.proText}>{isLoggedIn ? "PRO+" : "ENTRAR"}</Text>
        </TouchableOpacity>
      </View>

      {updateAvailable && (
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          style={styles.updateBanner}
        >
          <Text style={styles.updateText}>Nova versão disponível 🚀</Text>
          <TouchableOpacity
            onPress={handleUpdateNow}
            style={styles.updateBtn}
            disabled={updating}
          >
            {updating ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.updateBtnText}>Atualizar</Text>
            )}
          </TouchableOpacity>
        </MotiView>
      )}

      <View style={styles.content}>{renderScreen()}</View>

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
              { backgroundColor: activeColor + "10" },
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
                    { color: isActive ? activeColor : "#94a3b8" },
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
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Login necessário</Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => {
                setModalVisible(false);
                router.push("/login");
              }}
            >
              <Text style={styles.modalBtnText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function getIcon(tab: TabType, active: boolean) {
  const icons: any = {
    inicio: "flash",
    "veiculo-config": "car-sport",
    financeiro: "receipt",
    "perfil-user": "person",
  };
  return active ? icons[tab] : `${icons[tab]}-outline`;
}

function getLabel(tab: TabType) {
  return {
    inicio: "Home",
    "veiculo-config": "Veículo",
    financeiro: "Financeiro",
    "perfil-user": "Perfil",
  }[tab];
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },

  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  brand: { fontSize: 20, fontWeight: "900", color: "#0f172a" },
  carBadge: { flexDirection: "row", alignItems: "center" },
  carText: { fontSize: 10, fontWeight: "800", marginLeft: 4 },

  proBadge: {
    backgroundColor: "#0f172a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  proText: { color: "#fff", fontWeight: "900", fontSize: 11 },

  updateBanner: {
    backgroundColor: "#0f172a",
    margin: 16,
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  updateText: { color: "#fff", fontWeight: "800" },
  updateBtn: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
  },
  updateBtnText: { color: "#fff", fontWeight: "900", fontSize: 12 },

  content: { flex: 1 },

  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },
  tabBar: { flexDirection: "row", height: TAB_BAR_HEIGHT },
  tab: { flex: 1, alignItems: "center", justifyContent: "center" },
  tabText: { fontSize: 10, marginTop: 4 },

  activeIndicator: {
    position: "absolute",
    width: TAB_WIDTH,
    height: "100%",
  },
  topLine: {
    position: "absolute",
    top: 0,
    width: TAB_WIDTH,
    height: 3,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    width: "80%",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 16,
    textAlign: "center",
  },
  modalBtn: {
    backgroundColor: "#3b82f6",
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "900",
  },
});
