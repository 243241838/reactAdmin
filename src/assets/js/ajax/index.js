import ajax from './api-factory';
import baseURL from './baseURL';
export default new ajax({
   url: v => baseURL()+`${v.url}`,
   optionParams: ['url'],
});
