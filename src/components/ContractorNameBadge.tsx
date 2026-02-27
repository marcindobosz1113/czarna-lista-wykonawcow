import { useSearch } from '@/store/search'

const badgeStyles = {
  border: '1px solid #000',
  padding: '0.75rem 1.25rem',
  borderRadius: '0.8rem',
  textTransform: 'uppercase',
  fontWeight: 600,
  fontSize: '1.2rem',
  cursor: 'pointer',
  background: '#fff',
}

export const ContractorNameBadge = ({
  contractorName,
}: {
  contractorName: string
}) => {
  const { setContractorName } = useSearch()
  const handleClick = () => {
    setContractorName(undefined)
  }

  return (
    <div style={badgeStyles} role="button" onClick={handleClick}>
      {contractorName}
    </div>
  )
}
