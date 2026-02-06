import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { MotiView } from "moti";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#6366f1",
  secondary: "#0f172a",
  background: "#ffffff",
  card: "#f8fafc",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  accent: "#f59e0b",
};

export default function PagamentosScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState(1);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />

      {/* HEADER FIXO */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/")}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Pagamentos</Text>

        <TouchableOpacity style={styles.addBtn}>
          <Ionicons
            name="add-circle-outline"
            size={28}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO ROLÁVEL */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* CARTÃO */}
        <MotiView
          from={{ opacity: 0, scale: 0.8, rotateX: "-20deg" }}
          animate={{ opacity: 1, scale: 1, rotateX: "0deg" }}
          transition={{ type: "spring", damping: 12 }}
        >
          <TouchableOpacity activeOpacity={0.9} style={styles.creditCard}>
            <View style={styles.cardCircle1} />
            <View style={styles.cardCircle2} />

            <View style={styles.cardHeader}>
              <MaterialCommunityIcons
                name="integrated-circuit-chip"
                size={38}
                color="#f59e0b"
              />
              <FontAwesome name="cc-visa" size={40} color="#fff" />
            </View>

            <View>
              <Text style={styles.cardNumber}>**** **** **** 4242</Text>
              <Text style={styles.cardLimit}>
                Limite disponível: R$ 4.500,00
              </Text>
            </View>

            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.cardLabel}>TITULAR</Text>
                <Text style={styles.cardValue}>DALVAN SILVA</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.cardLabel}>VALIDADE</Text>
                <Text style={styles.cardValue}>12/29</Text>
              </View>
            </View>

            <MotiView
              animate={{
                translateX: [-width, width],
                opacity: [0, 0.2, 0],
              }}
              transition={{ loop: true, duration: 3500, type: "timing" }}
              style={styles.cardShine}
            />
          </TouchableOpacity>
        </MotiView>

        <Text style={styles.sectionTitle}>MÉTODOS DE PAGAMENTO</Text>

        <PaymentMethod
          icon="logo-google"
          label="Google Pay"
          sub="Configurado como padrão"
          active={selectedMethod === 1}
          onPress={() => setSelectedMethod(1)}
        />

        <PaymentMethod
          icon="wallet-outline"
          label="Saldo Motorista"
          sub="R$ 150,40 em conta"
          active={selectedMethod === 2}
          onPress={() => setSelectedMethod(2)}
        />

        <PaymentMethod
          icon="qr-code-outline"
          label="Pix Instantâneo"
          sub="5% de desconto no abastecimento"
          active={selectedMethod === 3}
          onPress={() => setSelectedMethod(3)}
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const PaymentMethod = ({ icon, label, sub, active, onPress }: any) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <MotiView
      animate={{
        backgroundColor: active ? "#f0f4ff" : "#fff",
        borderColor: active ? COLORS.primary : "#f1f5f9",
        scale: active ? 1.02 : 1,
      }}
      transition={{ type: "timing", duration: 200 }}
      style={styles.methodCard}
    >
      <View style={styles.methodInfo}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: active ? COLORS.primary : "#f8fafc" },
          ]}
        >
          <Ionicons
            name={icon}
            size={22}
            color={active ? "#fff" : COLORS.secondary}
          />
        </View>
        <View>
          <Text
            style={[
              styles.methodLabel,
              { color: active ? COLORS.primary : COLORS.textPrimary },
            ]}
          >
            {label}
          </Text>
          <Text style={styles.methodSubText}>{sub}</Text>
        </View>
      </View>
      {active && (
        <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
      )}
    </MotiView>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },

  header: {
    height: 70,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
  },

  backBtn: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.secondary,
  },

  addBtn: {
    width: 45,
    height: 45,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 40,
  },

  creditCard: {
    height: 220,
    backgroundColor: COLORS.secondary,
    borderRadius: 30,
    padding: 25,
    marginBottom: 20,
    overflow: "hidden",
    justifyContent: "space-between",
  },

  cardCircle1: {
    position: "absolute",
    top: -30,
    right: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.06)",
  },

  cardCircle2: {
    position: "absolute",
    bottom: -40,
    left: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(99, 102, 241, 0.15)",
  },

  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  cardNumber: { color: "#fff", fontSize: 22, fontWeight: "700" },
  cardLimit: { color: "rgba(255,255,255,0.4)", fontSize: 12 },

  cardFooter: { flexDirection: "row", justifyContent: "space-between" },
  cardLabel: { color: "rgba(255,255,255,0.4)", fontSize: 10 },
  cardValue: { color: "#fff", fontSize: 14, fontWeight: "700" },

  cardShine: {
    position: "absolute",
    top: 0,
    width: 60,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.15)",
    transform: [{ rotate: "25deg" }],
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: "900",
    color: COLORS.textSecondary,
    marginVertical: 15,
    letterSpacing: 1.2,
  },

  methodCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 22,
    marginBottom: 12,
    borderWidth: 2,
  },

  methodInfo: { flexDirection: "row", alignItems: "center" },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  methodLabel: { fontSize: 16, fontWeight: "700" },
  methodSubText: { fontSize: 12, color: COLORS.textSecondary },
});
