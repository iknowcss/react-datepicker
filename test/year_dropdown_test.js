import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import range from 'lodash/range'
import moment from 'moment'
import YearDropdown from '../src/year_dropdown.jsx'
import YearDropdownOptions from '../src/year_dropdown_options.jsx'

describe('YearDropdown', () => {
  var yearDropdown
  var handleChangeResult
  var mockHandleChange = function (changeInput) {
    handleChangeResult = changeInput
  }

  function getYearDropdown (overrideProps) {
    return TestUtils.renderIntoDocument(
      <YearDropdown
          dropdownMode="scroll"
          year={2015}
          onChange={mockHandleChange}
          {...overrideProps} />
    )
  }

  beforeEach(function () {
    handleChangeResult = null
  })

  describe('scroll mode', () => {
    beforeEach(() => yearDropdown = getYearDropdown())

    it('shows the selected year in the initial view', () => {
      var yearDropdownDOM = ReactDOM.findDOMNode(yearDropdown)
      expect(yearDropdownDOM.textContent).to.contain('2015')
    })

    it('starts with the year options list hidden', () => {
      var optionsView = TestUtils.scryRenderedComponentsWithType(yearDropdown, YearDropdownOptions)
      expect(optionsView).to.be.empty
    })

    it('opens a list when read view is clicked', () => {
      var readView = TestUtils.findRenderedDOMComponentWithClass(yearDropdown, 'react-datepicker__year-read-view')
      TestUtils.Simulate.click(readView)
      var optionsView = TestUtils.findRenderedComponentWithType(yearDropdown, YearDropdownOptions)
      expect(optionsView).to.exist
    })

    it('closes the dropdown when a year is clicked', () => {
      var readView = TestUtils.findRenderedDOMComponentWithClass(yearDropdown, 'react-datepicker__year-read-view')
      TestUtils.Simulate.click(readView)
      var optionsView = TestUtils.findRenderedComponentWithType(yearDropdown, YearDropdownOptions)
      var optionNodes = TestUtils.scryRenderedDOMComponentsWithTag(optionsView, 'div')
      TestUtils.Simulate.click(optionNodes[2])
      var optionsViewAfterClick = TestUtils.scryRenderedComponentsWithType(yearDropdown, YearDropdownOptions)
      expect(optionsViewAfterClick).to.be.empty
    })

    it('does not call the supplied onChange function when the same year is clicked', () => {
      var readView = TestUtils.findRenderedDOMComponentWithClass(yearDropdown, 'react-datepicker__year-read-view')
      TestUtils.Simulate.click(readView)
      var optionsView = TestUtils.findRenderedComponentWithType(yearDropdown, YearDropdownOptions)
      var optionNodes = TestUtils.scryRenderedDOMComponentsWithTag(optionsView, 'div')
      TestUtils.Simulate.click(optionNodes[2])
      expect(handleChangeResult).to.not.exist
    })

    it('calls the supplied onChange function when a different year is clicked', () => {
      var readView = TestUtils.findRenderedDOMComponentWithClass(yearDropdown, 'react-datepicker__year-read-view')
      TestUtils.Simulate.click(readView)
      var optionsView = TestUtils.findRenderedComponentWithType(yearDropdown, YearDropdownOptions)
      var optionNodes = TestUtils.scryRenderedDOMComponentsWithTag(optionsView, 'div')
      TestUtils.Simulate.click(optionNodes[3])
      expect(handleChangeResult).to.equal(2014)
    })
  })

  describe('select mode', () => {
    it('renders a select with default year range options', () => {
      yearDropdown = getYearDropdown({dropdownMode: 'select'})
      var select = TestUtils.findRenderedDOMComponentWithClass(yearDropdown, 'react-datepicker__year-select')
      expect(select).to.exist
      expect(select.value).to.eq('2015')
      var options = TestUtils.scryRenderedDOMComponentsWithTag(yearDropdown, 'option')
      expect(options.map(o => o.textContent)).to.eql(range(1900, 2101).map(n => `${n}`))
    })

    it('renders a select with min and max year range options', () => {
      yearDropdown = getYearDropdown({
        dropdownMode: 'select',
        minDate: moment({y: 1988}),
        maxDate: moment({y: 2016})
      })
      var select = TestUtils.findRenderedDOMComponentWithClass(yearDropdown, 'react-datepicker__year-select')
      expect(select).to.exist
      var options = TestUtils.scryRenderedDOMComponentsWithTag(yearDropdown, 'option')
      expect(options.map(o => o.textContent)).to.eql(range(1988, 2017).map(n => `${n}`))
    })

    it('does not call the supplied onChange function when the same year is clicked', () => {
      yearDropdown = getYearDropdown({dropdownMode: 'select'})
      var select = TestUtils.findRenderedDOMComponentWithClass(yearDropdown, 'react-datepicker__year-select')
      TestUtils.Simulate.change(select, {target: {value: 2015}})
      expect(handleChangeResult).to.not.exist
    })

    it('calls the supplied onChange function when a different year is clicked', () => {
      yearDropdown = getYearDropdown({dropdownMode: 'select'})
      var select = TestUtils.findRenderedDOMComponentWithClass(yearDropdown, 'react-datepicker__year-select')
      TestUtils.Simulate.change(select, {target: {value: 2014}})
      expect(handleChangeResult).to.equal(2014)
    })
  })
})
