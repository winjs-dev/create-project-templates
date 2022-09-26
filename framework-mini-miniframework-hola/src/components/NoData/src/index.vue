<template>
  <view class="nodata-card" :class="{ small: small, smaller: smaller }">
    <view class="content no-comment">
      <view class="member-card">
        <image v-if="night" class="img" src="../../../assets/images/bg_no_data_night.png"></image>
        <image v-else class="img" src="../../../assets/images/bg_no_data.png"></image>
      </view>
      <view class="no-data">{{ datadec }}</view>
    </view>
  </view>
</template>
<script type="text/babel">
  export default {
    props: ['datadec', 'small', 'smaller', 'night'],
    name: 'NoData'
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import 'style.less';
</style>
