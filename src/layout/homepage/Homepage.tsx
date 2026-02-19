import { Col, Row, Select } from 'antd'

import styles from './Homepage.module.scss'
import { NewPostButtonWithModal } from '@/layout/homepage/newPostButtonWithModal/NewPostButtonWithModal'
import { PostsList } from '@/layout/homepage/postsList/PostsList'
import { usePostsInfinite } from '@/hooks/posts/usePostsInfinite'
import { SORT_TYPES } from '@/layout/homepage/types'
import { usePostsSort } from '@/store/postsSort'
import { useBreakpoint } from '@/hooks/breakpoints/useBreakpoints'

export const Homepage = () => {
  const { sort, setSort } = usePostsSort()

  const { isDesktop } = useBreakpoint()

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePostsInfinite(sort)

  return (
    <Row className={styles.homepageContainer} gutter={20}>
      <Col span={isDesktop ? 16 : 24} className={styles.postUtilsContainer}>
        <Row justify="space-between" align="middle">
          <NewPostButtonWithModal />

          <Select
            className={styles.sortSelect}
            onChange={setSort}
            options={[
              { value: SORT_TYPES.NEWEST, label: 'Najnowsze' },
              { value: SORT_TYPES.OLDEST, label: 'Najstarsze' },
              // {
              //   value: SORT_TYPES.MOST_COMENTED,
              //   label: 'Najwięcej komentarzy',
              // },
              { value: SORT_TYPES.MOST_RATED, label: 'Najlepiej oceniane' },
              { value: SORT_TYPES.LESS_RATED, label: 'Najgorzej oceniane' },
            ]}
            placeholder="Sor"
            value={sort}
          />
        </Row>

        <Row className={styles.postsContainer} justify="center">
          <PostsList
            posts={posts}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </Row>
      </Col>

      {isDesktop && <Col span={8}>Right side container</Col>}
    </Row>
  )
}
