module.exports = {
  /**
   * Return duration in micro second when using process.hrtime
   * @param  {Array} time   Array coming from process.hrtime
   * @return {Integer}      Duration in microseconds
   */
  getDurationInMS (time) {
    var _interval = process.hrtime(time);
    return (_interval[0] * 1e6 + parseInt(_interval[1] / 1e3, 10)) / 1e3;
  }
}
