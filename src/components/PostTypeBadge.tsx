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
    background: '#FFF5F5',
    color: '#E13D3D',
  },
  [POST_TYPES.APPROVAL]: {
    background: '#eafaeb',
    color: '#20df49',
  },
  [POST_TYPES.QUESTION]: { background: '#FFFBEB', color: '#dfbf31' },
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
