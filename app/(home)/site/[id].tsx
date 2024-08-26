import { StyleSheet, View } from "react-native";
import StoriesView from "@/components/StoriesView";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Site() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <StoriesView></StoriesView>
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
