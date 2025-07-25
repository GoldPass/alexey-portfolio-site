export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex-grow">{children}</div>;
}
