import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  isLoggedIn: boolean;
  onPress: () => void;
};

export default function Header({ isLoggedIn, onPress }: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.brand}>
          GASOLINK <Text style={{ color: "#3b82f6" }}>AI</Text>
        </Text>

        <View style={styles.badge}>
          {isLoggedIn ? (
            <MaterialCommunityIcons
              name="shield-check"
              size={14}
              color="#10b981"
            />
          ) : (
            <Ionicons name="sparkles" size={14} color="#94a3b8" />
          )}

          <Text style={styles.badgeText}>
            {isLoggedIn ? "CONEXÃO ATIVA" : "MODO TESTE"}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.btnText}>
          {isLoggedIn ? "PRO+" : "ENTRAR"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  brand: {
    fontSize: 20,
    fontWeight: "900",
    color: "#020617",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  badgeText: {
    fontSize: 10,
    marginLeft: 6,
    color: "#64748b",
    fontWeight: "700",
  },
  btn: {
    backgroundColor: "#0f172a",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 12,
  },
});
