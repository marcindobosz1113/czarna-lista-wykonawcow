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

const reportBadgeStyles = {
  background: '#FFF5F5',
  color: '#E13D3D',
}

const questionBadgeStyles = {
  background: '#faf9e9',
  color: '#e1c33d',
}

export const PostTypeBadge = ({ type }: PostTypeBadgeProps) => {
  const isReportType = type === POST_TYPES.REPORT

  return (
    <div
      style={{
        ...badgeStyles,
        ...(isReportType ? reportBadgeStyles : questionBadgeStyles),
      }}
    >
      {isReportType ? 'Zgłoszenie' : 'Pytanie'}
    </div>
  )
}
