exports = Class(function() {

  /**
    * @class Timer
    * @arg {function} callback
    * @arg {number} ms
    * @arg {boolean} [singleCall] - If the timer should only fire once.
    */
  this.init = function(callback, ms, singleCall) {
    this.callback = callback;
    this.ms = Math.max(ms, 1);
    this.singleCall = singleCall || false;

    this._msCounter = 0;
    this._callCount = 0;
  };

  /**
    * @func Timer#update
    * @arg {number} dt
    * @returns {boolean} isTimerComplete
    */
  this.update = function(dt) {
    this._msCounter += dt;

    while (this._msCounter > this.ms) {
      this._msCounter -= this.ms;

      var result = this.callback(this._callCount);
      if (this.singleCall || result) {
        return true;
      }

      this._callCount++;
    }

    return false;
  };
});
