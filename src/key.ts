export default class Key {
  public aPush: boolean
  public sPush: boolean
  public dPush: boolean
  public wPush: boolean
  public upPush: boolean
  public downPush: boolean
  public leftPush: boolean
  public rightPush: boolean
  public zerolook: boolean

  public spx: number
  public spy: number
  public spz: number

  public rox: number
  public roy: number
  public roz: number

  public posX: number
  public posY: number
  public posZ: number

  public camera: any

  public key: string

  constructor(camera: any) {
    this.aPush = false
    this.sPush = false
    this.dPush = false
    this.wPush = false
    this.upPush = false
    this.downPush = false
    this.leftPush = false
    this.rightPush = false
    this.zerolook = false
    this.spx = 0.6
    this.spy = 0.6
    this.spz = 0.6
    this.rox = 0
    this.roy = 0
    this.roz = 0
    this.camera = camera
    this.key = ""
  }

  public keyDown(e) {
    switch (e.keyCode) {
      case 65: // 左 A
        this.aPush = true
        this.key = "a"
        break
      case 83: // 下 S
        this.sPush = true
        this.key = "s"
        break
      case 68: // 右 D
        this.dPush = true
        this.key = "d"
        break
      case 87: // 上 W
        this.wPush = true
        this.key = "w"
        break
      case 18: // 手前 down
        this.downPush = true
        this.key = "down"
        break
      case 16: // 奥 up
        this.upPush = true
        this.key = "up"
        console.log(this.key)
        break
      case 13:
        this.leftPush = true
        this.key = "left"
        break
      case 17:
        this.rightPush = true
        this.key = "right"
        break
    }
    return this.key
  }

  public keyUp(e) {
    switch (e.keyCode) {
      case 65: // 左 A
        this.aPush = false
        break
      case 83: // 下 S
        this.sPush = false
        break
      case 68: // 右 D
        this.dPush = false
        break
      case 87: // 上 W
        this.wPush = false
        break
      case 18: // 手前 down
        this.downPush = false
        break
      case 16: // 奥 up
        this.upPush = false
        break
      case 13:
        this.leftPush = false
        break
      case 17:
        this.rightPush = false
        break
    }
  }

  public cameraMove(camera: any) {
    if (this.aPush) {
      this.rox = camera.rotation.x + 0.6
    }
    return this.rox
  }
}
