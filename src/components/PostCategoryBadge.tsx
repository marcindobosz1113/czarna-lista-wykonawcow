import { categoriesLabels } from '@/layout/homepage/constants'
import { POST_CATEGORIES } from '@/layout/homepage/types'
import { useSearch } from '@/store/search'

interface PostCategoryBadgeProps {
  category: POST_CATEGORIES
  badgeReadOnly?: boolean
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
  [POST_CATEGORIES.INTERIOR_FINISHING]: {
    background: '#f5f7ff',
    color: '#563de1',
  },
  [POST_CATEGORIES.INSTALLATIONS]: {
    background: '#f5fff7',
    color: '#3de153',
  },
  [POST_CATEGORIES.STRUCTURES]: {
    background: '#f9ffc5',
    color: '#949e39',
  },
  [POST_CATEGORIES.FACADES]: {
    background: '#e5fcfc',
    color: '#0cadc2',
  },
  [POST_CATEGORIES.ROOFS]: {
    background: '#ffdfc0',
    color: '#a05601',
  },
  [POST_CATEGORIES.OTHER]: {
    background: '#d8d8d8',
    color: '#525252',
  },
}

export const PostCategoryBadge = ({
  category,
  badgeReadOnly,
}: PostCategoryBadgeProps) => {
  const { category: currentCategory, setCategory } = useSearch()

  const handleClick = () => {
    if (badgeReadOnly) {
      return
    }

    if (category === currentCategory) {
      setCategory(undefined)
      return
    }

    setCategory(category)
  }

  return (
    <div
      style={{
        ...badgeStyles,
        ...styles[category],
      }}
      role="button"
      onClick={handleClick}
    >
      {categoriesLabels[category]}
    </div>
  )
}
