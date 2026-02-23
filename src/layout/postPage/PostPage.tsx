import { Route } from '@/routes/posts/$postId'

import styles from './PostPage.module.scss'
import { PostCard } from '@/layout/homepage/postCard/PostCard'
import { Button, Col, Row } from 'antd'
import { useBreakpoint } from '@/hooks/breakpoints/useBreakpoints'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { router } from '@/app/router'
import { useGetComments } from '@/hooks/comments/useGetComments'

export const PostPage = () => {
  const { isDesktop } = useBreakpoint()
  const post = Route.useLoaderData()
  const { data: comments, refetch: refetchComments } = useGetComments(post._id)

  return (
    <Row>
      <Col span={24}>
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.navigate({ to: '/' })}
          className={styles.backButton}
          size="large"
        >
          Wróć
        </Button>

        <Row className={styles.container}>
          <Col span={isDesktop ? 16 : 24}>
            <Row>
              <PostCard
                refetchComments={refetchComments}
                comments={comments}
                post={post}
                hideCommentButton
                showComments
                badgeReadOnly
              />
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
