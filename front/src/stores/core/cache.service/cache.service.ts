import type { Mutation, Query } from "@astral/mobx-query";
import { MobxQuery } from "@astral/mobx-query";

export const createCacheService = () =>
  new MobxQuery({
    enabledAutoFetch: true,
  });

export const cacheService = createCacheService();

export { MobxQuery as CacheService };

export type { Mutation as CacheMutation, Query as CacheQuery };
