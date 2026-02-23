import { Button, Col, Row, Skeleton, Space } from 'antd'
import styles from './MostReported.module.scss'
import { useMostReported } from '@/hooks/ranking/useMostReported'
import { useSearch } from '@/store/search'

export const MostReported = () => {
  const { setContractorName } = useSearch()
  const { data: mostReported, isLoading } = useMostReported()

  const isContractorActive = (contractorName: string) => {
    return contractorName
  }

  const handleClick = (contractorName: string) => {
    setContractorName(contractorName)
  }

  return (
    <Row className={styles.container}>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Space orientation="vertical" size="large" className={styles.spacer}>
          <Col span={24}>
            <span className={styles.title}>Najczęściej zgłaszani</span>
          </Col>

          {mostReported?.map((contractor, index) => (
            <Row align="middle">
              <Button
                className={`${styles.category} ${isContractorActive(contractor.contractorName) ? styles.active : ''}`}
                onClick={() => handleClick(contractor.contractorName)}
              >
                <Col span={2}>
                  <span className={styles.place}>{index + 1}</span>
                </Col>
                <Col span={18} className={styles.contractorName}>
                  {contractor.contractorName}
                </Col>

                <Col span={4}>
                  <span className={styles.reportsCount}>
                    {contractor.reportCount} Zgł.
                  </span>
                </Col>
              </Button>
            </Row>
          ))}
        </Space>
      )}
    </Row>
  )
}
