export default interface Page {
    id?: number;
    text: string;
    isActive: boolean;
    pageNumber: number;
  
    /* ForeignKey Fields*/
    documentId: number;
  
    /* Blamed fields */
    createdOn: Date;
    createdBy: string;
    modifiedOn?: Date;
    modifiedBy?: string;
    deletionDate?: Date;
  }
  
