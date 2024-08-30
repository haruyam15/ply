/** @jsxImportSource @emotion/react */
import DraggableItem from '@/components/createPlaylist/DraggableItem';
import usePlaylistDataStore from '@/stores/usePlaylistDataStore';
import { css } from '@emotion/react';
import { MessageCircleWarning } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export interface IChartData {
  id: string;
  title: string;
  imgUrl: string[];
  channelTitle: string;
}

const PlaylistChart: React.FC = () => {
  const playlistData = usePlaylistDataStore((state) => state.playlistData);
  const [chart, setChart] = useState(playlistData);

  useEffect(() => {
    const handleChart = () => {
      setChart(playlistData);
    };
    handleChart();
  }, [playlistData]);

  const handleDragDrop = (dragIndex: number, hoverIndex: number) => {
    const dropChart = [...chart];
    const [draggedItem] = dropChart.splice(dragIndex, 1);
    dropChart.splice(hoverIndex, 0, draggedItem);
    setChart(dropChart);
  };

  const handleDeletePlaylist = (index: number) => {
    console.log(index, '--------');
    setChart(chart.filter((_, i) => i !== index));
    // const updatedChart = chart.filter((_, index) => index !== chart.length - 1);
    // setChart(updatedChart);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div css={playlistChartWrapper('top')}>
        {chart.length > 0 ? (
          <ul css={{ width: '100%' }}>
            {chart.map((chartData, index) => (
              <DraggableItem
                key={chartData.id}
                index={index}
                chartData={chartData}
                handleDragDrop={handleDragDrop}
                handleDeletePlaylist={handleDeletePlaylist}
              />
            ))}
          </ul>
        ) : (
          <div css={playlistChartWrapper('center')}>
            <MessageCircleWarning />
            <p>영상을 추가해 보새요.</p>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default PlaylistChart;

const playlistChartWrapper = (position: string) => css`
  width: 100%;
  min-height: 800px;
  margin-left: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: ${position};
  font-size: 22px;
  color: #6b6b6b;
  transition: all 0.4;
  & p {
    margin-left: 10px;
  }
`;
