import { StatusBar, Platform } from "react-native";

type Props = {
  theme?: "light" | "dark";
  backgroundColor?: string;
};

export default function AppStatusBar({
  theme = "light",
  backgroundColor = "#FFFFFF",
}: Props) {
  return (
    <StatusBar
      barStyle={theme === "light" ? "dark-content" : "light-content"}
      backgroundColor={Platform.OS === "android" ? backgroundColor : undefined}
      translucent={false}
      hidden={false}
    />
  );
}
