import IBaseRepository from "../base/base-repository";
import Document from "@/domain/models/document";

export default interface IDocumentRepository extends IBaseRepository<Document> {
  getAllByUserId(userId: number): Promise<Document[] | null>;
}
