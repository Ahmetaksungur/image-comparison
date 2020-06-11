(function () {
  "use strict";
  var jQueryPlugin = (window.jQueryPlugin = function (ident, func) {
    return function (arg) {
      if (this.length > 1) {
        this.each(function () {
          var $this = $(this);

          if (!$this.data(ident)) {
            $this.data(ident, func($this, arg));
          }
        });

        return this;
      } else if (this.length === 1) {
        if (!this.data(ident)) {
          this.data(ident, func(this, arg));
        }

        return this.data(ident);
      }
    };
  });
})();

(function () {
  "use strict";
  function comparison_image($root) {
    const element = $root;
    const image_1 = $root.data("image-1");
    const image_2 = $root.data("image-2");
    $(element).ready(function () {
      const comparison = $root.find("[data-comparison-range]");
      const divisor = $root.find("[data-comparison-divisor]");
      $(comparison).on("input", function () {
        var comparison_input = comparison.val();
        divisor.css("width", comparison_input + "%");
      });
    });

    $(element).append(
      '<div class="image-comparison"><div class="image-comparison-slider"><input type="range" min="0" max="100" value="50" data-comparison-range="" /></div><div class="image-comparison-responsive"><div class="image-comparison-wrap"><div class="comparison-image-2" style="background-image: url(' +
        image_2 +
        ')"></div></div><div class="image-comparison-wrap image-comparison-overlay" data-comparison-divisor=""><img class="comparison-image-1" style="background-image: url(' +
        image_1 +
        ')" width="640"></img></div></div></div>'
    );
  }
  $.fn.comparison = jQueryPlugin("comparison", comparison_image);
  $("[data-comparison]").comparison();
})();
