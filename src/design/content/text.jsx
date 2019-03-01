import React, { Fragment } from 'react'
import Linker from '@/components/Linker'
import TextArea from './common/textArea'
// import { Input } from 'antd'

const TextDesign = ({ config, onChange }) => {
  const { id, data: { url, title } } = config
  const onTitleChange = (value) => {
    onChange({ id, key: 'title', value })
  }
  const onLinkerChange = (value) => {
    onChange({ id, key: 'url', value })
  }
  return (
    <Fragment>
      <TextArea title="标题" value={title} onChange={onTitleChange} />
      {/* <Input placeholder="请输入名称" /> */}
      <div className="content-data">
        <h4 className="content-data-title">链接</h4>
        <div className="content-data-linker">
          <Linker url={url} multiGoods={false} onChange={onLinkerChange} />
        </div>
      </div>
    </Fragment>
  )
}

export default TextDesign
