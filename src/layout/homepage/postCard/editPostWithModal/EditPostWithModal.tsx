import { useState } from 'react'
import { Button, Modal } from 'antd'
import { EditPostForm } from '@/layout/homepage/postCard/editPostWithModal/editPostForm/EditPostForm'
import type { Post } from '@/types/post'

export const EditPostWithModal = ({ post }: { post: Post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Edytuj post</Button>

      <Modal
        title="Usuwanie posta"
        centered
        open={isModalOpen}
        confirmLoading={false}
        onCancel={() => setIsModalOpen(false)}
        footer={<></>}
        destroyOnHidden
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}
      >
        <EditPostForm setIsModalOpen={setIsModalOpen} post={post} />
      </Modal>
    </>
  )
}
