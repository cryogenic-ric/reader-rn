import React from "react";
import { Animated, View, StyleSheet } from "react-native";
import { Appbar, Text, useTheme } from "react-native-paper";

interface BottomBarProps {
  bottombarAnimation: Animated.Value;
  bottomInset: number;
  onCustomisePress: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({
  bottombarAnimation,
  bottomInset,
  onCustomisePress,
}) => {
  const theme = useTheme();
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: bottombarAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [80, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Appbar
        style={[
          styles.bottombar,
          {
            height: 60 + bottomInset,
            backgroundColor: theme.colors.elevation.level3,
          },
        ]}
        safeAreaInsets={{ bottom: bottomInset }}
      >
        <View style={styles.actionGroup}>
          <Appbar.Action icon="cards-heart-outline" onPress={() => {}} />
          <Text style={styles.text}>85</Text>
        </View>
        <View style={styles.actionGroup}>
          <Appbar.Action icon="message-outline" onPress={() => {}} />
          <Text style={styles.text}>85</Text>
        </View>
        <View style={styles.actionGroup}>
          <Appbar.Action icon="format-size" onPress={onCustomisePress} />
        </View>
      </Appbar>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 20,
    bottom: 0,
    width: "100%",
  },
  bottombar: {
    paddingHorizontal: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionGroup: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "25%",
  },
  text: {
    fontSize: 18,
    marginLeft: -10,
    paddingRight: 10,
  },
});

export default BottomBar;
