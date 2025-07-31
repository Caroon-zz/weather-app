import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function useTabBarHeight() {
  const insets = useSafeAreaInsets();

  return Platform.select({
    ios: 85 + insets.bottom,
    default: 60 + insets.bottom,
  });
}

export function useTabBarPadding() {
  const tabBarHeight = useTabBarHeight();

  return {
    paddingBottom: tabBarHeight,
  };
}
