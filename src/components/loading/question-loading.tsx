export const QuestionLoading = () => {
  return (
    <div className="flex animate-pulse flex-col gap-6 rounded-lg bg-zinc-100 p-9 dark:bg-zinc-900 sm:px-11">
      <div role="status" className="max-w-lg animate-pulse space-y-2.5">
        <div className="flex w-full items-center">
          <div className="h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        </div>
        <div className="flex w-full max-w-[480px] items-center">
          <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        </div>
        <div className="flex w-full max-w-[400px] items-center">
          <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="ms-2 h-2.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        </div>
        <div className="flex w-full max-w-[480px] items-center">
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        </div>
        <div className="flex w-full max-w-[440px] items-center">
          <div className="ms-2 h-2.5 w-32 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="ms-2 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="flex w-full max-w-[360px] items-center">
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="ms-2 h-2.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="ms-2 h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
