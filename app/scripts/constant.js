angular
  .module('homer')
  .constant('BASE_URL_CONSTANT', 'http://crawler-4.aq3cm3hjga.us-east-1.elasticbeanstalk.com/')  //LOCAL
  // .constant('BASE_URL_CONSTANT', 'http://duqhan-admin-java.aq3cm3hjga.us-east-1.elasticbeanstalk.com/')  //PRODUCTION
  .constant('ITEM_PER_PAGE', 20)
  .constant('AUTH_TOKEN', null)
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