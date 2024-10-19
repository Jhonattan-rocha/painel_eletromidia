import React, { useEffect, useState, useRef } from 'react'
import { MainContainer, ProgressBar, ProgressBarContainer, VideoStyled, ContainerButtons, ContainerInfo, ScrollContainer, ScrollContent, ScrollItem, SoundControlContainer, VolumeIconButton, VolumeBar} from './styled';
import { FaArrowDown, FaArrowUp, FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { IoVolumeHigh, IoVolumeMute } from 'react-icons/io5';

function App() {
  const [playPause, setPlayPause] = useState(false);
  const [mute, setMute] = useState(false);
  const [visible, setVisible] = useState(false);
  const [coins, setCoins] = useState({});
  const [timer, setTimer] = useState("");
  const [time, setTime] = useState(new Date());
  const [fullScreen, setFullScreen] = useState(false);
  const progressBarRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [videos, setVidoes] = useState([
    {id: 1, url: "assets/1.mp4"}, {id: 2, url: "assets/2.mp4"}
  ]);
  const [currentVideo, setCurrentVideo] = useState(videos[0].url);
  const [next, setNext] = useState(false);
  const [volume, setVolume] = useState(50)
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
    // Limpa o temporizador e mostra a div
    clearTimeout(timer);
    setVisible(true);
  };

  const handleMouseLeave = () => {
    // Inicia o temporizador novamente para esconder a div após o mouse sair
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 3000);
    setTimer(timeout);
  };

    // Função para atualizar o volume
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    video.current.volume = newVolume / 100;
    setMute(newVolume === 0);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL');
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados'); // Tratamento de erro
      }
      const result = await response.json();
      setCoins(result); // Armazenando os dados no estado
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
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
    if(next){
      const currentIndex = videos.findIndex(item => item.url === currentVideo);
      if (currentIndex === -1) {
        throw new Error("URL atual não encontrada no array");
      }
      const nextIndex = (currentIndex + 1) % videos.length;
      setNext(false);
      setCurrentVideo(videos[nextIndex].url);
    }
  }, [videos, currentVideo, next])

  useEffect(() => {
    if (!video.current) return; // Evita acessar o video antes da inicialização

    const handleTimeUpdate = () => {
      const currentProgress = (video.current.currentTime / video.current.duration) * 100;
      setProgress(currentProgress);
      if(currentProgress >= 99){
        setNext(true);
      }
    };
    const handleVideoLoad = () => {
      setPlayPause(true);
    };
    const handleVideoLoadEnd = () => {
      setPlayPause(true);
    };

    video.current.addEventListener('loadeddata', handleVideoLoad);
    video.current.addEventListener('ended', handleVideoLoadEnd);
    video.current.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      if(video.current){
        video.current.removeEventListener('timeupdate', handleTimeUpdate);
        video.current.removeEventListener('loadeddata', handleVideoLoad);
        video.current.removeEventListener('ended', handleVideoLoadEnd);
      }
    };
  }, []);

  useEffect(() => {
    if (!video.current) return;
    if (playPause) {
      video.current.play();
    } else {
      video.current.pause();
    }
  }, [playPause]);

  useEffect(() => {
    if (!video.current) return;
    if (fullScreen) {
      if (video.current.requestFullscreen) {
        video.current.requestFullscreen();
      } else if (video.current.webkitRequestFullscreen) { /* Safari */
        video.current.webkitRequestFullscreen();
      } else if (video.current.msRequestFullscreen) { /* IE11 */
        video.current.msRequestFullscreen();
      }
    }
  }, [fullScreen]);

  useEffect(() => {
    if (video.current) {
      video.current.muted = mute;
    }
  }, [mute]);

  return (
    <MainContainer>
      <VideoStyled autoPlay={true} ref={video} id='1' src={currentVideo} controls={false}></VideoStyled>
      <ContainerInfo style={{opacity: visible ? 0:1}}>
        <ScrollContainer>
          <ScrollContent>
            {coins?
              Object.values(coins).map(coin => {
                return (
                  <ScrollItem>Moeda: {coin['name']}, valor: {Number(coin['bid']).toFixed(2)} {Number(coin['pctChange']) > 0 ? <FaArrowUp size={25}></FaArrowUp>:<FaArrowDown size={25}></FaArrowDown>}</ScrollItem>
                );
              })
            : null}
            <ScrollItem>{time.toLocaleTimeString()}</ScrollItem>
          </ScrollContent>
        </ScrollContainer>
      </ContainerInfo>
      <ContainerButtons 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{opacity: visible ? 1:0}}
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
        {!fullScreen ? (
          <MdFullscreen size={40} cursor={"pointer"} onClick={() => setFullScreen(true)} />
        ) : (
          <MdFullscreenExit size={40} cursor={"pointer"} onClick={() => setFullScreen(false)} />
        )}
        <SoundControlContainer>
          {/* Botão de mute/unmute */}
          <VolumeIconButton muted={mute} onClick={() => setMute(!mute)}>
            {mute ? <FaVolumeMute /> : <FaVolumeUp />}
          </VolumeIconButton>

          {/* Barra de volume */}
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
  )
}

export default App;
