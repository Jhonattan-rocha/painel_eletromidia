import React, { useEffect, useState, useRef } from 'react';
import {
  MainContainer,
  ProgressBar,
  ProgressBarContainer,
  VideoStyled,
  ContainerButtons,
  ContainerInfo,
  SoundControlContainer,
  VolumeIconButton,
  VolumeBar,
  CotainerCoins,
  ItemTime,
  ProgressBarView
} from './styled';
import { FaArrowDown, FaArrowUp, FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import WeatherComponent from './Weather';

function App() {
  const location = useLocation();
  const [playPause, setPlayPause] = useState(false);
  const [mute, setMute] = useState(false);
  const [visible, setVisible] = useState(false);
  const [coins, setCoins] = useState({});
  const [timeInfo, setTimeInfo] = useState({});
  const [timer, setTimer] = useState("");
  const [time, setTime] = useState(new Date());
  const [fullScreen, setFullScreen] = useState(false);
  const progressBarRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [videos, setVideos] = useState([
    { id: 1, url: "assets/1.mp4", time: 3 },
    { id: 2, url: "assets/2.mp4", time: 6 }
  ]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [volume, setVolume] = useState(50);
  const video = useRef(null);
  
  const handleProgressBarClick = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * video.current.duration;
    video.current.currentTime = newTime;
  };

  const handleThumbDrag = (e) => {
    if (!isDragging) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const dragX = e.clientX - rect.left;
    const newProgress = Math.min(Math.max((dragX / rect.width) * 100, 0), 100);
    const newTime = (newProgress / 100) * video.current.duration;
    video.current.currentTime = newTime;
    setProgress(newProgress);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = () => {
    clearTimeout(timer);
    setVisible(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 3000);
    setTimer(timeout);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    video.current.volume = newVolume / 100;
    setMute(newVolume === 0);
  };

  const fetchCoinsData = async () => {
    try {
      const response = await axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,JPY-BRL,CNY-BRL');
      setCoins(response.data);
    } catch (error) {}
  };

  const fetchTimeData = async () => {
    try {
      const query = new URLSearchParams(location.search);
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(query.get("city"))}&appid={"YOUR_API_KEY"}&units=metric&lang=pt_br`);
      if (weatherResponse.data) {
        setTimeInfo(weatherResponse.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTimeData();
    const interval = setInterval(() => {
      fetchTimeData();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchCoinsData();
    const interval = setInterval(() => {
      fetchCoinsData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tick = () => {
      setTime(new Date());
    };
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 3000);
    setTimer(timeout);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!video.current) return;

    const handleTimeUpdate = () => {
      const currentProgress = (video.current.currentTime / video.current.duration) * 100;
      setProgress(currentProgress);
      if (video.current.ended) {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
      }
    };

    video.current.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.current.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videos]);

  useEffect(() => {
    if (video.current) {
      video.current.src = videos[currentVideoIndex].url;
      setProgress(0);
      setPlayPause(true);
    }
  }, [currentVideoIndex]);

  useEffect(() => {
    if (!video.current) return;
    if (playPause) {
      video.current.play();
    } else {
      video.current.pause();
    }
  }, [playPause]);

  useEffect(() => {
    if (video.current) {
      video.current.muted = mute;
    }
  }, [mute]);

  return (
    <MainContainer>
      <VideoStyled autoPlay={true} ref={video} id='1' src={videos[currentVideoIndex].url} controls={false}></VideoStyled>
      <div style={{ opacity: visible ? 0 : 1, display: 'flex', margin: 2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', width: '100%' }}>
        {videos.map((videoItem, index) => (
            <ProgressBarView
              key={videoItem.id}
              type="range"
              min="0"
              max="100"
              defaultValue={0}
              value={index < currentVideoIndex ? 100 : index === currentVideoIndex ? progress : 0}
              readOnly
              style={{ width: '100%' }}
            />
        ))}
      </div>
      <ContainerInfo style={{ opacity: visible ? 0 : 1 }}>
        <WeatherComponent $condition={timeInfo.condition ?? ""} $temperature={timeInfo.temperature ?? 0}></WeatherComponent>
        <CotainerCoins>
          {coins ?
            Object.values(coins).map((coin, index) => {
              return (
                <p key={index}>{coin['name']}: {Number(coin['bid']).toFixed(2)} {Number(coin['pctChange']) > 0 ? <FaArrowUp size={15} color='#27ae60'></FaArrowUp> : <FaArrowDown size={15} color='#e74c3c'></FaArrowDown>}</p>
              );
            })
            : null}
        </CotainerCoins>
        <ItemTime>{time.toLocaleTimeString()}</ItemTime>
      </ContainerInfo>
      <ContainerButtons
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ opacity: visible ? 1 : 0 }}
      >
        <ProgressBarContainer
          ref={progressBarRef}
          onClick={handleProgressBarClick}
          onMouseMove={handleThumbDrag}
          onMouseUp={handleMouseUp}
        >
          <ProgressBar $progress={progress ? progress : 0} />
        </ProgressBarContainer>
        {!playPause ? (
          <FaPlay size={30} cursor={"pointer"} onClick={() => setPlayPause(true)} />
        ) : (
          <FaPause size={30} cursor={"pointer"} onClick={() => setPlayPause(false)} />
        )}
        <SoundControlContainer>
          <VolumeIconButton muted={mute} onClick={() => setMute(!mute)}>
            {mute ? <FaVolumeMute /> : <FaVolumeUp />}
          </VolumeIconButton>
          <VolumeBar
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            disabled={mute}
          />
        </SoundControlContainer>
      </ContainerButtons>
    </MainContainer>
  );
}

export default App;
