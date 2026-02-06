import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";

export function UpdateBanner({ loading, onUpdate }: any) {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>Nova versão disponível 🚀</Text>
      <TouchableOpacity style={styles.btn} onPress={onUpdate}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Atualizar</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { margin: 16, padding: 14, backgroundColor: "#0f172a", borderRadius: 14, flexDirection: "row", justifyContent: "space-between" },
  text: { color: "#fff", fontWeight: "800" },
  btn: { backgroundColor: "#3b82f6", padding: 8, borderRadius: 8 },
  btnText: { color: "#fff", fontWeight: "900" },
});
