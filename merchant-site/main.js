$(document).ready(function() {
  let price = 399.99;
  let quantity = 1;
  $("ul.menu-items > li").on("click", function() {
    $("ul.menu-items > li").removeClass("active");
    $(this).addClass("active");
  });

  $(".attr,.attr2").on("click", function() {
    var clase = $(this).attr("class");

    $("." + clase).removeClass("active");
    $(this).addClass("active");
    $("#product-price").html($(this).attr("data-price"));
    price = parseInt($(this).attr("data-price"));
    window.Sequra.changePrice(parseInt($(this).attr("data-price")) * quantity);
  });

  $(".btn-minus").on("click", function() {
    var now = $(".section > div > input").val();
    if ($.isNumeric(now)) {
      if (parseInt(now) - 1 > 0) {
        now--;
      }
      $(".section > div > input").val(now);
      quantity = parseInt(now);
    } else {
      $(".section > div > input").val("1");
      quantity = 1;
    }
    window.Sequra.changePrice(price * quantity);
  });

  $(".btn-plus").on("click", function() {
    var now = $(".section > div > input").val();
    if ($.isNumeric(now)) {
      $(".section > div > input").val(parseInt(now) + 1);
      quantity = parseInt(now) + 1;
    } else {
      $(".section > div > input").val("1");
      quantity = 1;
    }
    window.Sequra.changePrice(price * quantity);
  });
});
