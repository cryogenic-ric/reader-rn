import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { useTheme, Text, Avatar, IconButton } from "react-native-paper";
import { Link, useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import { useStore } from "@/StoreProvider";
import { ISite } from "@/stores/SearchStore";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeInDown,
} from "react-native-reanimated";
import debounce from "lodash/debounce";

const FetchDataComponent: React.FC = observer(() => {
  const theme = useTheme();
  const { searchStore } = useStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (searchQuery) {
      debouncedSearch(searchQuery);
    } else {
      searchStore.fetchTrendingSites();
    }
  }, [searchQuery]);

  // useEffect(() => {
  //   router.replace("/101020/chapter/229071");
  // }, []);

  const filteredSites = () => {
    if (searchQuery) return searchStore.sites;
    return searchStore.trendingSites;
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      searchStore.searchSites(query);
    }, 1000),
    []
  );

  if (searchStore.error) {
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

  const RenderSite = ({ site }: { site: ISite }) => {
    const fadeAnim = useSharedValue(0);
    const slideAnim = useSharedValue(50);

    useEffect(() => {
      fadeAnim.value = withTiming(1, { duration: 500 });
      slideAnim.value = withTiming(0, { duration: 500 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: fadeAnim.value,
        transform: [{ translateY: slideAnim.value }],
      };
    });

    if (!site) return null;
    return (
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        <Link href={`/site/${site.id}`} style={{ flex: 1 }} asChild>
          <Pressable
            style={({ pressed }) => [
              pressed && { transform: [{ scale: 0.98 }] },
            ]}
          >
            <View style={styles.siteWrapper}>
              <Avatar.Image
                source={{
                  uri:
                    site.avatar.image ||
                    site.avatar.fallback ||
                    "https://i.pravatar.cc/300",
                }}
                size={50}
                style={styles.avatar}
              />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{site.name}</Text>
                <Text style={styles.domain}>@{site.domain.split(".")[0]}</Text>
              </View>
              <IconButton icon="arrow-right" size={20} style={styles.icon} />
            </View>
          </Pressable>
        </Link>
      </Animated.View>
    );
  };

  return (
    <View style={styles.fullContainer}>
      <View style={styles.fixedHeader}>
        <Text style={styles.headline}>Search storytellers</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
            underlineColorAndroid="transparent"
          />
          {searchQuery ? (
            <IconButton
              icon="close"
              size={20}
              style={styles.clearIcon}
              onPress={() => setSearchQuery("")}
            />
          ) : null}
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContainer,
          {
            backgroundColor: theme.colors.background,
            paddingBottom: 30,
            paddingTop: 10,
          },
        ]}
      >
        {filteredSites().map((site: ISite) => (
          <RenderSite key={site.id} site={site} />
        ))}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
  },
  fixedHeader: {
    backgroundColor: "#fff",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    zIndex: 1,
    elevation: 4, // Android-like shadow
  },
  headline: {
    fontWeight: "bold",
    fontSize: 24,
    padding: 20,
    paddingBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  clearIcon: {
    padding: 0,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 0,
  },
  animatedContainer: {
    flex: 1,
    flexBasis: "auto",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  siteContainer: {
    borderColor: "red",
    borderWidth: 1,
    flex: 1,
    display: "flex",
    flexGrow: 1,
    width: 600,
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2, // Android-like shadow
  },
  siteWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  avatar: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    width: "auto",
  },
  name: {
    fontWeight: "bold",
  },
  domain: {
    color: "#777",
  },
  icon: {
    alignSelf: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Background color to match the app theme
  },
  loaderText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Loader text color
  },
});

export default FetchDataComponent;
