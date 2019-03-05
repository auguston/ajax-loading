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
  // 基本樣式設定
  event = {
    theme: ALSetting.theme || 1 // 讀取中的樣式
  };

  // 轉換樣式為圖檔路徑
  var themeTran = function() {
    switch(event.theme) {
      case 1:
        return 'https://ibw.bwnet.com.tw/assets/library/ajax-loading/theme1.gif';
        break;
      case 2:
        return 'https://ibw.bwnet.com.tw/assets/library/ajax-loading/theme2.gif';
        break;
      case 3:
        return 'https://ibw.bwnet.com.tw/assets/library/ajax-loading/theme3.gif';
        break;
      case 4:
        return 'https://ibw.bwnet.com.tw/assets/library/ajax-loading/theme4.gif';
        break;
      case 5:
        return 'https://ibw.bwnet.com.tw/assets/library/ajax-loading/theme5.gif';
        break;
      case 6:
        return 'https://ibw.bwnet.com.tw/assets/library/ajax-loading/theme6.gif';
        break;
      default:
        return 'https://ibw.bwnet.com.tw/assets/library/ajax-loading/theme1.gif';
    }
  }
  var theme = themeTran();  

  // 加入<style>
  $('head').append(`
    <style>
      body.jq-loading-body {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      .jq-loading-fixed {
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99999;
        background: rgba(255,255,255,0.5);
      }
      .jq-loading {
        width: 100%;
        height: 100%;
        background: url('${theme}') no-repeat center center;
      }
    <style>
  `);

  // 監聽ajaxSend、ajaxStop
  var ajaxWL = ['GetPrice']; // 不執行loading的url
  var toggleLoading = true; // 是否執行loading，true執行、false不執行
  $(document).on({
    ajaxSend: function(e,xhr,settings) {
      Array.prototype.forEach.call(ajaxWL, function(wl) {
        settings.url.indexOf(wl) > -1 ? toggleLoading = false : toggleLoading = true;
      });
      if(toggleLoading) {
        $('body').addClass('jq-loading-body').prepend('<div class="jq-loading-fixed"><div class="jq-loading"></div></div>');
        $('.jq-loading-fixed').fadeIn(400);
      }
    },
    ajaxStop: function() {
      $('body').removeClass('jq-loading-body');
      $('.jq-loading-fixed').fadeOut(400);
      setTimeout(function(){
        $('.jq-loading-fixed').detach();
      }, 600);
    }
  });
};