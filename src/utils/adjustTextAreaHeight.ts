export const adjustTextAreaHeight = (
  textareaRef: React.RefObject<HTMLTextAreaElement>,
  maxHeight: number = 250,
) => {
  if (textareaRef.current) {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`;
  }
};
