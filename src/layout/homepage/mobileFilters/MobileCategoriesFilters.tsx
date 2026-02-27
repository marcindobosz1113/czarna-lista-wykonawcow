import { Button, Row, Space } from 'antd'
import { POST_CATEGORIES } from '@/layout/homepage/types'
import { useSearch } from '@/store/search'

import styles from './MobileFilters.module.scss'
import { categoriesLabels } from '@/layout/homepage/constants'

export const MobileCategoriesFilters = () => {
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
    <Row className={styles.categories}>
      <Space orientation="vertical" size="small">
        <span className={styles.title}>Kategorie zgłoszeń:</span>
        <Space>
          {Object.values(POST_CATEGORIES).map((category) => (
            <Button
              size="large"
              key={category}
              className={isCategoryActive(category) ? styles.active : ''}
              onClick={() => handleClick(category)}
            >
              {categoriesLabels[category]}
            </Button>
          ))}
        </Space>
      </Space>
    </Row>
  )
}
