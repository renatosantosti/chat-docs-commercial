/**
 * Interface for providing the unique id.
 */
export default interface IUniqueIdAdapter {
  /**
   * Returns the uid.
   * 
   * @returns {string} The an uid.
   */
  getUID(): string;
}
