import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import CreatingBlock, { BLOCK_SIZE } from './OpeningBlock'

const BLOCK_GAP = 0.12
const SLOT_HEIGHT = BLOCK_SIZE + BLOCK_GAP
const RING_RADIUS = BLOCK_SIZE * 0.35
const TUBE_RADIUS = BLOCK_SIZE * 0.08

function ChainLink({ y }) {
  const mesh = useRef()

  useFrame((state) => {
    if (mesh.current) mesh.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  const meshOffset = -SLOT_HEIGHT / 2
  return (
    <group position={[0, y, 0]}>
      <mesh ref={mesh} position={[0, meshOffset, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RING_RADIUS, TUBE_RADIUS, 6, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#111111"
          metalness={0.15}
          roughness={0.9}
        />
      </mesh>
    </group>
  )
}

function SectionBlocks({ sectionOpenProgress }) {
  const groupRef = useRef()
  const N = sectionOpenProgress.length

  return (
    <group ref={groupRef}>
      {sectionOpenProgress.map((openProgress, i) => {
        const y = -i * SLOT_HEIGHT
        return (
          <group key={i} position={[0, y, 0]}>
            <CreatingBlock
              blockNumber={i + 1}
              openProgress={openProgress}
              index={i}
            />
          </group>
        )
      })}
      {sectionOpenProgress.slice(0, -1).map((_, i) => (
        <ChainLink key={`link-${i}`} y={-(i + 0.5) * SLOT_HEIGHT} />
      ))}
    </group>
  )
}

export default function SectionBlockChain({ sectionOpenProgress = [], isDarkTheme = true }) {
  const defaultProgress = [0, 0, 0, 0, 0, 0, 0]
  const progress = sectionOpenProgress.length ? sectionOpenProgress : defaultProgress

  return (
    <div
      className="fixed left-0 top-1/2 -translate-y-1/2 w-28 md:w-36 h-[70vh] max-h-[500px] z-20 pointer-events-none hidden sm:flex sm:flex-col sm:items-center sm:justify-center"
      style={{ background: 'transparent' }}
    >
      <div className="w-full h-full min-h-48">
        <Canvas
          camera={{ position: [2, 0, 2], fov: 32 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 1.5]}
        >
          <SectionBlocks sectionOpenProgress={progress} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 2, 2]} intensity={1} />
          <directionalLight position={[-1, -1, 1]} intensity={0.3} />
        </Canvas>
      </div>
    </div>
  )
}
