/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '@/styles/colors';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { adjustTextAreaHeight } from '@/utils/adjustTextAreaHeight';
import Button from '@/components/Button';
import User from '@/components/User';
import useUserStore from '@/stores/useUserStore';

function CommentWrite() {
  const user = useUserStore((state) => state.userInformation);
  const { profileImage, nickname, userId } = user;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [commentInput, setCommentInput] = useState<string>('');
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
  };

  const submitComment = () => {
    const comment = commentInput;
    if (comment.length === 0) {
      alert('댓글을 입력해주세요');
      return;
    }
    alert('완료');
    console.log(comment);
    setCommentInput('');
  };

  useEffect(() => {
    adjustTextAreaHeight(textareaRef);
  }, [commentInput]);

  return (
    <div css={commentWrite} className="comment-write">
      <p>댓글</p>
      <div className="write-wrap">
        <div className="writer">
          <User
            profileImage={profileImage}
            nickname={nickname}
            userId={userId}
            size="md"
            onlyImage={true}
          />
        </div>
        <textarea onChange={handleChange} value={commentInput} ref={textareaRef} />
        <Button onClick={submitComment}>확인</Button>
      </div>
    </div>
  );
}
const commentWrite = css`
  margin-bottom: 30px;
  & > p {
    margin: 10px 0 20px;
    font-size: 20px;
  }
  .write-wrap {
    display: flex;
    gap: 20px;
    align-items: felx-start;
    textarea {
      width: 100%;
      color: #fff;
      border-bottom: 1px solid ${colors.darkestGray};
      resize: none;
      overflow: auto;
    }
    button {
      flex-shrink: 0;
    }
  }
`;

export default CommentWrite;
