import React from "react";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { Text, IconButton, Switch, Button } from "react-native-paper";
import { useChapterTheme } from "@/provider/ChapterThemeContext";

const BottomSheetContent: React.FC = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const { currentScheme, changeThemeColor } = useChapterTheme();
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.colorOptions}>
        {["#FFFFFF", "#F5EFE2", "#D0E9E1", "#1A1A1A", "#6B726A"].map(
          (color, index) => (
            <View
              key={index}
              style={[
                styles.colorCircle,
                {
                  backgroundColor: color,
                  borderColor:
                    currentScheme.backgroundColor == color ? "#000" : "#fff",
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  changeThemeColor(color);
                }}
              >
                <View style={styles.iconPadding} />
              </TouchableOpacity>
            </View>
          )
        )}
      </View>
      <View style={styles.fontSizeContainer}>
        <Text>A</Text>
        <View style={styles.slider} />
        <Text style={styles.largeLabel}>A</Text>
      </View>
      <View style={styles.fontStyleOptions}>
        {["Original", "Focus", "Bookish"].map((style, index) => (
          <Pressable key={index}>
            <View style={styles.fontOption}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>Aa</Text>
              <Text style={{ fontSize: 16 }}>{style}</Text>
            </View>
          </Pressable>
        ))}
      </View>
      <View style={styles.toggleCommentsContainer}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <IconButton icon="message-outline" size={24} onPress={() => {}} />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Show Inline Comments
          </Text>
        </View>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    zIndex: 110,
    padding: 16,
  },
  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  colorCircle: {
    margin: 0,
    padding: 0,
    borderWidth: 2,
    zIndex: 2,
    borderRadius: 100,
  },
  iconPadding: {
    margin: 0,
    borderColor: "#FFF",
    borderWidth: 5,
    zIndex: 2,
    borderRadius: 100,
    height: 60,
    width: 60,
  },
  fontSizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  largeLabel: {
    fontSize: 24,
  },
  slider: {
    flex: 1,
    height: 2,
    backgroundColor: "#4A4A4A",
    marginHorizontal: 16,
  },
  fontStyleOptions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  fontOption: {
    flex: 1,
    marginHorizontal: 4,
    height: 70,
    width: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: "#fff",
  },
  toggleCommentsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  iconButton: {
    margin: 0,
  },
});

export default BottomSheetContent;
