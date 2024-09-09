/** @jsxImportSource @emotion/react */
import { useRef } from 'react';
import { colors } from '@/styles/colors';
import { css } from '@emotion/react';
import { useDrag, useDrop } from 'react-dnd';
import { AlignJustify } from 'lucide-react';
import { IYoutubelistData } from '@/stores/useYoutubeDataStore';
import MenuDot from '@/components/MenuDot';

interface DraggableItemProps {
  youTubelistData: IYoutubelistData;
  index: number;
  handleDragDrop: (dragIndex: number, hoverIndex: number) => void;
  handleDeletePlaylist: (index: number) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  youTubelistData,
  index,
  handleDragDrop,
  handleDeletePlaylist,
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'chart',
    hover: (item: { index: number }) => {
      if (!ref.current) return;
      if (item.index !== index) {
        handleDragDrop(item.index, index);
        item.index = index;
      }
    },
  });

  const [, drag] = useDrag({
    type: 'chart',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} css={listArea}>
      <div css={{ cursor: 'pointer' }}>
        <AlignJustify />
      </div>
      <div css={videoArea(youTubelistData?.imgUrl?.[0])}></div>
      <div css={youtubeDataArea}>
        <p>{youTubelistData?.title}</p>
        <span>{youTubelistData?.channelTitle}</span>
      </div>
      <div css={{ position: 'absolute', right: '10px', top: '8px' }}>
        <MenuDot showEdit={false} deleteItem={handleDeletePlaylist} index={index} />
      </div>
    </div>
  );
};

export default DraggableItem;

const videoArea = (imgUrl?: string) => css`
  min-width: 220px;
  width: 280px;
  height: 160px;
  background-color: #222;
  border-radius: 5px;
  overflow: hidden;
  margin-left: 20px;
  flex-shrink: 0;
  ${imgUrl &&
  `
  background-image: url(${imgUrl});
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  `}
`;
const listArea = css`
  width: 98%;
  height: 180px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  position: relative;
  :hover {
    background-color: #242424;
  }
`;
const youtubeDataArea = css`
  display: flex;
  align-items: top;
  flex-direction: column;
  height: 100%;
  padding: 20px 30px 0 0;
  & p {
    color: ${colors.white};
    font-size: 18px;
    margin-bottom: 20px;
  }
  & span {
    margin-left: 10px;
    font-size: 16px;
  }
`;
