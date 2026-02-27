import { useSearch } from '@/store/search'
import { Input } from 'antd'
import { router } from '@/app/router'

const styles = {
  maxWidth: '50rem',
}

export const Search = () => {
  const { search, setSearch } = useSearch()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const onSearch = (value: string) => {
    setSearch(value)
    router.navigate({ to: '/' })
  }

  return (
    <Input.Search
      placeholder="Szukaj wykonawcy, firmy, miasta..."
      allowClear
      size="large"
      onChange={onChange}
      onSearch={onSearch}
      styles={styles}
      value={search}
    />
  )
}
