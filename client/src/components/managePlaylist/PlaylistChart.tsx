/** @jsxImportSource @emotion/react */
import DraggableItem from '@/components/managePlaylist/DraggableItem';
import useYoutubeDataStore from '@/stores/useYoutubeDataStore';
import { css } from '@emotion/react';
import { MessageCircleWarning } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const PlaylistChart: React.FC = () => {
  const youTubelistData = useYoutubeDataStore((state) => state.youTubelistData);
  const draggedData = useYoutubeDataStore((state) => state.draggedData);

  const handleDragDrop = (dragIndex: number, hoverIndex: number) => {
    const dropItem = [...youTubelistData];
    const draggedItem = dropItem.splice(dragIndex, 1);
    dropItem.splice(hoverIndex, 0, draggedItem[0]);
    draggedData(dropItem);
  };

  const handleDeletePlaylist = (index: number) => {
    draggedData(youTubelistData.filter((_, i) => i !== index));
  };

  return (
    <div css={playlistChartWrapper('top')}>
      <DndProvider backend={HTML5Backend}>
        {youTubelistData.length > 0 ? (
          <ul css={{ width: '100%' }}>
            {youTubelistData.map((youTubelistData, index) => (
              <DraggableItem
                key={index}
                index={index}
                youTubelistData={youTubelistData}
                handleDragDrop={handleDragDrop}
                handleDeletePlaylist={handleDeletePlaylist}
              />
            ))}
          </ul>
        ) : (
          <div css={playlistChartWrapper('center')}>
            <MessageCircleWarning />
            <p>영상을 추가해 보세요.</p>
          </div>
        )}
      </DndProvider>
    </div>
  );
};

export default PlaylistChart;

const playlistChartWrapper = (position: string) => css`
  width: 100%;
  height: 790px;
  margin-left: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: ${position};
  font-size: 22px;
  color: #6b6b6b;
  overflow-y: auto;
  & p {
    margin-left: 10px;
  }
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #242424;
    border-radius: 10px;
  }
`;
