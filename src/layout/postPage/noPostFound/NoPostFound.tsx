import { ExceptionOutlined } from '@ant-design/icons'
import styles from './NoPostFound.module.scss'

export const NoPostFound = () => {
  return (
    <div className={styles.container}>
      <ExceptionOutlined className={styles.noDataIcon} />
      <span className={styles.noDataTitle}>
        Nie znaleziono posta z takim ID
      </span>
    </div>
  )
}
