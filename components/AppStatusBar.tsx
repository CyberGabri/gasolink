import { StatusBar, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  theme?: "light" | "dark";
  backgroundColor?: string;
};

export default function AppStatusBar({
  theme = "light",
  backgroundColor = "#FFFFFF", // fundo padrão em hexadecimal
}: Props) {
  const insets = useSafeAreaInsets();

  // Altura da StatusBar usando insets e StatusBar do Android
  const height =
    Platform.OS === "android"
      ? StatusBar.currentHeight ?? 0
      : insets.top;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height,
        backgroundColor, // agora sempre hexadecimal
        zIndex: 999,
      }}
    >
      <StatusBar
        translucent
        backgroundColor={backgroundColor} // hexadecimal
        barStyle={theme === "light" ? "dark-content" : "light-content"}
      />
    </View>
  );
}
