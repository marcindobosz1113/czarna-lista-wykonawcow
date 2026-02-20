import { Route } from '@/routes/posts/$postId'

import styles from './PostPage.module.scss'
import { PostCard } from '@/layout/homepage/postCard/PostCard'

export const PostPage = () => {
  const post = Route.useLoaderData()
  console.log(post)

  return (
    <div className={styles.container}>
      <PostCard post={post} hideCommentButton />
    </div>
  )
}
