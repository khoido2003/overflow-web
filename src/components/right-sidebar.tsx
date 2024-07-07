import { TopQuestions } from "./top-questions";
import { TopTags } from "./top-tags";

export const RightSidebar = () => {
  return (
    <section className="small-scrollbar sticky right-0 top-0 hidden h-screen overflow-y-auto bg-zinc-100 p-6 pt-36 dark:bg-zinc-900 md:flex-col md:gap-9 lg:flex lg:w-[350px]">
      <TopQuestions />

      <TopTags />
    </section>
  );
};
