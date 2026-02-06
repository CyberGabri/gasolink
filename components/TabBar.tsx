import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";

type TabType = "inicio" | "veiculo-config" | "financeiro" | "perfil-user";

type IconName = keyof typeof Ionicons.glyphMap;

interface Props {
  currentTab: TabType;
  onTabPress: (tab: TabType) => void;
}

const TABS: TabType[] = [
  "inicio",
  "veiculo-config",
  "financeiro",
  "perfil-user",
];

const { width } = Dimensions.get("window");
const TAB_WIDTH = width / TABS.length;

const ICONS: Record<TabType, { active: IconName; inactive: IconName }> = {
  inicio: { active: "flash", inactive: "flash-outline" },
  "veiculo-config": { active: "car-sport", inactive: "car-sport-outline" },
  financeiro: { active: "receipt", inactive: "receipt-outline" },
  "perfil-user": { active: "person", inactive: "person-outline" },
};

export default function TabBar({ currentTab, onTabPress }: Props) {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withSpring(TABS.indexOf(currentTab) * TAB_WIDTH, {
      damping: 18,
      stiffness: 160,
    });
  }, [currentTab]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.indicator, indicatorStyle]} />

      {TABS.map((tab) => {
        const active = currentTab === tab;

        return (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => onTabPress(tab)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={active ? ICONS[tab].active : ICONS[tab].inactive}
              size={22}
              color={active ? "#3b82f6" : "#94a3b8"}
            />
            <Text style={[styles.label, active && styles.labelActive]}>
              {getLabel(tab)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function getLabel(tab: TabType) {
  const labels: Record<TabType, string> = {
    inicio: "Home",
    "veiculo-config": "Veículo",
    financeiro: "Financeiro",
    "perfil-user": "Perfil",
  };

  return labels[tab];
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  indicator: {
    position: "absolute",
    top: 0,
    width: TAB_WIDTH,
    height: 3,
    backgroundColor: "#3b82f6",
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
  labelActive: {
    color: "#3b82f6",
  },
});
