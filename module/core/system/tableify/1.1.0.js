"use strict";

this.tableify = init({

});

function init(config) {
    var classes = config.classes === false ? false : true;
    var classPrefix = config.classPrefix || "";
    var classBoolean = config.classBoolean || true

    return function tableify(obj, columns, parents) {
        var buf = [];
        var type = typeof obj;
        var cols;

        parents = parents || [];

        if (type !== 'object' || obj == null || obj == undefined) {
        }
        else if (~parents.indexOf(obj)) {
            return "[Circular]";
        }
        else {
            parents.push(obj);
        }

        if (Array.isArray(obj)) {
            if (Array.isArray(obj[0]) && obj.every(Array.isArray)) {

                cols = [];
                
                // 2D array is an array of rows
                obj.forEach(function (row, ix) {
                    cols.push(ix);

                    buf.push('<tr>');
                    
                    row.forEach(function (val) {
                        buf.push('<td' + getClass(val) + '>', tableify(val, cols, parents), '</td>')
                    });
                    
                    buf.push('</tr>');
                });
                
            }
            else if (typeof obj[0] === 'object') {
                buf.push('<tr>');

                //loop through every object and get unique keys
                var keys = {};
                obj.forEach(function (o) {
                    if (typeof o === 'object' && !Array.isArray(o)) {
                        Object.keys(o).forEach(function (k) {
                            keys[k] = true;
                        });
                    }
                });

                cols = Object.keys(keys);

                cols.forEach(function (key) {
                    buf.push('<td' + getClass(obj[0][key]) + '>', key, '</td>');
                });

                buf.push('</tr>');

                obj.forEach(function (record) {
                    buf.push('<tr>');
                    buf.push(tableify(record, cols, parents));
                    buf.push('</tr>');
                });

            }
            else {

                cols = [];

                obj.forEach(function (val, ix) {
                    cols.push(ix);
                    buf.push('<tr>', '<td' + getClass(val) + '>', tableify(val, cols, parents), '</td>', '</tr>');
                });

            }

        }
        else if (obj && typeof obj === 'object' && !Array.isArray(obj) && !(obj instanceof Date)) {
            if (!columns) {

                Object.keys(obj).forEach(function (key,i) {
                    buf.push('<tr class=' + getResult(obj[key]) + '>', "<td class='center aligned'>" + (1+i) + '</td>' + '<td' + getClass(obj[key]) + '>', key, '</td>', '<td' + getClass(obj[key]) + '>', tableify(obj[key], false, parents), '</td>', '</tr>');
                });

            }
            else {
                columns.forEach(function (key) {
                    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                        buf.push('<td' + getClass(obj[key]) + '>', tableify(obj[key], false, parents), '</td>');
                    }
                    else {
                        buf.push('<td' + getClass(obj[key]) + '>', tableify(obj[key], columns, parents), '</td>');
                    }
                });
            }
        }
        else {
            buf.push(obj);
        }

        if (type !== 'object' || obj == null || obj == undefined) {
        }
        else {
            parents.pop(obj);
        }

        return buf.join('');
    }

    function getResult(obj) {
        if (!classBoolean)
            return ''
        else
            return (typeof obj === 'boolean') ?
            (obj === true)
                ? ' positive' : (obj === false)
                ? ' negative' : ''
            :
            ''
    }

    function getClass(obj) {
        if (!classes) {
            return '';
        }

        return ' class="'
            + classPrefix
            + ((obj && obj.constructor && obj.constructor.name)
                ? obj.constructor.name
                : typeof obj || ''
            ).toLowerCase()
            + ((obj === null)
                ? ' null'
                : ''
            )
            + '"'
            ;
    }

}