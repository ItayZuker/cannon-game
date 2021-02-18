class Cannon {
    constructor( x, y, radius, color, canvas ) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.cCanvas = canvas.getContext('2d')
        this.createCannon();
    }

    createCannon() {
        this.cCanvas.beginPath()
        this.cCanvas.arc( this.x, this.y, this.radius, 0, Math.PI *2, false )
        this.cCanvas.fillStyle = this.color
        this.cCanvas.fill()
    }

}