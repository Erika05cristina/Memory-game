export interface Character {
  id: number;
  name: string;
  image: string;
}

export async function fetchCharacters(): Promise<Character[]> {
  const res = await fetch("https://rickandmortyapi.com/api/character?page=1 ");
    const data = await res.json();
    // console.log(data);
  return data.results; 
}
