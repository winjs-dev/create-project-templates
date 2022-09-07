import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import NetworkBroken from '../NetworkBroken/index.vue';

describe('NetworkBroken', () => {
  it('renders properly', () => {
    expect(NetworkBroken).toBeTruthy();

    const wrapper = mount(NetworkBroken, { props: { message: '当前网络异常，请检查！' } });

    expect(wrapper.text()).toContain('当前网络异常，请检查！');
    expect(wrapper.html()).toMatchSnapshot();
  });
});
