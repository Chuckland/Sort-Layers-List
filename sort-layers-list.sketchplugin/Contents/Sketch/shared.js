var com = com || {};

com.adordzheev = {
    hasPositionPriority: function(l1, l2) {
        if (l1.x < l2.x) {
            if (l1.y <= l2.y) {
                return true;
            } else {
                return l1.y < (l2.y + l2.height);
            }
        } else {
            if (l1.y <= l2.y &&
                (l1.y + l1.height) <= l2.y) {
                return true;
            }
        }
        return false;
    },

    init: function(context) {
        com.adordzheev.context = context;
        com.adordzheev.doc = context.document;
    },

    intersectRect: function(r1, r2) {
        return !(r2.x >= (r1.x + r1.width) ||
            r1.x >= (r2.x + r2.width) ||
            r2.y >= (r1.y + r1.height) ||
            r1.y >= (r2.y + r2.height));
    },

    sortLayers: function(layers) {
        var top, insertPlace,
            next = -1;

        // Перебираем элементы, начиная с конца массива
        // Т.е. первым берем слой, который лежит ниже всех
        for (var i = 0; i < layers.length;) {
            top = layers[i];
            insertPlace = i;

            // Перебираем все слои выше текущего
            for (var j = i + 1; j < layers.length; j++) {
                var toCompare = layers[j];

                // Слой поставим под текущий, если выполнены условия:
                // – слои не пересекаются
                // – у текущего слоя есть приоритет по позиции
                if (!com.adordzheev.intersectRect(top, toCompare)) {
                    if (com.adordzheev.hasPositionPriority(top, toCompare)) {
                        // Удаляем toCompare с текущего места
                        layers.splice(j, 1);

                        // Ставим toCompare сразу после top
                        layers.splice(insertPlace, 0, toCompare);

                        // Номер места для вставки уменьшаем на 1,
                        // чтобы слои вставали под текущим в том же порядке,
                        // в каком они были до перестановки
                        insertPlace++;

                        // Следующий шаг внешнего цикла начинаем с места,
                        // куда встал последний перемещенный элемент
                        if (next === -1) {
                            next = i;
                        }
                    }
                }
            }

            if (next === -1) {
                i++;
            } else {
                i = next;
                next = -1;
            }
        }
        return layers;
    }
};
