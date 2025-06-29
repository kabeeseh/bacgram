export interface User {
  id: Number;
  username: String;
  password: String;
  post: Post[];
  viewedPosts: Post[];
  createdAt: Date;
}
export interface Post {
  id: Number;
  authorId: Number;
  author: User;
  title: String;
  content: String;
  viewedUsers: User[];
  createdAt: Date;
}
export type btnVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link"
  | null;
