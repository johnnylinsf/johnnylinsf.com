import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-6 py-24">
          <p className="text-6xl font-bold text-foreground mb-2">404</p>
          <p className="text-muted mb-6">Page not found.</p>
          <Link
            href="/"
            className="text-sm text-link underline decoration-link/30 hover:decoration-link"
          >
            Go home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
