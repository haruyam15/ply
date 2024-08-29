/** @jsxImportSource @emotion/react */
import DraggableItem from '@/components/createPlaylist/DraggableItem';
import { css } from '@emotion/react';
import { MessageCircleWarning } from 'lucide-react';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export interface IChartData {
  id: string;
  title: string;
  imgUrl: string;
  channelTitle: string;
  viewCount: string;
  publishedAt: string;
}

const youTubeData = [
  {
    id: '1',
    title: '[MV] 이영지 - Small girl feat. 도경수 (D.O.)',
    imgUrl: 'https://img.youtube.com/vi/11iZcYbq_is/hqdefault.jpg',
    channelTitle: '이영지',
    viewCount: '2877만회',
    publishedAt: '2개월 전',
  },
  {
    id: '2',
    title: '[MV] 이영지 - Small girl',
    imgUrl: 'https://img.youtube.com/vi/11iZcYbq_is/hqdefault.jpg',
    channelTitle: '이영지',
    viewCount: '2877만회',
    publishedAt: '2개월 전',
  },
];
const PlaylistChart: React.FC = () => {
  const [chart, setChart] = useState(youTubeData);

  const handleDragDrop = (dragIndex: number, hoverIndex: number) => {
    const dropChart = [...chart];
    const [draggedItem] = dropChart.splice(dragIndex, 1);
    dropChart.splice(hoverIndex, 0, draggedItem);
    setChart(dropChart);
  };
  console.log(chart);
  return (
    <DndProvider backend={HTML5Backend}>
      <div css={playlistChartWrapper}>
        {chart.length > 0 ? (
          <ul css={{ width: '100%' }}>
            {chart.map((chartData, index) => (
              <DraggableItem
                key={chartData.id}
                index={index}
                chartData={chartData}
                handleDragDrop={handleDragDrop}
              />
            ))}
          </ul>
        ) : (
          <>
            <MessageCircleWarning />
            <p>영상을 추가해 보새요.</p>
          </>
        )}
      </div>
    </DndProvider>
  );
};

export default PlaylistChart;

const playlistChartWrapper = css`
  width: calc(100% - 450px);
  margin-left: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: top;
  font-size: 22px;
  color: #6b6b6b;
  transition: all 0.4;
  & p {
    margin-left: 10px;
  }
`;
