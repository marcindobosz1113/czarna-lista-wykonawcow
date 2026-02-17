import { Skeleton } from 'antd'

const skeletonStyles = {
  padding: 24,
  borderRadius: 8,
  background: '#fff',
  marginBottom: 20,
  boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.08)',
}

const elementStyles = { marginTop: 20 }

export const PostCardSkeleton = () => {
  return (
    <div style={skeletonStyles}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div>
          <Skeleton.Input active size="small" />
        </div>
      </div>

      <div style={elementStyles}>
        <Skeleton.Input active size="small" />
      </div>

      <div style={elementStyles}>
        <Skeleton.Input active size="default" />
      </div>

      <div style={elementStyles}>
        <Skeleton active paragraph={{ rows: 2 }} title={false} />
      </div>

      <div style={elementStyles}>
        <Skeleton.Input active size="default" />
      </div>
    </div>
  )
}
