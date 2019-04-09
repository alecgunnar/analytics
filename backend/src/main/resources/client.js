var analytics = {
    run: function (appId) {
        var request = new XMLHttpRequest();

        request.open('POST', 'http://localhost:8080/apps/' + appId + '/hits');
        request.send();
    }
};