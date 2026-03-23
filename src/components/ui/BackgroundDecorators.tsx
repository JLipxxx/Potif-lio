export default function BackgroundDecorators() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-brand-neon/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-brand-cyan/5 blur-[150px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] opacity-80" />
      <div className="absolute inset-0 bg-[url('/Potif-lio/grid.svg')] opacity-[0.02] mix-blend-overlay" />
    </div>
  );
}
