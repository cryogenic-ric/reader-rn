import {
  PostAccess,
  CountryCurrency,
  PostVisibility,
  PostSubtypes,
  PostTypes,
} from "@/utils/enums";

interface PostAuthor {
  id: number;
  name: string;
  about: string;
  avatar: Logo;
  bio: string;
  country: string;
  currency: CountryCurrency;
}

export interface Logo {
  image?: string;
  fallback?: string;
  meta?: any;
}

interface PostMeta {
  cover?: {
    caption?: string;
    src?: Logo;
  };
  content?: {
    audio?: {
      count: number;
      duration: number;
    };
    text?: {
      wc?: number;
      duration?: number;
    };
    duration?: number;
  };
  children?: Array<Partial<Post>>;
  dg_count?: number;
  dg_size?: number;
}

interface PostPricing {
  EUR?: number;
  INR?: number;
  USD?: number;
}

export interface Post {
  id: number;
  index: number;
  created: Date | string | null;
  title: string;
  access: PostAccess;
  author: PostAuthor;
  author_id: number;
  language: string;
  meta: PostMeta;
  pricing: PostPricing;
  ptype: PostTypes;
  site_id: number;
  subtype: PostSubtypes;
  visibility: PostVisibility;
  permalink: string;
  likes: number;
  tags?: any;
  summary?: string;
  content?: string;
  status: number;
  published: Date | string | null;
  updated: Date | string | null;
  paid: boolean;
  comments_count: number;
  parent: Post | null | number;
  parent_id?: number;
  sales_grade: string;
}

export interface ActivePost extends Post {
  goodies?: any;
  content?: string;
}

export interface ExtendedPost extends Post {
  type: string;
  parent: ExtendedPost | null | number;
  extended: true;
  isChapter?: boolean;
  isEpisode?: boolean;
  isDigitalGoods?: boolean;
  isFollowRequired?: boolean;
  isPaymentRequired?: boolean;
  isPostPurchased?: boolean;
  isPostLocked?: boolean;
  isChild: boolean;
  isStory: boolean;
  isComic: boolean;
  isSerial?: boolean;
  childtype?: string | null;
  mixedChildren?: Post[];
}
