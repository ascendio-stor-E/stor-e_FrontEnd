import { StoryPageData } from '../types/StoryPageData';

export type StoryViewer = {
    storyTitle: string;
    storyPages: StoryPageData[];
    pageNumber: number;
  };