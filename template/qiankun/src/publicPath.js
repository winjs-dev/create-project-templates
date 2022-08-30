/* eslint-disable */
import { checkIsQiankunMicroService } from '@/utils';

if (checkIsQiankunMicroService()) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
