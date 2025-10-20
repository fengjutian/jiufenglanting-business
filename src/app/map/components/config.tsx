import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

import { useState, useEffect } from 'react'

type configType = {
  isOpen: boolean
}

export const Config: React.FC<configType> = (props: configType) => {
  const [isOpen, setIsOpen] = useState(props?.isOpen ?? false)

  useEffect(() => {
    setIsOpen(props?.isOpen ?? false)
  }, [props?.isOpen])
  
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='right'
        className='bla bla bla'
      >
          <div>Hello World</div>
      </Drawer>
    </div>
  )
}
