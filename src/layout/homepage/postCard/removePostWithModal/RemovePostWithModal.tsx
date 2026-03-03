import { useState } from 'react'
import { Button, Modal, notification } from 'antd'
import { useRemovePost } from '@/hooks/posts/useRemovePost'
import { router } from '@/app/router'
import { useRouterState } from '@tanstack/react-router'
import { usePostsInfinite } from '@/hooks/posts/usePostsInfinite'
import { usePostsSort } from '@/store/postsSort'
import { useSearch } from '@/store/search'

export const RemovePostWithModal = ({ postId }: { postId: string }) => {
  const {
    location: { pathname },
  } = useRouterState()
  const { sort } = usePostsSort()
  const { search, category, postType, contractorName } = useSearch()

  const { refetch: refetchPosts } = usePostsInfinite(
    sort,
    search,
    category,
    postType,
    contractorName
  )

  const [isModalOpen, setIsModalOpen] = useState(false)

  const deletePost = useRemovePost()

  const handleDelete = () => {
    deletePost.mutate(
      { postId },
      {
        onSuccess: () => {
          setIsModalOpen(false)

          if (pathname === '/') {
            refetchPosts()
          } else {
            console.log(123123)
            router.navigate({ to: '/' })
          }

          notification.success({
            title: 'Post został usunięty',
          })
        },
        onError: () => {
          setIsModalOpen(false)
          notification.error({
            title: 'Coś poszło nie tak podczas usuwania posta',
          })
        },
      }
    )
  }

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Usuń post</Button>

      <Modal
        title="Usuwanie posta"
        centered
        open={isModalOpen}
        confirmLoading={false}
        onCancel={() => setIsModalOpen(false)}
        okText="Usuń post"
        cancelText="Anuluj"
        onOk={handleDelete}
        width={{
          xs: '90%',
          sm: '80%',
          md: '50%',
          lg: '40%',
          xl: '30%',
          xxl: '20%',
        }}
      >
        <span>Czy na pewno chcesz usunąć ten post?</span>
      </Modal>
    </>
  )
}
