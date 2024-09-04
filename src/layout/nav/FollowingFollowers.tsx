/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { If } from '@/components/IfElse';
import FList from '@/layout/nav/FList';
import useNavStore from '@/stores/useNavStore';
import { colors } from '@/styles/colors';
import { Tab } from '@/types/navTypes';

const FOLLOWING = 'following';
const FOLLOWERS = 'followers';

function FollowingFollowers() {
  const isExpand = useNavStore((state) => state.isExpand);
  const [selected, setSelected] = useState<Tab>(FOLLOWERS);

  const handleTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setSelected(target.value.toLowerCase() as Tab);
  };

  return (
    <div css={tabWrap}>
      <If test={isExpand}>
        <If.Then>
          <ul className="tab">
            <li>
              <button onClick={handleTab} aria-selected={selected === FOLLOWERS} value={FOLLOWERS}>
                팔로워
              </button>
            </li>
            <li>
              <button onClick={handleTab} aria-selected={selected === FOLLOWING} value={FOLLOWING}>
                팔로잉
              </button>
            </li>
          </ul>
          <FList tab={selected} />
        </If.Then>
        <If.Else>
          <div className="f-wrap">
            <p>팔로잉</p>
            <FList tab={selected} />
          </div>
          <div className="f-wrap">
            <p>팔로워</p>
            <FList tab={selected} />
          </div>
        </If.Else>
      </If>
    </div>
  );
}

export default FollowingFollowers;

const tabWrap = css`
  position: relative;
  padding: 18px;
  min-height: 370px;
  box-sizing: border-box;

  &::before {
    background-color: ${colors.borderGray};
    content: '';
    height: 1px;
    left: 21px;
    position: absolute;
    right: 21px;
    top: 0;
  }
  .tab {
    margin: 0 auto 22px;
    display: flex;
    justify-content: space-between;
    text-align: center;

    li {
      flex: 1;
      position: relative;
    }
    li:hover {
      cursor: pointer;
    }
    button {
      width: 100%;
      display: block;
      padding: 10px 10px 13px;
      color: ${colors.lightestGray};
    }
    button:hover {
      color: ${colors.lightestGray};
    }
    button[aria-selected='true'] {
      color: ${colors.primaryGreen};
    }
    button[aria-selected='true']::after {
      content: '';
      height: 2px;
      position: absolute;
      left: 10px;
      right: 10px;
      bottom: 1px;
      background-color: ${colors.primaryGreen};
      border-radius: 2px;
      box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
    }
  }

  .f-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    &:last-child {
      padding-top: 20px;
    }
    &:last-child::before {
      background-color: #333d4b;
      content: '';
      height: 1px;
      left: 21px;
      position: absolute;
      right: 21px;
      top: 0;
      margin: 0 -18px;
    }
    p {
      margin-bottom: 10px;
      font-size: 10px;
    }
  }
`;
