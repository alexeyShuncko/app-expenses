import React from 'react';


const Diagram = (arrayTotal,color,total,selectDiagramm,Cur_OfficialRate) => {


    let myCanvas = document.getElementById('tutorial');
    myCanvas.width = 300;
    myCanvas.height = 400;

    function drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
    }

    class Piechart {
        constructor(options) {
            this.options = options;
            this.canvas = options.canvas;
            this.ctx = this.canvas.getContext('2d');
            this.colors = options.colors;

            this.draw = function () {
                let total_value = total
                let color_index = 0;
                var start_angle = 0;

                for (let categ in this.options.data) {
                    let val = this.options.data[categ];

                    var slice_angle = 2 * Math.PI * val / total_value;

                    drawPieSlice(

                        this.ctx,
                        this.canvas.width / 2,
                        this.canvas.height / 2,
                        Math.min(this.canvas.width / 2, this.canvas.height / 2),
                        start_angle,
                        start_angle + slice_angle,
                        this.colors[color_index % this.colors.length]
                    );
                    start_angle += slice_angle;
                    color_index++;
                }
                start_angle = 0;
                    for (let categ in this.options.data) {
                        let val = this.options.data[categ];
                        slice_angle = 2 * Math.PI * val / total_value;
                        var pieRadius = Math.max(this.canvas.width / 2, this.canvas.height / 2);
                        var labelX = this.canvas.width / 2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
                        var labelY = this.canvas.height / 2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);


                        var labelText = Math.round(100 * val / total_value);
                        this.ctx.fillStyle = 'white';
                        this.ctx.font = 'bold 19px Arial';
                        if (selectDiagramm === '%' && labelText !== 0) { this.ctx.fillText(labelText + '%', labelX, labelY) }
                    else  if (selectDiagramm === 'BYN' && labelText !== 0){ this.ctx.fillText(val.toFixed(0) + 'р', labelX, labelY) }
                    else  if (selectDiagramm === 'USD' && labelText !== 0){ this.ctx.fillText((val/Cur_OfficialRate).toFixed(0) + '$', labelX, labelY) }
                        
                        start_angle += slice_angle;
                    };
            }
        }
    }

    var myPiechart = new Piechart(
        {
            canvas: myCanvas,
            data: arrayTotal,
            colors: color
        }
    )
    myPiechart.draw();
    return <div></div>
}


export default Diagram;



