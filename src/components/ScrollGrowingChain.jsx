import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SCROLL_PER_BLOCK = 100
const MAX_BLOCKS = 50
const MAX_VISIBLE = 4

const BLOCK_SIZE = 0.3
const BLOCK_GAP = 0.1
const SLOT_HEIGHT = BLOCK_SIZE + BLOCK_GAP
const LERP_SPEED = 8
const TRANSITION_DURATION = 0.4

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

function createBlockLabelTexture(blockNumber) {
  const canvas = document.createElement('canvas')
  const size = 128
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, size, size)
  ctx.fillStyle = '#222222'
  ctx.textAlign = 'center'
  ctx.font = 'bold 52px monospace'
  ctx.textBaseline = 'middle'
  ctx.fillText(String(blockNumber), size / 2, size / 2 - 18)
  ctx.font = 'bold 32px monospace'
  ctx.fillText('Block', size / 2, size / 2 + 28)
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function ChainBlock({ blockNumber, index, fromY, toY, progressRef, isNew }) {
  const mesh = useRef()
  const texture = useMemo(() => createBlockLabelTexture(blockNumber), [blockNumber])

  useFrame((state) => {
    if (mesh.current) {
      const t = easeOutCubic(Math.min(1, progressRef.current))
      const y = fromY + (toY - fromY) * t
      const scale = isNew ? t * (1 + 0.1 * Math.sin(t * Math.PI)) : 1
      mesh.current.rotation.y = state.clock.elapsedTime * 0.08 + index * 0.1
      mesh.current.position.y = y
      mesh.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={mesh} position={[0, fromY, 0]} scale={isNew ? 0 : 1}>
      <boxGeometry args={[BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE]} />
      <meshStandardMaterial
        map={texture}
        color="#ffffff"
        emissive="#111111"
        metalness={0.05}
        roughness={0.95}
      />
    </mesh>
  )
}

function AnimatedLink({ index, fromY, toY, progressRef }) {
  const mesh = useRef()
  const groupRef = useRef()

  useFrame((state) => {
    if (mesh.current && groupRef.current) {
      const t = easeOutCubic(Math.min(1, progressRef.current))
      groupRef.current.position.y = fromY + (toY - fromY) * t
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const ringRadius = BLOCK_SIZE * 0.35
  const tubeRadius = BLOCK_SIZE * 0.08
  const meshOffset = -SLOT_HEIGHT / 2
  return (
    <group ref={groupRef} position={[0, fromY, 0]}>
      <mesh ref={mesh} position={[0, meshOffset, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[ringRadius, tubeRadius, 6, 16]} />
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

function ChainBlocks({ blockCount }) {
  const groupRef = useRef()
  const targetY = useRef(0)
  const currentY = useRef(0)
  const prevBlockCount = useRef(blockCount)
  const progressRef = useRef(1)
  const [transition, setTransition] = useState({ active: false, scrollDown: true })
  useEffect(() => {
    const prev = prevBlockCount.current
    if (blockCount > prev && blockCount > MAX_VISIBLE) {
      setTransition({ active: true, scrollDown: true })
      progressRef.current = 0
    } else if (blockCount < prev && blockCount >= MAX_VISIBLE) {
      setTransition({ active: true, scrollDown: false })
      progressRef.current = 0
    }
    prevBlockCount.current = blockCount
  }, [blockCount])

  useFrame((state, delta) => {
    if (groupRef.current) {
      currentY.current += (targetY.current - currentY.current) * Math.min(1, LERP_SPEED * delta)
      groupRef.current.position.y = currentY.current
    }
    if (transition.active) {
      progressRef.current = Math.min(1, progressRef.current + delta / TRANSITION_DURATION)
      if (progressRef.current >= 1) setTransition((t) => ({ ...t, active: false }))
    } else {
      progressRef.current = 1
    }
  })

  const startIdx = blockCount > MAX_VISIBLE ? blockCount - MAX_VISIBLE : 0
  const visibleCount = Math.min(blockCount, MAX_VISIBLE)

  targetY.current =
    blockCount >= MAX_VISIBLE
      ? ((MAX_VISIBLE - 1) / 2) * SLOT_HEIGHT
      : blockCount > 0
        ? ((blockCount - 1) / 2) * SLOT_HEIGHT
        : 0

  const blockData = Array.from({ length: visibleCount }, (_, i) => {
    const globalIdx = startIdx + i
    let fromY, toY
    const finalY = -i * SLOT_HEIGHT
    if (!transition.active) {
      fromY = toY = finalY
    } else if (transition.scrollDown) {
      if (i < 3) {
        fromY = -(i + 1) * SLOT_HEIGHT
        toY = finalY
      } else {
        fromY = -4 * SLOT_HEIGHT
        toY = finalY
      }
    } else {
      if (i === 0) {
        fromY = SLOT_HEIGHT
        toY = finalY
      } else {
        fromY = -(i - 1) * SLOT_HEIGHT
        toY = finalY
      }
    }
    return { globalIdx, fromY, toY, isNew: i === (transition.scrollDown ? 3 : 0) && transition.active }
  })

  const linkData = Array.from({ length: Math.max(0, visibleCount - 1) }, (_, i) => {
    const globalIdx = startIdx + i
    const finalY = -i * SLOT_HEIGHT
    let fromY, toY
    if (!transition.active) {
      fromY = toY = finalY
    } else if (transition.scrollDown) {
      fromY = -(i + 1) * SLOT_HEIGHT
      toY = finalY
    } else {
      fromY = i === 0 ? SLOT_HEIGHT : -(i - 1) * SLOT_HEIGHT
      toY = finalY
    }
    return { globalIdx, fromY, toY }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {blockData.map(({ globalIdx, fromY, toY, isNew }) => (
        <group key={`block-${globalIdx}`} position={[0, 0, 0]}>
          <ChainBlock
            blockNumber={globalIdx + 1}
            index={globalIdx}
            fromY={fromY}
            toY={toY}
            progressRef={progressRef}
            isNew={isNew}
          />
        </group>
      ))}
      {linkData.map(({ globalIdx, fromY, toY }) => (
        <AnimatedLink key={`link-${globalIdx}`} index={globalIdx} fromY={fromY} toY={toY} progressRef={progressRef} />
      ))}
    </group>
  )
}

export default function ScrollGrowingChain({
  isDarkTheme = true,
  scrollY = 0,
  totalScrollHeight = 3000,
}) {
  const blockCount = Math.min(
    MAX_BLOCKS,
    Math.max(0, Math.floor(scrollY / SCROLL_PER_BLOCK))
  )

  return (
    <div
      className="fixed left-0 top-1/2 -translate-y-1/2 w-28 md:w-36 h-64 z-20 pointer-events-none hidden sm:flex sm:flex-col sm:items-center sm:justify-center"
      style={{ background: 'transparent' }}
    >
      <div className="w-full h-full min-h-48">
        <Canvas
          camera={{ position: [2, 0, 2], fov: 35 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 1.5]}
        >
        <ChainBlocks blockCount={blockCount} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <directionalLight position={[-1, -1, 1]} intensity={0.3} />
      </Canvas>
      </div>
    </div>
  )
}
