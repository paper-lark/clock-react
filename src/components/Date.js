import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Date.css';

//TODO: check on a new day

class DateBlock extends Component {
  /**
   * Set up state before mounting.
   */
  componentWillMount() {
    console.log('> componentWillMount() is called on DateBlock');
    this._update();
    this.setState({
      timer: window.setInterval(this._update.bind(this), 1000)
    });
  }

  /**
   * Cancels timer before unmounting.
   */
  componentWillUnmount() {
    console.log('> componentWillUnmount() is called on DateBlock');
    clearInterval(this.state.timer);
  }

  /**
   * Lazy update state.
   * @private
   */
  _update() {
    const date = new Date();
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    if (
      !this.state ||
      this.state.day !== date.getDate() ||
      this.state.month !== months[date.getMonth()] ||
      this.state.year !== date.getFullYear()
    ) {
      this.setState({
        weekday: weekdays[date.getDay()],
        day: date.getDate(),
        month: months[date.getMonth()],
        year: date.getFullYear()
      });
    }
  }
  /**
   * Render date.
   */
  render() {
    return (
      <span className="date" style={{ color: this.props.dateColor }}>
        <span style={{ color: this.props.weekdayColor }}>
          {this.state.weekday}
        </span>{' '}
        {this.state.month} {this.state.day}, {this.state.year}
      </span>
    );
  }
}

DateBlock.defaultProps = {
  weekdayColor: '#FF5722',
  dateColor: '#212121'
};

DateBlock.propTypes = {
  weekdayColor: PropTypes.string,
  dateColor: PropTypes.string
};

export default DateBlock;
