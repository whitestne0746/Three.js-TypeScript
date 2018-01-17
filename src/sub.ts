import * as THREE from "three"

window.addEventListener("DOMContentLoaded", () => {
  const renderer = new THREE.WebGLRenderer()
  renderer.setClearColor(0xffffff)
  renderer.setSize(window.innerWidth, window.innerHeight)

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    2000,
  )
})
