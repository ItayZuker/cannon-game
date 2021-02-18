class Game {
    constructor( htmlElement, colorOne, colorTwo, cannonSize, bulletSize, level ) {
        this.colorOne = colorOne
        this.colorTwo = colorTwo
        this.htmlElement = htmlElement
        this.cannonSize = cannonSize
        this.bulletSize = bulletSize
        this.canvas
        this.cCanvas
        this.target = { x: '', y: '' }
        this.cannon = { active: false, x: '', y: '' }
        this.allBullets = []
        this.fireInterval
        this.level = level
        this.margin = 0
        this.startGame()
    }

    startGame = ( ) => {
        const body = document.querySelector( 'body' )
        const board = this.createBoard()
        const canvas = this.createCanvas( board )
        board.appendChild( canvas )
        body.appendChild( board )
        this.moovBoard( board )
    }

    createBoard = () => {
        const board = document.createElement( this.htmlElement )
        board.classList.add( 'board' )
        return board
    }

    createCanvas = ( board ) => {
        this.canvas = document.createElement( 'canvas' )
        this.canvas.addEventListener('mousemove', this.getTarget)
        this.canvas.addEventListener('mousedown', this.fire)
        this.canvas.addEventListener('mouseup', this.stopFire)
        this.cCanvas = this.canvas.getContext('2d')
        this.cCanvas.canvas.width = 300
        this.cCanvas.canvas.height = 200
        board.style.width = `${this.cCanvas.canvas.width}px`
        board.style.height = `${this.cCanvas.canvas.height}px`
        return this.canvas
    }

    fire = (e) => {
        if ( this.cannon.active ) {
            const leftCannonBorder = this.cannon.x - this.cannonSize / 2 + this.cCanvas.canvas.offsetLeft
            const rightCannonBorder = this.cannon.x + this.cannonSize / 2 + this.cCanvas.canvas.offsetLeft
            const topCannonBorder = this.cannon.y - this.cannonSize / 2 + this.cCanvas.canvas.offsetTop
            const bottomCannonBorder = this.cannon.y + this.cannonSize / 2 + this.cCanvas.canvas.offsetTop
            if ( e.clientX >= leftCannonBorder && e.clientX <= rightCannonBorder && e.clientY >= topCannonBorder && e.clientY <= bottomCannonBorder ) {
                this.cannon.active = false
            } else {
                this.fireInterval = setInterval(() => {
                    const angle = Math.atan2(
                        this.target.y,
                        this.target.x
                    )
                    const velocity = {
                        x: Math.cos( angle ) * 4,
                        y: Math.sin( angle ) * 4
                    }
                    this.allBullets.push( 
                        new Bullet( this.cannon, this.bulletSize, this.colorTwo, this.canvas, velocity )
                    )
                }, 100);
            }
        } else {
            if ( this.allBullets.length > 0 ) {
                const cannonX = e.clientX - this.cCanvas.canvas.offsetLeft
                const cannonY = e.clientY - this.cCanvas.canvas.offsetTop
                this.cannon = { active: true, x: cannonX, y: cannonY }
                return
            } else {
                const cannonX = e.clientX - this.cCanvas.canvas.offsetLeft
                const cannonY = e.clientY - this.cCanvas.canvas.offsetTop
                this.cannon = { active: true, x: cannonX, y: cannonY }
                this.gameOn()
            }
        }
    }

    getTarget = (e) => {
        const targetX = e.clientX - this.cCanvas.canvas.offsetLeft - this.cannon.x
        const targetY =  e.clientY - this.cCanvas.canvas.offsetTop - this.cannon.y
        this.target = { x: targetX, y: targetY}
    }

    stopFire = () => {
        clearInterval( this.fireInterval )
    }

    gameOn = () => {
        requestAnimationFrame(this.gameOn)
        this.cCanvas.clearRect( 0, 0, this.canvas.width, this.canvas.height )
        if ( this.cannon.active ) {
            this.createCannon()
        } 
        this.allBullets.forEach( bullet => {
            bullet.update()
        })
    } 
    
    createCannon = () => {
        new Cannon( this.cannon.x, this.cannon.y, this.cannonSize, this.colorOne, this.canvas)
    }

    moovBoard = ( board ) => {
        if ( this.margin < 100 ) {
            const goRight = setInterval(() => {
                this.margin += this.level
                board.style.marginLeft = `${this.margin}px`
                if ( this.margin > 200 ) {
                    clearInterval( goRight )
                    this.moovBoard( board )
                }
            }, 5);
        } else {
            const goLeft = setInterval(() => {
                this.margin -= this.level
                board.style.marginLeft = `${this.margin}px`
                if ( this.margin < this.level ) {
                    clearInterval( goLeft )
                    this.moovBoard( board )
                }
            }, 5);
        }
    }
}