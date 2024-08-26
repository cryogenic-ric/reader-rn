import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTheme, Text, Card } from "react-native-paper";
import { Link } from "expo-router";
import { observer } from "mobx-react-lite";
import { useStore } from "@/StoreProvider";
import { PostVisibility } from "@/utils/enums";

const StoryView: React.FC = observer(() => {
  const { id, siteId } = useLocalSearchParams();
  const theme = useTheme();
  const { storyStore } = useStore();

  useEffect(() => {
    if (typeof id === "string" && typeof siteId === "string") {
      storyStore.fetchStory(id, siteId);
    }
  }, [id]);

  if (storyStore.loading) {
    return (
      <View
        style={[styles.center, { backgroundColor: theme.colors.background }]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (storyStore.error) {
    return (
      <View
        style={[styles.center, { backgroundColor: theme.colors.background }]}
      >
        <Text style={{ color: theme.colors.error }}>
          Error fetching data in Story
        </Text>
      </View>
    );
  }

  const RenderChapterItem = ({ item }: { item: any }) => (
    <Link href={`${item.site_id}/chapter/${item.id}`} asChild>
      <Pressable>
        <Card style={styles.chapterCard}>
          <Text style={[styles.chapterTitle, { flex: 1 }]}>{item.title}</Text>
          <Text style={styles.visibility}>
            {PostVisibility[item.visibility]}
          </Text>
        </Card>
      </Pressable>
    </Link>
  );

  const RenderStory = () => {
    const story = storyStore.story;
    if (!story) return null;
    return (
      <View style={{ flex: 1 }}>
        <Card style={styles.card}>
          <Card.Cover
            source={{ uri: story.meta.cover?.src?.image }}
            style={styles.cover}
            resizeMode="cover"
          />

          <Text variant="titleLarge" style={styles.title}>
            {story.title}
          </Text>
          <Text
            variant="headlineSmall"
            style={styles.summary}
            numberOfLines={2}
          >
            {story.summary}
          </Text>
        </Card>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background, paddingBottom: 30 },
      ]}
    >
      <RenderStory />
      <Text style={styles.headline}>Chapters</Text>
      {storyStore.chapters.map((child: any) => (
        <RenderChapterItem key={child.id} item={child} />
      ))}
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
  chapterCard: {
    marginBottom: 10,
    padding: 15,
    margin: 15,
    marginTop: 10,
    paddingBottom: 0,
    shadowOpacity: 0,
  },
  container: {
    flexGrow: 1,
    paddingTop: 0,
    borderRadius: 0,
    shadowColor: "#9b9b9b",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1, // Adjust the opacity for shadow
    shadowRadius: 20,
    elevation: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 5,
  },
  headline: {
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 20,
    padding: 20,
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
    opacity: 0.7,
    lineHeight: 26,
  },
  chapterTitle: {
    fontWeight: "bold",
    fontSize: 16,
    paddingTop: 0,
    padding: 15,
    paddingLeft: 5,
    paddingBottom: 10,
  },
  visibility: {
    flex: 1,
    paddingTop: 0,
    paddingLeft: 5,
    paddingBottom: 10,
    opacity: 0.6,
    fontSize: 12,
    textTransform: "uppercase",
  },
});

export default StoryView;
