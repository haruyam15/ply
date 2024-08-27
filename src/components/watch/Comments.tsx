/** @jsxImportSource @emotion/react */
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import { EllipsisVertical } from 'lucide-react';

import Button from '@/components/Button';
import User from '@/components/User';
import { colors } from '@/styles/colors';
import { UserData } from '@/types/User';

const TESTURL = [
  'https://avatars.githubusercontent.com/u/131119152?s=64&v=4',
  'https://avatars.githubusercontent.com/u/143858798?s=64&v=4',
  'https://avatars.githubusercontent.com/u/147500032?s=64&v=4',
  'https://avatars.githubusercontent.com/u/169154369?s=64&v=4',
  'https://avatars.githubusercontent.com/u/110523397?v=4',
];
const user: UserData = {
  information: {
    userid: 'haruyam15',
    profileimage: TESTURL[4],
    nickname: '하루얌',
    password: '1234',
  },
  like: ['playlist1', 'playlist2'],
  following: [
    {
      userid: 'Sonseongoh',
      nickname: '성오',
      profileimage: TESTURL[0],
    },
    {
      userid: 'dhkim511',
      nickname: '도형',
      profileimage: TESTURL[1],
    },
    {
      userid: 'love1ace',
      nickname: '동영',
      profileimage: TESTURL[2],
    },
    {
      userid: 'ssumanlife',
      nickname: '수민',
      profileimage: TESTURL[3],
    },
    {
      userid: 'abcde',
      nickname: 'hahaha',
      profileimage: TESTURL[4],
    },
  ],
  followers: [
    { userid: 'Sonseongoh', nickname: '성오', profileimage: TESTURL[0] },
    { userid: 'dhkim511', nickname: '도형', profileimage: TESTURL[1] },
    { userid: 'love1ace', nickname: '동영', profileimage: TESTURL[2] },
    { userid: 'ssumanlife', nickname: '수민', profileimage: TESTURL[3] },
  ],
  myplaylist: [],
};

function Comments() {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const [comment, setComment] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { profileimage, nickname, userid } = user.information;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 250)}px`;
    }
  }, [comment]);
  return (
    <div className="comments" css={comments}>
      <div className="comments-header">
        <p>댓글</p>
        <div className="write-wrap">
          <div className="writer">
            <User
              profileImage={profileimage}
              nickName={nickname}
              userId={userid}
              size="md"
              onlyImage={true}
            />
          </div>
          <textarea onChange={handleChange} value={comment} ref={textareaRef} />
          <Button>확인</Button>
        </div>
      </div>
      <ul className="comments-body">
        <li>
          <div className="writer-profile">
            <User
              profileImage={profileimage}
              nickName={nickname}
              userId={userid}
              size="md"
              onlyImage={true}
            />
          </div>
          <div className="detail">
            <p className="writer">
              하루얌 <span> 1시간 전</span>
            </p>
            <div className="comment">윤하 노래 좋으니까 다들 들어봐여</div>
          </div>
          <div className="more">
            <button>
              <EllipsisVertical />
            </button>
          </div>
        </li>
        <li>
          <div className="writer-profile">
            <User
              profileImage={TESTURL[2]}
              nickName={nickname}
              userId={userid}
              size="md"
              onlyImage={true}
            />
          </div>
          <div className="detail">
            <p className="writer">
              도넛 <span> 2시간 전</span>
            </p>
            <div className="comment">오...</div>
          </div>
          <div className="more">
            <button>
              <EllipsisVertical />
            </button>
          </div>
        </li>
        <li>
          <div className="writer-profile">
            <User
              profileImage={TESTURL[1]}
              nickName={nickname}
              userId={userid}
              size="md"
              onlyImage={true}
            />
          </div>
          <div className="detail">
            <p className="writer">
              dodo <span> 3시간 전</span>
            </p>
            <div className="comment">나 여기 왜 안갔냐</div>
          </div>
          <div className="more">
            <button>
              <EllipsisVertical />
            </button>
          </div>
        </li>
        <li>
          <div className="writer-profile">
            <User
              profileImage={TESTURL[3]}
              nickName={nickname}
              userId={userid}
              size="md"
              onlyImage={true}
            />
          </div>
          <div className="detail">
            <p className="writer">
              민민민 <span> 2일 전</span>
            </p>
            <div className="comment">이거지이~~</div>
          </div>
          <div className="more">
            <button>
              <EllipsisVertical />
            </button>
          </div>
        </li>
        <li>
          <div className="writer-profile">
            <User
              profileImage={TESTURL[0]}
              nickName={nickname}
              userId={userid}
              size="md"
              onlyImage={true}
            />
          </div>
          <div className="detail">
            <p className="writer">
              오오5 <span> 1주 전</span>
            </p>
            <div className="comment">잘 부르네요 ㄷㄷ</div>
          </div>
          <div className="more">
            <button>
              <EllipsisVertical />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Comments;

const comments = css`
  .comments-header {
    margin-bottom: 30px;
    & > p {
      margin: 10px 0 20px;
      font-size: 20px;
    }
    .write-wrap {
      display: flex;
      align-items: center;
      gap: 20px;

      textarea {
        width: 100%;
        color: #fff;
        border-bottom: 1px solid ${colors.darkestGray};
        resize: none;
        box-sizing: border-box;
        overflow: hidden;
      }
      button {
        flex-shrink: 0;
      }
    }
  }
  .comments-body {
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
        padding-top: 5px;
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
  }
`;
