const ErrorComponent = () => {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl bg-white/80 px-4 text-center">
      <img src="/images/warning.png" alt="Error" className="h-12 w-12" />
      <h1 className="text-2xl font-semibold text-red-600">
        Oops! Something went wrong.
      </h1>
      <p className="max-w-md text-sm text-zinc-600">
        An error occurred while processing your request. Please try again later
        or contact support if the issue persists.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95"
      >
        Retry
      </button>
    </main>
  );
};

export default ErrorComponent;
