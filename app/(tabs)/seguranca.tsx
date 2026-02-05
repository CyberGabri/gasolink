import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Switch,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView, MotiText } from "moti";
import { useRouter } from "expo-router";

const COLORS = {
  primary: "#6366f1",
  secondary: "#0f172a",
  background: "#ffffff",
  card: "#f8fafc",
  textPrimary: "#1e293b",
  textSecondary: "#64748b",
  success: "#10b981",
  warning: "#f59e0b",
};

export default function SegurancaScreen() {
  const router = useRouter();
  const [biometria, setBiometria] = useState(true);
  const [duasEtapas, setDuasEtapas] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.replace("/(tabs)/")} 
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Segurança</Text>
        <View style={{ width: 45 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* ESCUDO DE SEGURANÇA ANIMADO */}
        <View style={styles.shieldSection}>
          <MotiView
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            style={styles.shieldRing}
          >
            <MotiView
              from={{ opacity: 0.3, scale: 1 }}
              animate={{ opacity: 0, scale: 1.5 }}
              transition={{ loop: true, duration: 2000, type: 'timing' }}
              style={styles.pulseCircle}
            />
            <MaterialCommunityIcons name="shield-check" size={80} color={COLORS.success} />
          </MotiView>
          <MotiText 
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            style={styles.statusText}
          >
            Sua conta está protegida
          </MotiText>
          <Text style={styles.statusSub}>Última verificação: Hoje, 14:20</Text>
        </View>

        {/* OPÇÕES DE SEGURANÇA */}
        <View style={styles.menuGroup}>
          <Text style={styles.groupTitle}>ACESSO E BIOMETRIA</Text>
          
          <SecurityOption 
            icon="fingerprint" 
            label="Biometria / Face ID" 
            description="Acesso rápido e seguro"
            type="switch"
            value={biometria}
            onValueChange={setBiometria}
          />

          <SecurityOption 
            icon="shield-lock-outline" 
            label="Autenticação em 2 Etapas" 
            description="Camada extra via SMS ou E-mail"
            type="switch"
            value={duasEtapas}
            onValueChange={setDuasEtapas}
          />

          <Text style={[styles.groupTitle, { marginTop: 25 }]}>CONFIGURAÇÕES</Text>

          <SecurityOption 
            icon="key-outline" 
            label="Alterar Senha" 
            description="Troque sua senha periodicamente"
            onPress={() => console.log("Mudar senha")}
          />

          <SecurityOption 
            icon="devices" 
            label="Dispositivos Conectados" 
            description="Gerencie onde sua conta está aberta"
            onPress={() => console.log("Dispositivos")}
          />
        </View>

        {/* BOTÃO DE EMERGÊNCIA */}
        <TouchableOpacity style={styles.emergencyBtn}>
          <Text style={styles.emergencyText}>ENCERRAR TODAS AS SESSÕES</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Componente para as opções de segurança
const SecurityOption = ({ icon, label, description, type, value, onValueChange, onPress }: any) => (
  <TouchableOpacity 
    style={styles.optionCard} 
    onPress={onPress} 
    disabled={type === 'switch'}
    activeOpacity={0.7}
  >
    <View style={styles.optionLeft}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={24} color={COLORS.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.optionLabel}>{label}</Text>
        <Text style={styles.optionDesc}>{description}</Text>
      </View>
    </View>
    
    {type === 'switch' ? (
      <Switch 
        value={value} 
        onValueChange={onValueChange} 
        trackColor={{ false: "#cbd5e1", true: COLORS.primary }}
        thumbColor="#fff"
      />
    ) : (
      <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: 20, 
    height: 70 
  },
  backBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: COLORS.card, justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 18, fontWeight: "800", color: COLORS.secondary },
  
  scrollContent: { paddingHorizontal: 25 },
  
  // Seção do Escudo
  shieldSection: { alignItems: 'center', marginVertical: 40 },
  shieldRing: { 
    width: 160, 
    height: 160, 
    borderRadius: 80, 
    backgroundColor: '#f0fdf4', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#dcfce7'
  },
  pulseCircle: { position: 'absolute', width: 160, height: 160, borderRadius: 80, borderWidth: 2, borderColor: COLORS.success },
  statusText: { fontSize: 20, fontWeight: "800", color: COLORS.secondary, marginTop: 20 },
  statusSub: { fontSize: 13, color: COLORS.textSecondary, marginTop: 5 },

  // Grupo de Menu
  menuGroup: { marginTop: 10 },
  groupTitle: { fontSize: 11, fontWeight: "900", color: COLORS.textSecondary, marginBottom: 15, letterSpacing: 1.2 },
  optionCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: COLORS.card,
    padding: 16, 
    borderRadius: 22, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9'
  },
  optionLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconContainer: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  textContainer: { flex: 1 },
  optionLabel: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary },
  optionDesc: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },

  emergencyBtn: { 
    marginTop: 30, 
    padding: 20, 
    borderRadius: 22, 
    borderWidth: 2, 
    borderColor: '#fee2e2', 
    alignItems: 'center' 
  },
  emergencyText: { color: '#ef4444', fontWeight: '800', fontSize: 13, letterSpacing: 0.5 },
});