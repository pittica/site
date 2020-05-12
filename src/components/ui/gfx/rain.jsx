import React, { Component } from 'react'
import PropTypes from 'prop-types'

import "../../../scss/effects/_lighting.scss"

class Rain extends Component {
  componentDidMount() {
    const canvas = this.refs.canvas
    canvas.width = this.refs.children.offsetWidth
    canvas.height = window.innerHeight
    
    if (canvas.getContext) {
      const context = canvas.getContext('2d')
      context.strokeStyle = 'rgba(255, 255, 255, 0.5)'
      context.lineWidth = this.props.lineWidth
      context.lineCap = 'round'

      let particles = [];
      for (let a = 0; a < this.props.maxParts; a++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          l: Math.random() * 1,
          xs: -4 + Math.random() * 4 + 2,
          ys: Math.random() * 10 + 10
        })
      }

      setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
          let p = particles[i]

          context.beginPath()
          context.moveTo(p.x, p.y)
          context.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys)
          context.stroke()
          p.x += p.xs
          p.y += p.ys
          if (p.x > canvas.width || p.y > canvas.height) {
            p.x = Math.random() * canvas.width
            p.y = -20
          }
        }
      }, 30)
    }
  }
  render() {
    return (
      <div className="ui-effects rain">
        <canvas ref="canvas" />
        <div ref="children">
          {this.props.children}
        </div>
      </div>
    )
  }
}

Rain.propTypes = {
  children: PropTypes.node,
  lineWidth: PropTypes.number,
  maxParts: PropTypes.number
};

Rain.defaultProps = {
  children: null,
  lineWidth: 2,
  maxParts: 1000
};

export default Rain;