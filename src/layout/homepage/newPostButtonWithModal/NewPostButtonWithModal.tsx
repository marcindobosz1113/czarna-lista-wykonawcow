import { useState } from 'react'
import { Button, Modal } from 'antd'
import { NewPostForm } from '@/layout/homepage/newPostForm/NewPostForm'

export const NewPostButtonWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        size="large"
        style={{ marginBottom: 20 }}
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
    </>
  )
}
