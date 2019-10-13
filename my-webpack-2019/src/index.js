import addContent from './add-content.js';
import jQuery from 'jquery';
/* 同步加载  */
import '../assets/style.css';
/* 异步加载 */
import('../assets/style2.css');
import img from '../assets/img/1.jpg';
/* scss */
import('../assets/style.scss');
/* less */
import('../assets/style.less');
let a = "333",b = "444";
document.write('my first webpack app222111111<br />');
addContent();