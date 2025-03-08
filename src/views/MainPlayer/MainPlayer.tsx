import './MainPlayer.css';
import { MdPlaylistAdd } from "react-icons/md";
import { FaPlay, FaShuffle } from "react-icons/fa6";
import { BiSolidArrowToLeft } from "react-icons/bi";
import { BiSolidArrowToRight } from "react-icons/bi";
import { FaRepeat } from "react-icons/fa6";
import { IoVolumeMedium } from "react-icons/io5";
import songs from '../../assets/mocks/songs.json';
import { useEffect, useState } from 'react';


const MainPlayer: React.FC = () => {

    const [currentSong, setCurrentSong] = useState<any>({});

    const loadFirstSongInQueue = () => {
        if (songs?.length > 0) {
            setCurrentSong(songs[0]);
        }
    }

    useEffect(() => {
        loadFirstSongInQueue();
    }, [])

    return (
        <>
            <div className="main-player-wrapper">
                <div className="player-container">
                    <div className="next-songs">
                        <h1>Proximas Canciones</h1>

                        <div className='songs-list'>
                            {
                                songs.map(song => {
                                    return (
                                        <div className='next-song'>
                                            <img src={song.image} alt="Song image" className='next-song-img'/>
                                            <div className='next-song-info'>
                                                <span className='name'>{song.title}</span>
                                                <span className='artist'>{song.artist}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="main-player">
                        <div className="current-song">
                            <img src={currentSong.image} alt="" />
                            <div className="song-info">
                                <span className='song-title'>{currentSong.title}</span>
                                <span className='song-artist'>{currentSong.artist}</span>
                            </div>
                        </div>
                        <div className="player">
                            <div className="progress-bar-wrapper">
                                <div className="progress-bar">
                                    <div className="progress" style={{width: '80%'}}></div>
                                </div>
                            </div>
                            <div className="main-actions">
                                <MdPlaylistAdd className='playlist-add'/>

                                <div className="play-actions">
                                    <FaShuffle className='shuffle'/>
                                    <BiSolidArrowToLeft className='previous'/>
                                    <FaPlay className='play'/>
                                    <BiSolidArrowToRight className='next-song'/>
                                    <FaRepeat className='repeat'/>
                                </div>

                                <IoVolumeMedium className='volume'/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default MainPlayer;