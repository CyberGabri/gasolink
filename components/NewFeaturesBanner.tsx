import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";

interface Props {
  visible: boolean;
  update?: boolean;
  loading?: boolean;
  onUpdate?: () => void;
  onClose?: () => void;
}

export default function NewFeaturesBanner({
  visible,
  update = false,
  loading = false,
  onUpdate,
  onClose,
}: Props) {
  if (!visible) return null;

  return (
    <MotiView
      from={{ opacity: 0, translateY: -30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 300 }}
      style={styles.banner}
    >
      <MaterialCommunityIcons
        name="star-circle-outline"
        size={22}
        color="#ffffff"
        style={styles.icon}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {update ? "Nova versão disponível 🚀" : "Novos recursos"}
        </Text>
        <Text style={styles.text}>
          O Gasolink recebeu melhorias e novidades
        </Text>
      </View>

      {update ? (
        <TouchableOpacity
          onPress={onUpdate}
          disabled={loading}
          style={styles.actionContainer}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={styles.action}>Atualizar</Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onClose} style={styles.close}>
          <Ionicons name="close" size={18} color="#ffffff" />
        </TouchableOpacity>
      )}
    </MotiView>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6366f1",
    padding: 14,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 14,

    ...(Platform.OS === "web"
      ? {
          boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
        }
      : {
          elevation: 6,
        }),
  },
  icon: {
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
  },
  text: {
    color: "#e0e7ff",
    fontSize: 12,
    marginTop: 2,
  },
  actionContainer: {
    paddingLeft: 12,
  },
  action: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 13,
  },
  close: {
    paddingLeft: 10,
  },
});
