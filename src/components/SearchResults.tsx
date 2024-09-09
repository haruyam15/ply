/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { IPlaylist } from '@/types/playlistTypes';
import VideoGridItem from './VideoGridItem';
import User from './User';
import { colors } from '@/styles/colors';

interface SearchResultsProps {
  results: (IPlaylist | { type: 'user'; userId: string; userName: string; profileImage: string })[];
  error: string | null;
  searchTerm: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, error }) => {
  if (error) return <div css={errorStyle}>오류: {error}</div>;
  if (results.length === 0) return <div css={emptyStyle}>검색 결과가 없습니다.</div>;

  const users = results.filter(
    (result): result is { type: 'user'; userId: string; userName: string; profileImage: string } =>
      'type' in result && result.type === 'user',
  );
  const playlists = results.filter((result): result is IPlaylist => !('type' in result));

  return (
    <div css={containerStyle}>
      {users.length > 0 && (
        <div css={sectionStyle}>
          <h3 css={subHeadingStyle}>사용자</h3>
          <div css={resultsStyle}>
            {users.map((user, index) => (
              <User
                key={index}
                profileImage={user.profileImage}
                nickname={user.userName}
                userId={user.userId}
                size="xl"
              />
            ))}
          </div>
        </div>
      )}

      {playlists.length > 0 && (
        <div css={[sectionStyle, playlistSectionStyle]}>
          <h3 css={subHeadingpStyle}>플레이리스트</h3>
          <div css={resultsStyle}>
            {playlists.map((playlist, index) => (
              <VideoGridItem
                key={index}
                videoId={playlist.id ?? ''}
                title={playlist.title}
                user={playlist.userName}
                showEdit={false}
                showDelete={false}
                showMenuDot={false}
                tags={playlist.tags}
                profileImage={playlist.profileImage}
                userName={playlist.userName}
                userId={playlist.userId}
                imgUrl={playlist.imgUrl[0]}
                videoCount={playlist.link.length}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const containerStyle = css`
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
`;

const sectionStyle = css`
  margin-bottom: 60px;
`;

const playlistSectionStyle = css`
  margin-top: 60px;
`;

const subHeadingStyle = css`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  color: ${colors.white};
`;

const subHeadingpStyle = css`
  font-size: 24px;
  font-weight: bold;
  margin-top: 80px;
  margin-bottom: 40px;
  color: ${colors.white};
`;

const resultsStyle = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
`;

const errorStyle = css`
  text-align: center;
  font-size: 24px;
  color: ${colors.red};
  margin-top: 20px;
`;

const emptyStyle = css`
  text-align: center;
  font-size: 24px;
  color: ${colors.gray};
  margin-top: 20px;
`;

export default SearchResults;
