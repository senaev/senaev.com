require.config({
    baseUrl: '/10x10/js/',
    paths: {
        'jquery': 'jquery-1.11.1.min',
        'tenOnTen': 'tenOnTen',
        'cube': 'cube',
        'cubes': 'cubes',
        'data': 'data',
        'movemap': 'moveMap',
        'transit': 'jquery.transit.min',
        'mainMask': 'mainMask',
        'mCube': 'mCube',
        'cubeAnimation': 'cubeAnimation',
        'undoButton': 'undoButton'
    }
});

require(['jquery', 'tenOnTen', 'transit'], function ($, TenOnTen) {
    //console.log(transition)
    var tenOnTen = new TenOnTen({
        appContainer: "#app"
    });
});