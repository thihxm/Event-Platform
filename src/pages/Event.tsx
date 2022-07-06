import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";

const mediaQuery = '(max-width: 1023px)';
const mediaQueryList = window.matchMedia(mediaQuery);

export function Event() {
  const { slug } = useParams<{ slug: string }>()

  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    } 
    mediaQueryList.addEventListener('change', handleChange)
    return () => {
      mediaQueryList.removeEventListener('change', handleChange)   
    }
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [isMobile])
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }
  }, [isOpen])

  const handleMobileNavClick = (newValue: boolean) => {
    setIsOpen(newValue)
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Header onMobileNavClick={handleMobileNavClick} isOpen={isOpen} />
      <main className="flex flex-1">
        { slug ?
          <Video lessonSlug={slug} /> :
          <div className="flex-1" />
        }
        <Sidebar isOpen={isOpen} />
      </main>
    </div>
  )
}