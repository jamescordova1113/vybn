export const HTTP_URL = "http://3.19.143.198:3000/",
//export const HTTP_URL = "http://192.168.1.109:3000/",
    SERVER_URL = HTTP_URL + "graphql/",
    STATIC_URL = HTTP_URL + "images",
    UPLOAD_URL = HTTP_URL + "uploadfile",
    PERSPECTIVE_API_URL = "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=AIzaSyA-7I258ft0u18VGhilxunOTir_PEepoho",
    //PAYPAL_CLIENT_ID = 'AWhegKmME_334aU5C4H6C8BjKY-VnaoY_cIINWq-1D7TRZj1Tfm4g9S1pE38DG4rtae9dkQR1miiM00N';
    STRIPE_API_KEY = "pk_test_VodJCIivcu1Nnd3chKjnBgKJ00ldvSIQyg",
    //STRIPE_API_KEY = 'pk_test_0WXs0SQRWkyrk18oAQ7YFXbZ00P9EluclG';
    //PAYPAL_CLIENT_ID = "AZh9bRXw8EYIEiELcPmf9XoYI5PwEWGkTeW4l8F_KYZN7Uxj0kqk3p1UUbubUqM3WtsonIWNhGrvgHMf";
    PAYPAL_CLIENT_TEST_ID = "Acha0twjkCU1O4zc5tI-sg0QxvcyUMAsVGC0PTtkSfe7IbVOBcHTYK16VSgx_JEdOD_A1hD7ntL57iw_";

//export const MNDIGITAL_BASE = 'http://ie-api.mndigital.com/?',  //IE
export const MNDIGITAL_BASE = 'http://api.mndigital.com/?',      //PROD
    //API_KEY = 'Xwbxm2C7oNvfOtQH5A3pItIVQ',    //IE
    API_KEY = 'aGTrhbeubSEus5FXORMhhJgtW',    //PROD
    //SHARED_SECRET = 'H20ymFG8pem',            //IE
    SHARED_SECRET = 'Lbt6wH5elj0',            //PROD
    SEARCH_GETTRACKS = MNDIGITAL_BASE + "method=search.gettracks&rights=purchase&format=json&includeExplicit=true&page=1&pageSize=20&apiKey="+API_KEY+"&title=",
    RADIO_GETMEDIALOCATION = "method=Radio.GetMediaLocation&format=json&assetCode=014&protocol=http&userIP=45.58.62.161&apiKey="+API_KEY+"&trackID=";
