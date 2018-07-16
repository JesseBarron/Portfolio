

// function sketch(p) {
//   let canvas, numEl
//   let rotation = 0
//   let points = []
//   let count = 0
//   let y = 0
//   let x = 0

//   // class Point {
//   //   constructor(x, y, i) {
//   //     this.x = x
//   //     this.y = y
//   //     this.isOdd = (i % 2 == 0)
//   //   }
//   //   draw() {
//   //     p.stroke(255)
//   //     p.fill(255)
//   //     p.ellipse(this.x, y, 10)
//   //   }
//   // }

//   p.setup = function() {
//     canvas  = p.createCanvas(p.windowWidth, (p.windowHeight * 1.8), p.WEBGL)
//     numEl = p.width/10
//     // for(let i = 0; i < numEl; i++) {
//     //   points.push(new Point(x, y, i))
//     //   x += 15
//     // }
//   }

//   p.draw = function() {
//     p.background(50)
//     // p.translate(-p.width/2, 0)
//     // points.forEach(point => {
//     //   point.draw()
//     // })
//   }

//   p.mouseMoved = function () {
//     // x = - (p.mouseX - p.width/2);
//     y = - (p.mouseY - p.height/2);
//   }

//   window.onresize = function () {
//     p.resizeCanvas(window.innerWidth, (window.innerHeight * 1.8), true)
//   }
// }

// export default sketch


export default function sketch (p) {

  class Walker {
    constructor() {
      this.x = 0
      this.y = 0
    }

    display(hue) {
      p.stroke(hue)
      p.ellipse(this.x, this.y, 3)
    }

    update(thetaX, thetaY) {
      if(this.x <= p.width || this.y <= p.height) {
        this.x = -this.x
        this.y = -this.y
      }
      if((p.millis() % 20) % 2 != 0) {
        this.x -= p.PI/(thetaX) * p.millis()%240/2
        this.y += p.PI/(thetaY) * p.millis()%240/2
      } else {
        this.x += p.PI/(thetaX) * p.millis()%240/2
        this.y -= p.PI/(thetaY) * p.millis()%240/2
      }
    }
  }

  let w, w2
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
    w = new Walker()
    w2 = new Walker()
    p.background(255)
  }
  p.draw = function () {
    w.update(10, -70.5)
    w2.update(-10, 70.6)
    w2.display(50)
    w.display(139)
  }

  window.onresize = function () {
    p.resizeCanvas(window.innerWidth, (window.innerHeight * 1.8), true)
  }
}