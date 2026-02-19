import { useState } from 'react'
import { Button, Col, Divider, Image, Rate, Row, Space } from 'antd'
import dayjs from 'dayjs'

import { type Post } from '@/hooks/posts/useGetPosts.ts'
import styles from './postCard.module.scss'
import { CommentOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { PostTypeBadge } from '@/components/PostTypeBadge'
import { POST_TYPES } from '@/layout/homepage/types'
import { PostCategoryBadge } from '@/components/PostCategoryBadge'
import { useBreakpoint } from '@/hooks/breakpoints/useBreakpoints'

const TEXT_MAX_LENGTH = 200

interface PostCardProps {
  post: Post
}

export const PostCard = ({ post }: PostCardProps) => {
  const {
    _id,
    postType,
    text,
    title,
    username,
    createdAt,
    rate,
    images,
    location,
    category,
  } = post

  const [expanded, setExpanded] = useState(false)

  const { isMobile } = useBreakpoint()

  const isLong = text.length > TEXT_MAX_LENGTH
  const displayText = expanded ? text : text.slice(0, TEXT_MAX_LENGTH)

  const isQuestionTypePost = postType === POST_TYPES.QUESTION

  return (
    <Row key={_id} justify="start" className={styles.postContainer}>
      <Row justify="space-between">
        <Col>
          <Space orientation="vertical">
            <span className={styles.username}>
              {username || 'Anonimowy użytkownik'}
            </span>

            <Space orientation="vertical">
              <span>
                <EnvironmentOutlined className={styles.location} /> {location}
              </span>
              <span className={styles.greyText}>
                {dayjs(createdAt).format('DD-MM-YYYY')}
              </span>
            </Space>
          </Space>
        </Col>

        <Col>
          <Space orientation={isMobile ? 'vertical' : 'horizontal'}>
            <PostCategoryBadge category={category} />

            <PostTypeBadge type={postType} />
          </Space>
        </Col>
      </Row>

      {!isQuestionTypePost && (
        <Row>
          <Space>
            <Rate value={rate} disabled size="small" />
            <span className={styles.greyText}>Ocena {rate || 1}/5</span>
          </Space>
        </Row>
      )}

      <Row>
        <span className={styles.postTitle}>{title}</span>
      </Row>

      <Row className={styles.postText}>
        <span>
          {displayText}
          {!expanded && isLong && '...'}
        </span>
      </Row>

      {isLong && (
        <Row>
          <Button
            onClick={() => setExpanded((prev) => !prev)}
            type="primary"
            size="small"
          >
            {expanded ? 'Zwiń ↑' : 'Czytaj więcej ↓'}
          </Button>
        </Row>
      )}

      {!!images.length && (
        <Row>
          <Space>
            {images.map((imageUrl) => (
              <Image width={100} alt="basic" src={imageUrl} />
            ))}
          </Space>
        </Row>
      )}

      <Divider size="small" />

      <Row>
        <Button>
          <CommentOutlined className={styles.commentIcon} /> Komentarze
        </Button>
      </Row>
    </Row>
  )
}
