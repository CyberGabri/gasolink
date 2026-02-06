import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

type TabType = "inicio" | "veiculo-config" | "financeiro" | "perfil-user";

interface Props {
  currentTab: TabType;
  onTabPress: (tab: TabType) => void;
}

const TABS: TabType[] = ["inicio", "veiculo-config", "financeiro", "perfil-user"];
const { width } = Dimensions.get("window");
const TAB_WIDTH = width / TABS.length;

export default function TabBar({ currentTab, onTabPress }: Props) {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withSpring(TABS.indexOf(currentTab) * TAB_WIDTH);
  }, [currentTab]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.indicator, { transform: [{ translateX: translateX.value }] }]}
      />

      {TABS.map((tab) => {
        const active = currentTab === tab;
        return (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => onTabPress(tab)}
          >
            <Ionicons
              name={getIcon(tab, active)}
              size={24}
              color={active ? "#3b82f6" : "#94a3b8"}
            />
            <Text style={[styles.label, active && { color: "#3b82f6" }]}>
              {getLabel(tab)}
            </Text>
          </TouchableOpacity>
        );
      })}
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
  container: {
    flexDirection: "row",
    height: 70,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  indicator: {
    position: "absolute",
    width: TAB_WIDTH,
    height: 3,
    backgroundColor: "#3b82f6",
    top: 0,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 10,
    marginTop: 4,
    color: "#94a3b8",
    fontWeight: "700",
  },
});
