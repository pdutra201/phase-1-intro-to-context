// Your code here
function createEmployeeRecord(array){
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee

}

function createEmployeeRecords(array){ 
    let records = []
    array.forEach(employee => records.push(createEmployeeRecord(employee)))
    return records
}

function createTimeInEvent(obj, stamp){
    obj.timeInEvents.push({
        type: "TimeIn",
        date: stamp.slice(0, -5),
        hour: parseInt(stamp.slice(11))
    })
    return obj
}
function createTimeOutEvent(obj, stamp){
    obj.timeOutEvents.push({
        type: "TimeOut",
        date: stamp.slice(0, -5),
        hour: parseInt(stamp.slice(11))
    })
    return obj
}

function hoursWorkedOnDate(obj, stamp){
    let timeIn = obj.timeInEvents.filter(obj => obj.date === stamp)
    let timeOut = obj.timeOutEvents.filter(obj => obj.date === stamp)
    let hours = (timeOut[0].hour - timeIn[0].hour)/100
    return hours
}

function wagesEarnedOnDate(obj, date){
    return hoursWorkedOnDate(obj, date)*obj.payPerHour
}

function allWagesFor(obj){
    let total = 0
    obj.timeInEvents.forEach(event => total+= wagesEarnedOnDate(obj, event.date))
    return total
}

function calculatePayroll(array){
    let total = 0
    array.forEach(employee => total+= allWagesFor(employee))
    return total
}