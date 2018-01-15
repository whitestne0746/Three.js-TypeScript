export default function (a_push, s_push, d_push, w_push, up_push, down_push,
  q_push, e_push, r_push, zeroLook, Xrotate, Radius, camera) {
  if (a_push) {
    --Xrotate;
  }     // 時計回り
  if (d_push) {
    ++Xrotate;
  }     // 反時計回り    
  if (Xrotate == -360 || 360 == Xrotate) {
    Xrotate = 0;
  }   // Xrotateが 360 を越えたら 0 で初期化

  // カメラ位置(零戦までの距離)を400〜1000までに制限
  if (200 < Radius) {
    if (down_push) { Radius -= 10; }
  }
  if (Radius < 1000) {
    if (up_push) { Radius += 10; }
  }

  if (s_push) {  // カメラ上移動
    if (-600 < camera.position.y) {
      camera.position.y -= 10;
    }
  }
  if (w_push) {  // カメラ下移動
    if (camera.position.y < 600) {
      camera.position.y += 10;
    }
  }

  // カメラの視点回転の計算
  camera.position.x = Radius * Math.sin(Xrotate * Math.PI / 180);
  camera.position.z = Radius * Math.cos(Xrotate * Math.PI / 180);

  // 常時の方向を向かせる
  //if(zeroLook) { camera.lookAt(obj.position);}
}