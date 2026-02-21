import { useState, useEffect, useCallback } from 'react'

const SECTION_IDS = [
  'about-me',
  'tech-stack',
  'experience',
  'education',
  'hire-me',
  'payment',
  'connect'
]

export function useSectionProgress() {
  const [progress, setProgress] = useState(() => SECTION_IDS.map(() => 0))

  const updateProgress = useCallback(() => {
    const viewportHeight = window.innerHeight
    const scrollY = window.scrollY

    setProgress(
      SECTION_IDS.map((id) => {
        const el = document.getElementById(id)
        if (!el) return 0

        const rect = el.getBoundingClientRect()
        const sectionTop = rect.top
        const sectionHeight = rect.height

        const visibleTop = Math.max(0, -sectionTop)
        const visibleBottom = Math.min(sectionHeight, viewportHeight - sectionTop)
        const visibleHeight = Math.max(0, visibleBottom - visibleTop)

        if (visibleHeight <= 0) return 0
        const ratio = visibleHeight / Math.min(viewportHeight * 0.6, sectionHeight)
        const eased = 1 - Math.pow(1 - Math.min(1, ratio), 1.5)
        return eased
      })
    )
  }, [])

  useEffect(() => {
    const run = () => requestAnimationFrame(updateProgress)
    run()
    const t = setTimeout(run, 500)
    const handleScroll = run
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [updateProgress])

  return { progress, sectionIds: SECTION_IDS }
}
