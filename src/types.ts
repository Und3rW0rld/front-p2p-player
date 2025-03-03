export interface Song {
  name: string;
  author: string;
  image: string;
  album: string;
  duration: string;
  url?: string;
}

export interface User {
  userName: string;
  email: string;
  image: string;
}

export interface Story {
  idUser: string;
  image: string;
  idSong: string;
  timestamp?: string;
}