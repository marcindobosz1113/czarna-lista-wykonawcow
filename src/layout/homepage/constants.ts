import { POST_CATEGORIES, POST_TYPES } from '@/layout/homepage/types'

export const categoriesLabels = {
  [POST_CATEGORIES.INTERIOR_FINISHING]: 'Wykończenia',
  [POST_CATEGORIES.INSTALLATIONS]: 'Instalacje',
  [POST_CATEGORIES.STRUCTURES]: 'Konstrukcje',
  [POST_CATEGORIES.FACADES]: 'Elewacje',
  [POST_CATEGORIES.ROOFS]: 'Dachy',
  [POST_CATEGORIES.OTHER]: 'Inne',
}

export const typesLabels = {
  [POST_TYPES.REPORT]: 'Zgłoszenie',
  [POST_TYPES.APPROVAL]: 'Pochwała',
  [POST_TYPES.QUESTION]: 'Pytanie',
}

export const categoriesDotStyles = {
  [POST_CATEGORIES.INTERIOR_FINISHING]: {
    backgroundColor: '#563de1',
  },
  [POST_CATEGORIES.INSTALLATIONS]: {
    backgroundColor: '#3de153',
  },
  [POST_CATEGORIES.STRUCTURES]: {
    backgroundColor: '#949e39',
  },
  [POST_CATEGORIES.FACADES]: {
    backgroundColor: '#0cadc2',
  },
  [POST_CATEGORIES.ROOFS]: {
    backgroundColor: '#a05601',
  },
  [POST_CATEGORIES.OTHER]: {
    backgroundColor: '#525252',
  },
}

export const postTypesDotStyles = {
  [POST_TYPES.REPORT]: {
    backgroundColor: '#E13D3D',
  },
  [POST_TYPES.APPROVAL]: {
    backgroundColor: '#20df49',
  },
  [POST_TYPES.QUESTION]: {
    backgroundColor: '#dfbf31',
  },
}
