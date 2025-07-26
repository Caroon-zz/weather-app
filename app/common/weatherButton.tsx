import React from "react";
import { Button, StyleSheet, View } from "react-native";

interface WeatherButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
  style?: object;
}

const WeatherButton: React.FC<WeatherButtonProps> = ({
  title,
  onPress,
  color = "#007AFF",
  disabled = false,
  style = {},
}) => (
  <View style={[styles.buttonWrapper, style]}>
    <Button
      title={title}
      onPress={onPress}
      color={color}
      disabled={disabled}
    />
  </View>
);

const styles = StyleSheet.create({
  buttonWrapper: {
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
});

export { WeatherButton };