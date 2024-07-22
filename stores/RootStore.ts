import { types, Instance } from "mobx-state-tree";
import StoriesStore from "./StoriesStore";
import StoryStore from "./StoryStore";
import ChapterStore from "./ChapterStore";
import SearchStore from "./SearchStore";

const RootStore = types.model("RootStore", {
  storiesStore: types.optional(StoriesStore, {}),
  storyStore: types.optional(StoryStore, {}),
  chapterStore: types.optional(ChapterStore, {}),
  searchStore: types.optional(SearchStore, {}),
  // Add other stores here in the future, e.g.:
  // userStore: types.optional(UserStore, {}),
  // settingsStore: types.optional(SettingsStore, {}),
});

export interface IRootStore extends Instance<typeof RootStore> {}

export const createRootStore = () =>
  RootStore.create({
    storiesStore: {},
    storyStore: {},
    chapterStore: {},
    searchStore: {},
    // Initialize other stores here when you add them
  });

export default RootStore;
