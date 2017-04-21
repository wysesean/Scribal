import React from 'react'

var LiveBackbround = React.createClass({
    componentDidMount(){
        if(this.canvasTag){
            var backgroundCanvas = this.canvasTag
                var livePattern = {
                  canvas: null,
                  context: null,
                  cols: 0,
                  rows: 0,
                  colors: [252, 251, 249, 248, 241, 240],
                  triangleColors: [],
                  destColors: [],
                  
                init: function(){
                    this.canvas = backgroundCanvas
                    this.context = this.canvas.getContext('2d')
        
                    this.cols = Math.floor(document.body.clientWidth / 24)
                    this.rows = Math.floor(document.body.clientHeight / 24) + 1
                    
                    this.canvas.width = document.body.clientWidth
                    this.canvas.height = document.body.clientHeight
                    
                    this.drawBackground()
                    setInterval(()=>this.animate.call(this), 10)
                },
        
                handleResize: function(){
                    this.context.clearRect(0, 0, canvas.width, canvas.height)
                    this.drawBackground()
                    this.animate()
                },
                  
                drawTriangle: function(x, y, color, inverted){
                    inverted = inverted == undefined ? false : inverted
        
                    this.context.beginPath()
                    this.context.moveTo(x, y)
                    this.context.lineTo(inverted ? x - 22 : x + 22, y + 11)
                    this.context.lineTo(x, y + 22)
                    this.context.fillStyle = "rgb("+color+","+color+","+color+")"
                    this.context.fill()
                    this.context.closePath()
                },
                  
                getColor: function(){    
                    return this.colors[(Math.floor(Math.random() * 6))]
                },
                  
                drawBackground: function(){
                    var eq = null
                    var x = this.cols
                    var destY = 0
                    var color, y
                    
                    while(x--){
                        eq = x % 2
                        y = this.rows
                        while(y--){
                            destY = Math.round((y-0.5) * 24)
                            this.drawTriangle(x * 24 + 2, eq == 1 ? destY : y * 24, this.getColor())
                            this.drawTriangle(x * 24, eq == 1 ? destY  : y * 24, this.getColor(), true)
                      }
                    }
                },
                  
                animate: function(){
                    var x = Math.floor(Math.random() * this.cols)
                    var y = Math.floor(Math.random() * this.rows)
                    var eq = x % 2
        
                    if(eq == 1){
                        this.drawTriangle(x * 24, Math.round((y-0.5) * 24) , this.getColor(), true)
                    } 
                    else{
                        this.drawTriangle(x * 24 + 2, y * 24, this.getColor())
                    }
                }
            }
            livePattern.init()
            window.addEventListener('resize', ()=>livePattern.handleResize())
        }

    },
    componentWillUnmount(){
        window.removeEventListener('resize', ()=>livePattern.handleResize())
    },
    render: function() {
        return(
            <canvas ref={(e)=>this.canvasTag = e} id='canvas'>  
            </canvas>
        ) 
    }
})

export default LiveBackbround