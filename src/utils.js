let moment = require('moment');
let _ = require('underscore');

const Utils = {
  formatDate: function (date, format) {
    if (_.isUndefined(date)) {
      return '';
    }

    if (date.length == 0) {
      return '';
    }

    // Make it in a good format
    date = date.replace('T', ' ');
    date = date.replace('Z', ' +0000');
    date = moment(date, "YYYY-MM-DD H:m:s Z");

    // Format Date
    switch (format) {
      case 'short':
        return date.format('MM/DD/YYYY');
        break;

      case 'medium':
        return date.format('MM/DD/YYYY h:mm A');
        break;

      case 'long':
        return date.format('MMM DD, YYYY h:mm A');
        break;

      case 'dob':
        return date.format('MM/DD/YYYY');
        break;

      case 'smart':
        // Compare year and date to today, to determine whether to show time.
        // http://momentjs.com/docs/#/displaying/difference/
        var dateDifference = moment().diff(date, 'days');

        if (dateDifference == 0) {
          return date.format('h:mm a');
        } else if (dateDifference == 1) {
          return 'Yesterday';
        } else if (dateDifference < 2) {
          return dateDifference + ' days ago ' + date.format('h:mm a');
        } else {
          return date.format('MM/DD/YYYY');
        }
        break;

      default:
        return date.format('MMM, DD YYYY');
        break;
    }
  }
};

module.exports = Utils;