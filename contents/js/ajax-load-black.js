// 判斷jQuery是否存在，不存在就append
(function(){
  if(typeof jQuery == 'undefined') {
    var script = document.createElement('script');
        script.src = '//code.jquery.com/jquery-3.1.1.min.js';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
        
        script.onload = ajaxLoading;
  }
  else { ajaxLoading(event); }
})();

function ajaxLoading(event) {
  // 加入<style>
  $('head').append(`
    <style>
      .jq-loading-body, .jq-loading-body::before, .jq-loading-body::after, .jq-loading-fixed, .jq-loading-fixed::before, .jq-loading-fixed::after, .jq-loading, .jq-loading::before, .jq-loading::after {
        margin: 0;
        padding: 0;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
      }
      
      html.jq-loading-html {
        width: 100%;
        height: 100%;
      }
      
      body.jq-loading-body {
        position: fixed;
        z-index: 1;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      body.jq-loading-body > *:not(.jq-loading-fixed) {
        -webkit-filter: blur(6px);
                filter: blur(6px);
      }
      .jq-loading-fixed {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99999;
        background: rgba(0, 0, 0, 0.54);
        -webkit-transition: 0.4s;
                transition: 0.4s;
      }
      .jq-loading {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        width: 100%;
        height: 100%;
      }
      .jq-loading span {
        display: block;
        width: 18px;
        height: 18px;
        background-color: #FFF;
        border-radius: 100%;
        display: inline-block;
        -webkit-animation: loading 1.4s infinite ease-in-out both;
                animation: loading 1.4s infinite ease-in-out both;
      }
      .jq-loading .load1 {
        margin-right: 6px;
        -webkit-animation-delay: -0.32s;
                animation-delay: -0.32s;
      }
      .jq-loading .load2 {
        margin-right: 6px;
        -webkit-animation-delay: -0.16s;
                animation-delay: -0.16s;
      }
      @-webkit-keyframes loading {
        0%, 80%, 100% {
          -webkit-transform: scale(0);
                  transform: scale(0);
        }
        40% {
          -webkit-transform: scale(1);
                  transform: scale(1);
        }
      }
      @keyframes loading {
        0%, 80%, 100% {
          -webkit-transform: scale(0);
                  transform: scale(0);
        }
        40% {
          -webkit-transform: scale(1);
                  transform: scale(1);
        }
      }    
    <style>
  `);

  // 監聽ajaxstart、ajaxstop
  $(document).on({
    ajaxStart() {
      $('html').addClass('jq-loading-html');
      $('body').addClass('jq-loading-body').prepend(`
        <div class="jq-loading-fixed">
          <div class="jq-loading"><span class="load1"></span><span class="load2"></span><span class="load3"></span></div>
        </div>
      `);
      $('.jq-loading-fixed').fadeIn(400);
    },
    ajaxStop() {
      $('.jq-loading-fixed').fadeOut(400);
      setTimeout(function(){
        $('html').removeClass('jq-loading-html');
        $('body').removeClass('jq-loading-body');
      }, 500);
      setTimeout(function(){
        $('.jq-loading-fixed').detach();
      }, 800);
    }
  });
};