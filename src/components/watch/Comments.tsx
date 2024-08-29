import { IComment } from '@/types/playlistTypes';
import { If } from '@/components/IfElse';
import CommentWrite from '@/components/watch/CmmentWrite';
import CommentList from '@/components/watch/CommentList';

interface ICommentsProps {
  comments: IComment[];
}

function Comments({ comments }: ICommentsProps) {
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
