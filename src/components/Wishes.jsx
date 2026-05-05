import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from "@/lib/supabase";

gsap.registerPlugin(ScrollTrigger);

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return "Baru saja";
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  return `${Math.floor(diff / 86400)} hari lalu`;
}

function WishCard({ wish }) {
  return (
    <div
      className="wish-card opacity-0 border border-gold/15 bg-white/40 backdrop-blur-sm rounded-sm px-6 py-6 space-y-3 transition-all duration-500 hover:border-gold/35 hover:shadow-lg"
      style={{ boxShadow: "0 2px 16px rgba(180,155,100,0.06)" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold/20 to-sage/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
            <span className="font-cormorant text-gold text-base font-light">
              {wish.nama.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-cormorant text-sage-dark text-base font-semibold">
              {wish.nama}
            </p>
          </div>
        </div>
        <p className="font-elle text-sage-dark/40 text-xs flex-shrink-0 mt-1">
          {timeAgo(wish.created_at)}
        </p>
      </div>
      <div className="w-full h-px bg-gold/15" />
      <p className="font-cormorant text-sage-dark/75 text-base leading-relaxed italic">
        "{wish.pesan}"
      </p>
    </div>
  );
}

export default function Wishes() {
  const sectionRef = useRef(null);
  const wishListRef = useRef(null);
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nama: "", pesan: "" });
  const [status, setStatus] = useState("idle");

  const fetchWishes = useCallback(async () => {
    const { data, error } = await supabase
      .from("wishes")
      .select("id, nama, pesan, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (!error && data) setWishes(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wishes-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: { trigger: ".wishes-title", start: "top 85%" },
        },
      );
      gsap.fromTo(
        ".wishes-form-wrap",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: ".wishes-form-wrap", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".wish-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".wishes-list", start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [wishes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama || !form.pesan) return;
    setStatus("loading");

    const { data, error } = await supabase
      .from("wishes")
      .insert({ nama: form.nama, pesan: form.pesan })
      .select()
      .single();

    if (error) {
      setStatus("error");
      return;
    }

    setWishes((w) => [data, ...w]);
    setForm({ nama: "", pesan: "" });
    setStatus("success");
    setTimeout(() => setStatus("idle"), 2500);
    wishListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream py-24 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sage/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #8B7355 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="wishes-title text-center mb-14 space-y-3 opacity-0">
          <p className="font-cormorant text-gold tracking-[0.4em] text-xs uppercase">
            Doa & Restu
          </p>
          <h2 className="font-cormorant text-sage-dark text-4xl md:text-5xl font-light italic">
            Ucapan & Doa
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/50" />
          </div>
          <p className="font-cormorant text-sage-dark/60 text-lg italic mt-4">
            Sampaikan doa dan ucapan terbaik Anda
          </p>
        </div>

        <div className="wishes-form-wrap opacity-0 mb-12">
          <form
            onSubmit={handleSubmit}
            className="border border-gold/20 bg-white/40 backdrop-blur-sm rounded-sm px-8 py-8 space-y-5"
            style={{ boxShadow: "0 4px 32px rgba(180,155,100,0.07)" }}
          >
            <p className="font-cormorant text-sage-dark text-xl italic text-center">
              Tulis Ucapan Anda
            </p>
            <div className="w-8 h-px bg-gold/30 mx-auto" />

            <div className="space-y-1.5">
              <label className="font-elle text-gold text-xs tracking-widest uppercase">
                Nama
              </label>
              <input
                type="text"
                value={form.nama}
                required
                onChange={(e) =>
                  setForm((f) => ({ ...f, nama: e.target.value }))
                }
                placeholder="Nama Anda"
                className="w-full bg-transparent border-b border-gold/30 focus:border-gold/70 outline-none py-2 font-cormorant text-sage-dark text-base placeholder:text-sage-dark/30 transition-colors duration-300"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-elle text-gold text-xs tracking-widest uppercase">
                Ucapan & Doa
              </label>
              <textarea
                value={form.pesan}
                required
                rows={3}
                onChange={(e) =>
                  setForm((f) => ({ ...f, pesan: e.target.value }))
                }
                placeholder="Tuliskan ucapan dan doa terbaik Anda..."
                className="w-full bg-transparent border-b border-gold/30 focus:border-gold/70 outline-none py-2 font-cormorant text-sage-dark text-base placeholder:text-sage-dark/30 transition-colors duration-300 resize-none"
              />
            </div>

            {status === "error" && (
              <p className="font-elle text-red-400 text-xs tracking-wider text-center">
                Terjadi kesalahan. Silakan coba lagi.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 border border-gold/50 text-gold font-elle text-xs tracking-widest uppercase hover:bg-gold hover:text-cream transition-all duration-300 disabled:opacity-50"
            >
              {status === "loading"
                ? "Mengirim..."
                : status === "success"
                  ? "✓ Terkirim!"
                  : "Kirim Ucapan"}
            </button>
          </form>
        </div>

        <div ref={wishListRef} className="wishes-list space-y-4">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="border border-gold/10 bg-white/30 rounded-sm px-6 py-6 space-y-3 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold/10" />
                  <div className="space-y-1.5">
                    <div className="w-28 h-3 bg-gold/10 rounded" />
                    <div className="w-16 h-2 bg-gold/10 rounded" />
                  </div>
                </div>
                <div className="w-full h-px bg-gold/10" />
                <div className="space-y-2">
                  <div className="w-full h-2.5 bg-gold/10 rounded" />
                  <div className="w-3/4 h-2.5 bg-gold/10 rounded" />
                </div>
              </div>
            ))
          ) : wishes.length === 0 ? (
            <p className="font-cormorant text-sage-dark/50 text-center text-lg italic py-10">
              Belum ada ucapan. Jadilah yang pertama! 🤍
            </p>
          ) : (
            wishes.map((wish) => <WishCard key={wish.id} wish={wish} />)
          )}
        </div>

        <div className="text-center mt-14 space-y-3">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gold/50" />
            <div className="w-1.5 h-1.5 bg-gold rotate-45" />
            <div className="w-12 h-px bg-gold/50" />
          </div>
          <p className="font-cormorant text-sage-dark/60 text-lg italic">
            "Doa dari orang-orang terkasih adalah bekal terindah."
          </p>
          <p className="font-elle text-gold text-sm tracking-widest">
            — Chelsea & Ranu —
          </p>
        </div>
      </div>
    </section>
  );
}
