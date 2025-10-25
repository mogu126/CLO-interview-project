import React from 'react';
import styled from 'styled-components';


const SkeletonContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  animation: pulse 1.5s infinite;
`;

const SkeletonContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SkeletonLine = styled.div`
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;

  &:nth-child(1) {
    width: 70%;
  }

  &:nth-child(2) {
    width: 50%;
  }

  &:nth-child(3) {
    width: 30%;
  }
`;


const GlobalStyle = styled.style`
  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 0.6;
    }
  }
`;


const SkeletonCard: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <SkeletonContainer>
        <SkeletonImage />
        <SkeletonContent>
          <SkeletonLine />
          <SkeletonLine />
          <SkeletonLine />
        </SkeletonContent>
      </SkeletonContainer>
    </>
  );
};

export default SkeletonCard;
