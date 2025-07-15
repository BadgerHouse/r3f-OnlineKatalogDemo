import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

const CameraRig = ({ active }) => {
  const { camera } = useThree()
  const progress = useRef(0)

  useFrame(() => {
    if (!active || progress.current >= 1) return

    progress.current += 0.01
    const eased = 1 - Math.pow(1 - progress.current, 3)

    // Kamera intro animasyonu
    camera.position.set(0, 3, 10 - eased * 5.2) // yukarıdan odanın içine yaklaş
    camera.lookAt(0, 0.5, 0)
  })

  return null
}

export default CameraRig
