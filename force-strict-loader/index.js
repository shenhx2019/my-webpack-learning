/* 
    自定义Loader说明：
    1. 所有的loader都是output = function(input)
*/
var loaderUtils = require('loader-utils');
var SourceNode = require('source-map').SourceNode;
var SourceMapConsumer = require('source-map').SourceMapConsumer;

module.exports = function(content, sourceMap) {
    // 启用缓存
    if(this.cacheable) {
        this.cacheable();
    }
    var option = loaderUtils.getOptions(this) || {};
    var useStrictPrefix = '\'use strict\';\n\n';
    // 配置sourceMap
    if(option.sourceMap && sourceMap){
        var currentRequest = loaderUtils.getCurrentRequest(this);
        var node = SourceNode.fromStringWithSourceMap(content,new SourceMapConsumer(sourceMap));
        node.prepend(useStrictPrefix);
        var result = node.toStringWithSourceMap({file:currentRequest});
        var callback = this.async();
        callback(null,result.code,result.map.toJSON());
    }

    return useStrictPrefix + content;
}