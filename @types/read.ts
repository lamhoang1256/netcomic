export interface IDetailsChapter {
  title: string;
  chapter: string;
  updatedAt: string;
  urlComic: string;
}
export interface IReplyComment {
  id: string;
  username: string;
  avatar: string;
  content: string;
  createdAt: string;
  mentionUser: string;
}
export interface IComment {
  id: string;
  username: string;
  avatar: string;
  content: string;
  createdAt: string;
  replyComments: IReplyComment[];
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
