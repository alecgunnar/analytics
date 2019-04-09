var analytics = {
    run: function (url, appId) {
        var request = new XMLHttpRequest();

        request.open('POST', url + '/apps/' + appId + '/hits');
        request.send();
    }
};