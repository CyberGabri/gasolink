import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { useRouter } from "expo-router";

const COLORS = {
  primary: "#3b82f6",
  background: "#f8fafc",
  card: "#ffffff",
  text: "#0f172a",
  muted: "#64748b",
  border: "#e2e8f0",
  unread: "#eff6ff",
};

const DATA = [
  {
    id: "1",
    title: "Abastecimento inteligente",
    message: "Encontramos um posto mais barato a 1.2km de você.",
    icon: "fuel",
    unread: true,
  },
  {
    id: "2",
    title: "Economia mensal",
    message: "Você economizou R$ 87,40 este mês.",
    icon: "trending-down",
    unread: true,
  },
  {
    id: "3",
    title: "Modo Eco ativado",
    message: "Seu consumo foi otimizado com sucesso.",
    icon: "leaf",
    unread: false,
  },
  {
    id: "4",
    title: "Atualização de segurança",
    message: "Sistema protegido com criptografia avançada.",
    icon: "shield-checkmark",
    unread: false,
  },
];

export default function NotificacoesScreen() {
  const router = useRouter();
  const [items, setItems] = useState(DATA);

  function markAsRead(id: string) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Notificações</Text>
        <View style={{ width: 44 }} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 60 }}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => markAsRead(item.id)}
              style={[
                styles.card,
                item.unread && { backgroundColor: COLORS.unread },
              ]}
            >
              <View style={styles.iconBox}>
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={COLORS.primary}
                />
              </View>

              <View style={styles.textBox}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardText}>{item.message}</Text>
              </View>

              {item.unread && <View style={styles.dot} />}
            </TouchableOpacity>
          </MotiView>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
  },
  list: {
    padding: 20,
    paddingBottom: 30,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#e0edff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  textBox: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
  },
  cardText: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginLeft: 10,
  },
});
