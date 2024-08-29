/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Play } from 'lucide-react';

import { colors } from '@/styles/colors';

interface IVideoListProps {
  link: string[];
}

function VideoList({ link }: IVideoListProps) {
  return (
    <div className="video-list" css={list}>
      <div className="list-header">
        <p>180513 뷰티풀 민트 라이프 2018</p>
        <span>
          하루얌 <em>- 11 / 13</em>
        </span>
      </div>
      <ul className="list-body">
        <li>
          <div className="num">
            <Play size={12} fill={colors.white} />
          </div>
          <div className="thumb">
            <img
              src="//i.ytimg.com/vi/VndhR5TKzMw/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBOeT6AnNs83NafkmknR9aLnH3CGQ"
              alt=""
            />
          </div>
          <div className="video-info">
            <p>연애조건</p>
            <span>영상 만든사람</span>
          </div>
        </li>
        <li>
          <div className="num">2</div>
          <div className="thumb">
            <img
              src="//i.ytimg.com/vi/VndhR5TKzMw/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBOeT6AnNs83NafkmknR9aLnH3CGQ"
              alt=""
            />
          </div>
          <div className="video-info">
            <p>Stay With Me</p>
            <span>영상 만든사람</span>
          </div>
        </li>
        <li>
          <div className="num">2</div>
          <div className="thumb">
            <img
              src="//i.ytimg.com/vi/VndhR5TKzMw/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBOeT6AnNs83NafkmknR9aLnH3CGQ"
              alt=""
            />
          </div>
          <div className="video-info">
            <p>Stay With Me</p>
            <span>영상 만든사람</span>
          </div>
        </li>
        <li>
          <div className="num">2</div>
          <div className="thumb">
            <img
              src="//i.ytimg.com/vi/VndhR5TKzMw/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBOeT6AnNs83NafkmknR9aLnH3CGQ"
              alt=""
            />
          </div>
          <div className="video-info">
            <p>Stay With Me</p>
            <span>영상 만든사람</span>
          </div>
        </li>
        <li>
          <div className="num">2</div>
          <div className="thumb">
            <img
              src="//i.ytimg.com/vi/VndhR5TKzMw/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBOeT6AnNs83NafkmknR9aLnH3CGQ"
              alt=""
            />
          </div>
          <div className="video-info">
            <p>Stay With Me</p>
            <span>영상 만든사람</span>
          </div>
        </li>
        <li>
          <div className="num">2</div>
          <div className="thumb">
            <img
              src="//i.ytimg.com/vi/VndhR5TKzMw/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBOeT6AnNs83NafkmknR9aLnH3CGQ"
              alt=""
            />
          </div>
          <div className="video-info">
            <p>Stay With Me</p>
            <span>영상 만든사람</span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default VideoList;

const list = css`
  flex: 3;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid ${colors.darkestGray};
  overflow: hidden;

  .list-header {
    background: #212121;
    padding: 20px 15px;
    box-sizing: border-box;
    p {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 5px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2;
    }
    span {
      font-size: 13px;
      em {
        font-style: normal;
        color: ${colors.lightestGray};
      }
    }
  }

  .list-body {
    /* max-height: calc(100% - 80px); */
    overflow-y: auto;
    li {
      display: flex;
      padding: 10px 5px;
      align-items: center;
      gap: 10px;
      .num {
      }
      .thumb {
        width: 100px;
        flex-shrink: 0;
        img {
          height: auto;
          border-radius: 8px;
        }
      }
      .video-info {
        font-size: 15px;
        p {
          margin-bottom: 5px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.2;
        }
        span {
          font-size: 12px;
          color: ${colors.lightestGray};
        }
      }
    }

    li:hover {
      cursor: pointer;
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;
