import React, { PureComponent, Fragment } from 'react'
import { Input , Button, message } from 'antd'
import { connect } from 'dva'
import { trim , prop, map } from 'ramda'
import Linker from '@/components/Linker'
import NoicerPicker from '@/components/NoticePicker'

@connect()
class NoticeCardDesign extends PureComponent {
  constructor(props) {
    super(props)
    const { config: { items } } = this.props
    this.state = {
      noticeVisible: false,
      notices: items
    }
  }

  onTitleChange = (e) => {
    const { onChange, config } = this.props
    const value = trim(e.target.value)
    onChange({ id: config.id, key: 'title', value })
  }

  onLinkerChange = (value) => {
    const { config, onChange } = this.props
    onChange({ id: config.id, key: 'url', value })
  }

  openNoticePicker = () => {
    this.setState({ noticeVisible: true })
  }

  getNoticeList = (ids) => {
    if (ids) {
      const { config, onChange, dispatch } = this.props
      dispatch({
        type: 'component/getNoticeList',
        payload: {
          path: 'design/announcement',
          ids
        },
        callback: (res) => {
          const list = prop('_DATA_', res)
          if (list && list.length) {
            const notices = map(({ id, name }) => ({ id, name }), list)
            this.setState({ notices }, () => {
              onChange({ id: config.id, key: 'items', value: notices })
            })
          } else {
            message.info('消息获取失败, 请确认消息ID组')
          }
        }
      })
    }
    this.setState({ noticeVisible: false })
  }

  render() {
    const { noticeVisible, notices } = this.state
    const { config: { title, url  } } = this.props
    return (
      <Fragment>
        <div className="content-data">
          <h4 className="content-data-title">标题名称</h4>
          <div className="content-data-notice">
            <Input
              defaultValue={title}
              placeholder="请输入消息标题"
              onChange={this.onTitleChange}
              maxLength={10}
            />
          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">消息列表</h4>
          <div className="content-data-notice">
            <Button onClick={this.openNoticePicker} icon="bars">
              { notices.length > 0 ? `已设置${notices.length}条消息` : '设置消息列表' }
            </Button>
          </div>
        </div>
        <div className="content-data">
          <h4 className="content-data-title">链接</h4>
          <div className="content-data-notice">
            <Linker url={url} multiGoods={false} onChange={this.onLinkerChange} />
          </div>
        </div>
        <NoicerPicker visible={noticeVisible} onChange={this.getNoticeList} />
      </Fragment>
    );
  }
}

export default NoticeCardDesign
