import expeditious from 'express-expeditious';
 
const cacheoptions: expeditious.ExpeditiousOptions = {
  namespace: 'expresscache',
  defaultTtl: '1 minute'
}
 
export const cache = expeditious(cacheoptions)
