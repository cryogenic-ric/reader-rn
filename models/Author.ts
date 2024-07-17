import { types } from "mobx-state-tree";

const Avatar = types.model({
  meta: types.model({
    width: types.number,
    height: types.number,
  }),
  image: types.string,
  fallback: types.string,
});

const Author = types.model({
  id: types.identifierNumber,
  bio: types.string,
  name: types.string,
  about: types.string,
  avatar: Avatar,
  country: types.string,
  currency: types.string,
});

export default Author;
