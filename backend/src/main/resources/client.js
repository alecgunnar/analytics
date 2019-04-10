var analytics = {
    run: function (url, appId) {
        var request = new XMLHttpRequest();

        request.open('POST', url + '/apps/' + appId + '/hits');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send('{"url": "' + window.location + '", "title": "' + document.title + '"}');
    }
};