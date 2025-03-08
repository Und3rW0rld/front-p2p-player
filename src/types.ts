export interface Song {
  _id: string;
  title?: string;
  artist?: string;
  image?: string;
  album?: string;
  duration?: string;
}

export interface User {
  _id: string;
  userName: string;
  email: string;
  image: string;
}

export interface Story {
  _id: string;
  idUser: string;
  image: string;
  idSong: string;
  timestamp?: string;
}

export interface SongFile {
  _id: string
  idSong: string;
  idUser: string;
  fileSize: string;
  fileType: string;
}