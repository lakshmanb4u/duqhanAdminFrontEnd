angular
        .module('homer')
        .constant('BASE_URL_CONSTANT', 'http://139.162.181.125:8080/ABC/')
//        .constant('BASE_URL_CONSTANT', 'http://45.33.7.87:8080/Futtourneys/')
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