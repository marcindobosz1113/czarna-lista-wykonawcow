import { POST_TYPES } from '@/layout/homepage/types'

interface PostTypeBadgeProps {
  type: POST_TYPES
}

const badgeStyles = {
  padding: '0.75rem 1.25rem',
  borderRadius: '5rem',
  textTransform: 'uppercase',
  fontWeight: 600,
  fontSize: '1.2rem',
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

export const PostTypeBadge = ({ type }: PostTypeBadgeProps) => {
  return (
    <div
      style={{
        ...badgeStyles,
        ...styles[type],
      }}
    >
      {labels[type]}
    </div>
  )
}
