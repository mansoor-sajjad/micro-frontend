import {getCssIds} from './microFrontendHelpers';

test('getCssIds', () => {
    const manifest = {
        entrypoints: [
            "static/css/main.ac33920f.css",
            "static/js/main.630c13c3.js"
        ],
        files: {
            "main.css": "/static/css/main.ac33920f.css",
            "main.js": "/static/js/main.630c13c3.js",
            "static/media/Entur-Nationale-Demibold.eot": "/static/media/Entur-Nationale-Demibold.54b7d11937592263c719.eot",
            "static/media/Entur-Nationale-DemiboldItalic.eot": "/static/media/Entur-Nationale-DemiboldItalic.655cd2b8ab9c2f7047f5.eot",
            "static/media/Entur-Nationale-Italic.eot": "/static/media/Entur-Nationale-Italic.da4a468f689371833ce2.eot",
            "static/media/Entur-Nationale-MediumItalic.eot": "/static/media/Entur-Nationale-MediumItalic.9587f183f4b0b3e37b52.eot",
            "static/media/Entur-Nationale-LightItalic.eot": "/static/media/Entur-Nationale-LightItalic.a0b455f730a8ad40c277.eot",
            "static/media/Entur-Nationale-Regular.eot": "/static/media/Entur-Nationale-Regular.061302ac568f2fbb6b87.eot",
            "static/media/Entur-Nationale-Medium.eot": "/static/media/Entur-Nationale-Medium.e6e077eda9b8e3a371e7.eot",
            "static/media/Entur-Nationale-Light.eot": "/static/media/Entur-Nationale-Light.bdd6c56da00a5278054b.eot",
            "static/media/Entur-Nationale-DemiboldItalic.woff": "/static/media/Entur-Nationale-DemiboldItalic.617378ce78e600253e28.woff",
            "static/media/Entur-Nationale-Demibold.woff": "/static/media/Entur-Nationale-Demibold.11df8715ce61da565cb7.woff",
            "static/media/Entur-Nationale-Italic.woff": "/static/media/Entur-Nationale-Italic.8f80c2a7494eaa027b0f.woff",
            "static/media/Entur-Nationale-LightItalic.woff": "/static/media/Entur-Nationale-LightItalic.7305b468a6f6a2d5ed50.woff",
            "static/media/Entur-Nationale-MediumItalic.woff": "/static/media/Entur-Nationale-MediumItalic.283f48df1cc5804b5bb0.woff",
            "static/media/Entur-Nationale-Regular.woff": "/static/media/Entur-Nationale-Regular.6efd3cda8ab4ef129e70.woff",
            "static/media/Entur-Nationale-Medium.woff": "/static/media/Entur-Nationale-Medium.c626dbe1a47a531302db.woff",
            "static/media/Entur-Nationale-Light.woff": "/static/media/Entur-Nationale-Light.374c553ff9109d8e0786.woff",
            "static/media/Entur-Nationale-DemiboldItalic.woff2": "/static/media/Entur-Nationale-DemiboldItalic.de8cba8f348aa8e448a2.woff2",
            "static/media/Entur-Nationale-Demibold.woff2": "/static/media/Entur-Nationale-Demibold.d4ac29c4b040f7e0659d.woff2",
            "static/media/Entur-Nationale-Italic.woff2": "/static/media/Entur-Nationale-Italic.5e7a907417b7f8292169.woff2",
            "static/media/Entur-Nationale-LightItalic.woff2": "/static/media/Entur-Nationale-LightItalic.ce86bbf08423edb85677.woff2",
            "static/media/Entur-Nationale-MediumItalic.woff2": "/static/media/Entur-Nationale-MediumItalic.7ac849e97a2d4d154ba1.woff2",
            "static/media/Entur-Nationale-Regular.woff2": "/static/media/Entur-Nationale-Regular.54e308ca2526bf742e9d.woff2",
            "static/media/Entur-Nationale-Light.woff2": "/static/media/Entur-Nationale-Light.15132e162adbc497af58.woff2",
            "static/media/Entur-Nationale-Medium.woff2": "/static/media/Entur-Nationale-Medium.9cec5ceaca25a89a1d15.woff2",
            "index.html": "/index.html",
            "main.ac33920f.css.map": "/static/css/main.ac33920f.css.map",
            "main.630c13c3.js.map": "/static/js/main.630c13c3.js.map"
        }
    };
    const cssIds = getCssIds(manifest, 'localhost')
    expect(cssIds).toEqual(["localhost/static/css/main.ac33920f.css"]);
});