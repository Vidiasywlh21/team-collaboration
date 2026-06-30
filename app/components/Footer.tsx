import Link from "next/link";

export default function Footer({ variant = "default" }: { variant?: "default" | "maroon" }) {
  if (variant === "maroon") {
    return (
      <footer className="border-t border-[#4a1520] py-8 mt-16 text-sm" style={{ background: "#561C24" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#E8D8C4] flex items-center justify-center text-[#6D2932] font-bold text-xs">
              S
            </div>
            <span className="font-bold text-[#E8D8C4]">SinergiSpace</span>
          </div>
          <p className="text-xs text-[#E8D8C4]/70">
            &copy; {new Date().getFullYear()} SinergiSpace Team Collaboration Hub. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex gap-4 text-xs font-medium text-[#E8D8C4]/80">
            <Link href="/bantuan" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="/bantuan" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-[#561C24]/30 py-8 mt-16 text-sm" style={{ background: "#561C24" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#E8D8C4] flex items-center justify-center text-[#561C24] font-bold text-xs">
            S
          </div>
          <span className="font-bold text-[#E8D8C4]">SinergiSpace</span>
        </div>
        <p className="text-xs text-[#E8D8C4]/70">
          &copy; {new Date().getFullYear()} SinergiSpace Team Collaboration Hub. Hak Cipta Dilindungi Undang-Undang.
        </p>
        <div className="flex gap-4 text-xs font-medium text-[#E8D8C4]/80">
          <Link href="/bantuan" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
          <Link href="/bantuan" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
        </div>
      </div>
    </footer>
  );
}
