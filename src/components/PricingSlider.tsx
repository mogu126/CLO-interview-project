import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setPriceRange } from '../store/slices/contentSlice';
import type { AppDispatch, RootState } from '../store';

const SliderContainer = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 20px;
`;

const SliderTrack = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 4px;
  background-color: #333;
  border-radius: 2px;
`;

const SliderRange = styled.div<{ left: number; width: number }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${props => props.left}%;
  width: ${props => props.width}%;
  height: 4px;
  background-color: #0056b3;
  border-radius: 2px;
`;

const SliderHandle = styled.input`
  position: absolute;
  top: 0;
  width: 100%;
  height: 20px;
  background: transparent;
  pointer-events: none;
  -webkit-appearance: none;
  border: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background: #0056b3;
    border-radius: 50%;
    cursor: pointer;
    pointer-events: auto;
  }
  
  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #0056b3;
    border-radius: 50%;
    cursor: pointer;
    pointer-events: auto;
    border: none;
  }
`;

const PriceLabel = styled.span<{ align?: string }>`
  font-size: 12px;
  color: #828185;
  min-width: 30px;
  text-align: ${props => props.align || 'left'};
`;

interface PricingSliderProps {
  disabled: boolean;
}

const PricingSlider: React.FC<PricingSliderProps> = ({ disabled }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { priceRange } = useSelector((state: RootState) => state.content);
  const [minValue, setMinValue] = useState(priceRange?.min || 0);
  const [maxValue, setMaxValue] = useState(priceRange?.max || 999);

  useEffect(() => {
    if (priceRange) {
      setMinValue(priceRange.min);
      setMaxValue(priceRange.max);
    }
  }, [priceRange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
    dispatch(setPriceRange({ min: value, max: maxValue }));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
    dispatch(setPriceRange({ min: minValue, max: value }));
  };

  const leftPercent = (minValue / 999) * 100;
  const rightPercent = (maxValue / 999) * 100;
  const widthPercent = rightPercent - leftPercent;

  return (
    <SliderContainer disabled={disabled}>
      <PriceLabel align="right">${minValue}</PriceLabel>
      <SliderWrapper>
        <SliderTrack />
        <SliderRange left={leftPercent} width={widthPercent} />
        <SliderHandle
          type="range"
          min="0"
          max="999"
          value={minValue}
          onChange={handleMinChange}
          disabled={disabled}
        />
        <SliderHandle
          type="range"
          min="0"
          max="999"
          value={maxValue}
          onChange={handleMaxChange}
          disabled={disabled}
        />
      </SliderWrapper>
      <PriceLabel>${maxValue}</PriceLabel>
    </SliderContainer>
  );
};

export default PricingSlider;