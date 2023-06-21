export const showDebug = (msg, obj) => {
  let firstRegister = 0;

  if (global.debug == undefined && global.arrayMsg == undefined) {
    global.arrayMsg = [];
    global.debug = "";
  }
  if (global.arrayMsg.length > 20) {
    firstRegister = global.arrayMsg.length - 20;
    global.arrayMsg.splice(0, firstRegister);
  }
  let objStr = "";
  if (obj != null) {
    objStr = " | " + JSON.stringify(obj);
  }

  global.arrayMsg.push("[" + getFormattedTime() + "] " + msg + objStr);
  if (obj != null) {
    console.log(msg, obj);
  } else {
    console.log(msg);
  }

  global.debug = "";
  for (let i = 0; i < global.arrayMsg.length; i++) {
    global.debug = global.debug + global.arrayMsg[i] + "\n";
  }
};

const getFormattedTime = () => {
  let currentDate = new Date();
  let cDay = completeNumber(currentDate.getDate());
  let cMonth = completeNumber(currentDate.getMonth() + 1);
  let cYear = currentDate.getFullYear();
  let cTime =
    completeNumber(currentDate.getHours()) +
    ":" +
    completeNumber(currentDate.getMinutes()) +
    ":" +
    completeNumber(currentDate.getSeconds());

  return cDay + "-" + cMonth + "-" + cYear + " " + cTime;
};

const completeNumber = (number) => {
  if (number < 10) {
    return "0" + number;
  } else {
    return number;
  }
};
