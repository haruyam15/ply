const gridItemsData = Array.from({ length: 100 }, (_, index) => ({
  videoId: 'pERDk4KoW-s',
  title: `Example Domain ${index + 1}`,
  user: `User${(index % 5) + 1}`, // User1, User2, ... User5 반복
}));

export default gridItemsData;
