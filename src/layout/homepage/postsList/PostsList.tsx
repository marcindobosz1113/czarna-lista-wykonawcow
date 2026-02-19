import { useCallback, useRef } from 'react'
import { Col } from 'antd'
import { PostCardSkeleton } from '@/components/PostCardSkeleton'

import { PostCard } from '@/layout/homepage/postCard/PostCard'
import type { InfiniteData } from '@tanstack/react-query'
import type { Post } from '@/hooks/posts/useGetPosts'

interface PostsListProps {
  posts: InfiniteData<Post[], unknown> | undefined
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

export const PostsList = ({
  posts,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: PostsListProps) => {
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

  return !posts ? (
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
