import { devKeys } from './dev';
import { prodKeys } from './prod';

export const keys = process.env.NODE_ENV === 'production' ? prodKeys : devKeys;

// if (process.env.NODE_ENV === 'production') {
//     export default keys = prodKeys;
// } else {
//     export default keys = devKeys
// }
