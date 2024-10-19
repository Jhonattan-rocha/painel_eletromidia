import styled, { keyframes } from 'styled-components';

export const MainContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
`;

export const VideoStyled = styled.video`
    width: 100%;
    height: 95%;
    margin: 0;
    padding: 0;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  bottom: 10px;
  height: 10px;
  background-color: #333;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
`;

export const ProgressBar = styled.div`
  height: 100%;
  background-color: #007bff;
  border-radius: 5px;
  width: ${(props) => props.$progress}%;
`;

export const ContainerButtons = styled.div`
    width: 100%;
    z-index: 999;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    padding: 10;
    transition: 2s;
`;

export const ContainerInfo = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
    transition: 2s;
    background-color: none;
    p {
        font-size: 2em;
    }
`;

export const scroll = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

export const ScrollContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

export const ScrollContent = styled.div`
  display: flex;
  width: 100%;
  animation: ${scroll} 30s linear infinite;  /* Ajusta o tempo conforme necessário */
`;

export const ScrollItem = styled.div`
    min-width: 300px;
    margin: 0 16px;
    padding: 16px;
    background-color: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    font-size: 24px;
`;

export const SoundControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #2c3e50;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin: 0 auto;
  gap: 10px;
`;

// Barra de volume
export const VolumeBar = styled.input`
  width: 100px;
  height: 5px;
  border-radius: 5px;
  background: linear-gradient(
    to right,
    #1abc9c ${({ value }) => value}%,
    #ecf0f1 ${({ value }) => value}%
  );
  appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    width: 12px;
    height: 12px;
    background: #1abc9c;
    border-radius: 50%;
    cursor: pointer;
    appearance: none;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  }

  &:focus {
    outline: none;
  }
`;

// Botão de ícone para volume
export const VolumeIconButton = styled.button`
  background: none;
  border: none;
  color: ${({ muted }) => (muted ? '#e74c3c' : '#1abc9c')};
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ muted }) => (muted ? '#c0392b' : '#16a085')};
  }
`;
