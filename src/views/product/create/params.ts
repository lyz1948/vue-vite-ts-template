interface TagOrType {
  tid: number
  type: string
}

interface Banner {
  picId: number
  id?: number
  productId?: number
}

interface CreateState {
  name: string
  departureCity: string // 出发城市
  arrivalCity: string // 到达城市
  resPId: string
  travelLineId: string
  source: string
  // itinerarys: Array<any>
  // bannerPics: Array<Banner>
  // tags: Array<TagOrType>
  // types: Array<TagOrType>
  days: number
}

export const searchState = () => ({
  name: '',
  create: '',
})

export const formState = (): CreateState => ({
  name: '',
  departureCity: '', // 出发城市
  arrivalCity: '', // 到达城市
  resPId: '', // 地接资源产品Id
  travelLineId: '', // 地接资源线路ID
	source: '',
  days: 1,
})

export const formTripState = () => ({
  breakfast: true,
  breakfastDesc: '',
  dinner: true,
  dinnerDesc: '',
  endPoint: '',
  hotelId: '',
  hotelName: '',
  itineraryDesc: '',
  lunch: true,
  lunchDesc: '',
  productId: '',
  startPoint: '',
  title: '',
  traffic: '',
  whichDay: 1,
})

export const rules = {
  name: [{ required: true, message: '线路名称不能为空', trigger: 'blur' }],
  days: [{ required: true, message: '行程天数不能为空', trigger: 'blur' }],
}

const plan = 
  {
    "clearDays": 0,
    "clearHours": "",
    "endDate": "",
    "id": 0,
    "isExceed": true,
    "planCount": 0,
    "planDateList": {},
    "planSurplusCount": 0,
    "prices": [
      {
        "adultPrice": 0,
        "childPrice": 0,
        "customerTypeId": 0,
        "id": 0,
        "productId": 0,
        "productPlanId": 0,
        "roomDifference": 0,
        "type": ""
      }
    ],
    "productId": 0,
    "saleStatus": true,
    "signUpAdvanceDays": 0,
    "signUpAdvanceHours": "",
    "startDate": "",
    "type": "",
    "weekPlanList": {}
  }

export const mockData = {
  "code": "202301010001",
  "name": "桂林+阳朔+漓江+龙脊梯田4日3晚跟团游",
  "departureCity": "上海",
  "arrivalCity": "桂林",
  "isEnable": true,
  "isHot": true,
  "isRecommend": true,
  "resPId": 974,
  "travelLineId": 61,
  "source": "未知",
  "days": 4,
  "feature": "错峰热卖-1200【船游漓江精华段+20元背景】遇龙河双人手撑竹筏+骑行十里画廊【60标美食+竹筒饭】C线升5钻+可选升千古情/印象+象山+喀斯特银子岩【童含早】民族服饰旅拍+伴手礼",
  "feeExclude": "超重行李的托运费、保管费；酒店内洗衣、理发、电话、传真、收费电视、饮品、烟酒等个人消费；自由活动期间用车、陪同服务；一切个人消费及费用包含中未提及的任何费用，本产品不可拼房（综合考量目前常规团队出行人群结构并考虑实际入住体验等因素本产品暂时无法提供拼房，敬请谅解）。报价是按照2成人入住1间房计算的价格，请在页面中选择所需房间数或单人房差选项综合考量目前常规团队出行人群结构并考虑实际入住体验等因素本产品可尝试申请3人间或加床服务，如您需3成人入住1间房，在预订时备注，后续是否可以安排及相关费用以员工回复为准（温馨提示：当地酒店面积小，加床可能会引起您的不便，敬请谅解）",
  "feeInclude": "为成人/儿童有差异的项目，请特别留意，满足年龄条件的儿童身高不符时，请按儿童下单，可能会涉及现场补差价，由服务人员现场协助处理，具体差价金额以现场报价为准。",
  "friendlyTips": "如按上述约定比例扣除的必要的费用低于实际发生的费用，旅游者按照实际发生的费用支付，但最高额不应当超过旅游费用总额。因部分旅游资源需提前预订的特殊性，本产品线路在旅行社成团后至出行前6天外取消的，也将产生实际损失，具体损失包括但不限于机票、酒店等，如旅游者需要取消订单，应及时联系旅行社，旅行社除协助旅游者减损并退还未实际发生的损失费用外不再承担其他赔偿责任。",
  "innerRemarks": "如为多人出行，预订人/旅游者代表确认已征得其余全体出行人同意作为本次旅游签约代表，受托人在旅游合同及其附件上的签字全体委托人均予以认可。如您未取得授权，请不要代为预订下单/签署合同",
  "serviceStandard": "★ 【尊享入住】钜惠来袭-错峰特惠：畅游~桂林-龙脊梯田-漓江-阳朔，严选酒店住宿，免费接送站/机+赠特色伴手礼+品牌矿泉水~",
	"bannerPics": [
		{
			"picId": 1,
			"productId": ''
		},
		{
			"picId": 2,
			"productId": ''
		},
		{
			"picId": 3,
			"productId": ''
		},
	],
	"itinerarys": [
		{
			"breakfast": false,
			"breakfastDesc": "无",
			"dinner": false,
			"dinnerDesc": "无",
			"startPoint": "上海",
			"endPoint": "桂林",
			"hotelId": '',
			"hotelName": "香格里拉",
			"id": '',
			"itineraryDesc": "自由活动",
			"lunch": true,
			"lunchDesc": "西餐晚宴",
			"productId": '',
			"title": "第一天的标题",
			"traffic": "飞机",
			"whichDay": 1
		},
		{
			"breakfast": true,
			"breakfastDesc": "自助早餐",
			"dinner": true,
			"dinnerDesc": "长桌宴",
			"startPoint": "桂林",
			"endPoint": "龙脊",
			"hotelId": '',
			"hotelName": "香格里拉",
			"id": '',
			"itineraryDesc": "★ 【缤纷景点】五A景区漓江20元人民币背景处+城徽象山+攻略醉火龙脊梯田+遇龙河双人竹筏+赠送自由骑行十里画廊，魅力西街！",
			"lunch": true,
			"lunchDesc": "西餐晚宴",
			"productId": '',
			"title": "第二天的标题",
			"traffic": "豪华大巴",
			"whichDay": 2
		},
		{
			"breakfast": true,
			"breakfastDesc": "自助早餐",
			"dinner": true,
			"dinnerDesc": "啤酒鱼",
			"startPoint": "桂林",
			"endPoint": "龙脊",
			"hotelId": '',
			"hotelName": "香格里拉",
			"id": '',
			"itineraryDesc": "★ 【缤纷景点】五A景区漓江20元人民币背景处+城徽象山+攻略醉火龙脊梯田+遇龙河双人竹筏+赠送自由骑行十里画廊，魅力西街！",
			"lunch": true,
			"lunchDesc": "桂林特色米粉",
			"productId": '',
			"title": "第三天的标题",
			"traffic": "豪华大巴",
			"whichDay": 4
		},
		{
			"breakfast": true,
			"breakfastDesc": "自助早餐",
			"dinner": false,
			"dinnerDesc": "",
			"startPoint": "桂林",
			"endPoint": "龙脊",
			"hotelId": '',
			"hotelName": "香格里拉",
			"id": '',
			"itineraryDesc": "【服务保障】集团自营实力一手地接+明星导游+私人客服 一对一服务+伴手礼，产品附加值满满,震撼预售,欢迎比价,真实好评,我们用信誉和价格说话",
			"lunch": true,
			"lunchDesc": "桂林特色米粉",
			"productId": '',
			"title": "第四天的标题",
			"traffic": "飞机",
			"whichDay": 4
		},
	],
	"plans": [
		
	],

	"tags": [
		{
			"tid": 2,
			"type": "TAG"
		},
		{
			"tid": 3,
			"type": "TAG"
		},
	],
	"tpyes": [
		{
			"tid": 6,
			"type": "TYPE"
		}
	],
}