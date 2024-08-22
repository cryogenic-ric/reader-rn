import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTheme, Text } from "react-native-paper";
import { observer } from "mobx-react-lite";
import { useStore } from "@/StoreProvider";
import RenderHTML from "react-native-render-html";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { contentTagStyles } from "@/utils";
import Header from "@/components/chapter/HeaderBar";
import BottomBar from "@/components/chapter/BottomBar";
import Customise from "@/components/chapter/Customise";
import { useChapterTheme } from "@/provider/ChapterThemeContext";

const ChapterView: React.FC = observer(() => {
  const { chapterStore } = useStore();
  const theme = useTheme();
  const { id, siteId } = useLocalSearchParams();
  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { currentScheme } = useChapterTheme();

  const [barVisibility, setBarVisibility] = useState(true);
  const [customiseVisibility, setCustomiseVisibility] = useState(false);

  const appbarAnimation = useRef(new Animated.Value(1)).current;
  const bottombarAnimation = useRef(new Animated.Value(1)).current;

  const toggleBars = () => setBarVisibility((prev) => !prev);
  const toggleCustomise = () => setCustomiseVisibility((prev) => !prev);

  useEffect(() => {
    Animated.timing(appbarAnimation, {
      toValue: barVisibility ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [barVisibility]);

  useEffect(() => {
    Animated.timing(bottombarAnimation, {
      toValue: barVisibility ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [barVisibility]);

  useEffect(() => {
    if (typeof id === "string" && typeof siteId === "string") {
      chapterStore.fetchChapter(id, siteId);
    }
  }, [id, siteId]);

  if (chapterStore.loading) {
    return (
      <View
        style={[styles.center, { backgroundColor: theme.colors.background }]}
      >
        <StatusBar hidden={true} />
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (chapterStore.error) {
    return (
      <View
        style={[styles.center, { backgroundColor: theme.colors.background }]}
      >
        <Text style={{ color: theme.colors.error }}>
          Error fetching data in Chapter
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        translucent={false}
        backgroundColor="transparent"
        showHideTransition={"slide"}
        hidden={true}
      />
      <Header
        appbarAnimation={appbarAnimation}
        barVisibility={barVisibility}
        storyTitle={chapterStore.chapter?.parent?.title}
      />
      <ScrollView
        onScroll={() => setBarVisibility(false)}
        contentContainerStyle={[
          styles.scrollView,
          { paddingTop: 100, backgroundColor: currentScheme.backgroundColor },
        ]}
      >
        <TouchableOpacity onPress={toggleBars} activeOpacity={1}>
          <Text style={{ ...styles.title, color: currentScheme.textColor }}>
            {chapterStore.chapter?.title}
          </Text>
          <RenderHTML
            contentWidth={width}
            source={{ html: chapterStore.chapter?.content || "" }}
            ignoredDomTags={["source"]}
            tagsStyles={{
              ...contentTagStyles,
              body: {
                fontFamily: "Arial, sans-serif",
                color: currentScheme.textColor,
                padding: 5,
              },
            }}
          />
        </TouchableOpacity>
        {chapterStore.chapter?.visibility === 1 && (
          <Text style={styles.title}>This is a Paid Chapter!</Text>
        )}
        {chapterStore.chapter?.visibility === 2 && (
          <Text style={styles.title}>This is a Follower Only Chapter!</Text>
        )}
      </ScrollView>
      {customiseVisibility && <Customise onClose={toggleCustomise} />}
      <BottomBar
        bottombarAnimation={bottombarAnimation}
        bottomInset={bottom}
        onCustomisePress={toggleCustomise}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
  scrollView: { flexGrow: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    paddingVertical: 20,
    paddingHorizontal: 25,
    textAlign: "center",
  },
});

export default ChapterView;
