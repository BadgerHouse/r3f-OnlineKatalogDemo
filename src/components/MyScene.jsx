// src/components/MyScene.jsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const MyScene = () => {
  const cubeRef = useRef()

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={cubeRef} position={[0, 1, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default MyScene
