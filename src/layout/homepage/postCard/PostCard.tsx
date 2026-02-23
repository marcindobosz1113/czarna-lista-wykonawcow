import { useState } from 'react'
import {
  Button,
  Col,
  Divider,
  Image,
  Input,
  message,
  Rate,
  Row,
  Space,
} from 'antd'
import dayjs from 'dayjs'

import styles from './postCard.module.scss'
import { CommentOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { PostTypeBadge } from '@/components/PostTypeBadge'
import { POST_TYPES } from '@/layout/homepage/types'
import { PostCategoryBadge } from '@/components/PostCategoryBadge'
import { useBreakpoint } from '@/hooks/breakpoints/useBreakpoints'
import type { Post } from '@/hooks/posts/usePostsInfinite'
import { Link } from '@tanstack/react-router'
import type { Comment } from '@/hooks/comments/useGetComments'
import { useCreateComment } from '@/hooks/comments/useCreateComment'
import { useAuth } from '@/store/auth'

const TEXT_MAX_LENGTH = 200

interface PostCardProps {
  post: Post
  comments?: Comment[]
  refetchComments?: () => void
  hideCommentButton?: boolean
  showComments?: boolean
  badgeReadOnly?: boolean
}

const borderTopStyles = {
  [POST_TYPES.REPORT]: '#E13D3D',
  [POST_TYPES.APPROVAL]: '#20df49',
  [POST_TYPES.QUESTION]: '#dfbf31',
}

export const PostCard = ({
  post,
  comments,
  refetchComments,
  hideCommentButton,
  showComments,
  badgeReadOnly,
}: PostCardProps) => {
  const {
    _id,
    postType,
    text,
    contractorName,
    username,
    createdAt,
    rate,
    images,
    location,
    category,
  } = post
  const userId = useAuth((state) => state.user?.id)
  const commentUsername = useAuth((state) => state.user?.username)

  const [expanded, setExpanded] = useState(false)
  const [commentText, setCommentText] = useState('')

  const { isMobile } = useBreakpoint()

  const createComment = useCreateComment()

  const isLong = text.length > TEXT_MAX_LENGTH
  const displayText = expanded ? text : text.slice(0, TEXT_MAX_LENGTH)

  const isQuestionTypePost = postType === POST_TYPES.QUESTION

  const handleAddComment = () => {
    createComment.mutate(
      {
        postId: post._id,
        text: commentText,
        userId,
        username: commentUsername,
      },
      {
        onSuccess: () => {
          refetchComments?.()
          message.success('Komentarz został dodany!')
          setCommentText('')
        },
      }
    )
  }

  return (
    <>
      <Row
        key={_id}
        justify="start"
        style={{ borderTop: `4px solid ${borderTopStyles[postType]}` }}
        className={`${styles.postContainer} ${showComments ? styles.postWithComments : ''}`}
      >
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
              <PostCategoryBadge
                category={category}
                badgeReadOnly={badgeReadOnly}
              />

              <PostTypeBadge
                postType={postType}
                badgeReadOnly={badgeReadOnly}
              />
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
          <span className={styles.postTitle}>{contractorName}</span>
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

        {!hideCommentButton && (
          <>
            <Divider size="small" />

            <Row>
              <Button>
                <CommentOutlined className={styles.commentIcon} />{' '}
                <Link to={`/posts/${post._id}`}>Komentarze</Link>
              </Button>
            </Row>
          </>
        )}
      </Row>

      {showComments && (
        <>
          <div className={styles.commentsContainer}>
            {comments?.map((comment) => (
              <Row className={styles.comment}>
                <Space orientation="vertical">
                  <Row className={styles.commentUsername} align="middle">
                    {comment.username}
                    <span className={styles.commentDate}>
                      {dayjs(comment.createdAt).format('DD-MM-YYYY')}
                    </span>
                  </Row>
                  <Row>{comment.text}</Row>
                </Space>
              </Row>
            ))}

            <Row>
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  placeholder="Napisz komentarz"
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                />
                <Button
                  type="primary"
                  onClick={handleAddComment}
                  disabled={!commentText}
                  loading={createComment.isPending}
                >
                  Wyślij
                </Button>
              </Space.Compact>
            </Row>
          </div>
        </>
      )}
    </>
  )
}
