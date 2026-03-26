'use client'

import { useSectionInView } from '@/utils/hooks/useSectionInView';

export const BroadcastsPage = () => {
  const { ref } = useSectionInView("broadcasts", 0.5);
  return (
    <section id="broadcasts" ref={ref} className="scroll-mt-28 w-full h-[700px] flex items-center justify-center bg-purple-200">BroadcastsPage</section >
  )
}
