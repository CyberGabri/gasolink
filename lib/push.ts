import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform, Alert, Linking } from "react-native";
import { supabase } from "./supabase";

export async function registerForPush(userId: string) {
  if (!Device.isDevice) return null;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  // ⚠️ Se não tiver permissão, força aviso
  if (finalStatus !== "granted") {
    console.log("Permissão de notificação negada");

    // Para Android 12 ou inferior: orienta o usuário a ativar manualmente
    if (Platform.OS === "android") {
      Alert.alert(
        "Ative as notificações",
        "Para receber alertas de preços baixos, ative as notificações nas configurações do seu aparelho.",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Abrir Configurações",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    }

    // Para iOS: alerta também
    if (Platform.OS === "ios") {
      Alert.alert(
        "Ative as notificações",
        "Vá em Ajustes > Notificações e permita que o Gasolink envie alertas."
      );
    }

    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  await supabase.from("push_tokens").upsert(
    {
      user_id: userId,
      token,
      platform: Platform.OS,
    },
    {
      onConflict: "token",
    }
  );

  return token;
}
