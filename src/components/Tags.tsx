/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { X } from 'lucide-react';
import { colors } from '@/styles/colors';

interface TagsProps {
  tags: string[];
  deletable?: boolean;
  position?: boolean;
  onClick?: (index: number) => void;
}
function Tags({ tags, deletable = false, position = false, onClick }: TagsProps) {
  return (
    <ul css={tagWrap(deletable, position)}>
      {tags.map((tag, index) => (
        <li key={index}>
          {tag}
          {deletable && onClick && (
            <span className="del" onClick={() => onClick(index)}>
              <X size={15} />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Tags;

const tagWrap = (deletable: boolean, position: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: end;
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
  ${position &&
  `
    justify-content: start;
  `}

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
