import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { StoreProvider } from "@/StoreProvider";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <StoreProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="(home)/index"
            options={{
              animation: "ios",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(home)/[siteId]/story/[id]"
            options={{ animation: "ios", headerShown: false }}
          />
          <Stack.Screen
            name="(home)/[siteId]/chapter/[id]"
            options={{ animation: "ios", headerShown: false }}
          />
          <Stack.Screen
            name="(home)/site/[id]"
            options={{ animation: "ios", headerShown: false }}
          />
          <Stack.Screen
            name="modal"
            options={{
              // Set the presentation mode to modal for our modal route.
              presentation: "modal",
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </StoreProvider>
  );
}
