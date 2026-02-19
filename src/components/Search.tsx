import { useSearch } from '@/store/search'
import { Input } from 'antd'

const styles = {
  maxWidth: '50rem',
}

export const Search = () => {
  const { search, setSearch } = useSearch()

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  return (
    <Input.Search
      placeholder="Wyszukaj wykonawcę"
      allowClear
      size="large"
      onChange={onSearch}
      styles={styles}
      value={search}
    />
  )
}
