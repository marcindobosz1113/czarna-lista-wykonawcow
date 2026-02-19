import { Button, Col, Row, Space } from 'antd'
import styles from './Filters.module.scss'
import { POST_CATEGORIES } from '@/layout/homepage/types'
import { categoriesLabels } from '@/layout/homepage/constants'
import { useSearch } from '@/store/search'

const dotStyles = {
  [POST_CATEGORIES.INTERIOR_FINISHING]: {
    backgroundColor: '#563de1',
  },
  [POST_CATEGORIES.INSTALLATIONS]: {
    backgroundColor: '#3de153',
  },
  [POST_CATEGORIES.STRUCTURES]: {
    backgroundColor: '#949e39',
  },
  [POST_CATEGORIES.FACADES]: {
    backgroundColor: '#0cadc2',
  },
  [POST_CATEGORIES.ROOFS]: {
    backgroundColor: '#a05601',
  },
  [POST_CATEGORIES.OTHER]: {
    backgroundColor: '#525252',
  },
}

export const Filter = () => {
  const { category: currentCategory, setCategory } = useSearch()

  const handleClick = (category: POST_CATEGORIES) => {
    if (category === currentCategory) {
      setCategory(undefined)
      return
    }

    setCategory(category)
  }

  const isCategoryActive = (category: POST_CATEGORIES) =>
    currentCategory === category

  return (
    <Row className={styles.filtersContainer}>
      <Space orientation="vertical">
        <Col span={24}>
          <span className={styles.title}>Kategorie zgłoszeń</span>
        </Col>

        {Object.values(POST_CATEGORIES).map((category) => (
          <Row align="middle">
            <Button
              className={`${styles.category} ${isCategoryActive(category) ? styles.active : ''}`}
              onClick={() => handleClick(category)}
            >
              <div className={styles.dot} style={dotStyles[category]} />
              {categoriesLabels[category]}
            </Button>
          </Row>
        ))}
      </Space>
    </Row>
  )
}
