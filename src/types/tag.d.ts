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
