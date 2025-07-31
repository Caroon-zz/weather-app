import { Stack } from "expo-router";
import React from "react";
import { ReduxProvider } from "../src/providers/ReduxProvider";

export default function RootLayout() {
  return (
    <ReduxProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ReduxProvider>
  );
}
