
requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app',
		//jquery : 'jquery',
		googleAPI: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA60oRs-4SNJVvKDeLYWIWOC60N6YWPwHE&libraries=places'
    }
});

require(['./jquery', 'googleAPI', 'app/main'], function($, googleAPI, app) {
     app.getLocation();
});
