export interface Song {
  id: string;
  title?: string;
  artist?: string;
  image?: string;
  album?: string;
  duration?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  imageUrl: string;
  bannerUrl: string;
}

export interface Story {
  id: string;
  idUser: string;
  image: string;
  idSong: string;
  timestamp?: string;
}

export interface SongFile {
  id: string
  idSong: string;
  idUser: string;
  fileSize: string;
  fileType: string;
}