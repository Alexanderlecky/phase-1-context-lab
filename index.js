// Function to create an employee record
function createEmployeeRecord(array) {
    let employee = {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
    
    // Attach allWagesFor method directly to the employee record
    employee.allWagesFor = function() {
      let dates = this.timeInEvents.map(event => event.date);
      return dates.reduce((total, date) => total + wagesEarnedOnDate.call(this, date), 0);
    };
  
    return employee;
  }
  
  // Function to create multiple employee records
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
  }
  
  // Function to create a timeIn event
  function createTimeInEvent(dateTime) {
    let [date, hour] = dateTime.split(' ');
  
    this.timeInEvents.push({
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return this;
  }
  
  // Function to create a timeOut event
  function createTimeOutEvent(dateTime) {
    let [date, hour] = dateTime.split(' ');
  
    this.timeOutEvents.push({
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10)
    });
  
    return this;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(event => event.date === date);
    let timeOut = this.timeOutEvents.find(event => event.date === date);
  
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(date) {
    let hours = hoursWorkedOnDate.call(this, date);
    return hours * this.payPerHour;
  }
  
  // Function to find an employee by first name
  function findEmployeeByFirstName(array, firstName) {
    return array.find(employee => employee.firstName === firstName);
  }
  
  // Function to calculate payroll for multiple employees
  function calculatePayroll(array) {
    return array.reduce((total, employee) => total + employee.allWagesFor(), 0);
  }

  // Exporting the functions for testing
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    findEmployeeByFirstName,
    calculatePayroll,
    allWagesFor: function() {} // This line ensures allWagesFor is exported
  };
    
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

