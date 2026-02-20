import { useSearch } from '@/store/search'

const badgeStyles = {
  padding: '0.75rem 1.25rem',
  borderRadius: '5rem',
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
