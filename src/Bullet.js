class Bullet {
    constructor( cannone, radius, color, canvas, velocity ) {
        this.x = cannone.x
        this.y = cannone.y
        this.radius = radius
        this.color = color
        this.canvas = canvas
        this.cCanvas = canvas.getContext('2d')
        this.velocity = velocity
    }
    
    createBullet = () => {
        this.cCanvas.beginPath()
        this.cCanvas.arc( this.x, this.y, this.radius, 0, Math.PI *2, false )
        this.cCanvas.fillStyle = this.color
        this.cCanvas.fill()
    }
    
    update = () => {
        this.createBullet(  )
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}