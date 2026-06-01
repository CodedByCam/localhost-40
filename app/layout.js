import "./globals.css";

export const metadata = {
  title: "localhost:40 Memos",
  description:
    "localhost:40 Memos by a product engineer researching and exploring products, markets, and wonders.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
