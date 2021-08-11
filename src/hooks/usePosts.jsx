import {useMemo} from 'react';

// кастомные хуки - те, которые используют в себе стандартные хуки, как, например, этот

export const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts].sort((a,b) => a[sort].localeCompare(b[sort]))
    }
    return posts
  }, [sort, posts])

  return sortedPosts;
}

export const usePost = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);

  const sortedAndSearchedPost = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
  }, [query, sortedPosts])

  return sortedAndSearchedPost;
}
