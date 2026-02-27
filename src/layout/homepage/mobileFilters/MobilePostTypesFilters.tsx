import { Button, Row, Space } from 'antd'
import { POST_TYPES } from '@/layout/homepage/types'
import { useSearch } from '@/store/search'

import styles from './MobileFilters.module.scss'
import { typesLabels } from '@/layout/homepage/constants'

export const MobilePostTypesFilters = () => {
  const { postType: currentPostType, setPostType } = useSearch()

  const handleClick = (postType: POST_TYPES) => {
    if (postType === currentPostType) {
      setPostType(undefined)
      return
    }

    setPostType(postType)
  }

  const isCategoryActive = (postType: POST_TYPES) =>
    currentPostType === postType

  return (
    <Row className={styles.categories}>
      <Space orientation="vertical" size="small">
        <span className={styles.title}>Typy zgłoszeń:</span>

        <Space>
          {Object.values(POST_TYPES).map((postType) => (
            <Button
              size="large"
              key={postType}
              className={isCategoryActive(postType) ? styles.active : ''}
              onClick={() => handleClick(postType)}
            >
              {typesLabels[postType]}
            </Button>
          ))}
        </Space>
      </Space>
    </Row>
  )
}
