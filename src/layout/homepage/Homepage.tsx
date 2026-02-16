import { useState } from 'react'
import { Col, Modal, Row } from 'antd'

import styles from './homepage.module.scss'
import { NewPostForm } from './NewPostForm'

const posts_mock = [
  {
    label: 'jakiś post',
  },
  {
    label: 'jakiś post',
  },
  {
    label: 'jakiś post',
  },
  {
    label: 'jakiś post',
  },
  {
    label: 'jakiś post',
  },
]

export const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const addNewPost = () => {}

  return (
    <Row className={styles.homepageContainer}>
      <Col span={24}>
        <Row justify="center">
          <div
            role="button"
            onClick={() => setIsModalOpen(true)}
            className={styles.addNewPostButton}
          >
            Dodaj nowy post...
          </div>

          <Modal
            title="Dodaj nowy post"
            centered
            open={isModalOpen}
            confirmLoading={false}
            onOk={addNewPost}
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
          {posts_mock.map((item) => (
            <Row justify="center">{item.label}</Row>
          ))}
        </Row>
      </Col>
    </Row>
  )
}
