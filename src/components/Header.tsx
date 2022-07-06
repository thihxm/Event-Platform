import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useEffect } from "react";
import { Logo } from "./Logo";

interface HeaderProps {
  isOpen: boolean
  onMobileNavClick: (newValue: boolean) => void;
}

export function Header({ onMobileNavClick, isOpen }: HeaderProps) {
  const STATE_MACHINE_NAME = 'Basic State Machine'
  const INPUT_NAME = 'Open'

  const { rive, RiveComponent } = useRive({
    src: '/hamburger_time.riv',
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
  })

  const onClickInput = useStateMachineInput(rive, STATE_MACHINE_NAME, INPUT_NAME, isOpen)
  const toggleHamburger = () => {
    if (onClickInput) {
      onClickInput.value = !onClickInput.value
      onMobileNavClick(onClickInput.value)
    }
  }

  useEffect(() => {
    if (onClickInput) {
      onClickInput.value = isOpen
    }
  }, [isOpen])

  return (
    <header className='w-full px-6 py-4 flex items-center justify-between bg-gray-700 border-b border-gray-600 lg:py-5 lg:px-0 lg:justify-center'>
      <Logo className="h-6 lg:h-auto" />

      <RiveComponent className="h-8 aspect-square lg:hidden" onClick={() => toggleHamburger()} />
    </header>
  )
}