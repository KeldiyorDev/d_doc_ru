import $ from 'jquery';

export const VisibleField = () => {
  let isMounted = true;

  if (isMounted) {
    $(document).ready(function () {
      $("input:submit").attr("checked", false).click(function () {
        var shcolum = "." + $(this).attr("name");
        $(shcolum).toggle();
      })
    })

    // btn toggle
    $(document).ready(function () {
      $('input.myBtn').click(function () {
        $(this).toggleClass('btnActive')
      })
    })
  }

  return () => {
    isMounted = false;
  }
}