import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import {
  useTheme,
  Card,
  Text,
  Avatar,
  IconButton,
  Searchbar,
  useTheme as usePaperTheme,
} from "react-native-paper";
import { Link, useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import { useStore } from "@/StoreProvider";
import { ISite } from "@/stores/SearchStore";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import debounce from "lodash/debounce";

const FetchDataComponent: React.FC = observer(() => {
  const theme = usePaperTheme();
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
      <View style={[styles.center]}>
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
      <Animated.View
        style={[
          styles.animatedContainer,
          animatedStyle,
          {
            backgroundColor: theme.colors.elevation.level3,
            borderWidth: 0,
            elevation: 5,
          },
        ]}
      >
        <Link
          href={`/site/${site.id}`}
          style={{
            flex: 1,
            flexGrow: 1,
            borderWidth: 0,
            elevation: 0,
          }}
          asChild
        >
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
                <Text style={{ ...styles.name, color: theme.colors.primary }}>
                  {site.name}
                </Text>
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
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{ elevation: 5 }}
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContainer,
          {
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
    paddingBottom: 10,
    borderBottomWidth: 1,
    zIndex: 1,
    elevation: 0, // Android-like shadow
  },
  headline: {
    fontWeight: "bold",
    fontSize: 28,
    padding: 20,
    paddingBottom: 20,
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
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
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
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  siteContainer: {
    borderWidth: 1,
    flex: 1,
    display: "flex",
    flexGrow: 1,
    width: 600,
    borderBottomWidth: 1,
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
    opacity: 0.5,
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
  },
  loaderText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FetchDataComponent;
