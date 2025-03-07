import { createContext, useContext, useState, useCallback , useRef} from "react";
import { parseBlob } from "music-metadata";


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
    audioRef: React.RefObject<HTMLAudioElement>;
}

const FileContext = createContext<FileContextType | null>(null);

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [directoryHandle, setDirectoryHandle] = useState<FileSystemDirectoryHandle | null>(null);
    const [files, setFiles] = useState<Map<string, File>>(new Map());
    const [metadata, setMetadata] = useState<Map<string, FileMetadata>>(new Map());
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    
    const [currentSong, setCurrentSong] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Function to check if file is a music file
    const isMusicFile = (filename: string): boolean => {
        return /\.(FLAC|M4A|MP3)$/i.test(filename);
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
            audioRef
        }}>
            {children}
            <audio ref={audioRef} /> {/* Global audio element */}
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