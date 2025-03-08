import { createContext, useContext, useState, useCallback , useRef, useEffect} from "react";
import { parseBlob } from "music-metadata";
import { Song } from "../types";


// Type definitions for the File System Access API
interface FileSystemDirectoryHandle extends FileSystemHandle {
    kind: 'directory';
    getDirectoryHandle(name: string, options?: { create?: boolean }): Promise<FileSystemDirectoryHandle>;
    getFileHandle(name: string, options?: { create?: boolean }): Promise<FileSystemFileHandle>;
    values(): AsyncIterable<FileSystemHandle>;
}

interface FileSystemFileHandle extends FileSystemHandle {
    kind: 'file';
    getFile(): Promise<File>;
    createWritable(): Promise<any>;
}

interface FileSystemHandle {
    kind: 'file' | 'directory';
    name: string;
}

// Augment the Window interface
declare global {
    interface Window {
        showDirectoryPicker(): Promise<FileSystemDirectoryHandle>;
    }
}

interface FileMetadata {
    id: string;

    title?: string;
    artist?: string;
    image?: string;
    album?: string;
    duration?: number;
    format?: string;

}



interface FileContextType {
    files: Map<string, File>;
    metadata: Map<string, FileMetadata>;
    directoryHandle: FileSystemDirectoryHandle | null;
    onDirectorySelection: () => Promise<void>;
    isProcessing: boolean;
    currentSong: string | null;
    setCurrentSong: (path: string | null) => void;
    playNextSong: (songs: Song[]) => void;
    
}

const FileContext = createContext<FileContextType | null>(null);

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [directoryHandle, setDirectoryHandle] = useState<FileSystemDirectoryHandle | null>(null);
    const [files, setFiles] = useState<Map<string, File>>(new Map());
    const [metadata, setMetadata] = useState<Map<string, FileMetadata>>(new Map());
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    
    const [currentSong, setCurrentSong] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const audioElement = document.getElementById("global-audio") as HTMLAudioElement;

    // Function to check if file is a music file
    const isMusicFile = (filename: string): boolean => {
        return /\.(FLAC|M4A|MP3)$/i.test(filename);
    };


    useEffect(() => {
        if (!audioElement || !currentSong) return;
    
        const file = files.get(currentSong);
        if (!file) return;
    
        const objectUrl = URL.createObjectURL(file);
        audioElement.src = objectUrl;
        audioElement.play();
    
        // ✅ Listen for when the song finishes
        const handleSongEnd = () => {
            console.log("🎵 Song ended. Playing next song...");
    
            // Convert metadata map to an array of Song[]
            const songList: Song[] = Array.from(metadata.entries()).map(([path, data]) => ({
                _id: path, // Path is the unique ID
                title: data.title || "Unknown Title",
                artist: data.artist || "Unknown Artist",
                image: data.image || "",
                album: data.album || "Unknown Album",
                duration: data.duration ? `${Math.floor(data.duration / 60)}:${Math.floor(data.duration % 60).toString().padStart(2, "0")}` : "0:00",
            }));
    
            playNextSong(songList); // ✅ Now passing a proper Song[] array
        };
    
        audioElement.addEventListener("ended", handleSongEnd);
    
        return () => {
            URL.revokeObjectURL(objectUrl);
            audioElement.removeEventListener("ended", handleSongEnd);
        };
    }, [currentSong]); // Only runs when the song changes

    const playNextSong = (songs: Song[]) => {
        if (!currentSong) return;
    
        const currentIndex = songs.findIndex(song => song._id === currentSong);
        if (currentIndex !== -1 && currentIndex < songs.length - 1) {
            const nextSong = songs[currentIndex + 1];
            setCurrentSong(nextSong._id);
        } else {
            console.log("🚀 End of playlist or song not found.");
        }
    };
    
    // Process a file to extract metadata and add to state
    const processFile = async (path: string, file: File) => {
    try {
        // Add to files map
        setFiles(prev => {
            const newFiles = new Map(prev);
            newFiles.set(path, file);
            return newFiles;
        });

        // Extract metadata
        const metadataResult = await parseBlob(file);


            setMetadata(prev => {
                const newMetadata = new Map(prev);

                const picture = metadataResult.common.picture?.[0];
                let base64String = "";
                let imageSrc = " ";
                if (picture) {
                    for (let i = 0; i < picture.data.length; i++) {
                        base64String += String.fromCharCode(picture.data[i]);
                    }
                    imageSrc = `data:${picture.type};base64,${window.btoa(base64String)}`;
                }

                newMetadata.set(path, {
                    id: path,

                    title: metadataResult.common.title || "Unknown Title",
                    artist: metadataResult.common.artist || "Unknown Artist",
                    image: imageSrc,
                    album: metadataResult.common.album || "Unknown Album",
                    duration: metadataResult.format.duration || 0,
                    format: metadataResult.format.container,
                });

                return newMetadata;
            });



        console.log(`Processed file ${path}`);
    } catch (error) {
        console.error(`Error processing file ${path}:`, error);
    }
};


    // Recursive function to process all files in a directory
    const processDirectory = async (
        dirHandle: FileSystemDirectoryHandle, 
        basePath: string = ""
    ) => {
        for await (const entry of dirHandle.values()) {
            const path = basePath ? `${basePath}/${entry.name}` : entry.name;
            
            if (entry.kind === 'file') {
                if (isMusicFile(entry.name)) {
                    const fileHandle = entry as FileSystemFileHandle;
                    const file = await fileHandle.getFile();
                    await processFile(path, file);
                }
            } else if (entry.kind === 'directory') {
                const subDirHandle = entry as FileSystemDirectoryHandle;
                await processDirectory(subDirHandle, path);
            }
        }
    };

    // Function to select directory and start processing
    const onDirectorySelection = useCallback(async () => {
        try {
            setIsProcessing(true);
            
            // Clear previous state
            setFiles(new Map());
            setMetadata(new Map());
            
            // Show directory picker
            const handle = await window.showDirectoryPicker();
            setDirectoryHandle(handle);
            
            console.log("Directory selected:", handle.name);
            
            // Process all files in the directory
            await processDirectory(handle);
            
            console.log("Finished processing directory");
        } catch (error) {
            console.error("Error selecting directory:", error);
        } finally {
            setIsProcessing(false);
        }
    }, []);

    return (
        <FileContext.Provider value={{ 
            files, 
            metadata, 
            directoryHandle,
            onDirectorySelection, 
            isProcessing,
            currentSong,
            setCurrentSong,
            playNextSong,
            
        }}>
            {children}
            
        </FileContext.Provider>
    );
};

export const useFileContext = (): FileContextType => {
    const context = useContext(FileContext);
    if (!context) {
        throw new Error("useFileContext must be used within a FileProvider");
    }
    return context;
}; 