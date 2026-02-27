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
import {
  CommentOutlined,
  LikeFilled,
  EnvironmentOutlined,
} from '@ant-design/icons'
import { PostTypeBadge } from '@/components/PostTypeBadge'
import { POST_TYPES } from '@/layout/homepage/types'
import { PostCategoryBadge } from '@/components/PostCategoryBadge'
import { useBreakpoint } from '@/hooks/breakpoints/useBreakpoints'
import { Link } from '@tanstack/react-router'
import type { Comment } from '@/hooks/comments/useGetComments'
import { useCreateComment } from '@/hooks/comments/useCreateComment'
import { useAuth } from '@/store/auth'
import { useLikePost } from '@/hooks/posts/useLikePost'
import { RemovePostWithModal } from '@/layout/postPage/removePostWithModal/RemovePostWithModal'
import type { Post } from '@/types/post'

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
  const userId = useAuth((state) => state.user?._id)
  const commentUsername = useAuth((state) => state.user?.username)

  const isPostLiked = post.likedBy?.includes(userId ?? '')

  const [expanded, setExpanded] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [liked, setLiked] = useState(isPostLiked)
  const [likesCount, setLikesCount] = useState(post.likedBy?.length)

  const { isMobile } = useBreakpoint()

  const createComment = useCreateComment()
  const likePost = useLikePost()

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

  const handleLikePost = () => {
    if (!userId) {
      message.error('Zaloguj się aby potwierdzić.')
      return
    }

    likePost.mutate(
      { postId: post._id },
      {
        onSuccess: () => {
          setLiked((prev) => !prev)
          setLikesCount((prev) => prev + (liked ? -1 : 1))
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

              <span className={styles.location}>
                <EnvironmentOutlined className={styles.locationIcon} />{' '}
                {location}
              </span>
              <Link className={styles.createdAt} to={`/posts/${post._id}`}>
                {dayjs(createdAt).format('DD-MM-YYYY')}
              </Link>
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

        {!isQuestionTypePost && (
          <Row>
            <Space>
              <Rate value={rate} disabled size="small" />
              <span className={styles.greyText}>Ocena {rate || 1}/5</span>
            </Space>
          </Row>
        )}

        <Divider size="small" />

        <Row justify="space-between">
          <Col className={styles.leftSideButtons}>
            <Row gutter={10}>
              <Col>
                <Button onClick={handleLikePost} type="primary">
                  <LikeFilled className={liked ? styles.likedPostIcon : ''} />
                  {liked ? 'Polubiono' : 'Polub'} ({likesCount})
                </Button>
              </Col>

              {!hideCommentButton && (
                <Col>
                  <Button type="primary">
                    <Link
                      className={styles.linkToPost}
                      to={`/posts/${post._id}`}
                    >
                      <CommentOutlined className={styles.commentIcon} />{' '}
                      Komentarze ({post.commentsCount})
                    </Link>
                  </Button>
                </Col>
              )}
            </Row>
          </Col>

          {post.userId === userId && (
            <Col>
              <Row gutter={10}>
                <Col>
                  <Button type="primary">Edytuj post</Button>
                </Col>
                <Col>
                  <RemovePostWithModal postId={post._id} />
                </Col>
              </Row>
            </Col>
          )}
        </Row>
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
