import { StyleSheet, View } from "react-native";
import ChapterView from "@/components/ChapterView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ChapterThemeProvider,
  useChapterTheme,
} from "@/provider/ChapterThemeContext";

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <ChapterThemeProvider>
        <ChapterView></ChapterView>
      </ChapterThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
