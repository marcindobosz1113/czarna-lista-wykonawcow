import { Button, Col, Row, Select, Space } from 'antd'

import styles from './Homepage.module.scss'
import { NewPostButtonWithModal } from '@/layout/homepage/newPostButtonWithModal/NewPostButtonWithModal'
import { PostsList } from '@/layout/homepage/postsList/PostsList'
import { SORT_TYPES } from '@/layout/homepage/types'
import { usePostsSort } from '@/store/postsSort'
import { useBreakpoint } from '@/hooks/breakpoints/useBreakpoints'
import { useSearch } from '@/store/search'

export const Homepage = () => {
  const { sort, setSort } = usePostsSort()
  const { clear: clearSearch } = useSearch()

  const { isDesktop } = useBreakpoint()

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

        <Row justify="end">
          <Button type="primary" onClick={clearSearch}>
            Wyczyść filtry
          </Button>
        </Row>

        <Row className={styles.postsContainer} justify="center">
          <PostsList />
        </Row>
      </Col>

      {isDesktop && <Col span={8}>Right side container</Col>}
    </Row>
  )
}
