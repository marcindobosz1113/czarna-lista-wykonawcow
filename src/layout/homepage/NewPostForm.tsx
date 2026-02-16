import { useState } from 'react'
import { Button, Form, Input, message, Space, type UploadFile } from 'antd'

import styles from './newPostForm.module.scss'
import { ImagesUploader } from '../../components/ImagesUploader'
import { useCreatePost } from '../../hooks/posts/useCreatePost'

type FieldType = {
  title: string
  text: string
  remember?: boolean
}

interface NewPostFormProps {
  setIsModalOpen: (isOpen: boolean) => void
}

export const NewPostForm = ({ setIsModalOpen }: NewPostFormProps) => {
  const [images, setImages] = useState<UploadFile[]>([])

  const [form] = Form.useForm()
  const cretePost = useCreatePost()

  const onSubmit = () => {
    cretePost.mutate(
      {
        title: form.getFieldValue('title'),
        text: form.getFieldValue('text'),
        images: images
          .map((file) => file.originFileObj as File | undefined)
          .filter((file): file is File => !!file),
      },
      {
        onSuccess: () => {
          setIsModalOpen(false)
          message.success('Post został dodany!')
          form.resetFields()
          setImages([])
        },
      }
    )
  }

  const onCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
    setImages([])
  }

  return (
    <Form form={form}>
      <Form.Item<FieldType>
        layout="vertical"
        label="Tytuł"
        name="title"
        rules={[
          { required: true, message: 'Podaj tytuł' },
          { min: 6, message: 'Napisz dłuższy tytuł, min. 6 znaków' },
        ]}
      >
        <Input placeholder="Wpisz tytuł" />
      </Form.Item>

      <Form.Item<FieldType>
        name="text"
        rules={[
          { required: true, message: 'Napisz coś...' },
          { min: 10, message: 'Napisz dłuższą wiadomość, min. 10 znaków' },
        ]}
      >
        <Input.TextArea rows={6} placeholder="Napisz coś..." />
      </Form.Item>

      <Form.Item>
        <ImagesUploader fileList={images} setFileList={setImages} />
      </Form.Item>

      <Form.Item label={null} className={styles.buttonsWrapper}>
        <Space>
          <Button type="primary" htmlType="button" onClick={onCancel}>
            Anuluj
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            onClick={onSubmit}
            loading={cretePost.isPending}
          >
            Dodaj post
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
