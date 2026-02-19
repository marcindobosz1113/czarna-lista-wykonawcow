import { POST_TYPES } from '@/layout/homepage/types'
import { useSearch } from '@/store/search'

interface PostTypeBadgeProps {
  postType: POST_TYPES
}

const badgeStyles = {
  padding: '0.75rem 1.25rem',
  borderRadius: '5rem',
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
  [POST_TYPES.QUESTION]: { background: '#faf9e9', color: '#dfbf31' },
}

const labels = {
  [POST_TYPES.REPORT]: 'Zgłoszenie',
  [POST_TYPES.APPROVAL]: 'Pochwała',
  [POST_TYPES.QUESTION]: 'Pytanie',
}

export const PostTypeBadge = ({ postType }: PostTypeBadgeProps) => {
  const { postType: currentPostType, setPostType } = useSearch()

  const handleClick = () => {
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
      {labels[postType]}
    </div>
  )
}
