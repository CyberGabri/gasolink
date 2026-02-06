import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export async function registerForNotifications() {
  if (!Constants.isDevice) return;

  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    await Notifications.requestPermissionsAsync();
  }
}

export async function notifyNewUpdate() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🚀 Gasolink atualizado",
      body: "Novos recursos foram adicionados. Abra o app!",
      sound: true,
    },
    trigger: null,
  });
}
