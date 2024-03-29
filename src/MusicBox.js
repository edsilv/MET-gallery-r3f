import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
// import { Environment } from '@react-three/drei/Environment'
import { useGLTF } from '@react-three/drei/useGLTF'
// import { OrbitControls } from '@react-three/drei/OrbitControls'
import { PerspectiveCamera } from '@react-three/drei/PerspectiveCamera'
import { useAnimations } from '@react-three/drei/useAnimations'
import { useTweaks } from 'use-tweaks'

export const Gallery = (props) => {
  const group = useRef()
  const animationRef = useRef()
  const cameraRef = useRef()
  const { nodes, materials, animations } = useGLTF('/MET-gallery-animation-compressed.glb')
  const { mixer } = useAnimations(animations, group)
  const { setDefaultCamera } = useThree()

  const { time } = useTweaks({
    time: { value: 0, min: 0, max: 1 }
  })

  // set default camera
  useEffect(() => void setDefaultCamera(cameraRef.current), [])

  // create animationRef
  useEffect(() => {
    animationRef.current = mixer.clipAction(animations[0], group.current)
    animationRef.current.play()
    animationRef.current.halt()
    // cleanup
    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [])

  // useLayoutEffect(() => {
  //   if (animationRef.current) {
  //     console.log(time)
  //     animationRef.current.time = animationRef.current.getClip().duration * time
  //     mixer.update(0)
  //   }
  // }, [time, mixer])

  // lerp camera to target
  useFrame((_state) => {
    if (animationRef.current) {
      const duration = animationRef.current.getClip().duration;
      animationRef.current.time = THREE.MathUtils.lerp(animationRef.current.time, duration * time, 0.075)
    }
  })

  const [hovered, setHovered] = useState(null)
  const [clicked, setClicked] = useState(null)

  useEffect(() => {
    console.log('hovered', hovered)
    console.log('clicked', clicked)
  }, [hovered, clicked])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Camera001" position={[-1.85, 1.88, 3.41]} rotation={[Math.PI / 2, 0, 1.6]}>
        <PerspectiveCamera ref={cameraRef} makeDefault={false} far={1000} near={0.1} fov={22.1} rotation={[-Math.PI / 2, 0, 0]} />
      </group>
      <mesh
        material={materials['sophie-artwork-2']}
        geometry={nodes['artwork-1'].geometry}
        position={[1.17, 0.95, -15.44]}
        scale={[0.65, 0.38, 0.28]}
      />
      <mesh
        material={materials['sophie-artwork']}
        geometry={nodes['artwork-2'].geometry}
        position={[-1.58, 0.95, -15.44]}
        scale={[0.65, 0.38, 0.28]}
      />
      <mesh
        material={materials['thomas-artwork']}
        geometry={nodes['artwork-battle-of-ignisbury'].geometry}
        position={[9.21, 0.95, -10.41]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={[1.35, 0.04, 0.76]}
      />
      <mesh
        material={materials['josh-artwork']}
        geometry={nodes['artwork-josh'].geometry}
        position={[-9.21, 0.95, 11.14]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={[1.17, 0.04, 0.86]}
      />
      <mesh
        material={materials['kyra.001']}
        geometry={nodes.Body_LP.geometry}
        position={[5.63, 1.85, 6.41]}
        rotation={[Math.PI / 2, -0.41, Math.PI / 2]}
        scale={[0.01, 0.01, 0.01]}
      />
      <mesh
        material={materials['chess-piece-white-concrete.001']}
        geometry={nodes['chess-bishop'].geometry}
        position={[0.19, 1.11, 8.15]}
        rotation={[1.57, 0, -Math.PI / 2]}
        scale={[2.59, 2.59, 2.59]}
      />
      <mesh
        material={materials['chess-piece-white-concrete.001']}
        geometry={nodes['chess-king'].geometry}
        position={[-2.81, 0.28, 8.14]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.25, 0.25, 0.25]}
      />
      <mesh
        material={materials['chess-pieces-black-concrete']}
        geometry={nodes['chess-king-large'].geometry}
        position={[-2.66, 2.05, 11.4]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.33, 0.33, 0.33]}
      />
      <mesh
        material={materials['chess-pieces-black-concrete']}
        geometry={nodes['chess-knight'].geometry}
        position={[-4.35, 0.23, 8.19]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.18, 0.18, 0.18]}
      />
      <mesh
        material={materials['chess-piece-white-concrete.001']}
        geometry={nodes['chess-pawn'].geometry}
        position={[-5.54, 0.24, 8.13]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.22, 0.22, 0.22]}
      />
      <mesh
        material={materials['chess-pieces-black-concrete']}
        geometry={nodes['chess-queen'].geometry}
        position={[-1.14, 0.26, 8.16]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.08, 0.08, 0.08]}
      />
      <mesh
        material={materials['codie-artwork-2']}
        geometry={nodes['concept-2'].geometry}
        position={[-6.73, 0.95, -2.51]}
        scale={[0.2, 0.41, 0.28]}
      />
      <mesh
        material={materials['codie-artwork-1']}
        geometry={nodes['concepts-1'].geometry}
        position={[-5.41, 0.95, -2.51]}
        scale={[0.2, 0.41, 0.28]}
      />
      <mesh
        material={materials['greg-artwork-1']}
        geometry={nodes['concepts-1001'].geometry}
        position={[-2.63, 2.48, -2.51]}
        scale={[0.42, 0.39, 0.29]}
      />
      <mesh
        material={materials['greg-artwork-2']}
        geometry={nodes['concepts-2'].geometry}
        position={[-2.64, 0.95, -2.51]}
        scale={[0.42, 0.39, 0.29]}
      />
      <mesh
        material={materials['eve-painting-1']}
        geometry={nodes['eve-canvas-1'].geometry}
        position={[9.2, 0.95, -3.86]}
        scale={[0.2, 0.22, 0.35]}
        onPointerOver={(e) => (e.stopPropagation(), setHovered(e.object.material.name))}
        onPointerOut={(e) => e.intersections.length === 0 && setHovered(null)}
        onPointerMissed={() => (setClicked(null))}
        onPointerDown={(e) => (e.stopPropagation(), (setClicked(e.object.material.name)))}
      />
      <mesh
        material={materials['eve-painting-2']}
        geometry={nodes['eve-canvas-2'].geometry}
        position={[9.2, 0.95, 0.99]}
        scale={[0.2, 0.22, 0.35]}
        onPointerOver={(e) => (e.stopPropagation(), setHovered(e.object.material.name))}
        onPointerOut={(e) => e.intersections.length === 0 && setHovered(null)}
        onPointerMissed={() => (setClicked(null))}
        onPointerDown={(e) => (e.stopPropagation(), (setClicked(e.object.material.name)))}
      />
      <mesh
        material={materials.statuete}
        geometry={nodes.kaboto_sculp_26_obj.geometry}
        position={[4.84, 1.46, -5.59]}
        rotation={[0, -1.52, 0]}
        scale={[0.09, 0.09, 0.09]}
      />
      <mesh
        material={materials.visitors}
        geometry={nodes.man.geometry}
        position={[0, 0.95, -11.63]}
        rotation={[0, -0.71, 0]}
        scale={[1.82, 1.82, 1.82]}
      />
      <mesh material={materials['MET-LOGO']} geometry={nodes['met-logo'].geometry} position={[-0.03, 0, 0]} scale={[0.32, 0.32, 0.32]} />
      <mesh
        material={materials['house-2']}
        geometry={nodes['model-house-1'].geometry}
        position={[5.16, 0.84, -10.24]}
        scale={[0.07, 0.07, 0.07]}
      />
      <mesh
        material={materials['house-1']}
        geometry={nodes['model-house-2'].geometry}
        position={[4.99, 0.77, -10.23]}
        scale={[0.07, 0.07, 0.07]}
      />
      <mesh
        material={materials.knight}
        geometry={nodes['nathan-thomas-knight'].geometry}
        position={[5.09, 0.83, -10.04]}
        scale={[0.06, 0.06, 0.06]}
      />
      <mesh
        material={materials['orion-artwork']}
        geometry={nodes['orion-painting'].geometry}
        position={[-9.21, 3.35, -8.86]}
        scale={[0.16, 0.59, 0.52]}
      />
      <mesh
        material={materials['halima-artwork']}
        geometry={nodes['painting-kyra'].geometry}
        position={[9.21, 0.95, 6.28]}
        scale={[0.36, 0.42, 0.46]}
      />
      <mesh
        material={materials.plinth}
        geometry={nodes['plinth-syare-2'].geometry}
        position={[-4.18, 0.34, -7.91]}
        scale={[0.35, 0.32, 0.32]}
      />
      <mesh
        material={materials.screens}
        geometry={nodes['projector-screen-small000'].geometry}
        position={[6.87, 1.98, -13.43]}
        rotation={[0, -0.7, 0]}
        scale={[0.23, 0.21, 0.03]}
      />
      <mesh
        material={materials.screens}
        geometry={nodes['projector-screen-small001'].geometry}
        position={[-5.75, 1.98, -14.5]}
        scale={[0.14, 0.12, 0.02]}
      />
      <mesh
        material={materials['show-blurb']}
        geometry={nodes['show-text'].geometry}
        position={[9.28, 3.77, 13.18]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[-3.78, -0.04, -2.71]}
      />
      <mesh
        material={materials['orion-statue']}
        geometry={nodes.Skull.geometry}
        position={[-4.07, 2.03, -7.79]}
        rotation={[Math.PI / 2, 0, 2.64]}
        scale={[0.56, 0.56, 0.56]}
      />
      <mesh
        material={materials['stage-4']}
        geometry={nodes['stage--5'].geometry}
        position={[-4.95, 0.69, -13.84]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[6.06, 6.06, 6.06]}
      />
      <mesh
        material={materials['stage-1']}
        geometry={nodes['stage-1'].geometry}
        position={[-6.43, 0.69, -13.84]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[6.06, 6.06, 6.06]}
      />
      <mesh
        material={materials.rocks}
        geometry={nodes['stage-1-rocks'].geometry}
        position={[-6.43, 0.69, -13.84]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[6.06, 6.06, 6.06]}
      />
      <mesh
        material={materials['stage-2']}
        geometry={nodes['stage-2'].geometry}
        position={[-6.07, 0.69, -13.84]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[6.06, 6.06, 6.06]}
      />
      <mesh
        material={materials.rocks}
        geometry={nodes['stage-2-rocks'].geometry}
        position={[-6.07, 0.69, -13.84]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[6.06, 6.06, 6.06]}
      />
      <mesh
        material={materials['stage-3']}
        geometry={nodes['stage-3'].geometry}
        position={[-5.7, 0.69, -13.84]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[6.06, 6.06, 6.06]}
      />
      <mesh
        material={materials.rocks}
        geometry={nodes['stage-3-rocks'].geometry}
        position={[-5.7, 0.69, -13.84]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[6.06, 6.06, 6.06]}
      />
      <mesh
        material={materials['stage-4']}
        geometry={nodes['stage-4'].geometry}
        position={[-5.33, 0.69, -13.84]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[6.06, 6.06, 6.06]}
      />
      <mesh
        material={materials.rocks}
        geometry={nodes['stage-4-rocks'].geometry}
        position={[-5.33, 0.69, -13.84]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[6.06, 6.06, 6.06]}
      />
      <mesh
        material={materials.rocks}
        geometry={nodes['stage-5-rocks'].geometry}
        position={[-4.95, 0.69, -13.84]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[6.06, 6.06, 6.06]}
      />
      <mesh
        material={materials['title-codie']}
        geometry={nodes['title-codie'].geometry}
        position={[-8.07, 0.95, -2.39]}
        rotation={[-Math.PI / 2, -1.57, 0]}
        scale={[0.55, 0.01, 0.39]}
      />
      <mesh
        material={materials['title-eve-savage']}
        geometry={nodes['title-eve'].geometry}
        position={[9.33, 0.95, 4.01]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[0.55, 0.01, 0.39]}
      />
      <mesh
        material={materials['title-gregory-boyd']}
        geometry={nodes['title-gregory'].geometry}
        position={[-0.78, 0.95, -2.4]}
        rotation={[-Math.PI / 2, -1.57, 0]}
        scale={[0.55, 0.01, 0.39]}
      />
      <mesh
        material={materials['title-halima']}
        geometry={nodes['title-halima'].geometry}
        position={[9.33, 0.95, 8.11]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[0.55, 0.01, 0.39]}
      />
      <mesh
        material={materials['title-card-josh-chatres']}
        geometry={nodes['title-josh'].geometry}
        position={[-9.33, 0.95, 9.07]}
        rotation={[Math.PI, 0, -Math.PI / 2]}
        scale={[0.55, 0.01, 0.39]}
      />
      <mesh
        material={materials['title-nathan-thomas']}
        geometry={nodes['title-nathan-thomas'].geometry}
        position={[9.33, 0.95, -8.41]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[0.55, 0.01, 0.39]}
      />
      <mesh
        material={materials['title-orion']}
        geometry={nodes['title-orion'].geometry}
        position={[-9.33, 1.48, -14.14]}
        rotation={[Math.PI, 0, -Math.PI / 2]}
        scale={[0.55, 0.01, 0.39]}
      />
      <mesh
        material={materials['owen-dan']}
        geometry={nodes['title-owen-dan'].geometry}
        position={[9.33, 0.95, -7.22]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[0.55, 0.01, 0.39]}
      />
      <mesh
        material={materials['title-sean-tristan']}
        geometry={nodes['title-sean-tristan'].geometry}
        position={[-1.25, 1.48, -2.15]}
        rotation={[Math.PI / 2, 1.57, 0]}
        scale={[0.55, 0.01, 0.39]}
      />
      <mesh
        material={materials['Material.014']}
        geometry={nodes['title-sonnylewis'].geometry}
        position={[-3.86, 0.95, -15.55]}
        rotation={[Math.PI / 2, 1.57, 0]}
        scale={[0.55, 0.01, 0.39]}
      />
      <mesh
        material={materials['title-sophie-hamilton']}
        geometry={nodes['title-sophie'].geometry}
        position={[3.13, 0.95, -15.56]}
        rotation={[Math.PI / 2, 1.57, 0]}
        scale={[0.55, 0.01, 0.39]}
      />
      <mesh
        material={materials['title-theo-prodger']}
        geometry={nodes['title-theo'].geometry}
        position={[-9.31, 0.95, 7.24]}
        rotation={[Math.PI, 0, -Math.PI / 2]}
        scale={[0.55, 0.01, 0.39]}
      />
      <group position={[-0.03, 0, 0.04]} scale={[0.32, 0.32, 0.32]}>
        <mesh material={materials['gallery-walls-dark']} geometry={nodes.walls.geometry} />
        <mesh material={materials['gallery-walls-light']} geometry={nodes.walls_1.geometry} />
        <mesh material={materials['gallery-floor']} geometry={nodes.walls_2.geometry} />
      </group>
      <mesh
        material={materials['inner-wall']}
        geometry={nodes['walls-internal'].geometry}
        position={[-5.65, 2.06, -2.27]}
        scale={[0.32, 0.32, 0.32]}
      />
      <mesh material={materials.visitors} geometry={nodes.woman.geometry} position={[6.63, 0.94, 0.68]} scale={[1.82, 1.82, 1.82]} />
      <mesh
        material={materials.visitors}
        geometry={nodes.woman001.geometry}
        position={[-5.84, 0.91, -4.48]}
        rotation={[Math.PI, -0.69, Math.PI]}
        scale={[1.82, 1.82, 1.82]}
      />
    </group>
  )
}