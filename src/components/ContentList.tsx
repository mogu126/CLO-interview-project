import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import ContentCard from './ContentCard';
import SortDropdown from './SortDropdown';

import { fetchContents } from '../store/slices/contentSlice';
import type { AppDispatch, RootState } from '../store';
import SkeletonCard from './SkeletonCard';
import type { ContentItem } from '../types';



const ListContainer = styled.div`
  padding: 10px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const LoadingText = styled.p`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;

  p {
    margin-top: 16px;
    font-size: 18px;
  }
`;




const ContentList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredItems, allItems, currentPage, totalItems, isLoading } = useSelector(
    (state: RootState) => state.content
  );


  const hasInitialized = useRef(false);
  const PAGE_SIZE = 12;
  
  // initial data fetch
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      dispatch(fetchContents(1));
    }
  }, [dispatch]);

  // render skeleton cards
  const renderSkeletons = () => {
    return Array(PAGE_SIZE)
      .fill(0)
      .map((_, index) => <SkeletonCard key={`skeleton-${index}`} />);
  };



  // load more data
  const fetchMoreData = () => {
    if (allItems.length < totalItems && !isLoading) {
      dispatch(fetchContents(currentPage));
    }
  };

 

  // no items found 
  if (filteredItems.length === 0 && !isLoading && allItems.length > 0) {
    return (
      <EmptyState>
        <h3>No items found</h3>
        <p>Try adjusting your filters or search keyword</p>
      </EmptyState>
    );
  }

  return (
    <ListContainer>
      <SortDropdown />
      <InfiniteScroll
        dataLength={filteredItems.length}
        next={fetchMoreData}
        hasMore={allItems.length < totalItems}
        loader={<LoadingText>Loading more items...</LoadingText>}
        endMessage={<LoadingText>No more items to load</LoadingText>}
      >
        <Grid>
          {isLoading && allItems.length === 0 ? (
            renderSkeletons()
          ) : (
            filteredItems.map((item: ContentItem) => (
              <ContentCard key={item.id} item={item} />
            ))
          )}
        </Grid>
      </InfiniteScroll>
    </ListContainer>
  );
};

export default ContentList;
