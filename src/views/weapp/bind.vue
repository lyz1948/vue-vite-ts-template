<template>
  <div class="bind-setting">
    <div class="unbind">
      <h3>绑定微信小程序，拓展销售渠道</h3>
      <div class="container unbind-wrap">
        <div class="unbind-item">
          <div class="icon-box">
            <icon-link size="40" fill="#fff" />
          </div>
          <div>
            <BtnBase type="primary">
              已有小程序，即刻绑定
            </BtnBase>
          </div>
          <div class="text">
            为保证所有功能均能正常使用，授权时请把所有权限统一授权给未来旅行
          </div>
        </div>
        <div class="unbind-item">
          <div class="icon-box">
            <icon-link size="40" fill="#fff" />
          </div>
          <div>
            <BtnBase type="info">
              未有小程序，即可申请
            </BtnBase>
          </div>
          <div class="text">
            请至微信公众平台申请小程序，成功后返回绑定
          </div>
        </div>
      </div>
    </div>
    <div class="bind">
      <div class="qrcode">
        <img
          src="/src/assets/cover.jpeg"
          width="120"
          height="120"
          alt=""
        >
      </div>
      <div class="info">
        <p><span class="label">小程序名称:</span>旅游商城体验版</p>
        <p><span class="label">小程序版本:</span>1.0.0</p>
        <p><span class="label">账号主体:</span>桂林未来旅行科技有限公司</p>
        <p><span class="label">支付号:</span>xxxxxxxx</p>
        <p><span class="label">认证状态:</span>微信认证</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.bind-setting {
  padding: 50px 0;

  .unbind {
    text-align: center;
    &-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 400px;
      height: 400px;
      border: 1px solid #999;
      padding: 20px;
      margin-right: 20px;

      .text {
        margin-top: 20px;
        font-size: 15px;
        color: #999;
      }
    }
  }

  .bind {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .info {
      font-family: '微软雅黑';
      font-size: 15px;
      .label {
        display: inline-block;
        width: 100px;
        margin-right: 10px;
        font-weight: bold;
        text-align: right;
      }
    }
  }
}
</style>