import type React from "react"
import type { Metadata, Viewport } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "flowtype - Effortless Custom Contract Billing",
    template: "%s | flowtype",
  },
  description:
    "Streamline your billing process with seamless automation for every custom contract, tailored by flowtype.",
  keywords: [
    "contract billing",
    "billing automation",
    "custom contracts",
    "invoice management",
    "business automation",
  ],
  authors: [{ name: "flowtype" }],
  creator: "flowtype",
  publisher: "flowtype",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://flowtype.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "flowtype - Effortless Custom Contract Billing",
    description:
      "Streamline your billing process with seamless automation for every custom contract, tailored by flowtype.",
    siteName: "flowtype",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "flowtype - Custom Contract Billing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "flowtype - Effortless Custom Contract Billing",
    description:
      "Streamline your billing process with seamless automation for every custom contract, tailored by flowtype.",
    images: ["/twitter-image.jpg"],
    creator: "@flowtype",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${poppins.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}