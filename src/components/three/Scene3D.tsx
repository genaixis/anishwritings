import { Float, MeshDistortMaterial, Sparkles, useTexture } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import type { Group, Mesh, Texture } from 'three'
import { MeshStandardMaterial, SRGBColorSpace } from 'three'
import { book } from '../../data/book'

function BookModel({
  position,
  scale = 1,
  yawOffset = 0,
  sway = 0.22,
  cover,
}: {
  position: [number, number, number]
  scale?: number
  yawOffset?: number
  sway?: number
  cover: Texture
}) {
  const group = useRef<Group>(null)

  const materials = useMemo(() => {
    const spine = new MeshStandardMaterial({ color: '#3d2429', roughness: 0.65, metalness: 0.05 })
    const edge = new MeshStandardMaterial({ color: '#f4ece3', roughness: 0.92, metalness: 0 })
    const back = new MeshStandardMaterial({ color: '#2a1a1f', roughness: 0.75, metalness: 0.05 })
    const front = new MeshStandardMaterial({
      map: cover,
      roughness: 0.42,
      metalness: 0.06,
    })
    return [spine, spine, edge, edge, front, back]
  }, [cover])

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime
    group.current.rotation.y = yawOffset + Math.sin(t * 0.55) * sway
    group.current.rotation.x = Math.sin(t * 0.35) * 0.06
  })

  const w = 0.62 * scale
  const h = 0.88 * scale
  const d = 0.11 * scale

  return (
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.28}>
      <group ref={group} position={position}>
        <mesh material={materials}>
          <boxGeometry args={[w, h, d]} />
        </mesh>
      </group>
    </Float>
  )
}

function GoldenRing({ radius, y }: { radius: number; y: number }) {
  const ref = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.25
      ref.current.rotation.z += delta * 0.18
    }
  })
  return (
    <mesh ref={ref} position={[0, y, 0]} rotation={[Math.PI / 2.5, 0, 0]}>
      <torusGeometry args={[radius, 0.012, 12, 64]} />
      <meshStandardMaterial
        color="#c9a227"
        metalness={0.85}
        roughness={0.25}
        emissive="#5c4510"
        emissiveIntensity={0.15}
      />
    </mesh>
  )
}

function SceneContent({ mobile }: { mobile: boolean }) {
  const texture = useTexture(book.coverLocal)
  const cover = Array.isArray(texture) ? texture[0] : texture
  useMemo(() => {
    cover.colorSpace = SRGBColorSpace
  }, [cover])

  return (
    <>
      <color attach="background" args={['#0a0708']} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} color="#fff0dd" />
      <pointLight position={[-3, 1, 3]} intensity={mobile ? 28 : 35} color="#8b3a4a" />
      <pointLight position={[3, -1, 2]} intensity={mobile ? 18 : 22} color="#c9a227" />

      <BookModel
        position={[0, 0, 0]}
        scale={mobile ? 1.2 : 1.4}
        yawOffset={-0.15}
        sway={mobile ? 0.12 : 0.18}
        cover={cover}
      />
      {!mobile && (
        <>
          <BookModel position={[-1.55, -0.45, -0.15]} scale={0.78} yawOffset={0.55} sway={0.14} cover={cover} />
          <BookModel position={[1.5, 0.35, 0.1]} scale={0.72} yawOffset={-0.7} sway={0.12} cover={cover} />
        </>
      )}

      <GoldenRing radius={mobile ? 1.2 : 1.5} y={0.12} />
      {!mobile && <GoldenRing radius={1.82} y={-0.22} />}

      {!mobile && (
        <Float speed={2} floatIntensity={0.5}>
          <mesh position={[1.85, 0.35, 0.2]}>
            <icosahedronGeometry args={[0.22, 1]} />
            <MeshDistortMaterial
              color="#8b3a4a"
              emissive="#4a1520"
              emissiveIntensity={0.35}
              roughness={0.2}
              metalness={0.4}
              distort={0.35}
              speed={2}
            />
          </mesh>
        </Float>
      )}

      <Sparkles count={mobile ? 45 : 100} size={mobile ? 1.8 : 2.4} scale={mobile ? 5 : 6.5} speed={0.35} opacity={0.55} color="#c9a227" />
    </>
  )
}

function LoadingBooks() {
  const ref = useRef<Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.8) * 0.4
  })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.62, 0.88, 0.11]} />
      <meshStandardMaterial color="#8b3a4a" metalness={0.25} roughness={0.5} />
    </mesh>
  )
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return mobile
}

function useWebGL() {
  const [ok, setOk] = useState(true)
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') ?? canvas.getContext('webgl2')
      setOk(Boolean(gl))
    } catch {
      setOk(false)
    }
  }, [])
  return ok
}

type Scene3DProps = {
  className?: string
  compact?: boolean
}

export function Scene3D({ className = '', compact = false }: Scene3DProps) {
  const mobile = useIsMobile()
  const webgl = useWebGL()

  if (!webgl) {
    return (
      <div className={`scene-3d scene-3d--fallback ${className}`.trim()}>
        <img src={book.coverLocal} alt={book.titleLatin} />
      </div>
    )
  }

  return (
    <div className={`scene-3d ${compact ? 'scene-3d--compact' : ''} ${className}`.trim()}>
      <Canvas
        camera={{ position: [0, 0, mobile ? 4.8 : 4.4], fov: mobile ? 42 : 40 }}
        dpr={mobile ? [1, 1.25] : [1, 2]}
        gl={{ antialias: !mobile, alpha: false, powerPreference: mobile ? 'low-power' : 'default' }}
        frameloop={mobile ? 'always' : 'always'}
      >
        <Suspense fallback={<LoadingBooks />}>
          <SceneContent mobile={mobile} />
        </Suspense>
      </Canvas>
      <div className="scene-3d__vignette" aria-hidden="true" />
    </div>
  )
}