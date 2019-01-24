let img01 = require('../../../statics/img/help-center-01.png')
export default{
  not_arrived: {
    html: `<div class="subTitle">充值进度查询</div>
<div class="dataHtml">
<p>充值页下方<span class="font">充值进度</span>可实时查看充值作业进度，当<span class="font">已加款</span>亮起，即充值完成到账，请于帐变明细确认余额。</p>
<p>若完成转账后一直显示为<span class="font">未到账</span>请确认转账状态或洽询在线客服。</p>
</div>
<div class="subTitle">银行端尚未完成转账</div>
<div class="dataHtml">
<p>请查阅支付状态是否停留在：转账中。由于跨行汇款的到账时间是取决银行方面办理速度，请您耐心等待。需待转账完成后平台才会收到款项。</p>
<p>若您完成转账、账户扣款，但平台仍未入账，请向客服反应，并提供相应的充值资讯：</p>
            <ol>
            <li><i class="iconfont icon-danxuankuang"></i>平台账号</li>
            <li><i class="iconfont icon-danxuankuang"></i>充值单号</li>
            <li><i class="iconfont icon-danxuankuang"></i>充值金额</li>
            <li><i class="iconfont icon-danxuankuang"></i>充值时间</li>
            <li><i class="iconfont icon-danxuankuang"></i>支付人姓名（支付宝充值）</li>
            </ol>
            </div>
<div class="subTitle">网上银行充值使用浏览器不正确</div>
<div class="dataHtml"><p>网银推荐使用浏览器：谷歌Chrome浏览器、IE9.0版本以上、火狐浏览器。</p>
<p>部分银行仅限使用IE浏览器，请于如何使用网银充值  确认是否使用正确的浏览器进行充值。</p></div>
<div class="subTitle">支付宝转账未完成</div>
<div class="dataHtml"><p>因支付宝自5月起，停止转账短信通知功能，请用户在<span class="font">完成支付宝转账后向平台客服告知您的转账资讯，</span>以加速到账。</p>
            <ol>
            <li><i class="iconfont icon-danxuankuang"></i>平台账号</li>
            <li><i class="iconfont icon-danxuankuang"></i>平台充值单号</li>
            <li><i class="iconfont icon-danxuankuang"></i>支付金额</li>
            <li><i class="iconfont icon-danxuankuang"></i>支付人姓名</li>
            </ol></div>
<div class="subTitle">支付宝转帐金额与平台充值金额不符</div>
<div class="dataHtml"><p>如支付宝转帐金额与平台充值填写之金额不同会造成充值异常，无法入账请洽询线上客服。</p></div>
<div class="subTitle">支付宝充值未透过平台直接转账</div>
<div class="dataHtml"><p>如未在平台进行充值手续直接转帐，此类未依循平台正常程序操作造成的损失平台一概不负责</p></div>`
  },
  online_banking: {
    html: `<div class="subTitle">网银充值流程</div>
<div class="dataHtml">
<p><span class="mark">1</span>于页面右上点选充值或财务中心 ＞ 平台充值</p>
<p><span class="mark">2</span>选择充值产品、充值管道、充值银行，填写充值金额后确认送出</p>
<div class="img">
<img src="http://phdtestc.goodgaming.com/Comm/705/Image/help1-2a.jpg" alt="">
</div>
<p><span class="mark">3</span>跳转至网上银行页面，依页面指示完成转账</p>
<div class="img">
<img src="http://phdtestc.goodgaming.com/Comm/705/Image/help1-2b.jpg" alt="">
</div>
</div>
<div class="subTitle">网银推荐使用的浏览器</div>
<div class="dataHtml">
<p>部分网银进行转帐有限定使用的浏览器，请使用推荐使用的浏览器進行充值。</p>
<div>
<img src="${img01}" alt="">
</div>
</div>`
  },
  WeChatPay: {
    html: `<div class="subTitle">微信充值流程</div>
<div class="dataHtml">
<p><span class="mark">1</span>于页面右上点选充值或财务中心 ＞ 平台充值</p>
<p><span class="mark">2</span>选择充值产品、充值管道，填写充值金额后确认送出</p>
<div class="img">
<img src="http://phdtestc.goodgaming.com/Comm/705/Image/help1-3a.jpg" alt="">
</div>
<p><span class="mark">3</span> 使用微信手机端，开启<span class="font">扫一扫</span>，扫描二维码进入支付页面，依微信支付页面指示完成转账</p>
<div class="img">
<img src="http://phdtestc.goodgaming.com/Comm/705/Image/help1-3b.jpg" alt="">
</div>
<p><span class="mark">4</span>使用手机浏览器进行充值，请先通过截屏把二维码图片保存于手机里，再于微信扫一扫开启右上角菜单，打开从相册选取二维码找到平台提供的充值二维码图片，即可进行支付</p>
<div class="img">
<img src="http://phdtestc.goodgaming.com/Comm/705/Image/help1-3c.jpg" alt="">
</div>
</div>
<div class="subTitle">微信充值额度</div>
<div class="dataHtml">
<p>微信充值单笔充值金额最低50元，最高3000元。</p>
<p>若用户未在微信绑定银行卡，则充值额度最高为1000元。</p>
</div>`
  },
  Alipay: {
    html: `<div class="subTitle">支付宝充值流程</div>
<div class="dataHtml">
<p><span class="mark">1</span>于页面右上点选充值或财务中心 ＞ 平台充值</p>
<p><span class="mark">2</span>选择充值产品、充值管道，填写充值金额后确认送出</p>
<div class="img">
<img src="http://phdtestc.goodgaming.com/Comm/705/Image/help1-4a.jpg" alt="">
</div>
<p><span class="mark">3</span>支付宝支付信息</p>
<div class="img">
<img src="http://phdtestc.goodgaming.com/Comm/705/Image/help1-4b.jpg" alt="">
</div>
<p><span class="mark">4</span>进入支付宝进行<span class="font">转账到银行卡</span>，输入平台提供的支付信息完成转账</p>
<div class="img">
<img src="http://phdtestc.goodgaming.com/Comm/705/Image/help1-4c.jpg" alt="">
</div>
</div>`
  }
}
