export type MovieType = {
    id: number;
    title: string;
    originalTitle: string;
    language: string;
    languages: string[];
    genres: string[];
    homepage: string | null;
    awardsSummary: string | null;
    backdropUrl: string | null;
    budget: number | null;
    cast: string[];
    countriesOfOrigin: string[];
    director: string | null;
    plot: string;
    posterUrl: string | null;
    production: string | null;
    releaseDate: string;
    releaseYear: number;
    revenue: number | null;
    runtime: number | null;
    searchL: string | null;
    status: string;
    tmdbRating: number | null;
    trailerUrl: string | null;
    trailerYouTubeId: string | null;
    keywords: string[];
  };

export type Genre = {
  name: string;
  imgUrl: string;
}