/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '@/styles/colors';
import { EllipsisVertical } from 'lucide-react';
import User from '@/components/User';
import useWatchDataFetch from '@/hooks/useWatchDataFetch';
import { useNavigate, useParams } from 'react-router-dom';

function CommentList() {
  const navigate = useNavigate();
  const playlistId = useParams().playlistId as string;
  const { isLoading, data, isError } = useWatchDataFetch({ playlistId, optionalKey: 'comment' });

  if (isLoading) {
    return <></>;
  }

  if (isError) {
    alert('댓글을 가져오는데 오류가 발생했습니다.');
    navigate('/');
    return null;
  }

  if (!data) {
    return null;
  }

  if (data.comments.length === 0) {
    return <div css={emptyComment}>댓글이 없습니다.</div>;
  }

  const sortedComments = data.comments.reverse();

  return (
    <ul css={commentsList} className="comments-list">
      {sortedComments.map((comment, i) => {
        const {
          commentsWriter: userId,
          userName,
          profileImage,
          commentsContent: commentText,
          commentsDate: createdAt,
        } = comment;
        return (
          <li key={i}>
            <div className="writer-profile">
              <User
                profileImage={profileImage}
                nickname={userName}
                userId={userId}
                size="md"
                onlyImage={true}
              />
            </div>
            <div className="detail">
              <p className="writer">
                {userName} <span> {createdAt}</span>
              </p>
              <div className="comment">{commentText}</div>
            </div>
            <div className="more">
              <button>
                <EllipsisVertical />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;

const commentsList = css`
  li {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 20px;
    .writer-profile {
      flex-shrink: 0;
    }
    .detail {
      box-sizing: border-box;
      .writer {
        font-size: 15px;
        margin-bottom: 10px;
        span {
          font-size: 12px;
          color: ${colors.lightestGray};
        }
      }
      .comment {
        line-height: 1.2;
      }
    }
    .more {
      position: absolute;
      top: -3px;
      right: 0;
      padding: 2px;
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${colors.white};
      }
    }
    .more:hover {
      cursor: pointer;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 6px;
    }
  }
`;

const emptyComment = css`
  padding: 10px 0;
  text-align: center;
`;
