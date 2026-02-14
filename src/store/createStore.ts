import { create, type StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export function createStore<T>(
  initializer: StateCreator<T, [], []>,
  name: string,
  shouldPersist?: boolean
) {
  const isDev = import.meta.env.DEV

  if (shouldPersist) {
    const persisted = persist(initializer, { name })

    if (isDev) {
      return create<T>()(devtools(persisted, { name }))
    }

    return create<T>()(persisted)
  }

  if (isDev) {
    return create<T>()(devtools(initializer, { name }))
  }

  return create<T>()(initializer)
}
