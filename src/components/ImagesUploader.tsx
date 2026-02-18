import { useState } from 'react'
import {
  Image,
  message,
  Upload,
  type GetProp,
  type UploadFile,
  type UploadProps,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

interface ImagesUploaderProps {
  fileList: UploadFile[]
  setFileList: (files: UploadFile[]) => void
}

const MAX_FILES = 6

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export const ImagesUploader = ({
  fileList,
  setFileList,
}: ImagesUploaderProps) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newList }) => {
    if (newList.length > MAX_FILES) {
      message.error(`Możesz dodać maksymalnie ${MAX_FILES} zdjęcia`)
      return
    }

    setFileList(newList)
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Dodaj zdjęcie</div>
    </button>
  )

  return (
    <>
      <Upload
        beforeUpload={() => false}
        multiple
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        accept="image/*"
      >
        {fileList.length >= 6 ? null : uploadButton}
      </Upload>

      {previewImage && (
        <Image
          styles={{ root: { display: 'none' } }}
          preview={{
            open: previewOpen,
            onOpenChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  )
}
