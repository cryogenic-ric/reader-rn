import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useTheme, Text, Card, IconButton } from "react-native-paper";
import { Link, useLocalSearchParams } from "expo-router";
import { observer } from "mobx-react-lite";
import { useStore } from "@/StoreProvider";
import { Post } from "@/stores/StoriesStore";
import { getSnapshot, Instance } from "mobx-state-tree";
import { nativeShare, addHaptic } from "@/utils";

type PostInterface = Instance<typeof Post>;

const Stories: React.FC = observer(() => {
  const { id } = useLocalSearchParams();
  const { storiesStore } = useStore();
  const theme = useTheme();

  useEffect(() => {
    storiesStore.fetchPosts(id);
  }, [id]);

  if (storiesStore.loading) {
    return (
      <View
        style={[styles.center, { backgroundColor: theme.colors.background }]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (storiesStore.error) {
    return (
      <View
        style={[styles.center, { backgroundColor: theme.colors.background }]}
      >
        <Text style={{ color: theme.colors.error }}>
          Error fetching data in Stories
        </Text>
      </View>
    );
  }

  const renderItem: ListRenderItem<PostInterface> = ({ item }) => (
    <Link href={`${item.site_id}/story/${item.id}`} asChild>
      <Pressable>
        <Card style={styles.card}>
          <Card.Cover
            source={{ uri: item.meta.cover?.src?.image }}
            style={styles.cover}
            resizeMode="cover"
          />

          <Text variant="titleLarge" style={styles.title}>
            {item.title}
          </Text>
          {item.summary ? (
            <Text
              variant="headlineSmall"
              style={styles.summary}
              numberOfLines={2}
            >
              {item.summary}
            </Text>
          ) : null}
          {item.meta.children ? (
            <Text
              variant="headlineSmall"
              style={styles.chapterText}
              numberOfLines={2}
            >
              {item.meta.children.length} chapters
            </Text>
          ) : null}
          <View style={styles.iconContainer}>
            <IconButton
              icon="heart-outline"
              size={22}
              style={styles.icon}
              onPress={async () => {
                await addHaptic();
              }}
            />
            <IconButton
              icon="comment-outline"
              size={22}
              style={styles.icon}
              onPress={async () => {
                await addHaptic();
              }}
            />
            <IconButton
              icon="share-variant-outline"
              size={22}
              style={styles.icon}
              onPress={async () => await nativeShare(item.permalink)}
            />
            <IconButton
              icon="bookmark-outline"
              size={22}
              style={styles.icon}
              onPress={() => {}}
            />
          </View>
        </Card>
      </Pressable>
    </Link>
  );

  if (!storiesStore.posts.length)
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text style={styles.headline}>No Stories Found for this site</Text>
      </View>
    );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={styles.headline}>
        {storiesStore.posts[0]?.author.name}'s Stories
      </Text>
      <FlatList
        data={getSnapshot(storiesStore.posts) as PostInterface[]} // Convert MST array to plain array
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60, // Adjusted to make space for the fixed header

    borderRadius: 0,
    shadowColor: "#9b9b9b",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    padding: 20,
    paddingBottom: 0,
  },
  card: {
    marginBottom: 10,
    padding: 15,
    margin: 15,
    marginTop: 60, // Adjusted to account for the removed marginTop from the container
    paddingBottom: 0,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 5,
  },
  headline: {
    fontWeight: "bold",
    fontSize: 22,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: "#9b9b9b",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  cover: {
    height: 300,
    objectFit: "cover",
    minHeight: 150,
    maxHeight: 400,
    width: 200,
    borderRadius: 16,
    marginTop: -50,
    marginLeft: "auto",
    marginRight: "auto",
    shadowRadius: 10,
    elevation: 20,
  },
  summary: {
    paddingTop: 0,
    fontSize: 14,
    lineHeight: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    color: "#333",
    opacity: 0.7,
  },
  chapterText: {
    paddingTop: 0,
    fontSize: 14,
    lineHeight: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    color: "green",
    fontWeight: "bold",
    opacity: 0.7,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  icon: {
    margin: 0,
  },
});

export default Stories;
