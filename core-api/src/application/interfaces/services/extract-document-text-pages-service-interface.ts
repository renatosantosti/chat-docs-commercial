import IBaseService from "@/application/interfaces/base/base-service";

export interface IExtractDocumentTextPagesService extends IBaseService<string, string[]> {
  execute(base64Content: string): Promise<string[] | Error>;
}
