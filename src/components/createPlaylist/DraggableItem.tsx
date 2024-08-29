/** @jsxImportSource @emotion/react */
import { useRef } from 'react';
import { colors } from '@/styles/colors';
import { css } from '@emotion/react';
import { useDrag, useDrop } from 'react-dnd';
import { AlignJustify, Dot, EllipsisVertical } from 'lucide-react';
import { IChartData } from '@/components/createPlaylist/PlaylistChart';

interface IChartListProps {
  chartData: IChartData;
  index: number;
  handleDragDrop: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableItem: React.FC<IChartListProps> = ({ chartData, index, handleDragDrop }) => {
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
      <div css={videoArea(chartData.imgUrl)}></div>
      <div css={youtubeDataArea}>
        <p>{chartData.title}</p>
        <div css={etcArea}>
          <span>{chartData.channelTitle}</span>
          <Dot />
          <span>조회수 {chartData.viewCount}</span>
          <Dot />
          <span>{chartData.publishedAt}</span>
        </div>
      </div>
      <div css={{ position: 'absolute', right: '20px', top: '15px' }}>
        <EllipsisVertical />
      </div>
    </div>
  );
};

export default DraggableItem;

const videoArea = (imgUrl: string) => css`
  min-width: 220px;
  width: 220px;
  height: 160px;
  background-color: #222;
  border-radius: 5px;
  overflow: hidden;
  margin-left: 20px;
  ${imgUrl &&
  `
  background-image: url(${imgUrl});
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  `}
`;
const listArea = css`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  position: relative;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
const youtubeDataArea = css`
  display: flex;
  align-items: top;
  flex-direction: column;
  height: 100%;
  padding-top: 20px;
  & p {
    color: ${colors.white};
    font-size: 18px;
    margin-bottom: 20px;
  }
`;
const etcArea = css`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-left: 10px;
`;
