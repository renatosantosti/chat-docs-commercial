import Document from "./document";

export default interface User {
  
  id?: number;
  name: string;
  password: string;
  email: string;
  image?: string;
  isActive: boolean;

  /* Blamed fields */
  createdOn: Date;
  createdBy: string;
  modifiedOn?: Date;
  modifiedBy?: string;
  deletionDate?: Date;

  /* Relationships */
  documents?: Document[];
}
