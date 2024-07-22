import { types, flow, Instance } from "mobx-state-tree";

export const Site = types.model("Site", {
  id: types.identifierNumber,
  name: types.string,
  bio: types.optional(types.string, ""),
  about: types.optional(types.string, ""),
  avatar: types.frozen(),
  groups: types.array(types.number),
  country: types.string,
  currency: types.string,
  created: types.string,
  domain: types.string,
  custom_domain: types.maybeNull(types.string),
});

export interface ISite extends Instance<typeof Site> {}

const SearchStore = types
  .model("SearchStore", {
    sites: types.array(Site),
    trendingSites: types.array(Site),
    loading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
  })
  .actions((self) => ({
    fetchTrendingSites: flow(function* () {
      self.loading = true;
      self.error = null;
      try {
        const response: Response = yield fetch(
          "https://stck.me/api/w/trending/accounts?size=50"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ISite[] = yield response.json();
        self.trendingSites.replace(data);
      } catch (err) {
        self.error = err instanceof Error ? err.message : String(err);
      } finally {
        self.loading = false;
      }
    }),
    searchSites: flow(function* (query: String) {
      self.loading = false;
      self.error = null;
      console.log({ query });
      try {
        const response: Response = yield fetch(
          `https://stck.me/api/sr/accounts?query=${query}&offset=0`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        console.log({ data });
        self.sites.replace(data.records);
      } catch (err) {
        self.error = err instanceof Error ? err.message : String(err);
      } finally {
        self.loading = false;
      }
    }),
  }));

export interface ISearchStore extends Instance<typeof SearchStore> {}

export const createSearchStore = () =>
  SearchStore.create({
    sites: [],
    trendingSites: [],
    loading: false,
    error: null,
  });

export default SearchStore;
