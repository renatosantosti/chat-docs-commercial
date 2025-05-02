import IBaseService from "@/application/interfaces/base/base-service";
import { SearchTermDto, SearchTermResponseDto } from "@/domain/dtos/search-dtos";

export interface ISearchIndexedService extends IBaseService<SearchTermDto, SearchTermResponseDto[]> {
  execute(filter: SearchTermDto): Promise<SearchTermResponseDto[]>;
}