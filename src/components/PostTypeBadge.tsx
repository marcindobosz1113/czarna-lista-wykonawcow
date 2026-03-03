import { typesLabels } from '@/layout/homepage/constants'
import { POST_TYPES } from '@/layout/homepage/types'
import { useSearch } from '@/store/search'

interface PostTypeBadgeProps {
  postType: POST_TYPES
  badgeReadOnly?: boolean
}

const badgeStyles = {
  padding: '0.75rem 1.25rem',
  borderRadius: '0.8rem',
  textTransform: 'uppercase',
  fontWeight: 600,
  fontSize: '1.2rem',
  cursor: 'pointer',
}

const styles = {
  [POST_TYPES.REPORT]: {
    background: '#ffe2e2',
    color: '#E13D3D',
  },
  [POST_TYPES.APPROVAL]: {
    background: '#d9ffdc',
    color: '#15dd40',
  },
  [POST_TYPES.QUESTION]: { background: '#fff9e0', color: '#dbb922' },
}

export const PostTypeBadge = ({
  postType,
  badgeReadOnly,
}: PostTypeBadgeProps) => {
  const { postType: currentPostType, setPostType } = useSearch()

  const handleClick = () => {
    if (badgeReadOnly) {
      return
    }

    if (postType === currentPostType) {
      setPostType(undefined)
      return
    }

    setPostType(postType)
  }

  return (
    <div
      style={{
        ...badgeStyles,
        ...styles[postType],
      }}
      role="button"
      onClick={handleClick}
    >
      {typesLabels[postType]}
    </div>
  )
}
