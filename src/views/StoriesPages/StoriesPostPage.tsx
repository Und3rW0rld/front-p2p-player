import { useState } from "react";
import "./StoriesPostPage.css";
import StoriesBar from "../../components/storiesBar/StoriesBar";
import Button from "../../components/button/Button";
import UploadIcon from "../../assets/icons/upload.svg";
import SongTable from "../../components/songTable/SongTable";
import songs from "../../assets/mocks/songs.json";
import SearchBar from "../../components/search-bar/SearchBar";
import { Song as SongType } from "../../types";

const StoriesPostPage = () => {
    const [selectedSong, setSelectedSong] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [buttonIsActivated, setButtonIsActivated] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearch = (term: string) => {
        setSearchTerm(term.toLowerCase());
    };

    const filteredSongs = Object.entries(songs).reduce((acc, [id, song]: [string, SongType]) => {
        if (song.name.toLowerCase().includes(searchTerm) || song.author.toLowerCase().includes(searchTerm)) {
            acc[id] = song;
        }
        return acc;
    }, {} as Record<string, SongType>);

    const handleSongSelect = (song: string) => {
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
        alert(`Story posted with song: ${selectedSong || "No song"}`);
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
                        <SongTable songs={filteredSongs} />
                    </div>

                    {/* Sección de carga de imagen */}
                    <div className="image-upload">
                        <h3>Upload an Image</h3>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="input-image" />
                        {preview && <img src={preview} alt="Preview" className="preview-image" />}
                    </div>
                </div>

                {/* Botón de publicación */}
                <Button label="Post" onClick={handlePost} icon={UploadIcon} isActivated={buttonIsActivated} />
            </div>
        </>
    );
};

export default StoriesPostPage;
