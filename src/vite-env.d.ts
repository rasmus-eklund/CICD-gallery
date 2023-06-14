/// <reference types="vite/client" />

interface Search {
  name: string
  count: number
}

interface State {
  data: Photos
  search: string
}

export type { Search, State }
