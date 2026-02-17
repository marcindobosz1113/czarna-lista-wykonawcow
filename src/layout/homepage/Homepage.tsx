import { useState } from 'react'
import { Button, Col, Modal, Row } from 'antd'

import styles from './homepage.module.scss'
import { NewPostForm } from './newPostForm/NewPostForm'
import { useGetPosts } from '@/hooks/posts/useGetPosts'
import { PostCard } from '@/layout/homepage/postCard/PostCard'

export const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: posts } = useGetPosts()

  return (
    <Row className={styles.homepageContainer}>
      <Col span={24}>
        <Row justify="start">
          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}
            size="large"
          >
            Dodaj post
          </Button>

          <Modal
            title="Zgłoś wykonawcę"
            centered
            open={isModalOpen}
            confirmLoading={false}
            onCancel={() => setIsModalOpen(false)}
            okText="Dodaj"
            cancelText="Anuluj"
            style={{ top: -70 }}
            footer={() => <></>}
            width={{
              xs: '90%',
              sm: '80%',
              md: '70%',
              lg: '60%',
              xl: '50%',
              xxl: '40%',
            }}
          >
            <NewPostForm setIsModalOpen={setIsModalOpen} />
          </Modal>
        </Row>
      </Col>

      <Col span={24}>
        <Row className={styles.postsContainer} justify="center">
          {posts?.map((post) => (
            <PostCard post={post} />
          ))}
        </Row>
      </Col>
    </Row>
  )
}
