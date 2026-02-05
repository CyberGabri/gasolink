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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/home")}
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* CARTÃO INTERATIVO COM GLASSMORPHISM */}
        <MotiView
          from={{ opacity: 0, scale: 0.8, rotateX: "-20deg" }}
          animate={{ opacity: 1, scale: 1, rotateX: "0deg" }}
          transition={{ type: "spring", damping: 12 }}
        >
          <TouchableOpacity activeOpacity={0.9} style={styles.creditCard}>
            {/* Esferas decorativas de fundo */}
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

            {/* Brilho Animado (Reflexo) */}
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

        {/* LISTA DE MÉTODOS */}
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

        {/* INFO DE SEGURANÇA */}
        <View style={styles.securityBox}>
          <MaterialCommunityIcons
            name="shield-lock-outline"
            size={22}
            color={COLORS.primary}
          />
          <Text style={styles.securityText}>
            Ambiente seguro com certificação PCI DSS. Seus dados estão
            protegidos.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={() => router.replace("/(tabs)/home")}
        >
          <Text style={styles.confirmBtnText}>SALVAR PREFERÊNCIAS</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Componente para as linhas de pagamento
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
        <MotiView from={{ scale: 0 }} animate={{ scale: 1 }}>
          <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
        </MotiView>
      )}
    </MotiView>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 70,
  },
  backBtn: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "800", color: COLORS.secondary },
  addBtn: {
    width: 45,
    height: 45,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  scrollContent: { paddingHorizontal: 25, paddingTop: 10 },

  // Design do Cartão
  creditCard: {
    width: "100%",
    height: 220,
    backgroundColor: COLORS.secondary,
    borderRadius: 30,
    padding: 25,
    marginVertical: 15,
    overflow: "hidden",
    justifyContent: "space-between",
    elevation: 20,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.4,
    shadowRadius: 20,
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardNumber: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 2,
    marginTop: 15,
  },
  cardLimit: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    marginTop: 5,
    fontWeight: "600",
  },
  cardFooter: { flexDirection: "row", justifyContent: "space-between" },
  cardLabel: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 2,
  },
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
    marginTop: 25,
    marginBottom: 15,
    letterSpacing: 1.2,
  },

  // Métodos de Pagamento
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 22,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#f1f5f9",
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
  methodSubText: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },

  securityBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 18,
    marginTop: 20,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  securityText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 12,
    flex: 1,
    lineHeight: 18,
  },

  confirmBtn: {
    height: 65,
    backgroundColor: COLORS.secondary,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    shadowColor: COLORS.secondary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  confirmBtnText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 15,
    letterSpacing: 1,
  },
});
