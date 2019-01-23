// 模板组件注册
const textConfig = require('./Text/template.config')
const imgConfig = require('./Image/template.config')
const thermalZoneConfig = require('./ThermalZone/template.config')

export default {
  text: textConfig.default,
  image: imgConfig.default,
  thermalZone: thermalZoneConfig.default
}
