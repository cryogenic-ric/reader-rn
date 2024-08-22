import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { StoreProvider } from "@/StoreProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };

  const { LightTheme: NavigationLightTheme, DarkTheme: NavigationDarkTheme } =
    adaptNavigationTheme({
      reactNavigationLight: DefaultTheme,
      reactNavigationDark: DarkTheme,
      materialLight: paperTheme,
      materialDark: paperTheme,
    });

  const navigationTheme =
    colorScheme === "dark" ? NavigationDarkTheme : NavigationLightTheme;

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
    <PaperProvider theme={paperTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StoreProvider>
          <ThemeProvider value={navigationTheme}>
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
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
