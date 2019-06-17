import { getRepository, Repository } from 'typeorm'
import { Poster, PosterStatus, PosterType } from '../models/poster'

export interface AddParams {
  id?: number,
  shopId?: number,
  name: string,
  type?: PosterType,
  poster?: string,
  status?: PosterStatus,
  data?: string,
  timer?: string,
}

export interface UpdateParams {
  id: number,
  shopId?: number,
  name?: string,
  type?: PosterType,
  poster?: string,
  status?: PosterStatus,
  data?: string,
  setting?: string,
  timer?: string,
}

export interface QueryParams {
  pageNo: number,
  pageSize: number,
  type: PosterType,
  shopId?: number
}

export interface GetParams {
  type: PosterType,
  shopId: number
}

// 获取发布的模板
export const getPublish = async (params: GetParams) => {
  const posterRpo:Repository<Poster> = getRepository(Poster)
  return await posterRpo.findOne({
    type: params.type,
    status: PosterStatus.PUBLISH,
    shopId: params.shopId,
  })
}

// 根据 id 获取数据
export const get = async (id) => {
  const posterRpo:Repository<Poster> = getRepository(Poster)
  const poster: Poster = await posterRpo.findOne(id)
  return poster
}

// 添加
export const add = async (params: AddParams) => {
  const posterRpo:Repository<Poster> = getRepository(Poster)
  const poster: Poster = posterRpo.create(params)
  return await posterRpo.save(poster)
}

// 重置掉发布状态
export const resetPublish = async (type: PosterType, shopId: number) => {
  const posterRpo:Repository<Poster> = getRepository(Poster)
  // 先取消掉发布的模板
  const resetRes = await posterRpo.update(
    {
      type,
      shopId,
      status: PosterStatus.PUBLISH,
    },
    { status: PosterStatus.INIT })
  return resetRes
}

// 更新
export const update = async (params: UpdateParams) => {
  const posterRpo:Repository<Poster> = getRepository(Poster)
  return await posterRpo.createQueryBuilder('posterUpdate')
  .update(Poster)
  .set(params)
  .where('id = :id', { id: params.id })
  .execute()
}

// 获取列表
export const query = async (params: QueryParams) => {
  const { pageNo, pageSize, type, shopId = 1 } = params
  const posterRpo:Repository<Poster> = getRepository(Poster)
  const list = await posterRpo.createQueryBuilder('poster')
  .where('poster.type = :type', { type })
  .andWhere('poster.shopId = :shopId', { shopId })
  .orderBy('poster.createAt')
  .skip((pageNo - 1) * pageSize)
  .take(pageSize)
  .getManyAndCount()
  return list
}

// 删除
export const remove = async (id: number) => {
  const posterRpo:Repository<Poster> = getRepository(Poster)
  return await posterRpo.delete(id)
}
