/**
 * Interface for providing the current UTC datetime.
 */

export default interface ITimeAdapter {
  /**
   * Returns the current UTC datetime.
   * 
   * @returns {Date} The current date and time in UTC.
   */
  utcNow: () => Date;
}
