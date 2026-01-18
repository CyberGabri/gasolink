import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../constants/Colors';

interface GasoButtonProps {
  title: string;
  onPress: () => void;
}

export function GasoButton({ title, onPress }: GasoButtonProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      style={styles.button} 
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
      android: { elevation: 6 },
    }),
  },
  text: { color: COLORS.white, fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
});