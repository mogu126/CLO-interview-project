import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setSelectedPricing, resetFilters, setPriceRange } from '../store/slices/contentSlice';
import type { AppDispatch, RootState } from '../store';
import type { PricingOption } from '../types';
import PricingSlider from './PricingSlider';



const FilterContainer = styled.div`
  background-color: #131116;
  padding: 20px;
  margin-bottom: 40px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const FilterTitle = styled.h3`
  font-size: 13px;
  color: #828185;
  margin: 0;
`;
 
const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
  
  @media (max-width: 550px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const PricingOptions = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const SliderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 550px) {
    width: 100%;
    order: 2;
    justify-content: flex-start;
    
  }

`;


const PricingOptionItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 15px;
  color: #828185;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    background-color: red;
  }
  input[type="checkbox"]:checked {
    background-color: #007bff; 
  }
`;

const ResetButton = styled.button`
  background-color: #131116;
  color: #828185;
  border-radius: 4px;
  font-size: 14px;
  position: absolute;
  right: 16px;

  &:hover {
    color: #0056b3;
  }

  &:active {
    color: #004085;
  }
  
  @media (max-width: 550px) {
    position: static;
    align-self: flex-start;
    order: 3;
  }
`;


const FilterSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedPricing } = useSelector((state: RootState) => state.content);
  
  const isFreeOrViewOnlySelected = selectedPricing.includes(1) || selectedPricing.includes(2);
  const isPaidSelected = selectedPricing.includes(0);


   const pricingOptions: { value: PricingOption; label: string }[] = [
    { value: 0, label: 'Paid' },
    { value: 1, label: 'Free' },
    { value: 2, label: 'View Only' },
  ];


  const handlePricingChange = (value: PricingOption) => {
    const newSelected = selectedPricing.includes(value)
      ? selectedPricing.filter((item: any) => {
  
        return item !== value
      }) // cancel selection
      : [...selectedPricing, value]; // add new selection

    dispatch(setSelectedPricing(newSelected));
    
    // Reset price range when Free or View Only is selected
    if ((value === 1 || value === 2) && newSelected.includes(value)) {
      dispatch(setPriceRange({ min: 0, max: 999 }));
    }
  };

  return (
    <FilterContainer>
      <FilterRow>
        <FilterTitle>Pricing Option</FilterTitle>
        <PricingOptions>
          {pricingOptions.map((option) => 
           {
      
            return (
               <PricingOptionItem key={option.value}>
              <input
                type="checkbox"
                checked={selectedPricing.includes(option.value)}
                onChange={() => handlePricingChange(option.value)}
              />
              {option.label}
            </PricingOptionItem>
            )
           }
           
          )}
        </PricingOptions>
        <SliderSection>
          <PricingSlider disabled={isFreeOrViewOnlySelected || !isPaidSelected} />
        </SliderSection>
        <ResetButton onClick={() => dispatch(resetFilters())}>RESET</ResetButton>
      </FilterRow>
    </FilterContainer>
  );
};

export default FilterSection;
