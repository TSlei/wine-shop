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
            var treeDataSource = new DataSourceTree({
                data: [
                    { name: '钢银动态', type: 'folder', 'icon-class':'blue', additionalParameters: { id: 'F1' } },
                    { name: '测试频道', type: 'folder', 'icon-class': 'success', additionalParameters: { id: 'F2' } },
                    { name: '<a href="web_notice.htm" style="color:#333;">网站公告</a>', type: 'item', additionalParameters: { id: 'I1' } }
                ],
                delay: 400
            });

            $('#MyTree').tree({
                dataSource: treeDataSource,
                multiSelect: true,
                loadingHTML: '<div class="tree-loading"><i class="fa fa-rotate-right fa-spin"></i></div>'
            });

        }

    };

}();