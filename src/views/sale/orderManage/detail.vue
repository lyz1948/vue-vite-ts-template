<script setup lang="ts">
import Tourist from './components/TableTourist.vue'
import OtherFee from './components/TableOtherFee.vue'

</script>

<template>
  <div>
    <div class="order-info">
      <p>订单号：</p>
      <p>创建时间：</p>
    </div>

    <div class="mod-wrap">
      <div class="mod-wrap--title">
        收客
      </div>

      <div class="mod-body">
        <div class="title">
          线路标题
        </div>

        <div>
          <div>
            <span>2022-12-01 ~ 2022-12-04</span>
            <span>4天</span>
            <span>上海</span>
          </div>

          <div>
            <div><span class="label">客户联系人：</span><span class="text">小李子</span></div>
            <div><span class="label">联系电话：</span><span class="text">1231313131</span></div>
          </div>

          <div>
            <div><span class="label">备注：</span><span class="text">1231313131</span></div>
          </div>

          <div>
            <div><span class="label">订单来源：</span><span class="text">小李子</span></div>
            <div><span class="label">付款方式：</span><span class="text">1231313131</span></div>
            <div><span class="label">订单状态：</span><span class="text">1231313131</span></div>
          </div>

          <div>
            <div><span class="label">成交明细：</span><span class="text">小李子</span></div>
          </div>

          <div>
            <div><span class="label">订单金额：</span><span class="text">小李子</span></div>
          </div>

          <div>
            <div><span class="label">业务员：</span><span class="text">小李子</span></div>
          </div>
        </div>
      </div>

      <div class="mod-wrap">
        <div class="mod-title">
          游客名单
        </div>
        <div class="mod-body">
          <Tourist />
        </div>
      </div>

      <div class="mod-wrap">
        <div class="mod-wrap--title">
          其他成本
        </div>

        <div class="mod-body">
          <OtherFee />
        </div>
      </div>

      <div class="mod-wrap">
        <div class="mod-wrap--title">
          合计信息
        </div>

        <div class="mod-body">
          <div>
            <span class="label">应收：</span>
            <span class="text red">1800</span>
          </div>
          <div>
            <span class="label">应付：</span>
            <span class="text red">1800</span>
          </div>
          <div>
            <span class="label">毛利：</span>
            <span class="text red">1800</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>