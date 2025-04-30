/**
 * Interface representing a repository for managing C.R.U.D operations.
 */
export default interface IBaseRepository<T> {
  /**
   * Retrieves a record by id.
   * 
   * @param Id - The unique identifier of record.
   * @returns The record associated with the provided record id,
   *          or a promise that resolves to the record or `null` if the record is not found.
   */
  getOneById: (pkId: number) => T | Promise<T | null>;


  /**
   * 
   * @param filter - The filter object to be used for retrieving records.
   * @returns - The list of records that match the filter criteria,
   */
  getAll: (filter: any | null) => Promise<T[] | null>;

  /**
   * Creates a new record in the repository.
   * 
   * @param record - The record object to be created.
   * @returns The created record object, or a promise that resolves to the record
   *          or `null` if the creation was unsuccessful.
   */
  createOne: (record: T) => T | Promise<T | null>;

  /**
   * Delete a record in the repository.
   * 
   * @param record - The record object to be deleted.
   * @returns The deleted record object, or a promise that resolves a boolean if the deleting was unsuccessful.
   */
  deleteOneById: (id: number) => boolean | Promise<Boolean>;

  /**
   * 
   * @param record - The record object to be updated.
   * @returns 
   */
  updateOne: (record: T) => T | Promise<T | null>;
}
