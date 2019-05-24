
import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Switch, Route, Link } from 'dva/router'
import classnames from 'classnames'
import { replace , split} from 'ramda'
import { useToggle } from '@/stores/hook'
import Dashboard from '../Dashboard'
import O2o from '../O2o'
import CategoryEdit from '../Category'

import './base.less'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

const LayoutIndexBase = ({ location }) => {
  const urls = replace('/', '', location.pathname)
  const menus = split('/', urls)
  menus.push(urls)
  const [ on, toggle ] = useToggle(false)
  return (
    <Layout className="base-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={on}
      >
        <Link to="/dashboard/index" className="logo">
          <svg className="logo-svg" viewBox="0 0 36 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.98885921,23.8523026 C8.8942483,23.9435442 8.76801031,24 8.62933774,24 L2.03198365,24 C1.73814918,24 1.5,23.7482301 1.5,23.4380086 C1.5,23.2831829 1.55946972,23.1428989 1.65570253,23.0416777 L13.2166154,12.4291351 C13.3325814,12.3262031 13.4061076,12.1719477 13.4061076,11.999444 C13.4061076,11.8363496 13.3401502,11.6897927 13.2352673,11.587431 L1.68841087,0.990000249 C1.57298556,0.88706828 1.5,0.733668282 1.5,0.561734827 C1.5,0.251798399 1.73814918,2.85130108e-05 2.03198365,2.85130108e-05 L8.62933774,2.85130108e-05 C8.76855094,2.85130108e-05 8.89532956,0.0561991444 8.98994048,0.148296169 L21.4358709,11.5757407 C21.548593,11.6783875 21.6196864,11.8297916 21.6196864,11.999444 C21.6196864,12.1693815 21.5483227,12.3219261 21.4350599,12.4251432 L8.98885921,23.8523026 Z M26.5774333,23.8384453 L20.1765996,17.9616286 C20.060093,17.8578413 19.9865669,17.703871 19.9865669,17.5310822 C19.9865669,17.3859509 20.0390083,17.2536506 20.1246988,17.153855 L23.4190508,14.1291948 C23.5163648,14.0165684 23.6569296,13.945571 23.8131728,13.945571 C23.9602252,13.945571 24.0929508,14.0082997 24.1894539,14.1092357 L33.861933,22.9913237 C33.9892522,23.0939706 34.0714286,23.2559245 34.0714286,23.4381226 C34.0714286,23.748059 33.8332794,23.9998289 33.5394449,23.9998289 L26.9504707,23.9998289 C26.8053105,23.9998289 26.6733958,23.9382408 26.5774333,23.8384453 Z M26.5774333,0.161098511 C26.6733958,0.0615881034 26.8053105,0 26.9504707,0 L33.5394449,0 C33.8332794,0 34.0714286,0.251769886 34.0714286,0.561706314 C34.0714286,0.743904453 33.9892522,0.905573224 33.861933,1.00822006 L24.1894539,9.89030807 C24.0929508,9.99152926 23.9602252,10.0542579 23.8131728,10.0542579 C23.6569296,10.0542579 23.5163648,9.98354562 23.4190508,9.87063409 L20.1246988,6.8459739 C20.0390083,6.74617837 19.9865669,6.613878 19.9865669,6.46874677 C19.9865669,6.29624305 20.060093,6.14198767 20.1765996,6.03848544 L26.5774333,0.161098511 Z" />
          </svg>
          <div className={classnames("logo-info", { hide: on })}>
            <span className="logo-info-name">小程序</span>
            <div className="logo-info-dot">·</div>
            <span className="logo-info-desc">装修</span>
          </div>
        </Link>
        <Menu theme="dark" mode="inline" defaultOpenKeys={[urls]} defaultSelectedKeys={menus}>
          <SubMenu key="dashboard/index" inlineCollapsed title={<span><Icon type="deployment-unit" /><span>模板管理</span></span>}>
            <Menu.Item key="index">
              <Link to="/dashboard/index">商城模板</Link>
            </Menu.Item>
            <Menu.Item key="o2o">
              <Link to="/dashboard/o2o">店铺模板</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="setting" title={<span><Icon type="tool" /><span>其他设置</span></span>}>
            <Menu.Item key="poster">分享海报</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header className="header-index">
          <div className="header-index-trigger" onClick={() => { toggle(!on) }}>
            <Icon
              className="trigger"
              type={on ? 'menu-unfold' : 'menu-fold'}
            />
          </div>
        </Header>
        <Content className="base-layout-content">
          <div className="base-layout-content-main">
            <Switch>
              <Route path="/dashboard/index" component={Dashboard} />
              <Route path="/dashboard/o2o" component={O2o} />
              <Route path="/dashboard/category" component={CategoryEdit} />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutIndexBase
