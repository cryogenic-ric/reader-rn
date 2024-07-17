import React, { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTheme, Text, Card } from "react-native-paper";
import { observer } from "mobx-react-lite";
import { useStore } from "@/StoreProvider";
import { useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";

const FetchDataComponent: React.FC = observer(() => {
  const { id } = useLocalSearchParams();
  const [webViewHeight, setWebViewHeight] = useState<number>(0);
  const theme = useTheme();
  const webViewRef = useRef(null);

  const { chapterStore } = useStore();

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (typeof id === "string") {
      chapterStore.fetchChapter(id);
    }
  }, [id]);

  if (chapterStore.loading) {
    return (
      <View
        style={[styles.center, { backgroundColor: theme.colors.background }]}
      >
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

  const handleWebViewMessage = (event: any) => {
    setWebViewHeight(Number(event.nativeEvent.data));
  };

  const RenderChapter = () => {
    const chapter = chapterStore.chapter;
    if (!chapter) return null;
    return (
      <Card style={styles.card}>
        <Card.Cover
          source={{ uri: chapter.meta.cover?.src?.image || "" }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Text variant="titleLarge" style={styles.title}>
          {chapter.title}
        </Text>
        <Text variant="headlineSmall" style={styles.summary} numberOfLines={2}>
          {chapter.summary}
        </Text>
      </Card>
    );
  };

  const tagStyles = {
    body: {
      fontFamily: "Arial, sans-serif",
      color: "#333",
      padding: 5, // Padding values should be numbers for React Native styles
    },
    p: {
      fontSize: 18,
      lineHeight: 30,
      padding: 5,
      paddingLeft: 25,
      paddingRight: 25,
    },
    blockquote: {
      fontSize: 18,
      lineHeight: 30,
      padding: 5,
      paddingLeft: 25,
      paddingRight: 25,
    },
    h1: {
      fontSize: 18,
      lineHeight: 30,
      padding: 5,
      paddingLeft: 25,
      paddingRight: 25,
    },
    h2: {
      fontSize: 18,
      lineHeight: 30,
      padding: 5,
      paddingLeft: 25,
      paddingRight: 25,
    },
    h3: {
      fontSize: 18,
      lineHeight: 30,
      padding: 5,
      paddingLeft: 25,
      paddingRight: 25,
    },
    h4: {
      fontSize: 18,
      lineHeight: 30,
      padding: 5,
      paddingLeft: 25,
      paddingRight: 25,
    },
    h5: {
      fontSize: 18,
      lineHeight: 30,
      padding: 5,
      paddingLeft: 25,
      paddingRight: 25,
    },
    h6: {
      fontSize: 18,
      lineHeight: 30,
      padding: 5,
      paddingLeft: 25,
      paddingRight: 25,
    },
    br: {
      fontSize: 18,
      lineHeight: 30,
      padding: 5,
      paddingLeft: 25,
      paddingRight: 25,
    },
    img: {
      marginVertical: 10,
      height: "auto",
    },
    "*": {
      padding: 0,
      margin: 0,
    },
  };

  const source = {
    html: chapterStore.chapter?.content || "",
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background, paddingBottom: 0 },
      ]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.background, paddingBottom: 0 },
        ]}
      >
        <RenderChapter />
        <RenderHTML
          contentWidth={width}
          source={{ html: chapterStore.chapter?.content || "" }}
          ignoredDomTags={["source"]}
          tagsStyles={tagStyles}
        />
      </ScrollView>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 15,
    margin: 15,
    marginTop: 70,
  },
  container: {
    flexGrow: 1,
    paddingTop: 0,
    borderRadius: 0,
    shadowColor: "#9b9b9b",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 5,
  },
  cover: {
    height: 400,
    objectFit: "cover",
    minHeight: 150,
    maxHeight: 400,
    minWidth: 150,
    maxWidth: "100%",
    borderRadius: 16,
    marginTop: -50,
  },
  summary: {
    paddingTop: 0,
    fontSize: 16,
    paddingBottom: 20,
    paddingLeft: 5,
    color: "#333",
    opacity: 0.7,
    lineHeight: 26,
  },
});

export default FetchDataComponent;
