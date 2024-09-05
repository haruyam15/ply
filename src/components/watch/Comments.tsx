import CommentWrite from '@/components/watch/CmmentWrite';
import CommentList from '@/components/watch/CommentList';

function Comments() {
  return (
    <div className="comments">
      <CommentWrite />
      <CommentList />
    </div>
  );
}

export default Comments;
