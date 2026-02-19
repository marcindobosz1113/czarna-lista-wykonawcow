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
import {
  POST_CATEGORIES,
  POST_TYPES,
  SORT_TYPES,
} from '@/layout/homepage/types'
import { usePostsSort } from '@/store/postsSort'
import { useSearch } from '@/store/search'

type FieldType = {
  postType: string
  contractorName: string
  text: string
  location: string
  rate: number
  category: string
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
        contractorName: form.getFieldValue('contractorName'),
        text: form.getFieldValue('text'),
        location: form.getFieldValue('location'),
        category: form.getFieldValue('category'),
        rate: rate,
        images: images
          .map((file) => file.originFileObj as File | undefined)
          .filter((file): file is File => !!file),
      },
      {
        onSuccess: () => {
          setIsModalOpen(false)
          refetchPosts()
          setSort(SORT_TYPES.NEWEST)
          setSearch('')
          setPostType('')
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
        <Col span={12}>
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
            label="Kategoria"
            name="category"
            rules={[{ required: true, message: 'Wybierz kategorię' }]}
          >
            <Select
              allowClear
              options={[
                {
                  value: POST_CATEGORIES.INTERIOR_FINISHING,
                  label: 'Wykończenia',
                },
                {
                  value: POST_CATEGORIES.INSTALLATIONS,
                  label: 'Instalacje',
                },
                { value: POST_CATEGORIES.STRUCTURES, label: 'Konstrukcje' },
                { value: POST_CATEGORIES.FACADES, label: 'Elewacje' },
                { value: POST_CATEGORIES.ROOFS, label: 'Dachy' },
                { value: POST_CATEGORIES.OTHER, label: 'Inne' },
              ]}
              placeholder="Wybierz kategorię"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<FieldType>
            label="Wykonawca"
            name="contractorName"
            rules={[
              { required: true, message: 'Podaj nazwę wykonawcy' },
              { min: 6, message: 'Napisz dłuższą nazwę, min. 6 znaków' },
            ]}
          >
            <Input placeholder="Imię i nazwisko / Firma" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<FieldType>
            label="Lokalizacja"
            name="location"
            rules={[
              { required: true, message: 'Podaj lokalizacje' },
              { min: 3, message: 'Napisz dłuższą lokalizację, min. 3 znaki' },
              {
                max: 25,
                message: 'Napisz krótszą lokalizację, max. 25 znaków',
              },
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
        <FormItem<FieldType>
          name="rate"
          layout="horizontal"
          label="Ocena wykonawcy:"
        >
          <Rate size="small" onChange={setRate} defaultValue={1} value={rate} />
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
