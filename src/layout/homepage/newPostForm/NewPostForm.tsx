import { useState } from 'react'
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Rate,
  Row,
  Space,
  type UploadFile,
} from 'antd'

import styles from './newPostForm.module.scss'
import { useCreatePost } from '@/hooks/posts/useCreatePost'
import { ImagesUploader } from '@/components/ImagesUploader'
import FormItem from 'antd/es/form/FormItem'
import { usePostsInfinite } from '@/hooks/posts/usePostsInfinite'

type FieldType = {
  title: string
  text: string
  location: string
}

interface NewPostFormProps {
  setIsModalOpen: (isOpen: boolean) => void
}

export const NewPostForm = ({ setIsModalOpen }: NewPostFormProps) => {
  const [images, setImages] = useState<UploadFile[]>([])
  const [rate, setRate] = useState(1)

  const [form] = Form.useForm()
  const cretePost = useCreatePost()
  const { refetch: refetchPosts } = usePostsInfinite()

  const onSubmit = () => {
    cretePost.mutate(
      {
        title: form.getFieldValue('title'),
        text: form.getFieldValue('text'),
        location: form.getFieldValue('location'),
        rate: rate,
        images: images
          .map((file) => file.originFileObj as File | undefined)
          .filter((file): file is File => !!file),
      },
      {
        onSuccess: () => {
          refetchPosts()
          setIsModalOpen(false)
          message.success('Post został dodany!')
          form.resetFields()
          setImages([])
          setRate(1)
        },
      }
    )
  }

  return (
    <Form form={form} name="newPost" onFinish={onSubmit}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item<FieldType>
            layout="vertical"
            label="Imię i nazwisko / Firma"
            name="title"
            rules={[
              { required: true, message: 'Podaj tytuł' },
              { min: 6, message: 'Napisz dłuższy tytuł, min. 6 znaków' },
            ]}
          >
            <Input placeholder="Wpisz imię i nazwisko / firmę" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<FieldType>
            layout="vertical"
            label="Lokalizacja"
            name="location"
            rules={[
              { required: true, message: 'Podaj lokalizacje' },
              { min: 3, message: 'Napisz dłuższą lokalizację, min. 3 znaki' },
            ]}
          >
            <Input placeholder="Np. Warszawa" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item<FieldType>
        layout="vertical"
        label="Szczegóły zdarzenia"
        name="text"
        rules={[
          { required: true, message: 'Napisz coś...' },
          { min: 10, message: 'Napisz dłuższą wiadomość, min. 10 znaków' },
        ]}
      >
        <Input.TextArea rows={6} placeholder="Napisz coś..." />
      </Form.Item>

      <FormItem<FieldType>>
        <Space>
          <span>Ocena wykonawcy:</span>
          <Rate size="small" onChange={setRate} defaultValue={1} value={rate} />
        </Space>
      </FormItem>

      <Form.Item>
        <ImagesUploader fileList={images} setFileList={setImages} />
      </Form.Item>

      <Form.Item label={null} className={styles.buttonsWrapper}>
        <Space>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => setIsModalOpen(false)}
          >
            Anuluj
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            loading={cretePost.isPending}
          >
            Dodaj post
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
