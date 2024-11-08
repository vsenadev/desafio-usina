export interface IMovie {
  banner: string;
  photo: string;
  title: string;
  gender: string;
  year_release: number;
  duration: number;
  description: string;
  registration_user: string;
}

export interface IMovieUpdate {
  id: number;
  banner?: string;
  photo?: string;
  title?: string;
  gender?: string;
  year_release?: number;
  duration?: number;
  description?: string;
}
