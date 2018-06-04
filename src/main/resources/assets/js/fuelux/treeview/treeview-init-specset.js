var UITree = function () {

    return {
        //main function to initiate the module
        init: function () {

            var DataSourceTree = function (options) {
                this._data = options.data;
                this._delay = options.delay;
            };

            DataSourceTree.prototype = {

                data: function (options, callback) {
                    var self = this;

                    setTimeout(function () {
                        var data = $.extend(true, [], self._data);

                        callback({ data: data });

                    }, this._delay)
                }
            };

            // INITIALIZING TREE
  

            var treeDataSource3 = new DataSourceTree({
                data: [
                    { name: '优特钢 <div class="tree-actions"></div>', type: 'folder','icon-class':'palegreen', additionalParameters: { id: 'F11' } },
                    { name: '钢坯  <div class="tree-actions"></div>',  type: 'folder', 'icon-class': 'blueberry', additionalParameters: { id: 'F12' } },
                    { name: '钢坯2  <div class="tree-actions">显示层内容</div>', type: 'folder', 'icon-class': 'primary'},
                    { name: '品种钢', type: 'item', additionalParameters: { id: 'I11' } },
                    { name: '建筑用钢', type: 'item', additionalParameters: { id: 'I12' } },
                    { name: '建筑用钢3', type: 'item'}

                ],
                delay: 400
            });

    

            $('#MyTree3').tree({
                dataSource: treeDataSource3,
                multiSelect: true,
                loadingHTML: '<div class="tree-loading"><i class="fa fa-rotate-right fa-spin"></i></div>'
            });

        }

    };

}();