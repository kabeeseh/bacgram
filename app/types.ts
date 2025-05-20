export interface User {
  id: string;
  username: string;
  Posts: Post[];
  viewedPosts: Post[];
  password: string;
  createdAt: Date;
}
export interface Post {
  id: string;
  author: User;
  authorId: Number;
  title: string;
  content: string;
  views: Number;
  viewedBy: User[];
  createdAt: Date;
}
