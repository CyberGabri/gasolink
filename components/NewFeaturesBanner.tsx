import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
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
      from={{ opacity: 0, translateY: -40 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 400 }}
      style={styles.banner}
    >
      <MaterialCommunityIcons
        name="star-circle-outline"
        size={24}
        color="#fff"
        style={{ marginRight: 8 }}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>
          {update ? "Nova versão disponível 🚀" : "Novos recursos!"}
        </Text>
        <Text style={styles.text}>
          O Gasolink foi atualizado com melhorias incríveis
        </Text>
      </View>

      {update ? (
        <TouchableOpacity onPress={onUpdate} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.action}>Atualizar</Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={20} color="#fff" />
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
    padding: 16,
    margin: 16,
    borderRadius: 14,
  },
  title: {
    fontWeight: "900",
    color: "#fff",
    fontSize: 14,
  },
  text: {
    color: "#e0e7ff",
    fontSize: 12,
    marginTop: 2,
  },
  action: {
    color: "#fff",
    fontWeight: "900",
    marginLeft: 12,
  },
});
