import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Circle class
 */
class Circle extends Component {
  /**
   * Creates path based on props.
   * @private
   */
  _createPath() {
    /* Calculate circle parameters */
    const angle = this.props.value * Math.PI * 2 / 100;
    const x = Math.sin(angle) * this.props.size + this.props.center.x;
    const y = this.props.center.y - Math.cos(angle) * this.props.size;
    /* Create path for the progress bar */
    let path = '';
    if (this.props.value > 50) {
      path += `
        M ${this.props.center.x},${this.props.center.y - this.props.size}
        a ${this.props.size},${this.props.size} 0 0,1 0,${2 * this.props.size}
        A ${this.props.size},${this.props.size} 0 0,1 ${x},${y}
      `;
    } else {
      path += `
        M ${this.props.center.x},${this.props.center.y - this.props.size}
        A ${this.props.size},${this.props.size} 0 0,1 ${x},${y}
      `;
    }

    return path;
  }

  /**
   * Renders component.
   */
  render() {
    return (
      <g
        stroke={this.props.color}
        strokeWidth={this.props.thickness}
        fill="none"
      >
        <path d={this._createPath()} />
      </g>
    );
  }
}

/**
 * Prop values specification for Circle class.
 */
Circle.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  thickness: PropTypes.number.isRequired,
  center: PropTypes.object.isRequired
};

/**
 * Clock class.
 */
class Clock extends Component {
  /**
   * Sets up state before mounting.
   */
  componentWillMount() {
    console.log('> componentWillMount() is called on Clock');
    this.tick();
    this.setState({
      timer: window.setInterval(this.tick.bind(this), 20)
    });
  }
  /**
   * Cancels timer before unmounting.
   */
  componentWillUnmount() {
    console.log('> componentWillUnmount() is called on Clock');
    clearInterval(this.state.timer);
  }

  /**
   * Updates time state.
   */
  tick() {
    let time = new Date();
    this.setState({
      seconds: time.getSeconds() + time.getMilliseconds() / 1000,
      minutes: time.getSeconds() / 60 + time.getMinutes(),
      hours: time.getHours() + (time.getSeconds() / 60 + time.getMinutes()) / 60
    });
  }

  /**
   * Renders the clock.
   */
  render() {
    const center = {
      x: this.props.size / 2,
      y: this.props.size / 2
    };

    const params = [
      {
        color: this.props.colors.hour,
        size: this.props.size / 2 - this.props.thickness,
        value:
          100 /
          12 *
          (this.state.hours >= 12 ? this.state.hours - 12 : this.state.hours)
      },
      {
        color: this.props.colors.minute,
        size: this.props.size / 2 - this.props.thickness - this.props.spacing,
        value: 100 / 60 * this.state.minutes
      },
      {
        color: this.props.colors.second,
        size:
          this.props.size / 2 - this.props.thickness - this.props.spacing * 2,
        value: 100 / 60 * this.state.seconds
      }
    ];

    return (
      <svg width={this.props.size} height={this.props.size} version="1.1">
        {params.map((circle, key) => (
          <Circle
            color={circle.color}
            size={circle.size}
            value={circle.value}
            thickness={this.props.thickness}
            center={center}
            key={key}
          />
        ))}
      </svg>
    );
  }
}

/**
 * Default prop values.
 */
Clock.defaultProps = {
  colors: {
    second: '#FF5722',
    minute: '#03A9F4',
    hour: '#4CAF50'
  }
};

/**
 * Prop values specification for Clock class.
 */
Clock.propTypes = {
  size: PropTypes.number.isRequired,
  spacing: PropTypes.number.isRequired,
  thickness: PropTypes.number.isRequired,
  colors: PropTypes.object
};

export default Clock;
