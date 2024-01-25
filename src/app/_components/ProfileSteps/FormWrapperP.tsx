type FormWrapperProps = {
  title: string;
  children: React.ReactNode;
};

export function FormWrapperP({ title, children }: FormWrapperProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8  p-12">
      <h1 className="text-3xl font-bold">{title}</h1>
      {children}
    </div>
  );
}
