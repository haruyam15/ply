/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import SearchResults from '@/components/SearchResults';
import useSearch from '@/hooks/useSearch';
import SkeletonGridItem from '@/components/SkeletonGridItem';
import { colors } from '@/styles/colors';
import useSearchStore from '@/stores/useSearchStore';

const SearchPage: React.FC = () => {
  const { searchResults, isLoading, error } = useSearch();
  const searchTerm = useSearchStore((state) => state.searchTerm);

  return (
    <div css={containerStyle}>
      <div css={headerContainerStyle}>
        <div css={headerStyle}>
          <div css={textContainerStyle}>
            <span css={nicknameStyle}>{searchTerm}</span>
            <div css={actionTextStyle}>의 검색 결과</div>
          </div>
        </div>
        <div css={lineStyle}></div>
      </div>

      <div css={contentStyle}>
        {isLoading ? (
          <div css={skeletonContainerStyle}>
            {[...Array(8)].map((_, index) => (
              <SkeletonGridItem key={index} />
            ))}
          </div>
        ) : error ? (
          <div css={messageStyle}>오류: {error}</div>
        ) : (
          <SearchResults results={searchResults} error={error} searchTerm={searchTerm} />
        )}
      </div>
    </div>
  );
};

const containerStyle = css`
  width: 100%;
  background-color: ${colors.black};
  margin: 0 auto;
  margin-top: 40px;
  padding: 20px;
`;

const headerContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 20px;
`;

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const textContainerStyle = css`
  display: flex;
  align-items: center;
`;

const nicknameStyle = css`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.white};
`;

const actionTextStyle = css`
  font-size: 16px;
  color: ${colors.lightestGray};
  margin-left: 4px;
  margin-top: 4px;
`;

const lineStyle = css`
  width: 100%;
  height: 1px;
  background-color: ${colors.borderGray};
  margin-top: 8px;
`;

const contentStyle = css`
  padding: 30px;
`;

const skeletonContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
`;

const messageStyle = css`
  text-align: center;
  font-size: 24px;
  color: ${colors.lightestGray};
  margin-top: 40px;
`;

export default SearchPage;
