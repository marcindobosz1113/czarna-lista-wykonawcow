import { useState } from 'react'
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Rate,
  Row,
  Select,
  Space,
  type UploadFile,
} from 'antd'

import styles from './newPostForm.module.scss'
import { useCreatePost } from '@/hooks/posts/useCreatePost'
import { ImagesUploader } from '@/components/ImagesUploader'
import FormItem from 'antd/es/form/FormItem'
import { usePostsInfinite } from '@/hooks/posts/usePostsInfinite'
import { POST_TYPES, SORT_TYPES } from '@/layout/homepage/types'
import { usePostsSort } from '@/store/postsSort'
import { useSearch } from '@/store/search'

type FieldType = {
  postType: string
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
  const [postType, setPostType] = useState('')
  const { setSort } = usePostsSort()
  const { setSearch } = useSearch()

  const [form] = Form.useForm()
  const cretePost = useCreatePost()
  const { refetch: refetchPosts } = usePostsInfinite(SORT_TYPES.NEWEST, '')

  const isQuestionTypePost = postType === POST_TYPES.QUESTION

  const onSubmit = () => {
    cretePost.mutate(
      {
        postType: form.getFieldValue('postType'),
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
          setSort(SORT_TYPES.NEWEST)
          setSearch('')
          setIsModalOpen(false)
          form.resetFields()
          setImages([])
          setRate(1)
          message.success('Post został dodany!')
        },
      }
    )
  }

  return (
    <Form form={form} name="newPost" layout="vertical" onFinish={onSubmit}>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item<FieldType>
            label="Typ zgłoszenia"
            name="postType"
            rules={[{ required: true, message: 'Wybierz typ zgłozenia' }]}
          >
            <Select
              onChange={setPostType}
              allowClear
              options={[
                { value: POST_TYPES.REPORT, label: 'Zgłoś wykonawcę' },
                { value: POST_TYPES.APPROVAL, label: 'Pochwal wykonawcę' },
                { value: POST_TYPES.QUESTION, label: 'Zadaj pytanie' },
              ]}
              placeholder="Wybierz typ zgłoszenia"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<FieldType>
            label="Tytuł"
            name="title"
            rules={[
              { required: true, message: 'Podaj tytuł' },
              { min: 6, message: 'Napisz dłuższy tytuł, min. 6 znaków' },
            ]}
          >
            <Input placeholder="Wpisz tytuł" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<FieldType>
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
        label="Szczegóły"
        name="text"
        rules={[
          { required: true, message: 'Napisz coś...' },
          { min: 10, message: 'Napisz dłuższą wiadomość, min. 10 znaków' },
        ]}
      >
        <Input.TextArea rows={6} placeholder="Napisz coś..." />
      </Form.Item>

      {!isQuestionTypePost && (
        <FormItem<FieldType>>
          <Space>
            <span>Ocena wykonawcy:</span>
            <Rate
              size="small"
              onChange={setRate}
              defaultValue={1}
              value={rate}
            />
          </Space>
        </FormItem>
      )}

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
