export interface Song {
  id: string;
  title?: string;
  artist?: string;
  image?: string;
  album?: string;
  duration?: string;
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

export interface SongFile {
  idSong: string;
  idUser: string;
  fileSize: string;
  fileType: string;
}