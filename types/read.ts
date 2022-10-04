export interface IDetailsChapter {
  title: string;
  chapter: string;
  updatedAt: string;
  urlComic: string;
}
export interface ICommentItem {
  id: string;
  username: string;
  avatar: string;
  content: string;
  createdAt: string;
}
export interface ICommentReply extends ICommentItem {
  mentionUser: string;
}
export interface IComment extends ICommentItem {
  replyComments: ICommentReply[];
}
export interface IImagesChapter {
  alt: string;
  imageUrl: string;
}
export interface IDataChapter {
  imageUrls: {
    alt: string;
    imageUrl: string;
  }[];
  detailsChapter: IDetailsChapter;
  comments: IComment[];
}
