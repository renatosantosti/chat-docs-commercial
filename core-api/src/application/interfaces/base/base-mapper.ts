export default interface IBaseMapper<TSource, TDestination>
{
    map(source: TSource): TDestination;
    mapReverse(source: TDestination): TSource;
    mapArray(source: TSource[]): TDestination[];
    mapArrayReverse(source: TDestination[]): TSource[];    
}