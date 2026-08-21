import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
title: 'RAZORA — Discover. Create. Sell.',
description: 'A global marketplace for digital and physical products.',
};

export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
return (
<html lang="en">
<body className="bg-gray-50 text-gray-900 antialiased">
{children}
</body>
</html>
);
}
