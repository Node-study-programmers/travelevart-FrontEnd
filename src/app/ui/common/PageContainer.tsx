interface IPageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({
  children,
  className,
}: IPageContainerProps) {
  return (
    <div
      className={`max-w-screen-lg h-auto w-auto relative py-[8px] px-[16px] mx-auto ${className}`}
    >
      {children}
    </div>
  );
}
