import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ModelSpawner = ({ model, onDespawn }) => {
  const groupRef = useRef()
  const meshRef = useRef()

  const [phase, setPhase] = useState(null) // 0: kavisli dönüş, 1: despawn
  const [t, setT] = useState(0)

  const isSpawning = !model.remove
  const isDespawning = model.remove

  // Eğri tanımı (J şekli)
  const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, 0.5, 0),         // Başlangıç
    new THREE.Vector3(0, 0.5, 2),         // Z yönüne çıkış
    new THREE.Vector3(2, 0.5, 2),         // Sağ köşe
    new THREE.Vector3(2, 0.5, -10)        // Geri iniş
  )

  // Başlangıç pozisyonu
  useEffect(() => {
    if (isSpawning) {
      setT(0)
      setPhase(null)
      groupRef.current.position.set(0, 0.5, -10)
      groupRef.current.rotation.y = 0
    }

    if (isDespawning) {
      setT(0)
      setPhase(0)
      groupRef.current.position.set(0, 0.5, 0)
      groupRef.current.rotation.y = 0
    }
  }, [model])

  // Eğri üzerinde ilerleme
  useFrame(() => {
    if (!groupRef.current) return

    // === DESPAWN HAREKETİ ===
    if (isDespawning && phase === 0) {
      const nextT = Math.min(t + 0.02, 1)
      setT(nextT)

      const point = curve.getPoint(nextT)
      const tangent = curve.getTangent(nextT)
      const angle = Math.atan2(tangent.x, tangent.z)

      groupRef.current.position.copy(point)
      groupRef.current.rotation.y = angle

      if (nextT >= 1) {
        setPhase(1)
        setT(0)
      }
      return
    }

    // === DESPAWN BİTİŞ ===
    if (isDespawning && phase === 1) {
      onDespawn?.()
    }

    // === SPAWN ===
    if (isSpawning && groupRef.current.position.z < -0.15) {
      groupRef.current.position.z += 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={model.color} />
      </mesh>
    </group>
  )
}

export default ModelSpawner
