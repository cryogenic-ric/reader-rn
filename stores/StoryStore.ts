import { types, flow, Instance, SnapshotIn } from "mobx-state-tree";
import { Post } from "@/stores/StoriesStore"; // Import from Post

const StoryStore = types
  .model("StoryStore", {
    story: types.maybeNull(Post),
    loading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
  })
  .views((self) => ({
    get hasStory() {
      return self.story !== null;
    },
    get chapters() {
      return self.story?.meta.children || [];
    },
  }))
  .actions((self) => {
    const setLoading = (value: boolean) => {
      self.loading = value;
    };

    const setError = (error: string | null) => {
      self.error = error;
    };

    const setStory = (storyData: SnapshotIn<typeof Post>) => {
      self.story = Post.create(storyData);
    };

    const fetchStory = flow(function* (id: string, siteId: string) {
      setLoading(true);
      setError(null);
      try {
        const response: Response = yield fetch(
          `https://stck.me/api/r/${siteId}/posts/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: SnapshotIn<typeof Post> = yield response.json();
        setStory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    });

    return { setLoading, setError, setStory, fetchStory };
  });

export interface IStoryStore extends Instance<typeof StoryStore> {}

export const createStoryStore = () =>
  StoryStore.create({
    story: null,
    loading: false,
    error: null,
  });

export default StoryStore;
