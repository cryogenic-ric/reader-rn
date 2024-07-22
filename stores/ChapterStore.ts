import { types, flow, Instance, SnapshotIn } from "mobx-state-tree";
import { Post } from "@/stores/StoriesStore"; // Import from Post

const ChapterStore = types
  .model("ChapterStore", {
    chapter: types.maybeNull(Post),
    loading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
  })
  .views((self) => ({
    get hasChapter() {
      return self.chapter !== null;
    },
    get chapters() {
      return self.chapter?.meta.children || [];
    },
  }))
  .actions((self) => {
    const setLoading = (value: boolean) => {
      self.loading = value;
    };

    const setError = (error: string | null) => {
      self.error = error;
    };

    const setChapter = (ChapterData: SnapshotIn<typeof Post>) => {
      self.chapter = Post.create(ChapterData);
    };

    const fetchChapter = flow(function* (id: string, siteId: string) {
      setLoading(true);
      setError(null);
      try {
        const response: Response = yield fetch(
          `https://cheryl97.stck.me/api/r/${siteId}/posts/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: SnapshotIn<typeof Post> = yield response.json();
        setChapter(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    });

    return { setLoading, setError, setChapter, fetchChapter };
  });

export interface IChapterStore extends Instance<typeof ChapterStore> {}

export const createChapterStore = () =>
  ChapterStore.create({
    chapter: null,
    loading: false,
    error: null,
  });

export default ChapterStore;
