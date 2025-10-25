import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setSortBy } from '../store/slices/contentSlice';
import type { AppDispatch, RootState } from '../store';
import type { SortOption } from '../types';

const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const SortLabel = styled.label`
  font-size: 14px;
  color: #828185;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  padding: 13px 12px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #828185;
  border-bottom: 1px solid #828185;
  background-color: #1B1A21;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:after {
    content: '▼';
    font-size: 10px;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #1B1A21;
  border-top: none;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 1000;
`;

const DropdownItem = styled.li`
  padding: 13px 12px;
  font-size: 14px;
  color: #828185;
  cursor: pointer;
  
  &:hover {
    background-color: #2A2930;
  }
  
  &.selected {
    background-color: #3A3940;
  }
`;

const SortDropdown: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sortBy } = useSelector((state: RootState) => state.content);
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'name', label: 'Item Name' },
    { value: 'price-high', label: 'Higher Price' },
    { value: 'price-low', label: 'Lower Price' }
  ];

  const currentOption = options.find(opt => opt.value === sortBy);

  const handleOptionClick = (value: SortOption) => {
    dispatch(setSortBy(value));
    setIsOpen(false);
  };

  return (
    <SortContainer>
      <SortLabel>Sort by</SortLabel>
      <DropdownContainer>
        <DropdownButton onClick={() => setIsOpen(!isOpen)}>
          {currentOption?.label}
        </DropdownButton>
        {isOpen && (
          <DropdownList>
            {options.map(option => (
              <DropdownItem
                key={option.value}
                className={option.value === sortBy ? 'selected' : ''}
                onClick={() => handleOptionClick(option.value as SortOption)}
              >
                {option.label}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </DropdownContainer>
    </SortContainer>
  );
};

export default SortDropdown;