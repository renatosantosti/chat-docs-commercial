import IBaseService from "@/application/interfaces/base/base-service";
import { DocumentTextPageDto } from "@/domain/dtos/search-dtos";

export interface ISearchIndexerService extends IBaseService<DocumentTextPageDto[], Promise<boolean>> {
  execute(payload: DocumentTextPageDto[]): Promise<any>;
}
