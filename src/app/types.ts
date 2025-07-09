export interface User {
  id: Number;
  username: String;
  password: String;
  post: Post[];
  likedPosts: Post[];
  profileUrl: String;
  viewedPosts: Post[];
  createdAt: Date;
}
export interface Post {
  id: Number;
  authorId: Number;
  author: User;
  title: String;
  content: String;
  likedUsers: User[];
  likes: Number;
  viewedUsers: User[];
  imageUrl?: string | null;
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
