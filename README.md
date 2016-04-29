# nib React Date Picker

A forked version of [Hacker0x01/react-datepicker](https://github.com/Hacker0x01/react-datepicker) adapted to nib's needs

## Installation

The package can be installed via NPM:

```
npm install @nib-components/react-datepicker --save
```

You’ll need to install React and Moment.js separately since those dependencies aren’t included in the package. Below is a simple example on how to use the Datepicker in a React view. You will also need to require the css file from this package (or provide your own). The example below shows how to include the css from this package if your build system supports requiring css files (webpack is one that does).

```js
var React = require('react');
var DatePicker = require('@nib-components/react-datepicker');
var moment = require('moment');

require('@nib-styles/react-datepicker/dist/react-datepicker.css');

var Example = React.createClass({
  displayName: 'Example',

  getInitialState: function() {
    return {
      startDate: moment()
    };
  },

  handleChange: function(date) {
    this.setState({
      startDate: date
    });
  },

  render: function() {
    return <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange} />;
  }
});
```

## Configuration

The most basic use of the DatePicker can be described with:

```js
<DatePicker selected={this.state.date} onChange={this.handleChange} />
```

See [here](https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md) for a full list of props that may be passed to the component. Examples are given on the [main website](https://hacker0x01.github.io/react-datepicker).

### Localization

The date picker relies on [moment.js internationalization](http://momentjs.com/docs/#/i18n/) to localize its display components. By default, the date picker will use the locale globally set in moment, which is English. Locales can be changed in the following ways:

- **Globally** by calling `moment.locale(lang)`
- **Picker-specific** by providing the `locale` prop

Locales can be further configured in moment with various [customization options](http://momentjs.com/docs/#/customization/).

_As of version 0.23, the `weekdays` and `weekStart` DatePicker props have been removed. Instead, they can be configured with the `weekdaysMin` and `week.dow` moment locale customization options._

## Compatibility

### React

We're always trying to stay compatible with the latest version of React. We can't support all older versions of React, since React is still < 1.0 and introducing breaking changes every release.

Latest compatible versions:
- React 0.14 or newer: All above React-datepicker v0.13.0
- React 0.13: React-datepicker v0.13.0
- pre React 0.13: React-datepicker v0.6.2

### Browser Support

The date picker is compatible with the latest versions of Chrome, Firefox, and IE10+.

Unfortunately it is difficult to support legacy browsers while maintaining our ability to develop new features in the future.  For IE9 support, it is known that the [classlist polyfill](https://www.npmjs.com/package/classlist-polyfill) is needed, but this may change or break at any point in the future.

## Local Development

The `master` branch contains the latest version of the Datepicker component. To start your example app, you can run `npm start`. This starts a simple webserver on http://localhost:8080. The server will automatically compile your changes, run tests and execute linters. To help you develop the component we’ve set up some tests that covers the basic functionality (can be found in  `/tests`). Even though we’re big fans of testing, this only covers a small piece of the component. We highly recommend you add tests when you’re adding new functionality.

### The examples
The examples are hosted within the docs folder and are ran in the simple add that loads the Datepicker. To extend the examples with a new example, you can simply duplicate one of the existing examples and change the unique properties of your example.

## License

Copyright (c) 2016 HackerOne Inc. and individual contributors. Licensed under MIT license, see [LICENSE](LICENSE) for the full license.
