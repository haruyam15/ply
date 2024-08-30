import { If } from '@/components/IfElse';
import CommentWrite from '@/components/watch/CmmentWrite';
import CommentList from '@/components/watch/CommentList';
import useWatchData from '@/hooks/useWatchData';
import { useNavigate, useParams } from 'react-router-dom';

function Comments() {
  const navigate = useNavigate();
  const playlistId = useParams().playlistId as string;
  const { isLoading, data, error } = useWatchData(playlistId);
  if (isLoading) {
    return <></>;
  }
  if (error) {
    alert('플레이리스트 데이터를 불러오는데 실패했습니다.');
    navigate('/');
  }

  if (!data) {
    return null;
  }

  const comments = data.comments;

  return (
    <div className="comments">
      <CommentWrite />
      <If test={comments.length !== 0}>
        <If.Then>
          <CommentList comments={comments} />
        </If.Then>
        <If.Else>
          <div>댓글이 없습니다.</div>
        </If.Else>
      </If>
    </div>
  );
}

export default Comments;
