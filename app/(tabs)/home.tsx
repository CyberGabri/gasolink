import React from 'react';
import { 
  StyleSheet, View, Text, ScrollView, 
  TouchableOpacity, StatusBar, Platform 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/Colors';

// --- COMPONENTE DE MAPA PARA WEB (CONFIGURADO PARA FORTALEZA) ---
const WebMapIframe = () => {
  // Coordenadas Reais de Fortaleza, CE
  const lat = -3.7319; // Latitude Fortaleza
  const lon = -38.5267; // Longitude Fortaleza
  
  // URL do OpenStreetMap com zoom ajustado para ver a cidade
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.02},${lat-0.02},${lon+0.02},${lat+0.02}&layer=mapnik&marker=${lat},${lon}`;

  if (Platform.OS !== 'web') return null;

  return (
    <View style={styles.iframeWrapper}>
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ 
          border: 0, 
          borderRadius: 22,
          display: 'block'
        }}
        title="Mapa de Postos Fortaleza"
        allowFullScreen
      />
    </View>
  );
};

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header Premium */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>GASOLINK</Text>
          <View style={styles.carBadge}>
            <MaterialCommunityIcons name="car-cog" size={14} color={COLORS.secondaryText} />
            <Text style={styles.carText}>Onix 1.0 • 12.5 km/l</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.proBadge}>
          <Text style={styles.proText}>PRO+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Card de Inteligência de Custo */}
        <View style={styles.decisionCard}>
          <View style={styles.decisionHeader}>
            <MaterialIcons name="insights" size={18} color="rgba(255,255,255,0.4)" />
            <Text style={styles.decisionTitle}>ANÁLISE DE CUSTO REAL</Text>
          </View>
          <View style={styles.decisionBody}>
            <View style={{ flex: 1 }}>
              <Text style={styles.decisionStatus}>RECOMENDADO</Text>
              <Text style={styles.decisionReason}>Melhor momento detectado em Fortaleza.</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.kmValue}>R$ 4,50</Text>
              <Text style={styles.kmLabel}>POR KM</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Mapa Inteligente • Fortaleza</Text>
        
        {/* Container do Mapa */}
        <View style={styles.mapContainer}>
          {Platform.OS === 'web' ? (
            <WebMapIframe />
          ) : (
            <View style={styles.webMapPlaceholder}>
              <MaterialCommunityIcons name="map-marker-radius" size={40} color="#CBD5E1" />
              <Text style={styles.mapPlaceholderText}>Carregando Mapa Nativo...</Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>Melhores Opções Próximas</Text>
        
        {/* Posto 1 - Baseado em Fortaleza */}
        <TouchableOpacity style={styles.postoItem} activeOpacity={0.7}>
          <View style={styles.postoInfo}>
            <View style={styles.nomeRow}>
              <Text style={styles.postoNome}>Posto Shell Aldeota</Text>
              <MaterialIcons name="verified" size={14} color="#0EA5E9" style={{ marginLeft: 6 }} />
            </View>
            <Text style={styles.postoSub}>0.8 km • Av. Santos Dumont</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.postoPreco}>R$ 5,87</Text>
            <MaterialCommunityIcons name="trending-down" size={16} color="#10B981" />
          </View>
        </TouchableOpacity>

        {/* Posto 2 - Baseado em Fortaleza */}
        <TouchableOpacity style={styles.postoItem} activeOpacity={0.7}>
          <View style={styles.postoInfo}>
            <Text style={styles.postoNome}>Ipiranga Cocó</Text>
            <Text style={styles.postoSub}>2.5 km • Eng. Santana Júnior</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.postoPreco}>R$ 6,05</Text>
            <MaterialCommunityIcons name="trending-up" size={16} color="#EF4444" />
          </View>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25
  },
  brandTitle: { fontSize: 18, fontWeight: '900', color: '#1e293b', letterSpacing: 2 },
  carBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  carText: { fontSize: 11, color: '#64748b', marginLeft: 5, fontWeight: '700', textTransform: 'uppercase' },
  proBadge: { backgroundColor: '#000', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  proText: { fontSize: 10, fontWeight: '900', color: '#FFD700', letterSpacing: 1 },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 100 },
  
  decisionCard: { backgroundColor: '#000', borderRadius: 24, padding: 24, elevation: 4 },
  decisionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  decisionTitle: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '800', marginLeft: 8 },
  decisionBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  decisionStatus: { color: '#FFFFFF', fontSize: 22, fontWeight: '900' },
  decisionReason: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 4 },
  kmValue: { color: '#FFFFFF', fontSize: 26, fontWeight: '900' },
  kmLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 9, fontWeight: '800' },
  
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#1e293b', textTransform: 'uppercase', marginTop: 30, marginBottom: 15 },
  
  mapContainer: { 
    height: 300, 
    borderRadius: 24, 
    overflow: 'hidden', 
    backgroundColor: '#F8FAFC', 
    borderWidth: 1, 
    borderColor: '#F1F5F9',
    elevation: 2
  },
  iframeWrapper: { flex: 1, width: '100%', height: '100%' },
  webMapPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mapPlaceholderText: { color: '#94a3b8', fontSize: 12, marginTop: 10, fontWeight: '600' },

  postoItem: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#FFFFFF', padding: 20, borderRadius: 22, marginBottom: 12,
    borderWidth: 1, borderColor: '#F1F5F9'
  },
  postoInfo: { flex: 1 },
  nomeRow: { flexDirection: 'row', alignItems: 'center' },
  postoNome: { fontSize: 15, fontWeight: '800', color: '#1e293b' },
  postoSub: { fontSize: 12, color: '#64748b', marginTop: 4 },
  postoPreco: { fontSize: 18, fontWeight: '900', color: '#1e293b' },
});