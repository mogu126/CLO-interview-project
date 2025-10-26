import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setSearchKeyword } from '../store/slices/contentSlice';
import type { AppDispatch, RootState } from '../store';



const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 0 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 12px;
  font-size: 16px;
  color: #fff;
  background-color: #212026;
  border: 1px solid #212026;
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  
  transform: translateY(-50%);
  color: #828185;
  width: 25px;
  height: 25px;
  cursor: pointer;
  
  &:hover {
    color: #0056b3;
  }
  
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;


const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchKeyword } = useSelector((state: RootState) => state.content);
  const [inputValue, setInputValue] = useState(searchKeyword);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchKeyword(inputValue));
    }, 4000);

    return () => clearTimeout(timer);
  }, [inputValue, dispatch]);

  
  useEffect(() => {
    setInputValue(searchKeyword);
  }, [searchKeyword]);


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(setSearchKeyword(inputValue));
    }
  };


  const handleBlur = () => {
    dispatch(setSearchKeyword(inputValue));
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Find the Items you're looking for"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
      <SearchIcon>
        <svg viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </SearchIcon>
    </SearchContainer>
  );
};

export default SearchBar;
