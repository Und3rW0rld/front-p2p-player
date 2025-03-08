import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import SearchBar from "../../components/search-bar/SearchBar";
import songFiles from "../../assets/mocks/songsFiles.json";
import songsData from "../../assets/mocks/songs.json";
import usersData from "../../assets/mocks/users.json";
import "./SearchSong.css";
import { useLocation } from "react-router-dom";

const SearchSong = () => {
    const location = useLocation();
    const { songName } = location.state || { songName: "" };
    const [searchTerm, setSearchTerm] = useState(songName.toLowerCase() || "");

    useEffect(() => {
        if (songName && searchTerm === "") {
            setSearchTerm(songName.toLowerCase());
        }
    }, [songName]);



    const handleSearch = (term: string) => {
        setSearchTerm(term.toLowerCase());
    };

    const songsMap: Record<string, { title: string }> = (songsData as any[]).reduce((acc, song) => {
        acc[song.id] = song;
        return acc;
    }, {});

    const usersMap: Record<string, { userName: string }> = (usersData as any[]).reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
    }, {});

    const songFilesArray = Object.entries(songFiles).map(([key, value]) => ({
        id: key,
        ...value,
    }));

    const filteredSongs = songFilesArray.filter((songFile) => {
        const song = songsMap[songFile.idSong];
        return song?.title.toLowerCase().includes(searchTerm);
    });

    return (
        <div className="search-song-page-container">
            <div className="search-song-wrapper">
                {/* Barra de búsqueda ahora se actualiza correctamente con `searchTerm` */}
                <SearchBar placeholder="Buscar canción..." defaultInput={searchTerm} onSearch={handleSearch} />
                <div className="search-song-container">
                    <table className="search-song-table">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Usuario</th>
                                <th>Tamaño</th>
                                <th>Nombre archivo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSongs.map((songFile) => {
                                const song = songsMap[songFile.idSong];
                                const user = usersMap[songFile.idUser];

                                return (
                                    <tr key={songFile.id}>
                                        <td>{song?.title || "Desconocido"}</td>
                                        <td>@{user?.userName || "Anónimo"}</td>
                                        <td>{songFile.fileSize}</td>
                                        <td className="file-name">{songFile.fileName}</td>
                                        <td>
                                            <button className="download-button">
                                                <FaDownload onClick={() => {}} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SearchSong;
