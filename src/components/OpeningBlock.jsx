import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const BLOCK_SIZE = 0.28

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

function createBlockFaceTexture(label, sublabel) {
  const canvas = document.createElement('canvas')
  const size = 128
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = '#222222'
  ctx.textAlign = 'center'
  ctx.font = 'bold 40px monospace'
  ctx.textBaseline = 'middle'
  ctx.fillText(String(label), size / 2, size / 2 - 16)
  if (sublabel) {
    ctx.font = 'bold 24px monospace'
    ctx.fillText(sublabel, size / 2, size / 2 + 22)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

/** Block that creates/builds as createProgress goes 0→1 (section scrolls into view) */
export default function CreatingBlock({ blockNumber, openProgress: createProgress, index }) {
  const meshRef = useRef()
  const groupRef = useRef()
  const texture = useRef(createBlockFaceTexture(blockNumber, 'Block')).current

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return
    const t = easeOutCubic(Math.min(1, Math.max(0, createProgress)))
    // Block builds: scale from 0 to 1, opacity 0 to 1
    const scale = t
    const opacity = t
    groupRef.current.scale.setScalar(scale)
    if (meshRef.current.material) {
      meshRef.current.material.opacity = opacity
    }
    // Subtle idle rotation when complete
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.04 + index * 0.08
  })

  return (
    <group ref={groupRef} scale={0}>
      <mesh ref={meshRef}>
        <boxGeometry args={[BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE]} />
        <meshStandardMaterial
          map={texture}
          color="#ffffff"
          emissive="#111111"
          metalness={0.05}
          roughness={0.95}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  )
}

export { BLOCK_SIZE }
