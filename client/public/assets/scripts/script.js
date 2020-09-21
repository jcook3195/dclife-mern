$(document).ready(function () {
  // init sidenav
  if ($('.sidenav').length) {
    $('.sidenav').sidenav();
  }

  // init select dropdown
  if ($('select').length) {
    $('select').formSelect();
  }

  // init charcount on about input
  if ($('#aboutBusinessInput').length) {
    $('#aboutBusinessInput').characterCount();
  }

  // init carousel
  if ($('.carousel').length) {
    $('.carousel').carousel();
  }

  // init modal
  if ($('.modal').length) {
    $('.modal').modal();
  }

  // init tabs
  if ($('.tabs').length) {
    $('.tabs').tabs({
      //swipeable: true,
    });
  }

  // review stars
  $('#star1').on('click', function () {
    // add star
    $('#star1-label').html(
      '<i class="fas fa-star red-text text-darken-1"></i>'
    );
    // remove star
    $('#star2-label').html(
      '<i class="far fa-star grey-text text-darken-4"></i>'
    );
    $('#star3-label').html(
      '<i class="far fa-star grey-text text-darken-4"></i>'
    );
    $('#star4-label').html(
      '<i class="far fa-star grey-text text-darken-4"></i>'
    );
    $('#star5-label').html(
      '<i class="far fa-star grey-text text-darken-4"></i>'
    );
  });

  $('#star2').on('click', function () {
    // add star
    $('#star1-label').html(
      '<i class="fas fa-star red-text text-darken-1"></i>'
    );
    $('#star2-label').html(
      '<i class="fas fa-star red-text text-darken-1"></i>'
    );
    // remove star
    $('#star3-label').html(
      '<i class="far fa-star grey-text text-darken-4"></i>'
    );
    $('#star4-label').html(
      '<i class="far fa-star grey-text text-darken-4"></i>'
    );
    $('#star5-label').html(
      '<i class="far fa-star grey-text text-darken-4"></i>'
    );
  });

  $('#star3').on('click', function () {
    // add star
    $('#star1-label').html(
      '<i class="fas fa-star red-text text-darken-1"></i>'
    );
    $('#star2-label').html(
      '<i class="fas fa-star red-text text-darken-1"></i>'
    );
    $('#star3-label').html(
      '<i class="fas fa-star red-text text-darken-1"></i>'
    );
    // remove star
    $('#star4-label').html(
      '<i class="far fa-star grey-text text-darken-4"></i>'
    );
    $('#star5-label').html(
      '<i class="far fa-star grey-text text-darken-4"></i>'
    );
  });

  $('#star4').on('click', function () {
    // add star
    $('#star1-label').html(
      '<i class="fas fa-star red-text text-darken-1"></i>'
    );
    $('#star2-label').html(
      '<i class="fas fa-star red-text text-darken-1"></i>'
    );
    $('#star3-label').html(
      '<i class="fas fa-star red-text text-darken-1"></i>'
    );
    $('#star4-label').html(
      '<i class="fas fa-star red-text text-darken-1"></i>'
    );
    // remove star
    $('#star5-label').html(
      '<i class="far fa-star grey-text text-darken-4"></i>'
    );
  });

  $('#star5').on('click', function () {
    // add star
    $('#star1-label').html(
      '<i class="fas fa-star red-text text-darken-1"></i>'
    );
    $('#star2-label').html(
      '<i class="fas fa-star red-text text-darken-1"></i>'
    );
    $('#star3-label').html(
      '<i class="fas fa-star red-text text-darken-1"></i>'
    );
    $('#star4-label').html(
      '<i class="fas fa-star red-text text-darken-1"></i>'
    );
    $('#star5-label').html(
      '<i class="fas fa-star red-text text-darken-1"></i>'
    );
  });

  // init dropdown
  if ($('.dropdown-trigger').length) {
    $('.dropdown-trigger').dropdown();
  }

  // init slider
  if ($('.slider').length) {
    $('.slider').slider();
  }

  // init collapsible (accordion)
  if ($('.collapsible').length) {
    $('.collapsible').collapsible();
  }
});
