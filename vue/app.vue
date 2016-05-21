<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <div class="index-header mdl-layout__header mdl-layout__header--waterfall">
            <div class="mdl-layout__header-row">
                <span class="index-title mdl-layout-title">
                  <!-- <img class="index-logo-image" src="assets/index-logo.png"> -->
                </span>
                <!-- Add spacer, to align navigation to the right in desktop -->
                <div class="index-header-spacer mdl-layout-spacer"></div>
                <div class="index-search-box mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right mdl-textfield--full-width">
                    <label class="mdl-button mdl-js-button mdl-button--icon" for="search-field">
                        <i class="material-icons">search</i>
                    </label>
                    <div class="mdl-textfield__expandable-holder">
                        <input class="mdl-textfield__input" type="text" id="search-field">
                    </div>
                </div>
                <!-- Navigation -->
                <div class="index-navigation-container">
                    <nav class="index-navigation mdl-navigation">
                        <a class="mdl-navigation__link mdl-typography--text-uppercase" v-link="{ path: '/about' }">About</a>
                        <a class="mdl-navigation__link mdl-typography--text-uppercase" v-link="{ path: '/listVenue' }">List Venues</a>
                        <a class="mdl-navigation__link mdl-typography--text-uppercase" v-link="{ path: '/map' }">Find on Map</a>
                        <!-- <a class="mdl-navigation__link mdl-typography--text-uppercase" v-link="{ path: '/weather' }">Weather</a> -->
                    </nav>
                </div>
                <span class="index-mobile-title mdl-layout-title">
                  <!-- <img class="index-logo-image" src="assets/index-logo.png"> -->
                </span>
                <button class="index-more-button mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect" id="more-button">
                    <i class="material-icons">more_vert</i>
                </button>
                <ul class="mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect" for="more-button">
                    <li class="mdl-menu__item">Account Information</li>
                    <li class="mdl-menu__item">Notification</li>
                    <li class="mdl-menu__item">Sign Out</li>
                </ul>
            </div>
        </div>
        <div class="index-drawer mdl-layout__drawer">
            <span class="mdl-layout-title">
              <!-- <img class="index-logo-image" src="assets/index-logo-white.png"> -->
            </span>
            <nav class="mdl-navigation">
                <a class="mdl-navigation__link" v-link="{ path: '/about' }">About</a>
                <a class="mdl-navigation__link" v-link="{ path: '/listVenue' }">List Venues</a>
                <a class="mdl-navigation__link" v-link="{ path: '/map' }">Find on Map</a>
                <!-- <a class="mdl-navigation__link" v-link="{ path: '/weather' }">Weather</a> -->
                <div class="index-drawer-separator"></div>
                <span class="mdl-navigation__link" href="">User</span>
                <a class="mdl-navigation__link" href="">Account Information</a>
                <a class="mdl-navigation__link" href="">Notification</a>
                <a class="mdl-navigation__link" href="">Sign Out</a>
                <div class="index-drawer-separator"></div>
            </nav>
        </div>
        <main class="index-content mdl-layout__content">
            <a name="top"></a>
            <!-- main view -->
            <router-view
              class="view"
              keep-alive
              >
            </router-view>
        </main>
    </div>
</template>

<style type="text/css">
  .index-search-box .mdl-textfield__input {
      color: rgba(0, 0, 0, 0.87);
  }

  .index-header .mdl-menu__container {
      z-index: 50;
      margin: 0 !important;
  }

  .mdl-textfield--expandable {
      width: auto;
  }


  .index-mobile-title {
      display: none !important;
  }

  .index-logo-image {
      height: 28px;
      width: 140px;
  }

  .index-header {
      overflow: visible;
      background-color: rgba(255, 255, 255, 0.52);
  }

  .index-header .material-icons {
      color: #767777 !important;
  }

  .index-header .mdl-layout__drawer-button {
      background: transparent;
      color: #767777;
  }

  .index-header .mdl-navigation__link {
      color: #757575;
      font-weight: 700;
      font-size: 14px;
  }

  .index-navigation-container {
      /* Simple hack to make the overflow happen to the left instead... */
      direction: rtl;
      -webkit-box-ordinal-group: 2;
      -webkit-order: 1;
      -ms-flex-order: 1;
      order: 1;
      width: 500px;
      -webkit-transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .index-navigation {
      /* ... and now make sure the content is actually LTR */
      direction: ltr;
      -webkit-box-pack: end;
      -webkit-justify-content: flex-end;
      -ms-flex-pack: end;
      justify-content: flex-end;
      width: 800px;
  }

  .index-search-box.is-focused + .index-navigation-container {
      opacity: 0;
      width: 100px;
  }

  .index-navigation .mdl-navigation__link {
      display: inline-block;
      height: 60px;
      line-height: 68px;
      background-color: transparent !important;
      border-bottom: 4px solid transparent;
  }

  .index-navigation .mdl-navigation__link:hover {
      border-bottom: 4px solid #8bc34a;
  }

  .index-search-box {
      -webkit-box-ordinal-group: 3;
      -webkit-order: 2;
      -ms-flex-order: 2;
      order: 2;
      margin-left: 16px;
      margin-right: 16px;
  }

  .index-more-button {
      -webkit-box-ordinal-group: 4;
      -webkit-order: 3;
      -ms-flex-order: 3;
      order: 3;
  }

  .index-drawer {
      border-right: none;
  }

  .index-drawer-separator {
      height: 1px;
      background-color: #dcdcdc;
      margin: 8px 0;
  }

  .index-drawer .mdl-navigation__link.mdl-navigation__link {
      font-size: 14px;
      color: #757575;
  }

  .index-drawer span.mdl-navigation__link.mdl-navigation__link {
      color: #8bc34a;
  }

  .index-drawer .mdl-layout-title {
      position: relative;
      background: #6ab344;
      height: 160px;
  }

  .index-drawer .index-logo-image {
      position: absolute;
      bottom: 16px;
  }

  .view {
    /*position: absolute;*/
    /*background-color: #f6f6ef;*/
    width: 100%;
    transition: opacity .2s ease;
    box-sizing: border-box;
  }

  .expand-transition {
    transition: all .2s ease;
    /*background-color: #eee;*/
    /*overflow: hidden;*/
  }

  .expand-enter, .expand-leave {
    height: 0;
    opacity: 0;
  }
    
</style>
