@import 'shared.cocoascript'

var onRun = function(context) {
    var doc = context.document;
    var selection = context.selection;

    com.adordzheev.init(context);

    if (selection.count() === 0) {
        doc.showMessage('Select at least one layer');
        return false;
    }

    var layersMeta = [],
        leyer,
        parent,
        frame;

    for (var i = 0; i < selection.count(); i++) {
        layer = selection[i];

        // parent layer should be the one
        if (parent && parent != layer.parentGroup()) {
            doc.showMessage('Select layers from the same group');
            return false;
        }

        parent = layer.parentGroup();

        frame = layer.frame();
        layersMeta.push({
            layer: layer,
            x: frame.x(),
            y: frame.y(),
            width: frame.width(),
            height: frame.height()
        });
    }

    try {
        com.adordzheev.sortLayers(layersMeta);

        var layer,
            layersList = [];

        // convert the array of meta objects to a flat array of artboard layers
        for (var i = 0; i < layersMeta.length; i++) {
            layer = layersMeta[i].layer;
            layersList.push(layer);
        }

        // sort layer list
        com.adordzheev.sortIndices(layersList);
    } catch (e) {
        doc.showMessage(e.message);
    }
};
