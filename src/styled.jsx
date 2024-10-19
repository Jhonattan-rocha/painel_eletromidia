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
  height: 95%;
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
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.9); /* Fundo semi-transparente */
  p {
    font-size: 1.5em;
    color: #2d3436; /* Texto em cinza escuro */
    font-weight: bold;
    padding-right: 10px;
  }
`;

export const scroll = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

export const ScrollContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: #f8f9fa; /* Fundo claro e suave */
  border-radius: 12px; /* Bordas mais arredondadas */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Sombra mais suave */
  padding: 20px; /* Mais espaçamento interno */
  margin: 20px 0; /* Margem para espaçamento vertical */
  transition: background-color 0.4s ease-in-out; /* Transição suave no hover */

  &:hover {
    background-color: #f0f4f8; /* Mudança de cor ao passar o mouse */
  }
`;

export const ScrollContent = styled.div`
  display: flex;
  align-items: center; /* Centraliza verticalmente os itens */
  animation: ${scroll} 25s linear infinite; /* Animação mais suave */
  gap: 24px; /* Maior espaçamento entre os itens */
`;

export const ScrollItem = styled.div`
  min-width: 450px; /* Largura mínima maior para melhor legibilidade */
  margin: 0 20px;
  padding: 24px; /* Mais espaço interno */
  background-color: #ffffff; /* Fundo branco */
  border-radius: 16px; /* Bordas arredondadas */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Sombra suave */
  transition: transform 0.3s ease, background-color 0.3s ease; /* Transição suave para o hover */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px; /* Fonte ligeiramente menor */
  font-weight: bold;
  color: #2c3e50; /* Cor de texto mais escura para contraste */
  text-align: center; /* Centraliza o texto */
  
  &:hover {
    transform: scale(1.05); /* Suave aumento ao passar o mouse */
    background-color: #f1f2f6; /* Cor de fundo mais clara no hover */
  }

  svg {
    margin-left: 10px; /* Espaçamento entre o ícone e o texto */
    transition: color 0.3s ease;
  }
`;

export const TimeItem = styled(ScrollItem)`
  font-size: 20px; /* Menor para o relógio */
  color: #3498db; /* Azul suave */
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
