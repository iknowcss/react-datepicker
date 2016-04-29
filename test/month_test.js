import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import moment from 'moment'
import Month from '../src/month'
import Day from '../src/day'
import range from 'lodash/range'

describe('Month', () => {
  it('should have the month CSS class', () => {
    const month = TestUtils.renderIntoDocument(<Month day={moment()} />)
    expect(ReactDOM.findDOMNode(month).className).to.equal('react-datepicker__month')
  })

  it('should render all days of the month and some days in neighboring months', () => {
    const monthStart = moment('2015-12-01')
    const firstWeekStart = monthStart.clone().startOf('week')
    const lastWeekEnd = monthStart.clone().endOf('month').endOf('week')
    const dayCount = lastWeekEnd.diff(firstWeekStart, 'days')
    const month = TestUtils.renderIntoDocument(<Month day={monthStart} />)
    const days = TestUtils.scryRenderedComponentsWithType(month, Day)

    range(0, dayCount + 1).forEach(offset => {
      const expectedDay = firstWeekStart.clone().add(offset, 'days')
      const foundDay = days.find(day => day.props.day.isSame(expectedDay, 'day'))
      expect(foundDay).to.exist
    })
  })

  it('should render all days of the month and peek into the next month', () => {
    const monthStart = moment('2015-12-01')
    const firstWeekStart = monthStart.clone().startOf('week')
    const lastWeekEnd = monthStart.clone().add(1, 'month').add(1, 'week').endOf('week')
    const dayCount = lastWeekEnd.diff(firstWeekStart, 'days')
    const month = TestUtils.renderIntoDocument(<Month day={monthStart} peekNextMonth />)
    const days = TestUtils.scryRenderedComponentsWithType(month, Day)

    range(0, dayCount + 1).forEach(offset => {
      const expectedDay = firstWeekStart.clone().add(offset, 'days')
      const foundDay = days.find(day => day.props.day.isSame(expectedDay, 'day'))
      expect(foundDay).to.exist
    })
  })

  it('should call the provided onDayClick function', () => {
    let dayClicked = null

    function onDayClick (day) {
      dayClicked = day
    }

    const monthStart = moment('2015-12-01')
    const month = TestUtils.renderIntoDocument(
      <Month day={monthStart} onDayClick={onDayClick} />
    )
    const day = TestUtils.scryRenderedComponentsWithType(month, Day)[0]
    TestUtils.Simulate.click(ReactDOM.findDOMNode(day))
    assert(day.props.day.isSame(dayClicked, 'day'))
  })
})
