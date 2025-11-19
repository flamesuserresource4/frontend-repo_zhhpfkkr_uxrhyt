import Spline from '@splinetool/react-spline'

function HeroSpline() {
  return (
    <div className="relative w-full h-[48vh] md:h-[56vh] lg:h-[64vh] overflow-hidden">
      <Spline scene="https://prod.spline.design/BWzdo650n-g-M9RS/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white/0 dark:from-black/60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-black" />
    </div>
  )
}

export default HeroSpline
