import { motion } from "framer-motion";

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200 ${className}`} />
);

const MasterPagesSkeleton = () => {
  return (
    <main className="flex w-full max-w-full flex-col gap-4 md:flex-row">
      {/* Left Skeleton: Table */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex w-full flex-col gap-3 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[50%]"
      >
        <SkeletonBox className="h-6 w-1/2" />
        <SkeletonBox className="h-12 w-full" />

        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex w-full gap-3">
            <SkeletonBox className="h-10 w-[100px]" />
            <SkeletonBox className="h-10 w-full" />
            <SkeletonBox className="h-10 w-full" />
            <SkeletonBox className="h-10 w-[120px]" />
          </div>
        ))}
      </motion.section>

      {/* Right Skeleton: Form */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
        className="flex w-full flex-col gap-4 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[50%]"
      >
        <SkeletonBox className="h-6 w-1/2" />

        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <SkeletonBox className="h-4 w-1/3" />
            <SkeletonBox className="h-10 w-full" />
          </div>
        ))}

        {/* Simulate checkbox list */}
        <SkeletonBox className="mt-4 h-6 w-1/2" />
        <div className="flex max-h-[200px] flex-col gap-2 overflow-y-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <SkeletonBox className="h-4 w-[30px]" />
              <SkeletonBox className="h-4 w-full" />
              <SkeletonBox className="h-5 w-5 rounded-md" />
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
};

export default MasterPagesSkeleton;

export const InputSkeleton = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
      className="flex min-w-full flex-col gap-4 rounded-[12px] bg-white/80 p-4 shadow-sm md:w-[50%]"
    >
      <SkeletonBox className="h-6 w-1/2" />

      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <SkeletonBox className="h-4 w-1/3" />
          <SkeletonBox className="h-10 w-full" />
        </div>
      ))}

      {/* Simulate checkbox list */}
      <SkeletonBox className="mt-4 h-6 w-1/2" />
      <div className="flex max-h-[200px] flex-col gap-2 overflow-y-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <SkeletonBox className="h-4 w-[30px]" />
            <SkeletonBox className="h-4 w-full" />
            <SkeletonBox className="h-5 w-5 rounded-md" />
          </div>
        ))}
      </div>
    </motion.section>
  );
};
