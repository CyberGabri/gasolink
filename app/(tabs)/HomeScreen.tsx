import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
  SafeAreaView,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { COLORS } from "../../constants/Colors";

export default function HomeScreen() {
  const [currentFile, setCurrentFile] = useState("inicio");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF" 
        translucent={false} 
      />

      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>GASOLINK</Text>
          <View style={styles.carBadge}>
            <MaterialCommunityIcons name="car-cog" size={14} color="#64748b" />
            <Text style={styles.carText}>Onix 1.0 • Ativo</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.proBadge}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.proText}>PRO+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.iframeContainer}>
        {Platform.OS === "web" ? (
          <iframe
            key={currentFile}
            src={`/${currentFile}`}
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        ) : (
          <View style={styles.fallback}>
            <Text style={styles.fallbackText}>Carregando: /{currentFile}</Text>
          </View>
        )}
      </View>

      <Modal transparent animationType="fade" visible={modalVisible}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={styles.modalContent}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="ribbon" size={40} color="#FFD700" />
            </View>

            <Text style={styles.modalTitle}>Status: Premium</Text>

            <Text style={styles.modalText}>
              Olá, <Text style={{ fontWeight: "900" }}>Dalvan</Text>! Você já
              está na versão premium.
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>ENTENDIDO</Text>
            </TouchableOpacity>
          </MotiView>
        </Pressable>
      </Modal>

      <MotiView style={styles.tabBar}>
        <TabButton
          id="inicio"
          icon="home"
          label="Início"
          active={currentFile}
          onPress={setCurrentFile}
        />
        <TabButton
          id="veiculo-config"
          icon="car"
          label="Veículo"
          active={currentFile}
          onPress={setCurrentFile}
        />
        <TabButton
          id="meu-plano"
          icon="flash"
          label="Planos"
          active={currentFile}
          onPress={setCurrentFile}
        />
        <TabButton
          id="perfil-user"
          icon="person"
          label="Perfil"
          active={currentFile}
          onPress={setCurrentFile}
        />
      </MotiView>
    </SafeAreaView>
  );
}

const TabButton = ({ id, icon, label, active, onPress }: any) => {
  const isActive = active === id;
  const color = isActive ? COLORS.primary : "#94a3b8";

  return (
    <TouchableOpacity style={styles.tabItem} onPress={() => onPress(id)}>
      <MotiView animate={{ scale: isActive ? 1.2 : 1 }}>
        <Ionicons
          name={isActive ? icon : `${icon}-outline`}
          size={24}
          color={color}
        />
      </MotiView>
      <Text style={[styles.tabLabel, isActive && { color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 90,
    paddingHorizontal: 25,
    paddingTop: Platform.OS === "android" ? 10 : 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  brandTitle: { fontSize: 18, fontWeight: "900", letterSpacing: 2 },
  carBadge: { flexDirection: "row", alignItems: "center" },
  carText: { fontSize: 11, marginLeft: 5, color: "#64748b" },
  proBadge: { backgroundColor: "#000", padding: 10, borderRadius: 10 },
  proText: { color: "#FFD700", fontWeight: "900" },
  iframeContainer: { flex: 1, marginBottom: 100 },
  fallback: { flex: 1, justifyContent: "center", alignItems: "center" },
  fallbackText: { color: "#64748b" },
  tabBar: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    height: 75,
    borderRadius: 30,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tabItem: { flex: 1, alignItems: "center" },
  tabLabel: { fontSize: 10, marginTop: 4 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    padding: 30,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFF9E6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: "900" },
  modalText: { textAlign: "center", marginBottom: 25 },
  modalButton: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#000",
    borderRadius: 15,
    alignItems: "center",
  },
  modalButtonText: { color: "#FFD700", fontWeight: "900" },
});