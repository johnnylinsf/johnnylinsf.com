export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-2xl px-6 py-10">
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Johnny Lin
        </p>
      </div>
    </footer>
  );
}
