export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>  {/* Navbarを消す */}
    </html>
  );
}