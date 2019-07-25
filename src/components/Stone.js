import React, { Component } from 'react';
import './../css/Stone.css';

class Stone extends Component {
    constructor(props) {
        super(props)
        this.state = {
            y:  -100/7
        }
    };

    componentDidMount() {
        this.drop(this.props.row);
    }

     makeEaseOut(timing) {
        return function(timeFraction) {
          return 1 - timing(1 - timeFraction);
        }
      }
  
        bounce(timeFraction) {
        for (let a = 0, b = 1; 1; a += b, b /= 2) {
          if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
          }
        }
      }

    animate({duration, draw, timing}) {

        let start = performance.now();
      
        requestAnimationFrame(function animate(time) {
          let timeFraction = (time - start) / duration;
          if (timeFraction > 1) timeFraction = 1;
      
          let progress = (timing) ? timing(timeFraction): timeFraction;
      
          draw(progress);
      
          if (timeFraction < 1) {
            requestAnimationFrame(animate);
          }
      
        });
      }

    drop(row) {
        const vm = this;
        const finalRow = (5 - row ) * 100/7;

        this.animate({
            duration: 300,
            draw: (progress) => {
              vm.setState({y: finalRow * progress })
            },
            timing: vm.makeEaseOut(vm.bounce)
          });        
    }

    render() {
      const classes = ["stone", this.props.color ].join(" ");
        
        const styles = {
            top:  this.state.y  + "%",
            left: this.props.col * 100/7 + "%"
        };

        return (
            <div id={"stone-" + this.props.id}
                 style={styles}
                 className={ classes }>
            </div>
        );
    }
}

export default Stone;
