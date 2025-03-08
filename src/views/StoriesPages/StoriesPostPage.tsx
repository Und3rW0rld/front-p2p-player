import { useState } from "react";
import "./StoriesPostPage.css";
import StoriesBar from "../../components/storiesBar/StoriesBar";
import Button from "../../components/button/Button";
import SongTable from "../../components/songTable/SongTable";
import songsData from "../../assets/mocks/songs.json";
import SearchBar from "../../components/search-bar/SearchBar";
import { Song } from "../../types";

const StoriesPostPage = () => {
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [buttonIsActivated, setButtonIsActivated] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearch = (term: string) => {
        setSearchTerm(term.toLowerCase());
    };

    // Convertimos songsData en un array tipado de Song[]
    const filteredSongs: Song[] = Object.values(songsData).filter((song) =>
        song.title?.toLowerCase().includes(searchTerm) ||
        song.artist?.toLowerCase().includes(searchTerm) ||
        song.album?.toLowerCase().includes(searchTerm)
    );

    const handleSongSelect = (songId: string) => {
        const song = Object.values(songsData).find((song) => song.id === songId) || null;
        setSelectedSong(song);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setButtonIsActivated(true);
        }
    };

    const handlePost = () => {
        if (!image) {
            alert("Please upload an image");
            return;
        }
        alert(`Story posted with song: ${selectedSong ? `${selectedSong.title} by ${selectedSong.artist}` : "No song"}`);
    };

    return (
        <>
            <StoriesBar />
            <div className="stories-post-container">
                <h2 className="title">Post a Story</h2>

                <div className="content-wrapper">
                    {/* Sección de selección de canción */}
                    <div className="song-selection">
                        <h3>Pick a Song</h3>
                        <SearchBar placeholder="Local search" onSearch={handleSearch} />
                        <SongTable songs={filteredSongs} onSongSelect={handleSongSelect} />
                    </div>

                    {/* Sección de carga de imagen */}
                    <div className="image-upload">
                        <h3>Upload an Image</h3>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="input-image" />
                        {preview && <img src={preview} alt="Preview" className="preview-image" />}
                    </div>
                </div>

                {/* Botón de publicación */}
                <Button label="Post" onClick={handlePost} type="button" isActivated={buttonIsActivated} icon="upload" />
            </div>
        </>
    );
};

export default StoriesPostPage;
