/** @jsxImportSource @emotion/react */
import DraggableItem from '@/components/createPlaylist/DraggableItem';
import usePlaylistDataStore from '@/stores/useYoutubeDataStore';
import { css } from '@emotion/react';
import { MessageCircleWarning } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const PlaylistChart: React.FC = () => {
  const youTubelistData = usePlaylistDataStore((state) => state.youTubelistData);
  const draggabledData = usePlaylistDataStore((state) => state.draggabledData);

  const handleDragDrop = (dragIndex: number, hoverIndex: number) => {
    const dropItem = [...youTubelistData];
    const draggedItem = dropItem.splice(dragIndex, 1);
    dropItem.splice(hoverIndex, 0, draggedItem[0]);
    draggabledData(dropItem);
  };

  const handleDeletePlaylist = (index: number) => {
    draggabledData(youTubelistData.filter((_, i) => i !== index));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div css={playlistChartWrapper('top')}>
        {youTubelistData ? (
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
