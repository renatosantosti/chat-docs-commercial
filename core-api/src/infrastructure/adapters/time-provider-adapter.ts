import ITimeAdapter from "@/application/interfaces/adapters/time-provider";
import { injectable, singleton } from "tsyringe";

/**
 * Class that implements the ITimeAdapter interface to provide the current UTC datetime.
 */
@injectable()
@singleton()
export default class TimeProvider implements ITimeAdapter {
  /**
   * Returns the current UTC datetime.
   *
   * @returns {Date} The current date and time in UTC.
   */
  utcNow(): Date {
    return new Date(new Date().toUTCString());
  }
}
