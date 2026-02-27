import { Button, Col, Row, Space } from 'antd'
import { POST_TYPES } from '@/layout/homepage/types'
import { useSearch } from '@/store/search'
import { typesLabels, postTypesDotStyles } from '@/layout/homepage/constants'
import styles from './Filters.module.scss'

export const PostTypesFilters = () => {
  const { postType: currentPostType, setPostType } = useSearch()

  const handleClick = (postType: POST_TYPES) => {
    if (postType === currentPostType) {
      setPostType(undefined)
      return
    }

    setPostType(postType)
  }

  const isPostTypeActive = (postType: POST_TYPES) =>
    currentPostType === postType

  return (
    <Row className={styles.filtersContainer}>
      <Space orientation="vertical">
        <Col span={24}>
          <span className={styles.title}>Typy zgłoszeń</span>
        </Col>

        {Object.values(POST_TYPES).map((postType) => (
          <Button
            key={postType}
            className={`${styles.category} ${isPostTypeActive(postType) ? styles.active : ''}`}
            onClick={() => handleClick(postType)}
          >
            <div className={styles.dot} style={postTypesDotStyles[postType]} />
            {typesLabels[postType]}
          </Button>
        ))}
      </Space>
    </Row>
  )
}
