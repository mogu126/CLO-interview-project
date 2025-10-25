import React from 'react';
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

const SortSelect = styled.select`
  padding: 13px 12px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #828185;
  border-bottom: 1px solid #828185;
  background-color: #1B1A21;
  
  option {
    line-height: 2.5;
    background-color: #1B1A21;
    color: #828185;
  }
`;

const SortDropdown: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sortBy } = useSelector((state: RootState) => state.content);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(e.target.value as SortOption));
  };

  return (
    <SortContainer>
      <SortLabel>Sort by</SortLabel>
      <SortSelect value={sortBy} onChange={handleSortChange}>
        <option value="name">Item Name</option>
        <option value="price-high">Higher Price</option>
        <option value="price-low">Lower Price</option>
      </SortSelect>
    </SortContainer>
  );
};

export default SortDropdown;