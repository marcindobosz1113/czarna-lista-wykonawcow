import { POST_CATEGORIES } from '@/layout/homepage/types'
import { useSearch } from '@/store/search'

interface PostCategoryBadgeProps {
  category: POST_CATEGORIES
}

const badgeStyles = {
  padding: '0.75rem 1.25rem',
  borderRadius: '5rem',
  fontWeight: 500,
  fontSize: '1.2rem',
  cursor: 'pointer',
}

const styles = {
  [POST_CATEGORIES.INTERIOR_FINISHING]: {
    background: '#f5f7ff',
    color: '#563de1',
  },
  [POST_CATEGORIES.INSTALLATIONS]: {
    background: '#f5fff7',
    color: '#3de153',
  },
  [POST_CATEGORIES.STRUCTURES]: {
    background: '#FFF5F5',
    color: '#E13D3D',
  },
  [POST_CATEGORIES.FACADES]: {
    background: '#FFF5F5',
    color: '#E13D3D',
  },
  [POST_CATEGORIES.ROOFS]: {
    background: '#FFF5F5',
    color: '#E13D3D',
  },
  [POST_CATEGORIES.OTHER]: {
    background: '#FFF5F5',
    color: '#E13D3D',
  },
}

const labels = {
  [POST_CATEGORIES.INTERIOR_FINISHING]: 'Wykończenia',
  [POST_CATEGORIES.INSTALLATIONS]: 'Instalację',
  [POST_CATEGORIES.STRUCTURES]: 'Konstrukcje',
  [POST_CATEGORIES.FACADES]: 'Elewacje',
  [POST_CATEGORIES.ROOFS]: 'Dachy',
  [POST_CATEGORIES.OTHER]: 'Inne',
}

export const PostCategoryBadge = ({ category }: PostCategoryBadgeProps) => {
  const { setCategory } = useSearch()

  return (
    <div
      style={{
        ...badgeStyles,
        ...styles[category],
      }}
      role="button"
      onClick={() => setCategory(category)}
    >
      {labels[category]}
    </div>
  )
}
