import { shallowMount } from '@vue/test-utils';
import NetworkBroken from '../NetworkBroken/index.vue';

describe('NetworkBroken', () => {
  it('renders properly', () => {
    const message = '当前网络异常，请检查';
    const wrapper = shallowMount(NetworkBroken, {
      propsData: {message}
    });

    expect(wrapper.text()).toContain(message);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
