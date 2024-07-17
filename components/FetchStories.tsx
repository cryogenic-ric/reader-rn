import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Pressable,
} from "react-native";
import { useTheme, Text, Card } from "react-native-paper";
import { Link } from "expo-router";
import { observer } from "mobx-react-lite";
import { useStore } from "@/StoreProvider";
import { Post } from "@/stores/StoriesStore";
import { getSnapshot, Instance } from "mobx-state-tree";

type PostInterface = Instance<typeof Post>;

const FetchDataComponent: React.FC = observer(() => {
  const { storiesStore } = useStore();
  const theme = useTheme();

  useEffect(() => {
    storiesStore.fetchPosts();
  }, []);

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
    <Link href={`/story/${item.id}`} asChild>
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
          <Text
            variant="headlineSmall"
            style={styles.summary}
            numberOfLines={2}
          >
            {item.summary}
          </Text>
        </Card>
      </Pressable>
    </Link>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <FlatList
        data={getSnapshot(storiesStore.posts) as PostInterface[]} // Convert MST array to plain array
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={
          <Text style={styles.headline}>
            {storiesStore.posts[0]?.author.name}'s Stories
          </Text>
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 15,
    margin: 15,
    marginTop: 70,
    paddingBottom: 0,
  },
  container: {
    flex: 1,
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
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 5,
  },
  headline: {
    fontWeight: "bold",
    fontSize: 26,
    paddingTop: 26,
    paddingBottom: 0,
    paddingLeft: 30,
    shadowColor: "#9b9b9b",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
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
