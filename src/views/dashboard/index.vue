<script setup lang="ts">
import Charts from './components/charts.vue'

const orderList = [
  { title: '待确认订单', count: 100, today: 100, history: 200 },
  { title: '申请取消订单', count: 100, today: 100, history: 200 },
  { title: '占位订单', count: 100, today: 100, history: 200 },
]
const orderList2 = [
  { title: '成交订单', week: 200, today: 100, dayPercent: 'up', weekPercent: 'down' },
  { title: '新增游客', week: 200, today: 100, dayPercent: 'donw', weekPercent: 'down' },
]
</script>

<template>
  <div class="home">
    <div class="content">
      <div class="card-list container">
        <div class="card-item">
          <div v-for="(item, index) in orderList" :key="index" class="card-item--inner">
            <div class="card-item--title">
              {{ item.title }}
            </div>

            <div class="card-item--content">
              <div class="today">
                <div class="count">
                  <span class="blue">
                    {{ item.count }}
                  </span>
                </div>
              </div>
              <div class="data">
                <span>今日 <span class="red">{{ item.today }}</span></span>

                <span>历史 <span class="green">{{ item.history }}</span></span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-item">
          <div v-for="(item, index) in orderList2" :key="index" class="card-item--inner">
            <div class="card-item--title">
              {{ item.title }}
            </div>
            <div class="card-item--content">
              <div class="data">
                <div class="data today">
                  <span class="label">今日</span>
                  <div class="count">
                    <span class="blue">
                      {{ item.today }}
                    </span>
                  </div>
                </div>
                <div class="data week">
                  <span class="label">本周</span>
                  <span class="count blue">
                    {{ item.week }}
                  </span>
                </div>
              </div>
              <div class="data">
                <div>
                  日环比
                  <span class="red">{{ item.dayPercent }}</span>
                </div>
                <div>
                  周环比
                  <span class="green">{{ item.weekPercent }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Charts />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  min-height: 500px;
  background: $base-content-bg-color;

  .card-list {
    display: flex;

    .card-item {
      flex: 1;
      display: flex;

      &--inner {
        display: flex;
        flex: 1;
        flex-direction: column;
        background: #fff;
        border: 1px solid $base-border-color;
        &:not(:last-child) {
          margin-right: 10px;
        }
      }
      &--title {
        padding: 12px 20px;
        font-size: 18px;
        border-bottom: 1px solid $base-border-color;
      }
      &--content {
        padding: 20px;
        .count {
          font-size: $base-font-size-h3;
        }

        .data {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .today,
        .week {
          margin-bottom: 40px;
          margin-top: 20px;
          align-items: flex-end;
        }

        .label {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
