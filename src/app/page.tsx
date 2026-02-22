import ScrollAnimation from '@/components/ScrollAnimation';
import { getImagesFromFolder } from '@/lib/utils';

export default async function Home() {
  // Dynamically fetch all images from the public/images folder
  const images = await getImagesFromFolder('/a');

  return (
    <main className="min-h-screen bg-black">
      {/* Scroll Animation Section */}
      <section className="relative">
        <ScrollAnimation images={images} />

        {/* Overlay text for the animation section */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase drop-shadow-sm">
            Aura Pro
          </h1>

        </div>
      </section>

      {/* Product Content Section */}
      <section className="relative z-20 bg-white text-black py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sm font-bold tracking-widest text-slate-500 uppercase">Masterpiece in sound</span>
            <h2 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
              Engineered for the Audio Purist.
            </h2>
            <p className="mt-8 text-lg text-slate-600 leading-relaxed">
              The Aura Pro combines industry-leading noise cancellation with a custom-engineered driver system to deliver a soundstage so vast, you'll feel like you're in the front row of a private concert.
            </p>

            <div className="mt-12 space-y-6">
              {[
                { title: 'PureBose™ Audio', desc: 'Distortion-free sound even at maximum volume.' },
                { title: '40-Hour Battery', desc: 'All-day listening with lightning-fast charging.' },
                { title: 'Adaptive ANC', desc: 'Blocks outside noise while preserving audio quality.' },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1.5 h-auto bg-black rounded-full" />
                  <div>
                    <h4 className="font-bold text-xl">{feature.title}</h4>
                    <p className="text-slate-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-12 px-10 py-5 bg-black text-white font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-xl">
              Pre-order Now — $349
            </button>
          </div>

          <div className="relative aspect-square bg-slate-100 rounded-3xl overflow-hidden flex items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="text-center p-8">
              <div className="text-9xl mb-4 grayscale opacity-20">🎧</div>
              <p className="text-sm font-medium text-slate-400">DESIGNED IN CALIFORNIA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Extra filler section */}
      <section className="bg-black text-white py-20 text-center border-t border-white/10">
        <p className="text-white/40 text-sm">© 2026 ANTIGRAVITY AUDIO. ALL RIGHTS RESERVED.</p>
      </section>
    </main>
  );
}
