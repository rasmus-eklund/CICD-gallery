import { Search } from "./vite-env";

const addSearch = (search: string) => {
  const storage = localStorage.getItem("search");
  if (!storage) {
    localStorage.setItem(
      "search",
      JSON.stringify([{ name: search, count: 1 }])
    );
    return;
  }

  const data: Search[] = JSON.parse(storage);
  const index = data.findIndex((item) => item.name === search);
  if(index !== -1){
  data[index].count++;
} else{
  data.push({
    name: search,
    count: 1,
  })
}
localStorage.setItem("search", JSON.stringify(data));
return;
};

const getSearch = (): string[] => {
  const storage = localStorage.getItem("search");
  if (storage) {
    const data: Search[] = JSON.parse(storage);
    return data
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map((item) => item.name);
  }
  return [];
};

export { addSearch, getSearch };
