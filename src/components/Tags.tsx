/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { X } from 'lucide-react';

import { colors } from '@/styles/colors';

function Tags({ tags, deletable = false }: TagsProps) {
  return (
    <ul css={tagWrap(deletable)}>
      {tags.map((tag) => (
        <li>
          {tag}
          <span className="del">
            <X size={15} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export default Tags;

const tagWrap = (deletable: boolean) => css`
  display: flex;
  align-items: center;
  gap: 5px;
  li {
    position: relative;
    display: flex;
    align-items: center;
    height: 25px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 5px;
    font-size: 11px;
    font-weight: 700;
    padding: 0 13px;
    color: ${colors.white};
    .del {
      display: none;
      position: absolute;
      top: -10px;
      right: -6px;
    }
  }

  ${deletable &&
  `
    li:hover{
      cursor: pointer;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      .del{
        display:block
      }
    }
    
  `}
`;

interface TagsProps {
  tags: string[];
  deletable?: boolean;
}
