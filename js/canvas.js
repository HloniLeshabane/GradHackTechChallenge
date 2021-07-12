(function () {
  window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimaitonFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60)
      }
  })()

  const canvas = document.getElementById('sig-canvas')
  const ctx = canvas.getContext('2d')
  ctx.strokeStyle = '#222222'
  ctx.lineWidth = 4

  let drawing = false
  let mousePos = {
    x: 0,
    y: 0
  }
  let lastPos = mousePos

  canvas.addEventListener('mousedown', function (e) {
    drawing = true
    lastPos = getMousePos(canvas, e)
  }, false)

  canvas.addEventListener('mouseup', function (e) {
    drawing = false
  }, false)

  canvas.addEventListener('mousemove', function (e) {
    mousePos = getMousePos(canvas, e)
  }, false)

  canvas.addEventListener('touchstart', function (e) {

  }, false)

  canvas.addEventListener('touchmove', function (e) {
    const touch = e.touches[0]
    const me = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    })
    canvas.dispatchEvent(me)
  }, false)

  canvas.addEventListener('touchstart', function (e) {
    mousePos = getTouchPos(canvas, e)
    const touch = e.touches[0]
    const me = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    })
    canvas.dispatchEvent(me)
  }, false)

  canvas.addEventListener('touchend', function (e) {
    const me = new MouseEvent('mouseup', {})
    canvas.dispatchEvent(me)
  }, false)

  function getMousePos (canvasDom, mouseEvent) {
    const rect = canvasDom.getBoundingClientRect()
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    }
  }

  function getTouchPos (canvasDom, touchEvent) {
    const rect = canvasDom.getBoundingClientRect()
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    }
  }

  function renderCanvas () {
    if (drawing) {
      ctx.moveTo(lastPos.x, lastPos.y)
      ctx.lineTo(mousePos.x, mousePos.y)
      ctx.stroke()
      lastPos = mousePos
    }
  }

  document.body.addEventListener('touchstart', function (e) {
    if (e.target == canvas) {
      e.preventDefault()
    }
  }, false)
  document.body.addEventListener('touchend', function (e) {
    if (e.target == canvas) {
      e.preventDefault()
    }
  }, false)
  document.body.addEventListener('touchmove', function (e) {
    if (e.target == canvas) {
      e.preventDefault()
    }
  }, false);

  (function drawLoop () {
    requestAnimFrame(drawLoop)
    renderCanvas()
  })()

  function clearCanvas () {
    canvas.width = canvas.width
  }

  const clearBtn = document.getElementById('sig-clearBtn')
  const submitBtn = document.getElementById('sig-submitBtn')
  clearBtn.addEventListener('click', function (e) {
    clearCanvas()
  }, false)
  submitBtn.addEventListener('click', function (e) {
  }, false)
})()
