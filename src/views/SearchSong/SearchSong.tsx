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
        const navigationType = (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming).type;
        if (navigationType === "reload") {
            setSearchTerm(""); // Limpia el término de búsqueda si la página se recarga
        }
    }, []);

    useEffect(() => {
        if (songName && searchTerm === "") {
            setSearchTerm(songName.toLowerCase());
        }
    }, [songName]);

    // Manejo del cambio en la barra de búsqueda
    const handleSearch = (term: string) => {
        setSearchTerm(term.toLowerCase());
    };

    // Convertimos songFiles en un array de objetos
    const songFilesArray = Object.entries(songFiles).map(([key, value]) => ({
        id: key,
        ...value,
    }));

    // Filtrado basado en el término de búsqueda
    const filteredSongs = songFilesArray.filter((songFile) => {
        const song = songsData[songFile.idSong as keyof typeof songsData];
        return song?.name.toLowerCase().includes(searchTerm);
    });

    return (
        <div className="search-song-page-container">
            <div className="search-song-wrapper">
                {/* Barra de búsqueda */}
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
                                const song = songsData[songFile.idSong as keyof typeof songsData];
                                const user = usersData[songFile.idUser as keyof typeof usersData];

                                return (
                                    <tr key={songFile.id}>
                                        <td>{song?.name || "Desconocido"}</td>
                                        <td>@{user?.userName || "Anónimo"}</td>
                                        <td>{songFile.fileSize}</td>
                                        <td className="file-name">{songFile.fileName}</td>
                                        <td>
                                            <button className="download-button">
                                                <FaDownload />
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
