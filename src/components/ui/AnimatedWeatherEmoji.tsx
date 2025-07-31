import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import type { AnimatedWeatherEmojiProps } from "../../features/weather/types";
import { getWeatherEmoji } from "../../features/weather/utils/weatherEmoji";
import { weatherTabStyles } from "../../styles/weatherTabStyles";

export const ANIMATION_CONSTANTS = {
  ANIMATION_DURATION: {
    SPIN: 1000,
    FLY: 1700,
  },
} as const;

export const AnimatedWeatherEmoji: React.FC<AnimatedWeatherEmojiProps> = ({
  code,
  desc,
}) => {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const flyAnim = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    spinAnim.setValue(0);
    flyAnim.setValue(-200);

    Animated.parallel([
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: ANIMATION_CONSTANTS.ANIMATION_DURATION.SPIN,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(flyAnim, {
        toValue: 0,
        duration: ANIMATION_CONSTANTS.ANIMATION_DURATION.FLY,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
    ]).start();
  }, [code, spinAnim, flyAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.Text
      style={[
        weatherTabStyles.emoji,
        { transform: [{ rotate: spin }, { translateX: flyAnim }] },
      ]}
      accessibilityLabel={desc}
    >
      {getWeatherEmoji(code)}
    </Animated.Text>
  );
};
