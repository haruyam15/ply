export interface Playlist {
	id2: string
	link: string[]
	title: string
	content: string
	id: string
	like: string[]
	numOfLike: number
	comments: Comment[]
}

export interface Comment {
	commentsContent: string
	commentsDate: string
	commentsWriter: string
}
