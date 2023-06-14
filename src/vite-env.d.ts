/// <reference types="vite/client" />

interface Search {
  name: string
  count: number
}

type State = {
  data: Photos;
  search: string;
};

export type { Search, State }
