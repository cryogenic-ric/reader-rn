import React from "react";
import { Animated, View, StyleSheet } from "react-native";
import { Appbar, Text, TouchableRipple } from "react-native-paper";

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
        style={[styles.bottombar, { height: 60 + bottomInset }]}
        safeAreaInsets={{ bottom: bottomInset }}
      >
        <TouchableRipple style={styles.actionGroup} onPress={() => console.log('Pressed')}>
          <View style={styles.actionGroup}>
             <Appbar.Action disabled icon="cards-heart-outline" onPress={() => {}} / >
             <Text style={styles.text}>89</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => console.log('Pressed')}  style={styles.actionGroup}>
        <View style={styles.actionGroup}>
          <Appbar.Action disabled icon="message-outline" onPress={() => {}} />
          <Text style={styles.text}>85</Text>
        </View>
        </TouchableRipple>
        <View style={styles.actionGroup}>
          <Appbar.Action disabled icon="format-size" onPress={onCustomisePress} />
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
    backgroundColor: "#e5efe6",
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
