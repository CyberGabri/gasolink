import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  LogBox,
} from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import Inicio from "./inicio";
import VeiculoConfig from "./veiculo-config";
import Financeiro from "./meu-plano";
import PerfilUser from "./perfil-user";

import TabBar from "@/components/TabBar";
import LoginModal from "@/components/LoginModal";
import NewFeaturesBanner from "@/components/NewFeaturesBanner";
import AppStatusBar from "@/components/AppStatusBar";
import ProBadge from "@/components/ProBadge";

import useClickLimit from "@/hooks/useClickLimit";

LogBox.ignoreLogs([
  "expo-notifications: Android Push notifications",
]);

type TabType = "inicio" | "veiculo-config" | "financeiro" | "perfil-user";

const CAN_USE_PUSH =
  Platform.OS !== "web" && Constants.appOwnership !== "expo";

if (CAN_USE_PUSH) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
}

async function registerForPushNotifications() {
  if (!CAN_USE_PUSH) return;

  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    const request = await Notifications.requestPermissionsAsync();
    if (request.status !== "granted") return;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("updates", {
      name: "Atualizações do Gasolink",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  await Notifications.getExpoPushTokenAsync();
}

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("loggedIn").then((v) => {
      setIsLoggedIn(v === "true");
    });

    registerForPushNotifications();
  }, []);

  return (
    <SafeAreaProvider>
      <HomeContent isLoggedIn={isLoggedIn} />
    </SafeAreaProvider>
  );
}

function HomeContent({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [currentTab, setCurrentTab] =
    useState<TabType>("inicio");
  const [modalVisible, setModalVisible] = useState(false);
  const [showNewFeatures, setShowNewFeatures] = useState(false);

  const { consumeClick, remainingClicks } = useClickLimit({
    maxClicks: 7,
    onLimitReached: () => setModalVisible(true),
  });

  useEffect(() => {
    if (!CAN_USE_PUSH) return;

    const received =
      Notifications.addNotificationReceivedListener(() => {
        setShowNewFeatures(true);
      });

    const response =
      Notifications.addNotificationResponseReceivedListener(
        () => {
          setShowNewFeatures(true);
        },
      );

    return () => {
      received.remove();
      response.remove();
    };
  }, []);

  const playClick = useCallback(async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/sounds/click.mp3"),
        { volume: 0.5 },
      );
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(
        (s: any) =>
          s.didJustFinish && sound.unloadAsync(),
      );
    } catch {}
  }, []);

  const handleTabPress = (tab: TabType) => {
    if (tab === currentTab) return;

    playClick();

    if (!isLoggedIn && !consumeClick()) return;

    setCurrentTab(tab);
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
      <AppStatusBar theme="light" backgroundColor="#FFFFFF" />

      <View
        style={{
          marginTop:
            Platform.OS === "android"
              ? StatusBar.currentHeight
              : insets.top,
        }}
      >
        <ProBadge />
      </View>

      <NewFeaturesBanner
        visible={showNewFeatures}
        onClose={() => setShowNewFeatures(false)}
      />

      <View
        style={[
          styles.content,
          { paddingBottom: 80 + insets.bottom },
        ]}
      >
        {renderScreen()}
      </View>

      <View
        style={[
          styles.footer,
          { paddingBottom: insets.bottom },
        ]}
      >
        <TabBar
          currentTab={currentTab}
          onTabPress={handleTabPress}
        />
      </View>

      <LoginModal
        visible={modalVisible}
        remainingClicks={remainingClicks}
        onClose={() => setModalVisible(false)}
        onLogin={() => router.push("/login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  content: { flex: 1 },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
  },
});
