angular
        .module('homer')
        .constant('BASE_URL_CONSTANT', 'http://192.168.1.100:8084/')
        .constant('SUPPORTING_DATE_FORMATS_CONSTANT', [
            'dd-MMMM-yyyy',
            'YYYY-MM-DD',
            'dd.MM.yyyy',
            'shortDate',
            'dddd, MMMM Do YYYY, h:mm:ss a',
            'DD MMM, YYYY hh:mm A',
            'ddd, MMM D YYYY',
            'YYYY-MM-DDTHH:mm:ss.SSS'
        ]);