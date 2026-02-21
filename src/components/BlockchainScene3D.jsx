import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Grid, Line } from '@react-three/drei'

// --- Voxel-style blockchain block with optional wireframe ---
function VoxelBlock({ position, scale = 1, rotationOffset = 0, wireframe = false }) {
  const mesh = useRef()

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.12 + rotationOffset
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
      <mesh ref={mesh} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#111111"
          metalness={0.05}
          roughness={0.95}
          wireframe={wireframe}
        />
      </mesh>
    </Float>
  )
}

// --- Blockchain chain links (connected rings) ---
function ChainLink({ position, rotation = [0, 0, 0] }) {
  const group = useRef()

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.08
    }
  })

  return (
    <group ref={group} position={position} rotation={rotation}>
      <mesh>
        <torusGeometry args={[0.3, 0.06, 8, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#0a0a0a"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
    </group>
  )
}

function BlockchainChain() {
  const chainRef = useRef()
  const links = useMemo(() => {
    const positions = []
    for (let i = 0; i < 6; i++) {
      positions.push([
        -2 + i * 0.85 + Math.sin(i * 0.5) * 0.3,
        Math.cos(i * 0.7) * 0.5,
        -5 - i * 0.2,
      ])
    }
    return positions
  }, [])

  useFrame((state) => {
    if (chainRef.current) {
      chainRef.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <group ref={chainRef}>
      {links.map((pos, i) => (
        <ChainLink key={i} position={pos} rotation={[0, (i * Math.PI) / 6, 0]} />
      ))}
    </group>
  )
}

// --- Network nodes with connecting lines ---
function NetworkNodes() {
  const nodesRef = useRef()
  const { nodePositions, connections } = useMemo(() => {
    const positions = [
      [-2, 1.5, -4],
      [2, 1, -5],
      [-1.5, -1, -4],
      [1.5, -1.5, -5],
      [0, 0.5, -6],
    ]
    const conns = [
      [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 4], [1, 4],
    ]
    return { nodePositions: positions, connections: conns }
  }, [])

  useFrame((state) => {
    if (nodesRef.current) {
      nodesRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <group ref={nodesRef}>
      {nodePositions.map((pos, i) => (
        <mesh key={`node-${i}`} position={pos}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#222222"
            metalness={0.1}
            roughness={0.9}
          />
        </mesh>
      ))}
      {connections.map(([a, b], i) => (
        <Line
          key={`line-${i}`}
          points={[nodePositions[a], nodePositions[b]]}
          color="#444444"
        />
      ))}
    </group>
  )
}

// --- Tech stack orbiting ring ---
function TechOrbitRing() {
  const group = useRef()
  const blocks = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2
      return [
        Math.cos(angle) * 2.5,
        Math.sin(angle) * 0.8,
        -4 + Math.sin(angle) * 0.5,
      ]
    })
  }, [])

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <group ref={group}>
      {blocks.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.35, 0.35, 0.35]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#111111"
            metalness={0.05}
            roughness={0.95}
          />
        </mesh>
      ))}
    </group>
  )
}

// --- Experience timeline chain (vertical blocks) ---
function ExperienceChain() {
  const group = useRef()
  const blocks = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => [
      (i % 2) * 1.5 - 0.75,
      -1.5 + i * 0.9,
      -5,
    ])
  }, [])

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={group}>
      {blocks.map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[0.5, 0.4, 0.5]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#0a0a0a"
            metalness={0.1}
            roughness={0.9}
            wireframe={i % 2 === 0}
          />
        </mesh>
      ))}
    </group>
  )
}

// --- Hero floating blocks (enhanced) ---
function HeroFloatingBlocks() {
  const blocks = useMemo(() => {
    const positions = [
      [-3, 1, -4],
      [3, -1, -5],
      [-2, -2, -3],
      [2.5, 0.5, -6],
      [0, 2, -4],
      [-3.5, -0.5, -5],
      [1.5, -1.5, -4],
      [-1, 1.5, -5],
    ]
    return positions.map((pos, i) => ({
      position: pos,
      scale: 0.35 + (i % 3) * 0.12,
      rotationOffset: (i / 8) * Math.PI * 2,
      wireframe: i % 3 === 0,
    }))
  }, [])

  return (
    <>
      {blocks.map((block, i) => (
        <VoxelBlock key={i} {...block} />
      ))}
    </>
  )
}

// --- Section-based visibility & blending ---
function SectionContent({
  scrollProgressRef,
  currentSectionRef,
  isMobileRef,
}) {
  const heroGroup = useRef()
  const chainGroup = useRef()
  const networkGroup = useRef()
  const techGroup = useRef()
  const expGroup = useRef()

  useFrame(() => {
    const section = currentSectionRef?.current ?? 'ABOUT_ME'

    if (heroGroup.current) heroGroup.current.visible = ['ABOUT_ME'].includes(section)
    if (chainGroup.current) chainGroup.current.visible = ['ABOUT_ME', 'HIRE_ME', 'PAYMENT_METHODS'].includes(section)
    if (networkGroup.current) networkGroup.current.visible = ['ABOUT_ME', 'EDUCATION_CERTS', 'CONNECT'].includes(section)
    if (techGroup.current) techGroup.current.visible = section === 'TECH_ARSENAL'
    if (expGroup.current) expGroup.current.visible = section === 'EXPERIENCE_TIMELINE'
  })

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} />
      <directionalLight position={[-5, -5, -5]} intensity={0.25} />
      <pointLight position={[0, 0, 2]} intensity={0.3} />

      <Grid
        args={[20, 20]}
        cellColor="#1a1a1a"
        sectionColor="#0f0f0f"
        fadeDistance={18}
        fadeStrength={1}
        infiniteGrid
        position={[0, 0, -9]}
      />

      <ScrollDrivenScene scrollProgressRef={scrollProgressRef}>
        <group ref={heroGroup}>
          <HeroFloatingBlocks />
        </group>
        <group ref={chainGroup}>
          <BlockchainChain />
        </group>
        <group ref={networkGroup}>
          <NetworkNodes />
        </group>
        <group ref={techGroup}>
          <TechOrbitRing />
        </group>
        <group ref={expGroup}>
          <ExperienceChain />
        </group>
      </ScrollDrivenScene>
    </>
  )
}

function ScrollDrivenScene({ scrollProgressRef, children }) {
  const group = useRef()

  useFrame(() => {
    if (group.current && scrollProgressRef?.current !== undefined) {
      const p = scrollProgressRef.current
      group.current.rotation.y = p * Math.PI * 0.2
      group.current.position.y = (p - 0.5) * 2
    }
  })

  return <group ref={group}>{children}</group>
}

export default function BlockchainScene3D({
  isDarkTheme = true,
  scrollProgress = 0,
  currentSection = 'ABOUT_ME',
}) {
  const scrollProgressRef = useRef(0)
  const currentSectionRef = useRef('ABOUT_ME')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    scrollProgressRef.current = scrollProgress
  }, [scrollProgress])

  useEffect(() => {
    currentSectionRef.current = currentSection
  }, [currentSection])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const isMobileRef = useRef(false)
  useEffect(() => {
    isMobileRef.current = isMobile
  }, [isMobile])

  // Disable 3D on very small screens for performance
  if (isMobile) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: isDarkTheme ? '#000000' : '#0a0a0a',
        }}
      />
    )
  }

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: isDarkTheme ? '#000000' : '#0a0a0a' }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <SectionContent
          scrollProgressRef={scrollProgressRef}
          currentSectionRef={currentSectionRef}
          isMobileRef={isMobileRef}
        />
      </Canvas>
    </div>
  )
}
