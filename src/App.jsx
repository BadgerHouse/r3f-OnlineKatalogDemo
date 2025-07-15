import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import WhiteRoom from './components/WhiteRoom'
import ModelSpawner from './components/ModelSpawner'
import CameraRig from './components/CameraRig'
import './App.css'

const models = [
  { id: 1, color: 'red' },
  { id: 2, color: 'blue' },
  { id: 3, color: 'green' },
  { id: 4, color: 'orange' },
  { id: 5, color: 'purple' },
  { id: 6, color: 'yellow' },
  { id: 7, color: 'pink' },
  { id: 8, color: 'teal' },
  { id: 9, color: 'brown' },
  { id: 10, color: 'gray' },
]

function App() {
  const [activeModel, setActiveModel] = useState(null)
  const [queuedModel, setQueuedModel] = useState(null)
  const [gridMinimized, setGridMinimized] = useState(false)

  const handleClick = (model) => {
  setGridMinimized(true)

  if (activeModel) {
    // Mevcut modeli kaldır
    setQueuedModel({ ...model, remove: false, _id: Date.now() }) // sıradaki model
    setActiveModel({ ...activeModel, remove: true, _id: Date.now() + 1 }) // mevcut model flaglenir
  } else {
    // Direkt göster
    setActiveModel({ ...model, remove: false, _id: Date.now() })
  }
}


  const handleModelDespawned = () => {
    // Mevcut model sahneden tamamen silindi
    if (queuedModel) {
      setActiveModel({ ...queuedModel, remove: false }) // yeni modeli sahneye al
      setQueuedModel(null)
    }
  }

  return (
    <div className="app-container">
      <Canvas shadows camera={{ position: [0, 3, 10], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
        <Suspense fallback={null}>
          <CameraRig active={true} />
          <WhiteRoom />
          {activeModel && (
            <ModelSpawner
              model={activeModel}
              onDespawn={handleModelDespawned}
            />
          )}
        </Suspense>
      </Canvas>

      <div className={`fullscreen-grid ${gridMinimized ? 'minimized' : ''}`}>
        {models.map((model) => (
          <button
            key={model.id}
            className="grid-button"
            style={{ '--btn-color': model.color }}
            onClick={() => handleClick(model)}
          >
            {model.color}
          </button>
        ))}
      </div>
    </div>
  )
}

export default App
