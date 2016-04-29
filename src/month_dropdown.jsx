import React from 'react'
import moment from 'moment'
import range from 'lodash/range'

var MonthDropdown = React.createClass({
  displayName: 'MonthDropdown',

  propTypes: {
    dropdownMode: React.PropTypes.string.isRequired,
    locale: React.PropTypes.string,
    month: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  getInitialState () {
    return {
      dropdownVisible: false
    }
  },

  renderSelectOptions () {
    const localeData = moment.localeData(this.props.locale)
    return range(0, 12).map((M, i) => (
      <option key={i} value={i}>{localeData.months(moment({M}))}</option>
    ))
  },

  renderSelectMode () {
    return (
      <select value={this.props.month} className="react-datepicker__month-select" onChange={e => this.onChange(e.target.value)}>
        {this.renderSelectOptions()}
      </select>
    )
  },

  renderReadView () {
    return (
      <div className="react-datepicker__month-read-view" onClick={this.toggleDropdown}>
        <span className="react-datepicker__month-read-view--selected-month">{this.props.month}</span>
        <span className="react-datepicker__month-read-view--down-arrow"></span>
      </div>
    )
  },

  renderDropdown () {
    // TODO
    // return (
    //   <MonthDropdownOptions
    //     ref="options"
    //     month={this.props.month}
    //     onChange={this.onChange}
    //     onCancel={this.toggleDropdown} />
    // )
  },

  renderScrollMode () {
    return this.state.dropdownVisible ? this.renderDropdown() : this.renderReadView()
  },

  onChange (month) {
    this.toggleDropdown()
    if (month === this.props.month) return
    this.props.onChange(month)
  },

  toggleDropdown () {
    // TODO
    // this.setState({
    //   dropdownVisible: !this.state.dropdownVisible
    // })
  },

  render () {
    let renderedDropdown
    switch (this.props.dropdownMode) {
      case 'scroll':
        renderedDropdown = this.renderScrollMode()
        break
      case 'select':
        renderedDropdown = this.renderSelectMode()
        break
    }

    return <div>{renderedDropdown}</div>
  }
})

module.exports = MonthDropdown
