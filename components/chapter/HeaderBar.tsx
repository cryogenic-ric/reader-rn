import React from "react";
import { Animated, StyleSheet, StatusBar } from "react-native";
import { Appbar } from "react-native-paper";
import { useNavigation } from "expo-router";

interface HeaderProps {
  appbarAnimation: Animated.Value;
  storyTitle?: string;
  barVisibility: boolean;
}

const Header: React.FC<HeaderProps> = ({
  appbarAnimation,
  storyTitle,
  barVisibility,
}) => {
  const navigation = useNavigation();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: appbarAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={storyTitle || ""} titleStyle={styles.title} />
        <Appbar.Action icon="format-list-bulleted" onPress={() => {}} />
        <Appbar.Action icon="share-variant-outline" onPress={() => {}} />
      </Appbar.Header>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 100,
    top: 0,
    width: "100%",
  },
  appbar: {
    backgroundColor: "#e6efe7",
  },
  title: {
    fontSize: 20,
  },
});

export default Header;
