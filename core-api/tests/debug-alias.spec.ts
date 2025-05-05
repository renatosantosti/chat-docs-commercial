import path from 'path';

describe('Alias Debug', () => {
  it('should resolve alias', () => {
    const resolved = path.resolve(__dirname, '../../src/application/services/indexer-pages-service.ts');
    console.log('Resolved:', resolved);
    expect(require('@/application/services/indexer-pages-service')).toBeDefined();
  });
});
