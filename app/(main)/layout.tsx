import "./globals.css";

export const metadata = {
  title: "Портфолио разработчика",
  description: "Сайт-портфолио Алексея",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <main className="pt-4 pb-32 pl-4">{children}</main>
      </body>
    </html>
  );
}