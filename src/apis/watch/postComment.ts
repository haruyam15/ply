import axios from 'axios';

interface INewCommentData {
  content: string;
  date: string;
  writer: string;
}
const postComment = async (playlistId: string, newCommentData: INewCommentData) => {
  try {
    const response = await axios.post(`/.netlify/functions/server/api/commentAdd/${playlistId}`, {
      commentsContent: newCommentData.content,
      commentsDate: newCommentData.date,
      commentsWriter: newCommentData.writer,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default postComment;
