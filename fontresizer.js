// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    "use strict";

        // undefined is used here as the undefined global variable in ECMAScript 3 is
        // mutable (ie. it can be changed by someone else). undefined isn't really being
        // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
        // can no longer be modified.

        // window and document are passed through as local variable rather than global
        // as this (slightly) quickens the resolution process and can be more efficiently
        // minified (especially when both are regularly referenced in your plugin).

        // Create the defaults once
        var pluginName = "fontResize";
        // The actual plugin constructor
        function Plugin ( element, options ) {
                this.element = element;
                this._name = pluginName;
                this.init();
        }

        // Avoid Plugin.prototype conflicts
        $.extend(Plugin.prototype, {
                init: function () {
                    $(window).bind("resize", $.proxy(this._resize, this));
                    $(this.element).css({'font-size': $(this.element).width() + "%"});
                },
                _resize: function ()
                {
                    $(this.element).css({'font-size': $(this.element).width() + "%"});
                },
                //
                // Free resources
                //
                destroy: function() {
                    $(window).unbind("resize", this._resize);
                }
        });

        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
        $.fn[ pluginName ] = function ( options ) {

                // get the arguments
                var args = $.makeArray(arguments),
                    after = args.slice(1);

                return this.each(function() {
                        var instance = $.data(this, "plugin_" + pluginName);
                        if (instance) {
                            // call a method on the instance
                            if (typeof options == "string") {
                              return instance[options].apply(instance, after);
                            } else {
                            }
                        } else {
                            return $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                        }
                });
        };
})( jQuery, window, document );
