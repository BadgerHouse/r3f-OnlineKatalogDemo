// src/components/WhiteRoom.jsx
const WhiteRoom = () => {
  return (
    <group>
      {/* Zemin */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[10, 0.1, 10]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>

      {/* Tavan */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[10, 0.1, 10]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      {/* Arka duvar */}
      <mesh position={[0, 1.5, -5]}>
        <boxGeometry args={[10, 3, 0.1]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Ön duvar */}
      <mesh position={[0, 1.5, 5]}>
        <boxGeometry args={[10, 3, 0.1]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Sol duvar */}
      <mesh position={[-5, 1.5, 0]}>
        <boxGeometry args={[0.1, 3, 10]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Sağ duvar */}
      <mesh position={[5, 1.5, 0]}>
        <boxGeometry args={[0.1, 3, 10]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </group>
  )
}

export default WhiteRoom
