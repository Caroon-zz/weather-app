import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { UI_CONSTANTS } from "../../constants/weather";
import type { AnimatedWeatherEmojiProps } from "../../features/weather/types";
import { getWeatherEmoji } from "../../features/weather/utils/weatherEmoji";
import { homeStyles } from "../../styles/home";

export const AnimatedWeatherEmoji: React.FC<AnimatedWeatherEmojiProps> = ({ 
  code, 
  desc 
}) => {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const flyAnim = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    spinAnim.setValue(0);
    flyAnim.setValue(-200);
    
    Animated.parallel([
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: UI_CONSTANTS.ANIMATION_DURATION.SPIN,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(flyAnim, {
        toValue: 0,
        duration: UI_CONSTANTS.ANIMATION_DURATION.FLY,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      })
    ]).start();
  }, [code, spinAnim, flyAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.Text
      style={[
        homeStyles.emoji, 
        { transform: [{ rotate: spin }, { translateX: flyAnim }] }
      ]}
      accessibilityLabel={desc}
    >
      {getWeatherEmoji(code)}
    </Animated.Text>
  );
};
