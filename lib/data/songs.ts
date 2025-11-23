import { SimpleSong, Song } from "@/types/song.type"

const RAW_SONGS: Song[] = []

const SIMPLE_SONGS: SimpleSong[] = [
  {
    id: "1",
    title: "Chaque jour",
    artist: "Manu Dibango",
    singers: ["Bob", "Alice", "Charlie"],
  },
  {
    id: "2",
    title: "Sous le vent",
    artist: "Garou & Céline Dion",
    singers: ["David", "Eve"],
  },
  {
    id: "3",
    title: "Formidable",
    artist: "Stromae",
    singers: ["Max", "Sophie"],
  },
  {
    id: "4",
    title: "J'ai demandé à la lune",
    artist: "Indochine",
    singers: ["Claire", "Lucas", "Emma"],
  },
  {
    id: "5",
    title: "L'Amérique",
    artist: "Joe Dassin",
    singers: ["Sarah"],
  },
]

export { RAW_SONGS, SIMPLE_SONGS }
