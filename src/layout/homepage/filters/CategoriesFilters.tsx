import { Button, Col, Row, Space } from 'antd'
import styles from './Filters.module.scss'
import { POST_CATEGORIES } from '@/layout/homepage/types'
import {
  categoriesDotStyles,
  categoriesLabels,
} from '@/layout/homepage/constants'
import { useSearch } from '@/store/search'

export const CategoriesFilter = () => {
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
          <Button
            key={category}
            className={`${styles.category} ${isCategoryActive(category) ? styles.active : ''}`}
            onClick={() => handleClick(category)}
          >
            <div className={styles.dot} style={categoriesDotStyles[category]} />
            {categoriesLabels[category]}
          </Button>
        ))}
      </Space>
    </Row>
  )
}
