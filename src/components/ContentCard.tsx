import React from 'react';
import styled from 'styled-components';
import type { ContentItem } from '../types';



const CardContainer = styled.div`
  background-color: #1A1920;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: #fff;
`;

const CardContent = styled.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  
  color: #828185;
  align-items: flex-start;
`;

const CardInfo = styled.div`
  flex: 1;
`;

const CardTitle = styled.h4`
  font-size: 14px;

`;

const CardUserName = styled.p`
  font-size: 14px;

  margin: 0;
`;

const CardPricing = styled.div<{ $isFree?: boolean; $isViewOnly?: boolean }>`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  text-align: right;
`;


interface ContentCardProps {
  item: ContentItem;
}

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  
  const getPricingText = () => {
    switch (item.pricingOption) {
      case 0: // PAID
        return `$${item.price?.toFixed(2) || '0.00'}`;
      case 1: // FREE
        return 'FREE';
      case 2: // VIEW_ONLY
        return 'View Only';
      default:
        return '';
    }
  };

  return (
    <CardContainer>
      <CardImage src={item.imagePath} alt={item.title} />
      <CardContent>
        <CardInfo>
          <CardTitle>{item.title}</CardTitle>
          <CardUserName>by {item.creator}</CardUserName>
        </CardInfo>
        <CardPricing
          $isFree={item.pricingOption === 1}
          $isViewOnly={item.pricingOption === 2}
        >
          {getPricingText()}
        </CardPricing>
      </CardContent>
    </CardContainer>
  );
};

export default ContentCard;
