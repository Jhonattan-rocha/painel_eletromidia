import styled, { keyframes } from 'styled-components';

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #f0f4f8; /* Fundo claro e suave */
`;

export const VideoStyled = styled.video`
  width: 100%;
  height: 93%;
  margin: 0;
  padding: 0;
  object-fit: cover; /* Ajuste para cobrir sem distorções */
  transition: opacity 0.8s ease-in-out;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  bottom: 10px;
  height: 10px;
  background-color: #dfe6e9; /* Fundo mais suave */
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Suave sombra */
`;

export const ProgressBar = styled.div`
  height: 100%;
  background-color: #74b9ff; /* Azul suave */
  border-radius: 5px;
  width: ${(props) => props.$progress}%;
  transition: width 0.4s ease-in-out; /* Animação suave */
`;

export const ProgressBarView = styled.input`
  appearance: none;
  width: 100%;
  height: 10px;
  background: #ddd;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  margin: 0 10px;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #4caf50;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4caf50;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  &::-ms-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4caf50;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-slider-runnable-track {
    height: 10px;
    background: #4caf4f94;
    border-radius: 5px;
  }

  &::-moz-range-track {
    height: 10px;
    background: #ddd;
    border-radius: 5px;
  }

  &::-ms-track {
    height: 10px;
    background: #ddd;
    border-radius: 5px;
    border: none;
    color: transparent;
  }
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
  padding: 10px;
  transition: opacity 0.6s ease-in-out; /* Animação suave */
`;

export const ContainerInfo = styled.div`
  width: 100%;
  height: 5%;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.9); /* Fundo semi-transparente */
  p {
    color: #2d3436; /* Texto em cinza escuro */
    font-weight: bold;
    padding-right: 10px;
  }
`;

export const CotainerCoins = styled.div`
  width: fit-content;
  height: 5%;
  display: flex;
  align-items: center;
`;

export const ItemTime = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: grey;
`;

export const SoundControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #ecf0f1; /* Fundo suave e claro */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Suave sombra */
  max-width: 300px;
  margin: 0 auto;
  gap: 12px; /* Maior espaçamento */
`;

// Barra de volume
export const VolumeBar = styled.input`
  width: 100px;
  height: 5px;
  border-radius: 5px;
  background: linear-gradient(
    to right,
    #1abc9c ${({ value }) => value}%,
    #dfe6e9 ${({ value }) => value}%
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

export const WeatherContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  background: linear-gradient(135deg, #e0f7fa, #80deea);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 140px;
  height: 100%;
  color: #004d40;
  margin-right: auto;
`;

export const IconWrapper = styled.div`
  font-size: 50px;
  color: ${({ $condition }) => {
    switch ($condition) {
      case 'Céu limpo':
        return '#fbc02d'; // Cor do sol
      case 'Chuva':
        return '#039be5'; // Cor da chuva
      case 'Nublado':
        return '#90a4ae'; // Cor do céu nublado
      default:
        return '#757575'; // Cor padrão
    }
  }};
`;

export const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Temperature = styled.h2`
  font-size: 36px;
  margin: 5px 0;
  color: #00796b;
`;

export const ConditionLabel = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #004d40;
`;

