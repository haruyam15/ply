/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '@/styles/colors';
import { IComment } from '@/types/playlistTypes';
import { IUserInformation } from '@/types/userTypes';
import { useEffect, useState } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { getUserData } from '@/apis/getUserData';
import User from '@/components/User';

type UsersData = Pick<IUserInformation, 'profileimage' | 'nickname'> | null;

interface ICommentListProps {
  comments: IComment[];
}

function CommentList({ comments }: ICommentListProps) {
  const [commentUsersData, setCommentUsersData] = useState<UsersData[]>([]);
  useEffect(() => {
    const getCommentUsersData = async () => {
      const data = await Promise.all(
        comments.map((comment) => getUserData(comment.commentsWriter).then((res) => res)),
      );
      setCommentUsersData(data);
    };

    getCommentUsersData();
  }, [comments]);
  return (
    <ul css={commentsList} className="comments-list">
      {comments.map((comment, i) => {
        if (!commentUsersData[i]) {
          return <li key={i}></li>;
        }
        return (
          <li key={i}>
            <div className="writer-profile">
              <User
                profileimage={commentUsersData[i].profileimage}
                nickname={commentUsersData[i].nickname}
                userid={comment.commentsWriter}
                size="md"
                onlyImage={true}
              />
            </div>
            <div className="detail">
              <p className="writer">
                {commentUsersData[i].nickname} <span> {comment.commentsDate}</span>
              </p>
              <div className="comment">{comment.commentsContent}</div>
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
