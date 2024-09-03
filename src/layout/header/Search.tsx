/** @jsxImportSource @emotion/react */
import { useState } from 'react';

import { css } from '@emotion/react';
import { Search as LucideSearch } from 'lucide-react';

import { colors } from '@/styles/colors';

function Search() {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState('');
  const handleFocus = () => {
    setIsFocus((prev) => !prev);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div css={search(isFocus)}>
      <div className="inner">
        <input
          title="검색어"
          value={value}
          onFocus={handleFocus}
          onBlur={handleFocus}
          onChange={handleChange}
        />
        <button type="submit">
          <LucideSearch size="18" />
        </button>
      </div>
    </div>
  );
}

export default Search;

const search = (isFocus: boolean) => css`
  width: calc(100% - 660px);
  left: 50%;
  max-width: 600px;
  min-width: 361px;
  position: absolute;
  top: 13px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  z-index: 11100;
  @media (min-width: 1200px) {
    width: calc(100% - 930px);
  }

  .inner {
    display: flex;
    height: 38px;
    padding: 0 12px 0 14px;
    border: 1px solid ${isFocus ? `#1EE13C` : `#4a4a4a`};
    border-radius: 20px;
    align-items: center;
  }

  input {
    color: ${colors.placeHolderGray};
    flex: 1 1;
    font-size: 15px;
    height: 100%;
    min-width: 0;
    outline: none;
  }

  button {
    color: ${colors.veryLightGray};
  }
`;
