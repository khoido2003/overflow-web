import { number } from "zod";
import { GetQuestion } from "./question.types";

export interface TagOnQuestion {
  tag: Tag;
  questions: {
    question: GetQuestion;
  }[];
}

export interface TagInfo {
  id: string;
  name: string;
  description: string;
  _count: {
    tagOnQuestion: number;
  };
}

export interface Top5TagsParams {
  id: string;
  name: string;
  _count: {
    tagOnQuestion: number;
  };
}
