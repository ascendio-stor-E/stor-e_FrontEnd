import { StoryPageData } from '../types/StoryPageData';

export type StoryViewerProps = {
    storyTitle: string;
    storyPages: StoryPageData[];
    pageNumber: number;
  };