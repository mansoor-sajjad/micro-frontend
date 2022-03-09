import {getCssIds} from './microFrontendHelpers';

test('getCssIds', () => {
    const manifest = {
        entrypoints: [],
        files: {}
    };
    const cssIds = getCssIds(manifest, 'localhost')
    expect(cssIds).toEqual([]);
});