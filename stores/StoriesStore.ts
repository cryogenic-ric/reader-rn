import { types, flow, Instance } from "mobx-state-tree";

export const Post = types.model({
  id: types.identifierNumber,
  title: types.string,
  site_id: types.number,
  author_id: types.number,
  author: types.frozen(),
  goodies: types.array(types.string),
  parent_id: types.maybeNull(types.number),
  content: types.maybeNull(types.string),
  parent: types.frozen(),
  permalink: types.string,
  published: types.string,
  updated: types.string,
  index: types.number,
  summary: types.string,
  language: types.string,
  tags: types.array(types.string),
  meta: types.frozen(),
  visibility: types.number,
  pricing: types.frozen(),
  ptype: types.string,
  subtype: types.string,
  nft: types.boolean,
  access: types.number,
  likes: types.number,
  comments_count: types.number,
});

export interface IPost extends Instance<typeof Post> {}

const StoriesStore = types
  .model("StoriesStore", {
    posts: types.array(Post),
    loading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
  })
  .actions((self) => ({
    fetchPosts: flow(function* () {
      self.loading = true;
      self.error = null;
      try {
        const response: Response = yield fetch(
          "https://cheryl97.stck.me/api/r/101020/posts?ptype=parent&sub_type=story"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: IPost[] = yield response.json();
        self.posts.replace(data);
      } catch (err) {
        self.error = err instanceof Error ? err.message : String(err);
      } finally {
        self.loading = false;
      }
    }),
  }));

export interface IStoriesStore extends Instance<typeof StoriesStore> {}

export const createStoriesStore = () =>
  StoriesStore.create({
    posts: [],
    loading: false,
    error: null,
  });

export default StoriesStore;
