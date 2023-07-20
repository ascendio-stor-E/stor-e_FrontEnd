import { StoryPageType } from "./StoryPageType";

export type StoryBook = {
    storyBookId: string,
    conversationId: string,
    coverImage: string,
    pages: StoryPageType[]
    options: string[]
};