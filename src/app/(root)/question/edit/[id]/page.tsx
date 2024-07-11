import { EditorEdit } from "../_components/editor";

const Page = () => {
  return (
    <div>
      <h1 className="text-2xl font-extrabold">Edit Question</h1>

      <div className="mt-9">
        <EditorEdit />
      </div>
    </div>
  );
};

export default Page;
