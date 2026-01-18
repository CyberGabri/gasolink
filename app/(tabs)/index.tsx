import React from 'react';
import { 
  StyleSheet, View, Text, Dimensions, KeyboardAvoidingView, 
  Platform, ScrollView, StatusBar, Pressable 
} from 'react-native';
// 1. Importar o router
import { useRouter } from 'expo-router';

import { GasoInput } from '../../components/GasoInput';
import { GasoButton } from '../../components/GasoButton';
import { COLORS } from '../../constants/Colors';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
  // 2. Inicializar o router
  const router = useRouter();

  const handleLogin = () => {
    // Aqui você adicionaria sua lógica de validação futuramente
    console.log("Login realizado!");
    
    // 3. Encaminhar para a tela home
    // Certifique-se de que o arquivo app/(tabs)/home.tsx existe
    router.replace('/home'); 
  };

  return (
    <View style={styles.main}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }} 
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoSquare}>
                <View style={styles.logoCircle} />
              </View>
              <Text style={styles.logoText}>GasoLink</Text>
            </View>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.title}>Olá novamente!</Text>
            <Text style={styles.subtitle}>Acesse sua conta para continuar.</Text>

            <GasoInput 
              label="E-mail" 
              placeholder="seu@email.com" 
              keyboardType="email-address" 
              autoCapitalize="none" 
            />
            
            <GasoInput 
              label="Senha" 
              placeholder="••••••••" 
              secureTextEntry 
            />

            {/* 4. Chamar a função no onPress */}
            <GasoButton 
              title="Entrar na Conta" 
              onPress={handleLogin} 
            />

            <Pressable 
              style={styles.footerBtn}
              onPress={() => router.push('/registro')} // Exemplo para tela de cadastro
            >
              <Text style={styles.footerText}>
                Não tem conta? <Text style={styles.bold}>Cadastre-se</Text>
              </Text>
            </Pressable>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ... seus estilos permanecem os mesmos
const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: COLORS.white },
  header: {
    height: height * 0.35,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  logoContainer: { alignItems: 'center' },
  logoSquare: { width: 64, height: 64, backgroundColor: COLORS.white, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  logoCircle: { width: 28, height: 28, backgroundColor: COLORS.primary, borderRadius: 14 },
  logoText: { color: COLORS.white, fontSize: 22, fontWeight: '900', letterSpacing: 2, textTransform: 'uppercase' },
  formCard: { flex: 1, paddingHorizontal: 30, paddingTop: 40 },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.text },
  subtitle: { fontSize: 15, color: COLORS.secondaryText, marginBottom: 35, marginTop: 5 },
  footerBtn: { marginTop: 30, alignItems: 'center', paddingBottom: 40 },
  footerText: { color: COLORS.secondaryText, fontSize: 14 },
  bold: { color: COLORS.primary, fontWeight: '800' }
});