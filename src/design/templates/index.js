// 模板组件注册
import Text from './Text/template.config'
import Image from './Image/template.config'
import ThermalZone from './ThermalZone/template.config'
import Swiper from './Swiper/template.config'
import ArticleCard from './ArticleCard/template.config'
import NoticeCard from './NoticeCard/template.config'
import CouponCard from './Coupon/template.config'
import Title from './Title/template.config'
import GoodsCard from './GoodsCard/template.config'
import GoodsSlider from './GoodsSlider/template.config'
import MultipleImage from './MultipleImage/template.config'
import Error from './error'

// 同时导出所有的模板
export default {
  text: Text,
  image: Image,
  thermalZone: ThermalZone,
  swiper: Swiper,
  noticeCard: NoticeCard,
  articleCard: ArticleCard,
  coupon: CouponCard,
  title:Title,
  goodsCard: GoodsCard,
  goodsSlider: GoodsSlider,
  multipleImage: MultipleImage,
  error: Error
}
