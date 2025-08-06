export default function Footer() {
  return (
    <footer className="py-8 text-center text-sm text-white/70">
      <div className="container mx-auto px-4">
        <p>
          &copy; {new Date().getFullYear()} DAIV.PRO. All rights reserved.
        </p>
        <p className="mt-2">
          Efficient AI Automation by DAIV.PRO
        </p>
      </div>
    </footer>
  );
} 