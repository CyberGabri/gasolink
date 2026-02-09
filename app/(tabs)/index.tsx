import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Platform, StatusBar, LogBox } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import { createClient } from "@supabase/supabase-js";

import Inicio from "./inicio";
import VeiculoConfig from "./veiculo-config";
import Financeiro from "./meu-plano";
import PerfilUser from "./perfil-user";
import Splash from "./SplashScreen";

import TabBar from "@/components/TabBar";
import LoginModal from "@/components/LoginModal";
import AppStatusBar from "@/components/AppStatusBar";
import ProBadge from "@/components/ProBadge";
import ForceUpdateModal from "@/components/ForceUpdateModal";

import useClickLimit from "@/hooks/useClickLimit";

LogBox.ignoreLogs(["expo-notifications: Android Push notifications"]);

type TabType = "inicio" | "veiculo-config" | "financeiro" | "perfil-user";

const supabase = createClient(
  "https://llwoggphcjolztgobach.supabase.co",
  "sb_publishable_6KK9oSOhlIFBvdRdMGzTlQ_B_GkoxlI",
  {
    realtime: { params: { eventsPerSecond: 10 } },
  },
);

const CAN_USE_PUSH = Platform.OS !== "web" && Constants.appOwnership !== "expo";

function isNewerVersion(remote: string, local: string) {
  const r = remote.split(".").map(Number);
  const l = local.split(".").map(Number);

  for (let i = 0; i < Math.max(r.length, l.length); i++) {
    const rv = r[i] || 0;
    const lv = l[i] || 0;
    if (rv > lv) return true;
    if (rv < lv) return false;
  }
  return false;
}

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("loggedIn").then((v) => setIsLoggedIn(v === "true"));
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <Splash />;
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

  const [forceUpdate, setForceUpdate] = useState(false);
  const [apkUrl, setApkUrl] = useState<string | null>(null);
  const [latestVersion, setLatestVersion] = useState("");

  const { consumeClick, remainingClicks } = useClickLimit({
    maxClicks: 7,
    onLimitReached: () => setModalVisible(true),
  });

  const checkUpdate = useCallback(async () => {
    const { data } = await supabase
      .from("app_versions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!data) return;

    const localVersion =
      Constants.expoConfig?.version || Constants.manifest?.version || "0.0.0";

    if (isNewerVersion(data.version, localVersion)) {
      setApkUrl(data.apk_url);
      setLatestVersion(data.version);
      setForceUpdate(true);
    }
  }, []);

  useEffect(() => {
    checkUpdate();
  }, [checkUpdate]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!forceUpdate) checkUpdate();
    }, 10000);
    return () => clearInterval(interval);
  }, [checkUpdate, forceUpdate]);

  useEffect(() => {
    const channel = supabase
      .channel("force-update")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "app_versions",
        },
        () => checkUpdate(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [checkUpdate]);

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
    } catch {}
  }, []);

  const handleTabPress = (tab: TabType) => {
    if (forceUpdate) return;
    if (tab === currentTab) return;
    playClick();
    if (!isLoggedIn && !consumeClick()) return;
    setCurrentTab(tab);
  };

  const handleForceUpdate = () => {
    if (apkUrl) Linking.openURL(apkUrl);
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
            Platform.OS === "android" ? StatusBar.currentHeight : insets.top,
        }}
      >
        <ProBadge />
      </View>

      <View style={[styles.content, { paddingBottom: 80 + insets.bottom }]}>
        {renderScreen()}
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <TabBar currentTab={currentTab} onTabPress={handleTabPress} />
      </View>

      <LoginModal
        visible={modalVisible}
        remainingClicks={remainingClicks}
        onClose={() => setModalVisible(false)}
        onLogin={() => router.push("/login")}
      />

      <ForceUpdateModal
        visible={forceUpdate}
        version={latestVersion}
        onUpdate={handleForceUpdate}
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
