import { Button, Col, Row, Select, Space } from 'antd'

import styles from './Homepage.module.scss'
import { NewPostButtonWithModal } from '@/layout/homepage/newPostButtonWithModal/NewPostButtonWithModal'
import { PostsList } from '@/layout/homepage/postsList/PostsList'
import { SORT_TYPES } from '@/layout/homepage/types'
import { usePostsSort } from '@/store/postsSort'
import { useBreakpoint } from '@/hooks/breakpoints/useBreakpoints'
import { useSearch } from '@/store/search'
import { PostCategoryBadge } from '@/components/PostCategoryBadge'
import { PostTypeBadge } from '@/components/PostTypeBadge'
import { Filter } from '@/layout/homepage/filters/Filters'
import { MostReported } from '@/layout/homepage/mostReported/MostReported'
import { ContractorNameBadge } from '@/components/ContractorNameBadge'

export const Homepage = () => {
  const { sort, setSort } = usePostsSort()
  const { postType, category, contractorName, clearSearch } = useSearch()

  const { isDesktop } = useBreakpoint()

  const showFilters = contractorName || category || postType

  return (
    <Row className={styles.homepageContainer} gutter={20}>
      <Col span={isDesktop ? 16 : 24} className={styles.postUtilsContainer}>
        <Row justify="space-between" align="middle">
          <NewPostButtonWithModal />

          <Select
            size="large"
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

        {showFilters && (
          <Row justify="end">
            <Button type="primary" onClick={clearSearch} size="large">
              Wyczyść filtry
            </Button>
          </Row>
        )}
        {showFilters && (
          <Row justify="end">
            <Space>
              {contractorName && (
                <ContractorNameBadge contractorName={contractorName} />
              )}

              {category && <PostCategoryBadge category={category} />}

              {postType && <PostTypeBadge postType={postType} />}
            </Space>
          </Row>
        )}

        <Row className={styles.postsContainer} justify="center">
          <PostsList />
        </Row>
      </Col>

      {isDesktop && (
        <Col span={8}>
          <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
            <Filter />
            <MostReported />
          </Space>
        </Col>
      )}
    </Row>
  )
}
