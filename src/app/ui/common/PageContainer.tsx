interface IPageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: IPageContainerProps) {
  return (
    <div className="max-w-screen-lg h-auto w-auto relative py-[8px] px-[16px] mx-auto">
      {children}
    </div>
  );
}
