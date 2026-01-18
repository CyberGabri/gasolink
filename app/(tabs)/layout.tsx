import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.secondaryText,
      tabBarStyle: { height: 65, paddingBottom: 10, paddingTop: 10 },
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <Ionicons name="log-in-outline" size={24} color={color} />,
        }}
      />
      {/* Adicione outras abas aqui */}
    </Tabs>
  );
}