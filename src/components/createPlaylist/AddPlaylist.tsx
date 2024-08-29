/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@/components/Button';
import { colors } from '@/styles/colors';
import Tags from '@/components/Tags';

const AddPlaylist = () => {
  const data = (
    <iframe
      width="370"
      height="200"
      src="https://www.youtube.com/embed/11iZcYbq_is?si=GMd-x0VJ4Q6uALkf"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ></iframe>
  );
  let url = 'https://www.youtube.com/watch?v=11iZcYbq_is';
  let imgUrl = '';
  if (url) {
    const idExtractionFromUrl =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(idExtractionFromUrl);
    if (match) {
      const videoId = match[1];
      imgUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  } else {
    url = '';
  }
  return (
    <div css={createPlaylistWrapper(imgUrl)}>
      <form css={formArea}>
        <div css={videoArea}>{data}</div>
        <div>
          <p>플레이리스트 제목</p>
          <input
            css={[titleArea, { width: '100%' }]}
            type="text"
            placeholder="제목을 입력해주세요."
          />
        </div>
        <p>공개 여부</p>
        <div css={disclosureStatusWrapper}>
          <label htmlFor="public">
            <input type="radio" name="disclosureStatus" id="public" defaultChecked />
            <p>공개</p>
          </label>
          <label htmlFor="nondisclosure" css={{ marginLeft: '20px' }}>
            <input type="radio" name="disclosureStatus" id="nondisclosure" />
            <p>비공개</p>
          </label>
        </div>
        <div>
          <p>설명</p>
          <textarea css={discriptionArea}></textarea>
        </div>
        <p>영상추가</p>
        <div css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <input
            css={[titleArea, { width: '75%' }]}
            type="text"
            placeholder="영상 링크를 입력해주세요."
          />
          <Button size="md">추가</Button>
        </div>
        <p>태그</p>
        <div css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <input
            css={[titleArea, { width: '75%' }]}
            type="text"
            placeholder="태그 입력 후 엔터를 눌러주세요."
          />
          <Button size="md">추가</Button>
        </div>
        <Tags tags={['신남', '7080']} deletable={true} />
      </form>
    </div>
  );
};

export default AddPlaylist;

const createPlaylistWrapper = (imgUrl: string) => css`
  width: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  ${imgUrl &&
  `
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url(${imgUrl});
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  `}
`;

const formArea = css`
  width: 370px;
  padding: 30px 0;
  & div {
    margin-bottom: 40px;
  }
  & div:nth-of-type(6),
  & div:nth-of-type(7) {
    margin-bottom: 10px;
  }
`;

const videoArea = css`
  width: 100%;
  height: 200px;
  background-color: #222;
  border-radius: 5px;
  overflow: hidden;
`;

const titleArea = css`
  margin-top: 15px;
  border-bottom: 1px solid ${colors.white};
  color: ${colors.white};
  padding: 3px;
  box-sizing: border-box;
`;

const disclosureStatusWrapper = css`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 10px;
  & label {
    height: 20px;
    display: flex;
    align-items: center;
    accent-color: ${colors.black};
    & p {
      padding-top: 3px;
      margin-left: 5px;
    }
  }
`;

const discriptionArea = css`
  resize: none;
  width: 100%;
  height: 80px;
  border: 1px solid ${colors.white};
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  color: ${colors.white};
  margin-top: 15px;
`;
