import { WebView } from "react-native-webview";
import React, { useEffect, useState, useRef } from "react";
import { View, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTheme, Text, Card } from "react-native-paper";
import type { Post as PostInterface } from "@/utils/types/content";

const FetchDataComponent: React.FC = () => {
  const { id } = useLocalSearchParams();
  const [chapter, setChapter] = useState<PostInterface>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [webViewHeight, setWebViewHeight] = useState<number>(0);
  const theme = useTheme();
  const webViewRef = useRef(null);

  const cssStyles = `
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    padding-bottom: 30px
  }
  
  p, blockquote, h1,h2,h3,h4,h5,h6, br {
    font-size: 18px;
    line-height: 1.6;
    padding: 10px 25px;
  }
  img {
    width: 100%;
    width: 100vw;
    margin: 0px 0 10px;
    padding: 0;
    height: auto;
  }
  * {
    padding: 0;
    margin: 0;
  }
`;

  useEffect(() => {
    fetch(`https://cheryl97.stck.me/api/r/101020/posts/${id}`)
      .then((response) => response.json())
      .then((json: PostInterface) => {
        setChapter(json);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View
        style={[styles.center, { backgroundColor: theme.colors.background }]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[styles.center, { backgroundColor: theme.colors.background }]}
      >
        <Text style={{ color: theme.colors.error }}>Error fetching data</Text>
      </View>
    );
  }

  const handleWebViewMessage = (event: any) => {
    setWebViewHeight(Number(event.nativeEvent.data));
  };

  const RenderChapter = () => {
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

  const htmlContent = `
    <html>
      <head>
      <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, initial-scale=1.0, interactive-widget=resizes-content">
        <style>${cssStyles}</style>
        <link rel="stylesheet" type="text/css" href="https://stck.me/static/site/client/assets/Post-54ac3b66.css">
      </head>
      <body>
        ${
          chapter?.content ||
          "<p>Content may be paid or restricted to followers</p>"
        }
      </body>
    </html>
  `;

  const RenderContent = () => {
    if (!chapter) return null;
    return (
      <WebView
        ref={webViewRef}
        javaScriptEnabled={true}
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        injectedJavaScript="window.ReactNativeWebView.postMessage(document.body.scrollHeight)"
        onMessage={handleWebViewMessage}
      />
    );
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background, paddingBottom: 0 },
      ]}
    >
      <RenderContent />
    </ScrollView>
  );
};

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
