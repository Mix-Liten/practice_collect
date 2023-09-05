function main() {
  const canvas = document.getElementById('base')

  const fov = 100
  const aspect = canvas.clientWidth / canvas.clientHeight
  const near = 0.1
  const far = 2000

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.z = 1

  const renderer = new THREE.WebGLRenderer({ canvas })

  new THREE.OrbitControls(camera, canvas)

  const scene = new THREE.Scene()
  const loader = new THREE.TextureLoader()
  const texture = loader.load('./images/mountain.jpg', () => {
    const rt = new THREE.WebGLCubeRenderTarget(texture.image.height)
    rt.fromEquirectangularTexture(renderer, texture)
    scene.background = rt.texture
  })

  function render() {
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    renderer.setSize(width, height, false)
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}

main()
