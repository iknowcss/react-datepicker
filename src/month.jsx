import React from 'react'
import Week from './week'

var Month = React.createClass({
  displayName: 'Month',

  propTypes: {
    day: React.PropTypes.object.isRequired,
    endDate: React.PropTypes.object,
    excludeDates: React.PropTypes.array,
    filterDate: React.PropTypes.func,
    includeDates: React.PropTypes.array,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onDayClick: React.PropTypes.func,
    peekNextMonth: React.PropTypes.bool,
    selected: React.PropTypes.object,
    startDate: React.PropTypes.object
  },

  handleDayClick (day) {
    if (this.props.onDayClick) {
      this.props.onDayClick(day)
    }
  },

  isWeekInMonth (startOfWeek) {
    const day = this.props.day
    const endOfWeek = startOfWeek.clone().add(6, 'days')
    return startOfWeek.isSame(day, 'month') || endOfWeek.isSame(day, 'month')
  },

  renderWeeks () {
    const weeks = []
    let currentWeekStart = this.props.day.clone().startOf('month').startOf('week')
    let i = 0
    let breakAfterNextPush = false

    while (true) {
      weeks.push(<Week
          key={i}
          day={currentWeekStart}
          month={this.props.day.month()}
          onDayClick={this.handleDayClick}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          excludeDates={this.props.excludeDates}
          includeDates={this.props.includeDates}
          filterDate={this.props.filterDate}
          selected={this.props.selected}
          startDate={this.props.startDate}
          endDate={this.props.endDate} />)

      if (breakAfterNextPush) break

      i++
      currentWeekStart = currentWeekStart.clone().add(1, 'weeks')

      if (!this.isWeekInMonth(currentWeekStart)) {
        if (this.props.peekNextMonth) {
          breakAfterNextPush = true
        } else {
          break
        }
      }
    }

    return weeks
  },

  render () {
    return (
      <div className="react-datepicker__month">
        {this.renderWeeks()}
      </div>
    )
  }

})

module.exports = Month
