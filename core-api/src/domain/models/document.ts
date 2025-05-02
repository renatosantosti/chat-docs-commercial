import Page from "./page";

export default interface Document {
  id?: number;
  name: string;
  title: string;
  content?: string;
  url?: string;
  description?: string;
  type?: string;
  numPages: number; // set this column here to avoid calculate column or view at this moment
  pages: Page[];
  isActive: boolean;

  /* ForeignKey Fields*/
  userId: number;

  /* Blamed fields */
  createdOn: Date;
  createdBy: string;
  modifiedOn?: Date;
  modifiedBy?: string;
  deletionDate?: Date;
}
