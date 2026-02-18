import { useCallback, useRef } from 'react'
import { Col, Row } from 'antd'

import styles from './Homepage.module.scss'
import { PostCard } from '@/layout/homepage/postCard/PostCard'
import { NewPostButtonWithModal } from '@/layout/homepage/newPostButtonWithModal/NewPostButtonWithModal'
import { usePostsInfinite } from '@/hooks/posts/usePostsInfinite'
import { PostCardSkeleton } from '@/components/PostCardSkeleton'

export const Homepage = () => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePostsInfinite()

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

  return (
    <Row className={styles.homepageContainer} gutter={20}>
      <Col span={16}>
        <NewPostButtonWithModal />

        <Row className={styles.postsContainer} justify="center">
          {!posts ? (
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
          )}
        </Row>
      </Col>

      <Col span={8}>Right side container</Col>
    </Row>
  )
}
