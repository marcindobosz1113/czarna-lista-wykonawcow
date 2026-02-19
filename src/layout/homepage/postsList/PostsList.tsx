import { useCallback, useRef } from 'react'
import { Col } from 'antd'
import { PostCardSkeleton } from '@/components/PostCardSkeleton'

import { PostCard } from '@/layout/homepage/postCard/PostCard'
import { usePostsInfinite } from '@/hooks/posts/usePostsInfinite'
import { usePostsSort } from '@/store/postsSort'
import { useSearch } from '@/store/search'
import { useDebounce } from '@/hooks/utils/useDebounce'

export const PostsList = () => {
  const { sort } = usePostsSort()
  const { search, category, postType } = useSearch()

  const debounceSearch = useDebounce(search)

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = usePostsInfinite(sort, debounceSearch, category, postType)

  const observer = useRef<IntersectionObserver | null>(null)

  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) {
        return
      }

      if (observer.current) {
        observer.current.disconnect()
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      })

      if (node) observer.current.observe(node)
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  )

  return !posts || isLoading ? (
    <Col>
      <PostCardSkeleton />
      <PostCardSkeleton />
    </Col>
  ) : (
    <>
      {posts?.pages?.map((page, pageIndex) =>
        page.map((post, postIndex) => {
          const isLast =
            pageIndex === posts.pages.length - 1 &&
            postIndex === page.length - 1

          if (isLast) {
            return (
              <div ref={lastPostRef} key={post._id}>
                <PostCard post={post} />
              </div>
            )
          }

          return <PostCard key={post._id} post={post} />
        })
      )}

      {isFetchingNextPage && (
        <>
          <PostCardSkeleton />
          <PostCardSkeleton />
        </>
      )}
    </>
  )
}
