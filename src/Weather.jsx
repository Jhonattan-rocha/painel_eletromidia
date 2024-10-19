import React from 'react';
import PropTypes from 'prop-types';
import { WiDaySunny, WiCloud, WiRain } from 'react-icons/wi';
import { WeatherContainer, WeatherInfo, IconWrapper, Temperature, ConditionLabel } from './styled';

function WeatherComponent({ condition, temperature }) {
    let Icon;
  
    switch (condition) {
      case 'Céu limpo':
        Icon = WiDaySunny;
        break;
      case 'Chuva':
        Icon = WiRain;
        break;
      case 'Nublado':
        Icon = WiCloud;
        break;
      default:
        Icon = WiCloud;
    }
  
    return (
      <WeatherContainer>
        <IconWrapper $condition={condition}>
          <Icon />
        </IconWrapper>
        <WeatherInfo>
          <Temperature>{temperature}°C</Temperature>
          <ConditionLabel>{condition}</ConditionLabel>
        </WeatherInfo>
      </WeatherContainer>
    );
};

WeatherComponent.propTypes = {
    condition: PropTypes.string,
    temperature: PropTypes.number
}

export default WeatherComponent;
