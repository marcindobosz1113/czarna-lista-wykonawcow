import { useSearch } from '@/store/search'
import { Input } from 'antd'
import { router } from '@/app/router'

const styles = {
  maxWidth: '50rem',
}

export const Search = () => {
  const { search, setSearch } = useSearch()

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    router.navigate({ to: '/' })
    setSearch(event.target.value)
  }

  return (
    <Input.Search
      placeholder="Szukaj wykonawcy, firmy, miasta..."
      allowClear
      size="large"
      onChange={onSearch}
      styles={styles}
      value={search}
    />
  )
}
