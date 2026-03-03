import { useState } from 'react'
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  notification,
  Rate,
  Row,
  Select,
  Space,
  type UploadFile,
} from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { ImagesUploader, MAX_FILES } from '@/components/ImagesUploader'
import { POST_CATEGORIES, POST_TYPES } from '@/layout/homepage/types'

import styles from './EditPostForm.module.scss'
import type { Post } from '@/types/post'
import { useUpdatePost } from '@/hooks/posts/useUpdatePost'
import { usePostsInfinite } from '@/hooks/posts/usePostsInfinite'
import { useSearch } from '@/store/search'
import { usePostsSort } from '@/store/postsSort'
import { DeleteOutlined } from '@ant-design/icons'

type FieldType = {
  postType: string
  contractorName: string
  text: string
  location: string
  rate: number
  category: string
}

interface EditPostFormProps {
  setIsModalOpen: (isOpen: boolean) => void
  post: Post
}

export const EditPostForm = ({ setIsModalOpen, post }: EditPostFormProps) => {
  const [form] = Form.useForm()

  const updatePost = useUpdatePost(post._id)
  const { sort } = usePostsSort()
  const { search, category, postType, contractorName } = useSearch()

  const { refetch: refetchPosts } = usePostsInfinite(
    sort,
    search,
    category,
    postType,
    contractorName
  )

  const [currentPostType, setCurrentPostType] = useState(post.postType)
  const [existingImages, setExistingImages] = useState<string[]>(post.images)
  const [images, setImages] = useState<UploadFile[]>([])
  const [rate, setRate] = useState(post.rate)

  const isQuestionTypePost = currentPostType === POST_TYPES.QUESTION

  const onSubmit = () => {
    if (existingImages.length + images.length > MAX_FILES) {
      notification.error({
        title: 'Post może mieć max 5 zdjęć',
      })
      return
    }

    updatePost.mutate(
      {
        postType: form.getFieldValue('postType'),
        contractorName: form.getFieldValue('contractorName'),
        text: form.getFieldValue('text'),
        location: form.getFieldValue('location'),
        category: form.getFieldValue('category'),
        rate: rate,
        existingImages,
        images: images
          .map((file) => file.originFileObj as File | undefined)
          .filter((file): file is File => !!file),
      },
      {
        onSuccess: () => {
          console.log(123123)
          setIsModalOpen(false)
          refetchPosts()
          notification.success({
            title: 'Post został zedytowany',
          })
        },
        onError: () => {
          notification.error({
            title: 'Coś poszło nie tak podczas edycji posta',
          })
        },
      }
    )
  }

  const handleRemoveExisting = (imageUrl: string) => {
    setExistingImages((prev) => prev.filter((img) => img !== imageUrl))
  }

  return (
    <Form
      form={form}
      name="newPost"
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        postType: post.postType,
        contractorName: post.contractorName,
        text: post.text,
        location: post.location,
        rate: post.rate,
        category: post.category,
      }}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item<FieldType>
            label="Typ zgłoszenia"
            name="postType"
            rules={[{ required: true, message: 'Wybierz typ zgłozenia' }]}
          >
            <Select
              onChange={setCurrentPostType}
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

      {!!existingImages.length && (
        <Form.Item label="Obecne zdjęcia">
          <Row gutter={10}>
            {existingImages.map((url) => (
              <Col key={url} style={{ position: 'relative' }}>
                <Image
                  src={url}
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover', borderRadius: 8 }}
                />
                <Button
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveExisting(url)}
                  style={{
                    position: 'absolute',
                    top: 4,
                    left: 14,
                  }}
                />
              </Col>
            ))}
          </Row>
        </Form.Item>
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
            loading={updatePost.isPending}
          >
            Zapisz
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
