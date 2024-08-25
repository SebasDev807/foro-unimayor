type Props = {
  children: React.ReactNode;
};

export const StickyWrapper = ({ children }: Props) => {
  return (
    <div className="hidden lg:block w-full max-w-xs sticky top-6">
      <div className="flex flex-col gap-y-4">{children}</div>
    </div>
  );
};
