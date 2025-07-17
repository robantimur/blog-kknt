export default function Footer() {
  return (
    <footer className="bg-card border-t mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} KKN Connect. All Rights Reserved.</p>
        <p className="text-sm mt-1">Dibuat oleh Kelompok 5 Tim 1.</p>
      </div>
    </footer>
  );
}
